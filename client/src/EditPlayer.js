import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPlayer() {
  const [player, setPlayer] = useState({
    rank: '',
    name: '',
    hits: '',
    bats: '',
    year: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/players/${id}`)
      .then((res) => {
        setPlayer({
          rank: res.data.rank,
          name: res.data.name,
          hits: res.data.hits,
          bats: res.data.bats,
          year: res.data.year,
        });
      })
      .catch((err) => {
        console.log('Error from EditPlayer');
      });
  }, [id]);

  const onChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      rank: player.rank,
      name: player.name,
      hits: player.hits,
      bats: player.bats,
      year: player.year,
    };

    axios
      .put(`http://localhost:8082/api/players/${id}`, data)
      .then((res) => {
        navigate(`/players`);
      })
      .catch((err) => {
        console.log('Error in EditPlayer');
      });
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <br />
            <Link to='/players'>
              Show Player List
            </Link>
          </div>
          <div>
            <h1>Edit Player</h1>
            <p>Update Player Info</p>
          </div>
        </div>

        <div>
          <form noValidate onSubmit={onSubmit}>
            <div>
              <label>Rank</label>
              <input
                type='text'
                name='rank'
                value={player.rank}
                onChange={onChange}
              />
            </div>
            <br />

            <div>
              <label>Name</label>
              <input
                type='text'
                name='name'
                value={player.name}
                onChange={onChange}
              />
            </div>
            <br />

            <div>
              <label>Hits</label>
              <input
                type='text'
                name='hits'
                value={player.hits}
                onChange={onChange}
              />
            </div>
            <br />

            <div>
              <label>Bats</label>
              <textarea
                type='text'
                name='bats'
                value={player.bats}
                onChange={onChange}
              />
            </div>
            <br />

            <div>
              <label>Year</label>
              <input
                type='text'
                name='year'
                value={player.year}
                onChange={onChange}
              />
            </div>
            <br />
            <button
              type='submit'
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPlayer;