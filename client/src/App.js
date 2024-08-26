import PlayerList from './PlayerList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditPlayer from './EditPlayer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/players" element={<PlayerList />} />
          <Route path="/players/:id" element={<EditPlayer />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;