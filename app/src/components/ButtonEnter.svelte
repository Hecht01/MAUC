<script lang="ts">
    import {Button} from "flowbite-svelte";
    import {changeNodeRed} from "$lib/mqtt";

    export let username:string;

const test_data = {
    heartRate: '123',
    rawInfrared: '1235',
    oxygen: '99',
    username: 'Andy'
}

// defines the URl for the put Endpoint
const url:string = "http://localhost:3000/insertPulseData"
let textOrChart = "text"
    //function to put data into the SQLite Database via JSON
async function put(url:string, data:any)
{
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

function toggleNodeRed(){
    if(textOrChart == "text"){
        textOrChart = "chart";
    } else{
        textOrChart = "text";
    }
    changeNodeRed(textOrChart);
}

</script>

<main>
<h2>{username}</h2>
<Button color="alternative" on:click = {() => toggleNodeRed()}>toggle Node-Red</Button>
<Button color="alternative" on:click = {() =>put(url, '{"heartRate": 130,"rawInfrared": 235,"oxygen": 97,"username": username}')}>Enter</Button>

</main>