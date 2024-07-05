<script lang="ts">
import {Button} from "flowbite-svelte";

export let username:string;

async function put(data: {
    heartRate: string,
    rawInfrared: string,
    oxygen: string,
    username: string
}) {
    let url = "http://localhost:3000/insertPulseData";
    // Awaiting fetch which contains method,
    // headers and content-type and body
    const response = fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    console.log("Response: ", response )

    // Awaiting response.json()
    //const resData = await response.json();

    // Return response data
    //return resData;
}

</script>

<Button color="alternative" on:click = {() => put({'heartRate': '130', 'rawInfrared': '235', 'oxygen': '97', 'username': username})}>Enter</Button>