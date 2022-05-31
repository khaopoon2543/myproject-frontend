import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './path/Home';
import Search from './path/Search';
import Playlist from "./path/Playlist";
import Levels from "./path/Levels";
import Lyric from "./path/Lyric";
import Header from "./component/Navbar/Navbar";
import SubLevels from "./path/SubLevels";
import Data from "./path/Data";
import SubData from "./path/SubData";
import About from "./path/About";
import { NoMatch } from "./component/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';

import useGaTracker from './component/useGaTracker'


function App(){
  
    useGaTracker();

    return (
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route path="/" element={ <Home/> } />
          <Route path="/search" element={ <Search/> } />
          <Route path="/artists" element={ <Data src="artists" /> } />
          <Route path="/artists/:subArtists" element={ <SubData/> } />
          <Route path="/artists/:trackArtist/:trackId" element={ <Lyric/> } />
          <Route path="/levels" element={ <Levels/> } />
          <Route path="/levels/:subLevels" element={ <SubLevels/> } />
          <Route path="/series" element={ <Data src="series"/> } />
          <Route path="/series/:subSeries" element={ <SubData/> } />
          <Route path="/playlist/:codePlaylist" element={ <Playlist/> } />

          <Route path="/about" element={ <About/> } />
        </Routes>
      </div>
    );
}

export default App;