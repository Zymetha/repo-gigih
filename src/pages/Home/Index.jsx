import React, { useState, useEffect } from 'react';
import './Home.css';
import '../../Components/searchBar/SearchBar';
import SongCard from '../../Components/songCard/SongCard';
import Navbar from "../../Components/navbar/Navbar";

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
  const [isDataExist, SetIsDataExist] = useState(false);
  const [selectedSong, setSelectedSong] = useState({
    'id': [],
    'tracks': [],
  });
  const [isAuthorize, setIsAuthorize] = useState(false);

  const getReturnSpotifyAuth = (hash) => {
  const stringAfterHash = hash.substring(1);
  const urlParams = stringAfterHash.split("&");
  const paramSplitUp = urlParams.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key]=value;
    return accumulater;
  }, {});
  setAuthToken(paramSplitUp.access_token);
  setIsAuthorize(true);
  }
  useEffect(()=> {
    if (window.location.hash){
      getReturnSpotifyAuth(window.location.hash);
    }
  }, []);

  const handleInput = (e)=> {
    setSearchKey(e.target.value);
  }
  
  const handleLogin = ()=>{
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&sope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }
  const handleSearch = async ()=> {
  const url = "https://api.spotify.com/v1/search";
  const keywords = searchKey;
  const type = "track";
  try {
    const response = await fetch(`${url}?q=${keywords}&type=${type}&limit=10`, {
      headers: {
        'authorization' : 'Bearer ' +authToken
      }
    })
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(`Please login`);
          break;
        case 403:
          throw new Error(`Forbidden access`);
          break;
        default:
          throw new Error(`${response.status}`);
          break;
      }
    } else {
      const songData = await response.json()
      setSongData(songData.tracks.items);
      SetIsDataExist(true);
    }
  } catch (error) {
    alert(`problem error: ${error.message}`);
  }
}

const selectSong  = (data)=> {
  const arrSongId = [...selectedSong.id, data.uri];
  const arrSong = [...selectedSong.tracks, data];
  setSelectedSong({
    'id': arrSongId,
    'tracks': arrSong,
  });
}

const deselectSong = (data)=> { 
  const arrSongId = selectedSong.id;
  const arrSong = selectedSong.tracks;
  const index = selectedSong.id.indexOf(data.uri);
  arrSongId.splice(index, 1);
  arrSong.splice(index, 1);
  setSelectedSong({
    'id': arrSongId,
    'tracks':arrSong,
  });
}

  return (
    <div className='home'>
      <div className='song-section'>
        <Navbar title="Song"/>
        <button className="login-btn" onClick = {handleLogin}>Login</button>

        <div className="SearchBar">
          <input onChange = {handleInput} type = "text"/>
          <input onClick = {handleSearch} type = "submit" value = "search"/>
        </div>
        {!isAuthorize &&<><p>login first</p></>}
        <div className='row'>
          {
            selectedSong.tracks.map((song)=>{
              return <SongCard data={song} key={song.uri} select={selectSong} deselect={deselectSong} isSelected={true}/>
            })
          }
          {isDataExist && songData
          .filter((song) => {
            return !selectedSong.id.includes(song.uri);
          })

          .map((song) => {
            return <SongCard SongCard data={song} key={song.uri} select={selectSong} deselect={deselectSong} isSelected={false}/>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default HomePage;