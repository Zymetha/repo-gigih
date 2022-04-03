import React, { useState, useEffect } from "react";
import './Home.css';
import '../../Components/searchBar/SearchBar';
import HomeTitle from '../../Components/homeTitle/HomeTitle';
import SongCard from '../../Components/songCard/SongCard';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTHORIZE_LINK;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SCOPES = ["playlist-modify-private", "user-read-private"];
const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

function HomePage() {
  const [authToken, setAuthToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [songData, setSongData] = useState([]);
  const [isDataExist, SetisDataExist] = useState(false);


  const getReturnSpotifyAuth = (hash) => {
  const stringAfterHash = hash.substring(1);
  const urlParams = stringAfterHash.split("&");
  const paramSplitUp = urlParams.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key]=value;
    return accumulater;
  }, {});
  setAuthToken(paramSplitUp.access_token);
  }
  
useEffect(()=> {
  if (window.location.hash){
    getReturnSpotifyAuth(window.location.hash);
  }
})

const handleInput = (e)=> {
  setSearchKey(e.target.value);
}

const handleLogin = ()=>{
  window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&sope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
}


const handleSearch = ()=> {
const url = "https://api.spotify.com/v1/search";
const keywords = searchKey;
const type = "track";
fetch(`${url}?q=${keywords}&type=${type}&limit=10`, {
  headers: {
    'authorization' : 'Bearer ' +authToken
  }
})

.then(response => response.json())
.then(data => {
  setSongData(data.tracks.items);
  SetisDataExist(true);
  console.log(data.tracks.items);

});
}


  return (
    <div className='home'>
      <div className='song-section'>
        <HomeTitle title="Song"/>
        <button className="login-btn" onClick = {handleLogin}>Login</button>

        <div className="SearchBar">
          <input onChange = {handleInput} type = "text"/>
          <input onClick = {handleSearch} type = "submit" value = "search"/>
        </div>
        <div className='row'>
          {isDataExist && songData.map((song, idx) => (
              <SongCard 
              data={song} 
              key={idx}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;