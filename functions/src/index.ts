import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { TwitterApi } from 'twitter-api-v2';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const {
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  OPENAI_ORG,
  OPENAI_SECRET,
  CALLBACK_URL,
} = process.env;

// Initialise twitter client
const twitterClient = new TwitterApi({
  clientId: TWITTER_CLIENT_ID,
  clientSecret: TWITTER_CLIENT_SECRET,
});

// Initialise openAI
const configuration = new Configuration({
  organization: OPENAI_ORG,
  apiKey: OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);

// Initialize firebase
admin.initializeApp();
const dbRef = admin.firestore().doc('tokens/demo');

exports.auth = functions.https.onRequest(async (request, response) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    CALLBACK_URL,
    { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
  );

  await dbRef.set({ codeVerifier, state });

  response.redirect(url);
});

exports.callback = functions.https.onRequest(async (request, response) => {
  const { state, code } = request.query;

  const dbSnapshot = await dbRef.get();
  const snapShotData = dbSnapshot.data();

  if (!snapShotData) {
    response.status(400).send('No data retreived');
  }

  const { codeVerifier, state: storedState } = snapShotData;

  if (state !== storedState) {
    response.status(400).send('Stored tokens didnt match');
  }

  const {
    // client: loggedClient,
    accessToken,
    refreshToken,
  } = await twitterClient.loginWithOAuth2({
    code: `${code}`, codeVerifier, redirectUri: CALLBACK_URL,
  });

  // access and refresh tokens
  await dbRef.set({ accessToken, refreshToken });

  response.sendStatus(200);
});

exports.tweet = functions.https.onRequest(async (request, response) => {
  // const { refreshToken } = (await dbRef.get()).data();

  // const {
  //   client: refreshedClient,
  //   accessToken,
  //   refreshToken: newRefreshToken,
  // } = await twitterClient.refreshOAuth2Token(refreshToken);

  // await dbRef.set({ accessToken, refreshToken: newRefreshToken });

  // const { data } = await refreshedClient.v2.tweet('I done did a twitter');
  const completion = await openai.createChatCompletion({
    messages: [{
      'role': 'user',
      'content': 'write a tweet by Skip Bayless on how terrible' +
      'Lebron is in the 4th quarter in 280 characters or less',
    }],
    model: 'gpt-3.5-turbo',
    temperature: 1,
  });
  // const completion = await openai.createCompletion({
  //   model: 'gpt-3.5-turbo',
  //   prompt: 'write a clickbait tweet by Skip Bayless on how overrated' +
  //   'K-Pop is in 280 characters or less',
  //   max_tokens: 280,
  // });

  const tweet = completion.data.choices[0].message.content;

  response.status(200).send(tweet);
});
