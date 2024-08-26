import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function PlayerDetail(props) {

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPlayerDescription = async() => {
    setLoading(true);
    
    await fetch('api/players/generate-description', {
      method: 'POST',
      body: JSON.stringify({
        name: props.info.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      response.json().then(json => {
        setResponse(json.description);
        setLoading(false);
      });
    });
  }

  return (
    <div class='player'>
      <div  onClick={getPlayerDescription}>
        <div>Rank: {props.info.rank}</div>
        <div>Name: {props.info.name}</div>
        <div>Hits: {props.info.hits}</div>
        <div>Bats: {props.info.bats}</div>
        <div>Year: {props.info.year}</div>
        <div>{loading ? 'Loading...' : response}</div>
      </div>
      <Link to={`/players/${props.info._id}`}><div><button>Edit</button></div></Link>
    </div>
  );
}

export default PlayerDetail;
