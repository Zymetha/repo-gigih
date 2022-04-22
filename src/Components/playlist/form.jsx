import './Form.css';

function PlaylistForm({handleCreatePlaylist, handleFormPlaylist}){
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