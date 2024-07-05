<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import ButtonEnter from "./ButtonEnter.svelte";
    let username: string = '';

    let users: User[] = [];

    interface User {
        timestamp: string;
        heartRate: string;
        oxygen: string;
        rawInfrared: string;
        username: string;
    }

    async function updateTable(url: string){
        const response = await fetch(url)
        const data = await response.json();
        console.log(data);
        users = data;
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
    <ButtonEnter bind:username></ButtonEnter>
    <p id = "savingInProgress">saving data for {username}...</p>

    <Button color="alternative" on:click = {() => updateTable('http://localhost:3000/getAllPulseDataFor/' + {username})}>Update</Button>
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