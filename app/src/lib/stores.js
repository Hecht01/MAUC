import {writable } from "svelte/store";

/**
 * @type {number[]}
 */
let heartRates = [];
/**
 * @type {number[]}
 */
let oxygenData = [];

export const writableHeartRateArray = writable(heartRates)
export const writableOxygenArray = writable(oxygenData)
