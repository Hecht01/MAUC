import mqtt from 'mqtt';
import {writableHeartRateArray} from "$lib/stores.js";
import {writableOxygenArray} from "$lib/stores.js";
import {writableTimestamps} from "$lib/stores.js";
import {lastHeartRate} from "$lib/stores.js";
import {lastOxygen} from "$lib/stores.js";
import {writableRawDataArray} from "$lib/stores.js";

export function mqtt_innit(){
    //MQTT Connection Configuration
    const client = mqtt.connect('ws://localhost:9001');

    client.on('connect', () =>  {
        console.log('Connected!');
        client.subscribe('heartRate');
        client.subscribe('oxygen');
        client.subscribe('rawData');
    })

    client.on('message', (topic, message) => {
        if(topic === 'heartRate') {
            addToArray(topic, Number(message));
            addTimestamp(); //so that timestamp only gets set once for the graph
            lastHeartRate.set(Number(message));
        }
        else if (topic === 'oxygen') {
            addToArray(topic, Number(message));
            lastOxygen.set(Number(message));
        }
        else if (topic === 'rawData'){
            addToArray(topic, Number(message));
        }
    })

}

/**
 * @param {string} topic
 * @param {number} message
 */
function addToArray(topic, message){
    if(topic === 'heartRate') {
        writableHeartRateArray.update((items) => {
            // @ts-ignore
            items.push(message);
            return items;
        });
    }
    else if(topic === 'oxygen'){
        writableOxygenArray.update((items) =>{
            // @ts-ignore
            items.push(message);
            return items;
        });
    }
    else if(topic === 'rawData'){
        writableRawDataArray.update((items) =>{
            // @ts-ignore
            items.push(message);
            console.log('hi  I am adding raw data');
            return items;
        })
    }
}

function addTimestamp(){
    writableTimestamps.update((items) => {
        let date = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        // @ts-ignore
        items.push(date);
        return items;
    });
}