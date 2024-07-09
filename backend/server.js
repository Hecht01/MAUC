import dotenv from 'dotenv'
import sqlite3 from 'sqlite3'
import express from 'express'
import cors from 'cors';

//**  init for the env variables +/
dotenv.config({path: '../.env'});

const app = express();
const port = process.env.PORT || 3000;

//** required to send requests to different ports */
app.use(cors())
app.use(express.json())

//** init database connection */
const db = new sqlite3.Database('./Database', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the Database.');
});

//** RESTful PUT endpoint to add data to the Database*/
app.put('/insertPulseData', function (req, res)
{
    console.log("Recieved:" + req.body);
    let temp = req.body;

    let heartRate = temp.heartRate;
    const rawInfrared = temp.rawInfrared;
    const oxygen = temp.oxygen;
    const userName = String(temp.username);

    const query = `
        INSERT INTO pulse_data (timestamp, heartRate, rawInfrared, oxygen, user_name)
        VALUES (time ('now'), $1, $2, $3, $4)
        `
    try {
        db.run(query, [heartRate, rawInfrared, oxygen, userName]);
        console.log(`heartRate: ${heartRate}, rawInfrared: ${rawInfrared}, oxygen: ${oxygen}`);
        res.status(200).json({"dataInserted": [heartRate, rawInfrared, oxygen, userName]});
    } catch (err) {
        console.log("LOG body: " + req.body);
        console.error('Error executing query', err.message);
        res.status(500).send('Internal server error');
    }
})

//** RESTful GET endpoint to retrieve Data from Database by User */
app.get('/getAllPulseDataFor/:userName', async function (req, res) {
    const query = `
        SELECT *
        FROM pulse_data
        WHERE user_name = $1`

    try {
        db.all(query, [String(req.params.userName)], function (err, rows)  {
            res.status(200).json({"data" : rows})
        }
    )
        ;
    } catch (err) {
        console.error('Error executing query', err.message);
        res.status(500).send('Internal server error');
    }
})

//** RESTful GET endpoint to retrieve all Data from Database */
app.get('/getAll', async function (req, res) {
    const query = `
        SELECT *
        FROM pulse_data
        `
    try {
        console.log("Request Working!");
        db.all(query, [], (err,rows) => {
            res.json({
                "message": "success",
                "data" : rows
            }).status(200)
        });
        
    } catch (err) {
        console.error('Error executing query', err.message);
        console.log(err.message);
        res.status(500).send('Internal server error ' + err.error);
    }
})

//** Init Server to receive requests */
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${port}`);
});

//** Defines other Port that is allowed to access server */
app.use(cors({origin: 'http://localhost:5173'}))
