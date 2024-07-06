import {writable } from "svelte/store";


let heartRates = [];

let oxygenData = [];
export const writableHeartRateArray = writable(heartRates)
export const writableOxygenArray = writable(oxygenData)