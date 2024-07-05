import dotenv from 'dotenv'
import sqlite3 from 'sqlite3'
import express from 'express'
import cors from 'cors';

dotenv.config({path: '../.env'});

const app = express();
const port = process.env.PORT;
app.use(cors())


const db = new sqlite3.Database('./Database', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.put('/insertPulseData', function (req, res)
{
    const {heartRate, rawInfrared, oxygen, userName} = req.body;
    const query = `
        INSERT INTO pulse_data (timestamp, heartRate, rawInfrared, oxygen, user_name)
        VALUES (time ('now'), $1, $2, $3, $4)`
    try {
        db.run(query, [heartRate, rawInfrared, oxygen, userName]);
        res.status(200).send({heartRate, rawInfrared, oxygen});
    } catch (err) {
        console.error('Error executing query', err.message);
        res.status(500).send('Internal server error');
    }
})

app.get('/getAllPulseDataFor/:userName', async function (req, res) {
    const query = `
        SELECT *
        FROM pulse_data
        WHERE user_name = $5`

    try {

        res.status(200).send(db.all(query, [,String(req.query.userName)], function (err, row)  {
            return `${row}`;
        }));
    } catch (err) {
        console.error('Error executing query', err.message);
        res.status(500).send('Internal server error');
    }
})

app.get('/getAll', async function (req, res) {
    const query = `
        SELECT *
        FROM pulse_data
        `
    try {

        res.status(200).send(db.get(query ,function (err, row)  {
                console.log(row);
                return row;
            }));

    } catch (err) {
        console.error('Error executing query', err.message);
        console.log(err.message);
        res.status(500).send('Internal server error ' + err.error);
    }
})

app.get('/', async function (req, res) {
    res.status(200).send("Geht!");
})

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${port}`);
});
app.use(cors({origin: 'http://localhost:5173'}))