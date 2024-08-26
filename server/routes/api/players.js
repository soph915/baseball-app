const OpenAIApi = require('openai');
const openai = new OpenAIApi.OpenAI({ apiKey: REACT_APP_OPENAI_API_KEY });

const express = require('express');
const router = express.Router();

const Player = require('../../models/Player');

// @route   GET api/players/test
// @desc    Tests players route
router.get('/test', (req, res) => res.send('player route testing!'));

// @route   GET api/players
// @desc    Get all players
router.get('/', (req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(404).json({ noplayerfound: 'No Players found' }));
});

// @route   GET api/players/:id
// @desc    Get single player by id
router.get('/:id', (req, res) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(404).json({ noplayerfound: 'No Player found' }));
});

// @route   POST api/players
// @desc    Add/save player
router.post('/', (req, res) => {
  Player.create(req.body)
    .then(player => res.json({ msg: 'Player added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this player' }));
});

// @route   PUT api/players/:id
// @desc    Update player by id
router.put('/:id', (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body)
    .then(player => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   POST api/player/generate-description
// @desc    gets description for player
router.post('/generate-description', async (req, res) => {
  try {
    const { name } = req.body;

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Generate a brief description for ${name}` }],
      model: "gpt-4o-mini",
  });

    const description = response.choices[0].message.content;
    res.json({ description });
  } catch (error) {
    res.status(500).json({ message: 'Error generating description', error });
  }
});


module.exports = router;