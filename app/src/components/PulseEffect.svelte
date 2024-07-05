<script>
    let checked = true;
</script>

<style>
    main{
        border:1px solid gainsboro;
        border-radius: 8px;
        padding: 10px 20px;
    }
</style>

<main>
    <label>
        <input type="checkbox" bind:checked={checked} />
        Enable/ Disable Pulse Effect
    </label>

    {#if checked}
        <p>
            You will now get Pulse Effect.
        </p>
    {:else}
        <p>
            You will not get Pulse Effect.
        </p>
    {/if}
</main>