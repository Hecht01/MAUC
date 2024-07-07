<script>

    //Imports all modules, functions and stores required for the Webapp
    import GraphPulseData from "../components/GraphPulseData.svelte";
    import UserInput from "../components/UserInput.svelte";
    import PulseEffect from "../components/PulseEffect.svelte";
    import {mqtt_innit} from "$lib/mqtt.js";
    import {lastHeartRate} from "$lib/stores";
    import{lastOxygen} from "$lib/stores";
    import {onMount} from "svelte";
    import GraphRawData from "../components/GraphRawData.svelte";

    //Inits MQTT as soon as Webapp is loaded
    onMount(() => {
        mqtt_innit();
    })
</script>

<style>
    main{
        font-family: Arial, Helvetica, sans-serif;
        padding: 10px 20px;
    }
</style>

<main>
    <!-- Loads the components and displays the stores dynamically -->
    <h1>MAUC Pulse Measurement</h1>a
    <p>Heart Rate: {$lastHeartRate}</p>
    <p>Oxygen: {$lastOxygen}</p>
    <GraphPulseData></GraphPulseData>
    <GraphRawData></GraphRawData>
    <PulseEffect></PulseEffect>
    <UserInput></UserInput>
</main>