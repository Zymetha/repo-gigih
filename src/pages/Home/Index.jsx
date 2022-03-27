import React from 'react';
import './Home.css';
import data from '../../Components/data/data';
import HomeTitle from '../../Components/homeTitle/HomeTitle';
import SongCard from '../../Components/songCard/SongCard';

function HomePage(props) {
  return (
    <div className='home'>
      <div className='song-section'>
        <HomeTitle title="Song"/>
        <div className='row'>
          {data.map((song,idx)=>(
              <SongCard 
              data={song} 
              key ={idx}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;