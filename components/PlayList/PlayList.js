import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

class PlayList extends React.Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  // savePlaylist(){
  //   this.props.onSave();
  // }

  render() {

    return <div className="Playlist">
      <input value={this.props.playListName} onChange={this.handleNameChange}/>
      <TrackList tracks={this.props.playListTracks}
        isRemoval={this.props.isRemoval}
        onRemove={this.props.onRemove} />
      <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
    </div>

  }

}

export default PlayList
