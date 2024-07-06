//Grober mqtt Aufbau mit Hilfe von ChatGPT, dann erweitert von Hand
import mqtt from 'mqtt';
import {writableHeartRateArray} from "$lib/stores.js";
import {writableOxygenArray} from "$lib/stores.js";

//MQTT Connection Configuration
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () =>  {
    console.log('Connected!');
    client.subscribe('heartRate');
    client.subscribe('oxygen');
})

/**
 * @type {number[]}
 */
let heartRates = [];
/**
 * @type {number[]}
 */
let oxygenData = [];

client.on('message', (topic, message) => {
    console.log(`Message received on topic ${topic}: ${Number(message)}`);
    if(topic === 'heartRate') {
        heartRates.push(Number(message));
        console.log('heart rates:', heartRates);
        addToArray(topic, Number(message));
    }
    else if (topic === 'oxygen') {
        oxygenData.push(Number(message));
        console.log('oxygen data', oxygenData);
        addToArray(topic, Number(message));
    }
})

/**
 * @param {string} topic
 * @param {number} message
 */
function addToArray(topic, message){
    console.log('adding to array, I think');
    if(topic === 'heartRate') {
        console.log("topic", topic);
        writableHeartRateArray.set(heartRates);
    }
    else if(topic === 'oxygen'){
        console.log("topic", topic);
        writableOxygenArray.set(oxygenData);
    }
}

export default client;