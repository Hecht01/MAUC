import dotenv from 'dotenv'
import sqlite3 from 'sqlite3'
import express from 'express'


dotenv.config({path: '../.env'});

const app = express();
const port = process.env.PORT;

const db = new sqlite3.Database('./database', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.put('/api/insertPulseData', function (req, res)
{
    const {heartRate, rawInfrared, oxygen, userName} = req.body;
    const query = `
        INSERT INTO pulseData (timestamp, heartRate, rawInfrared, oxygen, user_name)
        VALUES (time ('now'), $1, $2, $3, $4)`
    try {
        db.run(query, [heartRate, rawInfrared, oxygen, userName]);
        res.status(200).send({heartRate, rawInfrared, oxygen});
    } catch (err) {
        console.error('Error executing query', err.message);
        res.status(500).send('Internal server error');
    }
})

app.get('api/getAllPulseDataFor/:userName', async function (req, res) {
    const query = `
        SELECT *
        FROM pulseData
        WHERE user_name = $5`

    try {
        const result = await db.each(query, [String(req.query.userName)], (err, row) => {
            res.status(200).send(`${row.timestamp} ${row.heartRate} ${row.rawInfrared} ${row.oxygen}`);
        });

    } catch (err) {
        console.error('Error executing query', err.message);
        res.status(500).send('Internal server error');
    }
})

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${port}`);
});

db.close();
