import database from '../database';
const getTenTowns = (req, res) => {
    database
        .query('SELECT * FROM ville LIMIT 10')
        .then((data) => {
        const towns = data[0];
        res.status(200).json(towns);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
};
export { getTenTowns };
