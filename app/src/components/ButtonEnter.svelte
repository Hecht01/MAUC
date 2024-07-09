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

let textOrChart = { "group": {
        "show": "Dashboard_Text",
        "hide": "Dashboard_Charts",
    }
}
    class EasyHTTP {

        // Make an HTTP PUT Request
        async put(url, data) {

            // Awaiting fetch which contains method,
            // headers and content-type and body
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Awaiting response.json()
            const resData = await response.json();

            // Return response data
            return resData;
        }
    }

    const http = new EasyHTTP;

//function to put data into the SQLite Database via JSON
async function  put(data:any) {
    http.put(url, JSON.stringify(data))
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

    function toggleNodeRed(){
    if(textOrChart.group.show === "Dashboard_Text"){
        textOrChart = { "group": {
                "show": "Dashboard_Charts",
                "hide": "Dashboard_Text",
            }
        };
    } else{
        textOrChart = { "group": {
                "show": "Dashboard_Text",
                "hide": "Dashboard_Charts",
            }
        };
    }
    changeNodeRed(textOrChart);
}

</script>

<main>
<h2>{username}</h2>
<Button color="alternative" on:click = {() => toggleNodeRed()}>toggle Node-Red</Button>
<Button color="alternative" on:click = {() =>put({heartRate:130, rawInfrared:235, oxygen:97, username: String(username) })}>Enter</Button>

</main>