<script lang="ts">
    import heart from "$lib/assets/heart.png"
    import { scale } from "svelte/transition";

    let animate = true;
    let checked = true;

</script>

<style>
    main{
        border:1px solid gainsboro;
        border-radius: 8px;
        padding: 10px 20px;
        margin-bottom: 40px;
    }
    .img_holder{
        display: flex;
        justify-content: center;
    }
    .image{
        width: 140px;
        height: 140px;
    }
</style>

<main>
<div class="pulse_effect">
    <label>
        <input type="checkbox" bind:checked={checked} />
        Enable/ Disable Pulse Effect
    </label>

    {#if checked}
        <div class = "img_holder" in:scale out:scale>
            <div class = "image" id = "image">
                <img src ={heart} alt = "red heart symbol with a blue line that signifies the heartbeat"/>
            </div>
        </div>

    {:else}
        <p>Check to box to reenable the heartbeat.</p>
    {/if}
</div>
</main>