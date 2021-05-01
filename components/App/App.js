import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import { Spotify } from '../../util/Spotify'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {track:
          {
          id: 1,
          name: "Breathe",
          artist: "Prodigy",
          album: "Fat of the Land"
          }
        },
        {track: {
          id: 2,
          name: "Fuel my Fire",
          artist: "Prodigy",
          album: "Fat of the Land"
          }
        },
        {track: {
          id: 3,
          name: "Blowin in the Wind",
          artist: "Bob Dylan",
          album: "Blonde on Blonde"
        }
      }],

        playlistName: "React Tracks",
        playlistTracks: [
          {
            track: {
            id: 1,
            name: "Breathe",
            artist: "Prodigy",
            album: "Fat of the Land"
          }
        }]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.track.id === track.track.id)) {
      return;
    }
    this.playlistTracks = this.state.playlistTracks;
    this.playlistTracks.push(track);
    this.setState({playlistTracks: this.playlistTracks});
  }

  removeTrack(track) {
    this.updatedPlaylistTracks = this.state.playlistTracks.filter(savedTrack => {
      if (savedTrack.track.id !== track.track.id) {
        return savedTrack;
      }})
    this.setState({playlistTracks: this.updatedPlaylistTracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    var trackURIs = this.state.playlistTracks.map(track => track.track.uri);
    console.log(trackURIs)
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }

  async search(searchTerm) {
    var searchResult = await Spotify.search(searchTerm);
    console.log(searchResult)
    this.setState({searchResults: searchResult})
  }

  render () {

    return <div>
              <h1>Ja<span className="highlight">mmm</span>ing</h1>
              <div className="App">
                <SearchBar onSearch={this.search} />
                <div className="App-playlist">
                  <SearchResults searchResults={this.state.searchResults}
                    onAdd={this.addTrack}
                    isRemoval={false}
                    onSearch={this.search}/>
                  <PlayList playListName={this.state.playListName}
                    playListTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    isRemoval={true}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist} />
                </div>
              </div>
            </div>
  }
}

export default App;
