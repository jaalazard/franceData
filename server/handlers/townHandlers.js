const database = require('../database');

const getTenTowns = (req, res) => {
  database
    .query('SELECT * FROM ville LIMIT 10')
    .then((data) => {
      const towns = data[0];
      res.status(200).json(towns);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  getTenTowns,
};
