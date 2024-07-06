<script>
    import Graph from "../components/Graph.svelte";
    import UserInput from "../components/UserInput.svelte";
    import PulsEffekt from "../components/PulseEffect.svelte";
    import  MqttClient  from "$lib/mqtt";
    import {writableHeartRateArray} from "$lib/stores";
    import {writableOxygenArray} from "$lib/stores";
    import Updater from "../components/Updater.svelte";

    $: heartRates = $writableHeartRateArray;
    $: oxygenData = $writableOxygenArray;

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
    <Graph></Graph>
    <PulsEffekt></PulsEffekt>
    <h2>Messages</h2>
    <p>This is the Heart Rate Array I guess {$writableHeartRateArray}</p>
    <p>This is the Oxygen Array I guess {$writableOxygenArray}</p>
    <Updater></Updater>
</main>