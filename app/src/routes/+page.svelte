<script>
    import GraphPulseData from "../components/GraphPuseData.svelte";
    import UserInput from "../components/UserInput.svelte";
    import PulsEffekt from "../components/PulseEffect.svelte";
    import {mqtt_innit} from "$lib/mqtt.js";
    import {lastHeartRate} from "$lib/stores";
    import{lastOxygen} from "$lib/stores";
    import {onMount} from "svelte";
    import GraphRawData from "../components/GraphRawData.svelte";

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
    <h1>MAUC Pulse Measurement</h1>
    <p>Heart Rate: {$lastHeartRate}</p>
    <p>Oxygen: {$lastOxygen}</p>
    <GraphPulseData></GraphPulseData>
    <GraphRawData></GraphRawData>
    <PulsEffekt></PulsEffekt>
    <UserInput></UserInput>
</main>