# twitter-hot-take-bot

A firebase/cloud function project which can be used to tweet automated nonsense.
Uses the twitter api and the OpenAi api to generate random nonsense by your favourite
or least favourite personalities.

## Prerequisites

1. Firebase/Google Cloud account and local setup completed
2. Twitter api credentials
3. OpenAI api credentials

Creates 3 endpoints

- Auth (Used to authorize the twitter account)
- Callback (A callback url which is invoked by auth to validate and store the credentials)
- Tweet (Tweet your configured nonsense)

Prompts can be configured in the prompts file and are exported and used in the tweet endpoint.
