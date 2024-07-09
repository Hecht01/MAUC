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
    //function to put data into the SQLite Database via JSON
function put(url:string, data:any)
{
    console.log(JSON.parse(data));
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'text/plain'
        },
        body: JSON.parse(data)
    }).then(function(res) {
        return res.json();
    });

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
<Button color="alternative" on:click = {() =>put(url, '{"heartRate":130, "rawInfrared":235, "oxygen":97, "username":' + String(username) +'}')}>Enter</Button>

</main>