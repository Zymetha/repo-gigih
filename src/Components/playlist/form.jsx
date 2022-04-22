import { useSelector } from 'react-redux';
import { useState } from 'react';
import './Form.css';

function PlaylistForm({selectedSong}){
    const { token } = useSelector((state) => state.userToken);
    const [playlistInfo, setPlaylistInfo] = useState({
        "name":"",
        "description": ""
    })
    const fetchProfile = async () => {
        const url = "https://api.spotify.com/v1/me";
        try {
            const response = await fetch(`${url}`, {
            headers: {
                'authorization' : 'Bearer ' + token
            }
        });
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
              const userData = await response.json()
              return userData.id;
            }
        } catch (error) {
        alert(`problem error: ${error.message}`);
        }
    } 

    const handleFormPlaylist = (e) => {
        const {name, value} = e.target;
        setPlaylistInfo({...playlistInfo, [name]: value});
    }
        
    const addItemToPlaylist = async (playlistId) => {
        const url ="https://api.spotify.com/v1/playlists/";
        const tracksparam = {
            'uris': selectedSong
        }
        try {
            const response = await fetch (`${url}${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    'authorization' : 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tracksparam)
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
                const addedTracks = await response.json()
                return addedTracks;
            }    
        } catch (error) {
            alert(`problem error: ${error.message}`);
        }
    }

    const createPlaylist = async (userID) => {
        const url ="https://api.spotify.com/v1/users/";
        const playlistparam = {
            ...playlistInfo,
            'public': false,
            'collaborative': false,
        }
        try {
            const response = await fetch(`${url}${userID}/playlists`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer' + token,
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(playlistparam)
            });
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
                const playlistData = await response.json()
                return playlistData.id;
            }
        } catch (error) {
            alert(`problem error: ${error.message}`);
        }
    } 

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        const userID = await fetchProfile();
        const playlistID = await createPlaylist(userID);
        const snapshotID = await addItemToPlaylist(playlistID);
        alert(`Playlist has been added ${snapshotID.snapshot_id}`)
    }
    
    return (
        <>
        <form className='playlistForm' action="" onSubmit={handleCreatePlaylist}>
            <label htmlFor='input-playlist-name' className='playlist-name'>Playlist Name</label>
            <br></br>
            <input id='input-playlist-name' className='input-playlist' onChange={handleFormPlaylist} type="text" name="name" minLength={10} required></input>
            <br></br>
            <label htmlFor='in  put-playlist-desc' className='playlist-desc'>Playlist Description</label>
            <br></br>
            <textarea id='input-playlist-desc' className='input-playlist' onChange={handleFormPlaylist} type="textarea" name="description" minLength={10} required></textarea>
            <br></br>
            <input className='input-playlist' type="submit" value="Save Playlist"></input>
        </form>
        </>
    );
}

export default PlaylistForm;