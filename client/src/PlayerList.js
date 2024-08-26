import './App.css';
import PlayerDetail from './PlayerDetail'
import { useState, useEffect } from 'react';

function PlayerList(props) {

  const [data, setData] = useState([]);  
  
  useEffect(() => {
    getPlayerData()
  })

  const getPlayerData = async() => {
    
    await fetch('api/players', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      response.json().then(json => {
        const sortedData = json.sort(compareRank)
        setData(sortedData);
      });
    });
  }

  const compareRank = (a,b) => {
    return a.rank - b.rank
  }

  const getPlayerDataFromApi = async() => {
    const resp = await fetch('https://api.sampleapis.com/baseball/hitsSingleSeason');
    const playerData = await resp.json();

    playerData.forEach((player,index) => {
      fetch('api/players', {
        method: 'POST',
        body: JSON.stringify({
          rank: index + 1,
          name: playerData[index].Player,
          hits: playerData[index].Hits,
          bats: playerData[index].Bats,
          year: playerData[index].Year
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => {
        response.json().then(json => {
          console.log(json)
        });
      });
    })
  }

  return (
    <div class="playerlist">
      <div><button onClick={getPlayerDataFromApi}>Get player data from API</button></div>
      Player List
      {data.map((playerInfo) => 
        <PlayerDetail info={playerInfo}/>
      )}
    </div>
  );
}

export default PlayerList;
