import './SongCard.css';
import React from 'react';

function SongCard({data, select, deselect, isSelected}) {

  const handleSelect = ()=> {
    select(data);
  }

  const handleDeselect = () => {
    deselect(data);
  }

  return (
  <div className='song-wrapper'>
    <div className='song'>
      <div className='song-img'>
        <img 
          src={data.album.images[0].url}
          alt= {data.name}
          />
          <div className='song-info'>
            <p className='song-title'>{data.name}</p>
            <p className='song-album'>{data.album.name}</p>
            <p className='song-artist'>{data.artists[0].name}</p>
          </div>
          
          {     
            isSelected
            ? <button onClick = {handleDeselect} className="btn selected">Deselect</button>
            : <button onClick = {handleSelect} className="btn select">Select</button>
          }
        </div>
      </div>
    </div>
  );
}

export default SongCard;