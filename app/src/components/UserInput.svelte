<script>
    let username = 'default';
</script>

<style>
    main{
        border: gainsboro solid 1px;
        border-radius: 8px;
        margin: 20px;
    }

</style>

<main>
   <input bind:value={username} />
    <p>saving data for {username}</p>
</main>