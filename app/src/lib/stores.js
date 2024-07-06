import {writable } from "svelte/store";

export const writableHeartRateArray = writable([])
export const writableOxygenArray = writable([])
export const writableTimestamps = writable([])
export const lastHeartRate = writable()
export const lastOxygen = writable()
export const writableRawDataArray = writable([])