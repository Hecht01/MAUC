import {writable } from "svelte/store";

/**
 * @type {number[]}
 */
let heartRates = [];
/**
 * @type {number[]}
 */
let oxygenData = [];

export const writableHeartRateArray = writable([])
export const writableOxygenArray = writable([])
