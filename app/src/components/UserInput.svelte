<script>
    import { Button } from 'flowbite-svelte';
    let username = 'enter username here';
</script>

<style>
    main{
        border: gainsboro solid 1px;
        border-radius: 8px;
        padding: 10px 20px;
    }
    p{

    }
</style>

<main>
    <h4>Enter username to save data for: </h4>
    <input bind:value={username}/>
    <Button color="alternative">Enter</Button>
    <p hidden>saving data for {username}...</p>
</main>