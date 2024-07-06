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
 * @type {string[]}
 */
let heartRates = [];
/**
 * @type {string[]}
 */
let oxygenData = [];

client.on('message', (topic, message) => {
    console.log(`Message received on topic ${topic}: ${message.toString()}`);
    if(topic === 'heartRate') {
        heartRates.push(message.toString());
        console.log('heart rates:', heartRates);
        addToArray(topic, message.toString());
    }
    else if (topic === 'oxygen') {
        oxygenData.push(message.toString());
        console.log('oxygen data', oxygenData);
        addToArray(topic, message.toString());
    }
})

/**
 * @param {string} topic
 * @param {string} message
 */
function addToArray(topic, message){
    console.log('adding to array, I think');
    if(topic === 'heartRate') {
        writableHeartRateArray.update(([]) => heartRates);
    }
    else if(topic === 'oxygen'){
        writableOxygenArray.update(([]) => oxygenData);
    }
}

export default client;