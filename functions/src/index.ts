import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { TwitterApi } from 'twitter-api-v2';

dotenv.config();

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});


admin.initializeApp();
const dbRef = admin.firestore().doc('tokens/demo');

const callbackUrl = 'http://127.0.0.1:5000/hot-twitter-bot/us-central1/callback';

exports.auth = functions.https.onRequest(async (request, response) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackUrl,
    { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
  );

  // store verifier
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
    code: `${code}`, codeVerifier, redirectUri: callbackUrl,
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

  response.status(200).send('');
});
