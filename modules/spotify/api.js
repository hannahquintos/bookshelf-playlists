//Spotify API authorization and access token
async function authenticateSpotify() {
    const url = 'https://accounts.spotify.com/api/token';

    const credentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`,
      },
      body: 'grant_type=client_credentials',
    });
  
    const data = await response.json();
    return data.access_token;
};

//get a list of playlists that match a given category
async function getPlaylists(accessToken, category) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${category}&type=playlist&limit=6`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    return data.playlists.items;
};


module.exports = {
    authenticateSpotify,
    getPlaylists,
}