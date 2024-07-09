import {writable } from "svelte/store";

//** Stores used to update the graph live and have a dynamic page with current data */
export const writableHeartRateArray = writable([])
export const writableOxygenArray = writable([])
export const writableTimestamps = writable([])
export const lastHeartRate = writable()
export const lastOxygen = writable()
export const lastRawData = writable()
export const writableRawDataArray = writable([])
export const animateHeart = writable(true)