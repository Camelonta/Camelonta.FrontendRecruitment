import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

const port = process.env.PORT || 5000;

dotenv.config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var app = express();

app.use(cors());

var ACCESS_TOKEN = null;

class HTTPResponseError extends Error {
  constructor(response, ...args) {
    super(
      `HTTP Error Response: ${response.status} ${response.statusText}`,
      ...args
    );
    this.response = response;
  }
}

const checkStatus = (response) => {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    throw new HTTPResponseError(response);
  }
};

app.get('/', async (_req, res) => {
  res.json({ "message": "Hello World!", "instructions": "Take a look inside of main.js to see the available endpoints. Good luck with the assignment :)" });
})

app.get('/auth/login', async (_req, res) => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    var authOptions = {
      method: 'post',
      body: params,
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString(
            'base64'
          ),
      },
    };

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    );
    checkStatus(response);
    const data = await response.json();
    ACCESS_TOKEN = data.access_token;
    res.json({ access_token: data.access_token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/auth/token', (_req, res) => {
  if (!ACCESS_TOKEN) {
    res
      .status(400)
      .json({ error: 'No access token was available, please login first' });
  }
  res.json({ access_token: ACCESS_TOKEN });
});

app.get('/search', async (req, res) => {
  if (!ACCESS_TOKEN) {
    res
      .status(400)
      .json({ error: 'No access token was available, please login first' });
  }

  try {
    const params = new URLSearchParams();
    params.append('q', req.query.q);
    params.append('type', 'artist'); // Valid types are: album , artist, playlist, track, show and episode.

    var searchOptions = {
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      'https://api.spotify.com/v1/search?' + params.toString(),
      searchOptions
    );
    checkStatus(response);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
