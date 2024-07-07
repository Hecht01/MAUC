<script lang="ts">
    import {Button} from "flowbite-svelte";

    export let username:string;

const test_data = {
    heartRate: '123',
    rawInfrared: '1235',
    oxygen: '99',
    username: 'Andy'
}

// defines the URl for the put Endpoint
const url:string = "http://localhost:3000/insertPulseData"

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
    return await response.json();
}


</script>

<h2>{username}</h2>

<Button color="alternative" on:click = {() => put(url, {heartRate: '130', rawInfrared: '235', oxygen: '97', username: username}).then(data => console.log(data))}>Enter</Button>