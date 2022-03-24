import data from './data';
import './App.css';

function App() {
  return (
    <div className='App'>
        <div className='song-wrapper'>
            <h1>Playlist</h1>
            <div className='song'>
              <div className='song-img'>
                <img src={data.album.images[0].url}/>
              </div>
              <div className='song-info'>
                <p className='song-title'>{data.name}</p>
                <p className='song-artist'>{data.artists[0].name}</p>
              </div>
            <div>
                <button className='btn'>Select</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
