import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveToken } from '../../redux/userToken';

import './Home.css';
import SongCard from '../../Components/songCard/SongCard';
import Navbar from '../../Components/navbar/Navbar';
import SearchBar from '../../Components/searchBar/SearchBar'
import PlaylistForm from '../../Components/playlist/form';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTHORIZE_LINK;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SCOPES = ["playlist-modify-private", "user-read-private"];
const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

function HomePage() { 
  const [searchKey, setSearchKey] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSong, setSelectedSong] = useState([]);
  const [isAuthorize, setIsAuthorize] = useState(false);
  
  const { token } = useSelector((state) => state.userToken);
  const dispatch = useDispatch;

  const getReturnSpotifyAuth = (hash) => {
    const stringAfterHash = hash.substring(1);
    const urlParams = stringAfterHash.split("&");
    const paramSplitUp = urlParams.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key]=value;
    return accumulater;
  }, {});
  dispatch(saveToken(paramSplitUp.access_token));
  setIsAuthorize(true);
  };

  function handleInput(e) {
    setSearchKey(e.target.value);
  }
  
  const handleLogin = ()=>{
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&sope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }

  const handleSearch = async (e)=> {
    e.preventDefault();
  const url = "https://api.spotify.com/v1/search";
  const keywords = searchKey;
  const type = "track";
  try {
    const response = await fetch(`${url}?q=${keywords}&type=${type}&limit=10`, {
      headers: {
        'authorization' : 'Bearer ' + token
      }
    })
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(`Please login`);
        case 403:
          throw new Error(`Forbidden access`);
        default:
          throw new Error(`${response.status}`);
      }
    } else {
      const songData = await response.json()
      setSongData(songData.tracks.items);
    }
  } catch (error) {
    alert(`problem error: ${error.message}`);
  }
}

  const selectSong  = (data)=> {
    const arrSongId = [...selectedSong, data.uri];
    setSelectedSong(arrSongId);
  }

  const deselectSong = (data)=> { 
    const arrSongId = selectedSong.concat([]);
    const index = selectedSong.indexOf(data.uri);
    arrSongId.splice(index, 1);
    setSelectedSong(arrSongId);
  }

  useEffect(()=> {
    if (window.location.hash){
      getReturnSpotifyAuth(window.location.hash);
    }
  }, []);

  return (
    <div className='home'>
      <div className='song-section'>
        <Navbar title="Song"/>
        <button className="login-btn" onClick = {handleLogin}>Login</button>
        <PlaylistForm selectedSong={selectedSong}/>

        <SearchBar handleInput={handleInput} handleSearch={handleSearch}/>
    
        {!isAuthorize &&<><p>login first</p></>}
        <div className='row'>
          {
            songData
            .filter((song) => {
              return selectedSong.includes(song.uri);
            })
            .map((song) => {
              return <SongCard data={song} key={song.uri} select={selectSong} deselect={deselectSong} isSelected={true}/>
            })
          }
          {
            songData
            .filter((song) => {
              return !selectedSong.includes(song.uri);
            })
            .map((song) => {
              return <SongCard data={song} key={song.uri} select={selectSong} deselect={deselectSong} isSelected={false}/>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage;