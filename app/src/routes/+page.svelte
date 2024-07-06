<script lang="ts">
    import Graph from "../components/Graph.svelte";
    import UserInput from "../components/UserInput.svelte";
    import PulsEffekt from "../components/PulseEffect.svelte";
    import  MqttClient  from "$lib/mqtt";
    import {writableHeartRateArray} from "$lib/stores";
    import {writableOxygenArray} from "$lib/stores";

    let heartRates;
    let oxygenData;

    writableHeartRateArray.subscribe((value) => {
        heartRates = value;
    });

</script>

<style>
    main{
        font-family: Arial, Helvetica, sans-serif;
        padding: 10px 20px;
    }
</style>

<main>
    <h1>MAUC Pulse Shit</h1>
    <UserInput></UserInput>
    <!--<Graph></Graph>-->
    <PulsEffekt></PulsEffekt>
    <h2>Messages</h2>
    <p>This is the Array I guess {heartRates}</p>
    <div>
        {#each $writableHeartRateArray as heartRate}
            <p>Heart Rate: {heartRate}</p>
        {/each}
        {#each $writableOxygenArray as oxygen}
            <p> Oxygen: {oxygen}</p>
        {/each}
    </div>
</main>