import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

export async function openDb () {
    return open({
        filename: '/database.db',
        driver: sqlite3.Database
    });
}
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the products database.');
});

app.use(express.json());

app.put('/api/insertPulseData/:heartRate/:rawInfrared/:oxygen', async (req, res) => {
    const { heartRate, rawInfrared,oxygen } = req.body;
    const query = `
    INSERT INTO pulseData (
         timeStamp, heartRate, rawInfrared,oxygen
    )
    VALUES (time('now'), $1, $2, $3)`
    try {
        db.run(query, [heartRate, rawInfrared, oxygen]);
        res.status(200).send({ heartRate, rawInfrared,oxygen });
    } catch (err) {
        console.error('Error executing query', err.message);
        res.status(500).send('Internal server error');
    }
})

app.listen(port, () => console.log(`Server started on port ${port}`));
