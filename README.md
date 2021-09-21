# About
In this exercise, you will leverage the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) in order to fetch and present data in a meaningful way.

You are tasked with creating a simple application where a user can search for an artist and read more about that artist. In addition, the application should also list albums by that artist.

When creating this simple application there are many useful libraries and frameworks out there, and should you choose to use any then please consider why you chose them and how they contribute to your solution.

Please put emphasis on good application- and code structure, as well as proper programming principles and best practices.

## Requirements
- The application must follow the [Spotify Developer Policy](https://developer.spotify.com/policy/)
- A user must be able to search for an artist
- A user must be able to see the results of the search in a meaningful way
- A user must be able to see more information about an artist
- A user must be able to see albums by an artist

Though not a requirement; we highly recommend that you write the application using React or native javascript as those are our tools of the trade.

## Design
You are free to create your own design, our only requirement is that you develop it with responsiveness in mind. You don't need to consider a layout for a tablet-sized screen. We won't focus on your design skills so primarily focus on writing good functionality, but that said you are more than welcome to create an attractive layout.

In order to save time you can use a CSS framework of your choosing, and if so consider why you chose that particular framework.

## Authentication to Spotify API
The Spotify API is locked behind authentication but within the `server` directory you will find a small server application that you can use to retrieve an access token that is needed.
Here is some instruction on how to get it going.

First, update the credentials in the `.env` file with what we've given you. If you haven't received them just ask us for them. Or you can register your own application on the [Spotify Developer Portal](https://developer.spotify.com) and use your own client id and client secret. Or as a bonus challenge, you can create your own implementation with the same or a different authentication strategy.


Here is how it works (note that you need to have node installed on your machine)
```.bash
cd server // navigate into the server directory
npm install // install the necessary packages
npm run start // start and run the server
```

The application should now be up and running on http://localhost:5000. If you want to change the port you can add `PORT` as a variable in the `.env` file.

The application provides two endpoints for retrieving an access token.
- `/auth/login` - Retreives a new access_token  
- `/auth/token` - Retreives the latest access_token

Note that the access token is only valid for 3600 seconds (60 minutes) after which you need to retrieve a new one.

### Using the access_token
Whenever you are making a request to the Spotify API you need to provide an access_token.

Once you have it you need to add the following header to your request. See the example below.

```.js

var options = {
    headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN,
        'Content-Type': 'application/json',
    },
};

fetch('https://api.spotify.com/v1/search?q=Veronica%20Maggio&type=artist', options)
```

### The relevant endpoints
In order to create the application you need to use the following endpoints
- `https://api.spotify.com/v1/search` - Search ([documentation](https://developer.spotify.com/documentation/web-api/reference/#category-search))
- `https://api.spotify.com/v1/artists/{id}` - Get an artist ([documentation](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artist))
- `https://api.spotify.com/v1/artists/{id}/albums` - Get an artists albums ([documentation](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-albums))

## Bonus
Should you have the time and inclination, here are some bonus challenges:

- Implement functionality for storing one or more artists as favorites for easy access
- Implement functionality for listening to a preview of an album (see the `preview_url` property when listing albums)
- Implement functionality for listing top tracks of an artist ([endpoint](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-top-tracks))
- Implement pagination for the search results
- Write some examples of unit tests
- Use Typescript
- Implement the authentication to Spotify yourself with one of the [different strategies](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-flows)

**Please note these are not a requirement of the exercise.**

Good luck with the assignment and we look forward to see what you have created!
