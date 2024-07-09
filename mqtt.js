import mqtt from 'mqtt';
import {writableHeartRateArray} from "$lib/stores.js";
import {writableOxygenArray} from "$lib/stores.js";
import {writableTimestamps} from "$lib/stores.js";
import {lastHeartRate} from "$lib/stores.js";
import {lastOxygen} from "$lib/stores.js";
import {writableRawDataArray} from "$lib/stores.js";
import {animateHeart} from "$lib/stores.js";

const MQTTClient = mqtt.connect('ws://10.10.131.27:1884');
export function mqtt_innit(){
    //** MQTT Connection Configuration +/

    const client = MQTTClient;

    //** subscribes to relevant MQTT topics to receive the Data */
    client.on('connect', () =>  {
        console.log('Connected!');
        client.subscribe('group03/heartRate');
        client.subscribe('group03/oxygen');
        client.subscribe('group03/rawData');
    })

    //** On message all stores are updated and the timestamp is saved to display the data in the graph */
    client.on('message', (topic, message) => {
        if(topic === 'group03/heartRate') {
            addToArray(topic, Number(message));
            addTimestamp(); //so that timestamp only gets set once for the graph
            lastHeartRate.set(Number(message));
        }
        else if (topic === 'group03/oxygen') {
            addToArray(topic, Number(message));
            lastOxygen.set(Number(message));
        }
        else if (topic === 'group03/rawData'){
            addToArray(topic, Number(message));
            animateHeart.update((n) => (!n));
        }
    })

}

/**
 * Enables publishing of messages to config
 * @param {JSON} message
 */
export function changeNodeRed(message) {
    MQTTClient.publish("group03/config", JSON.stringify(message))
}

/**
 * Adds the received data to the arrays/stores
 * @param {string} topic
 * @param {number} message
 */
function addToArray(topic, message){
    if(topic === 'group03/heartRate') {
        writableHeartRateArray.update((items) => {
            // @ts-ignore
            items.push(message);
            return items;
        });
    }
    else if(topic === 'group03/oxygen'){
        writableOxygenArray.update((items) =>{
            // @ts-ignore
            items.push(message);
            return items;
        });
    }
    else if(topic === 'group03/rawData'){
        writableRawDataArray.update((items) =>{
            // @ts-ignore
            items.push(message);
            return items;
        })
    }
}

//** adds the timestamp for displaying the data in the Graph */
function addTimestamp(){
    writableTimestamps.update((items) => {
        let date = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        // @ts-ignore
        items.push(date);
        return items;
    });
}