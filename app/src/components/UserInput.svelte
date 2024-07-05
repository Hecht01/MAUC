<script lang="ts">
    import { Button } from 'flowbite-svelte';
    let username: string = '';

    async function put(url: string, data: {
        heartRate: number,
        rawInfrared: number,
        oxygen: number,
        username: string
    }) {
        // Awaiting fetch which contains method,
        // headers and content-type and body
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        // Awaiting response.json()
        const resData = await response.json();

        //show saving in progress message
        hideOrShowElement()

        // Return response data
        return resData;
    }

    let users: User[] = [];

    interface User {
        heartRate: string;
        oxygen: string;
        rawInfrared: string;
        timestamp: string;
        username: string;
    }

    async function updateTable(url: string){
        const response = await fetch(url)
        const data = await response.json();
        console.log(data);
        users = data;
    }

    function hideOrShowElement(){
        let x = document.getElementById("savingInProgress");
        if(x.style.display === "none"){
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
</script>

<style>
    main{
        border: gainsboro solid 1px;
        border-radius: 8px;
        padding: 10px 20px;
    }
    p{
        color: grey;
        display: block;
    }
</style>

<main>
    <h4>Enter username to save data for: </h4>
    <input maxlength="20" bind:value={username}/>
    <Button color="alternative" on:click = {() => put("localhost:3000/api/insertPulseData", {'heartRate': 130, 'rawInfrared': 235, 'oxygen': 97, 'username': username})}>Enter</Button>
    <p id = "savingInProgress">saving data for {username}...</p>

    <Button color="alternative" on:click = {() => updateTable('localhost:3000/api/getAllPulseDataFor/' + {username})}>Update</Button>
    <table>
        <thead>
        <tr>
            <th>username</th>
            <th>timestamp</th>
            <th>heartrate</th>
            <th>oxygen</th>
            <th>raw data</th>
        </tr>
        </thead>
        <tbody>
        {#each users as user}
            <tr>
                <td>{username}</td>
                <td>{user.timestamp}</td>
                <td>{user.heartRate}</td>
                <td>{user.oxygen}</td>
                <td>{user.rawInfrared}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</main>