import React from 'react';
import './TrackList'
import Track from '../Track/Track'

class TrackList extends React.Component {

  render() {
    return <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track key={track.track.id} track={track.track} onAdd={this.props.onAdd}
            onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
        })}
    </div>
  }

}

export default TrackList;
