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
        <SongCard data={data}/>]
        <SongCard data={data}/>]
      </div>
    </div>
  );
}

export default HomePage;