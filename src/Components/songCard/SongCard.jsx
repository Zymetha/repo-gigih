import './SongCard.css';
import React from 'react';

function SongCard({data}) {
  return (
  <div className='song-wrapper'>
    <div className='song'>
      <div className='song-img'>
        <img 
          src={data.album.images[0].url}
          alt="song"
          />
          <div className='song-info'>
            <p className='song-title'>{data.name}</p>
            <p className='song-album'>{data.album.name}</p>
            <p className='song-artist'>{data.artists[0].name}</p>
          </div>
          <button className='btn'>Select</button>
        </div>
      </div>
    </div>
  );
}

export default SongCard;