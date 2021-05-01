var accessToken;
const clientId = "da6a85cfd54543f5aad551f9d524c0ca";
const redirectUri = "https://jamming.surge.sh"
var expiresIn = 100;

const Spotify = {

  getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (hasAccessToken && hasExpiresIn) {
            accessToken = hasAccessToken[1];
            expiresIn = Number(hasExpiresIn[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 100);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

  search(searchTerm) {
    accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {"Authorization": `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse.tracks.items.map(track => {
        return {
          track:
          {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        }
      });
    })
  },

  savePlaylist(playlistName, trackUris) {
    var userId = undefined;
    accessToken = this.getAccessToken();
    var headers = {Authorization: `Bearer ${accessToken}`}
    console.log('getting user id');
    fetch('https://api.spotify.com/v1/me', {
      headers: headers
    })
      .then(response => response.json())
      .then(jsonResponse => {userId = jsonResponse.id})
      .then(() => {
        console.log('adding playlist');
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          body:    JSON.stringify({
            name: playlistName
          }),
          headers: headers
        })
          .then( response => response.json())
          .then( responseJSON => responseJSON.id)
          .then( playlistId => {
            console.log(JSON.stringify({ uris: trackUris}));
            console.log(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`);
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              method: 'POST',
              body:    JSON.stringify({
                uris: trackUris
              }),
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": 'application/json'}
            })
            .then( response => response.json())
            .then( responseJSON => console.log(responseJSON))
          })
      })
  }

// End of Spotify
}

export {Spotify};
