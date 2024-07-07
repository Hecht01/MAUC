<script lang="ts">
    import heart from "$lib/assets/heart.png"
    import { scale, fade } from "svelte/transition";
    import {animateHeart} from "$lib/stores";

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
        height: fit-content;
        width: auto;
    }
    .save_space{
        height: 228px;
    }
</style>

<main>
    <div class="pulse_effect">
        <label>
            <input type="checkbox" bind:checked={checked} />
            Enable/ Disable Pulse Effect
        </label>

        {#if checked}
            <div class = "save_space">
            
            {#if $animateHeart === true}
                <div class = "img_holder" in:scale out:scale>
                    <div class = "image" id = "image">
                        <img src ={heart} alt = "red heart symbol with a blue line that signifies the heartbeat"/>
                    </div>
                </div>
            {/if}
            </div>
        {:else}
            <div class = "img_holder" in:fade>
                <div class = "image_placeholder" id = "image_placeholder">
                    <img src ={heart} alt = "red heart symbol with a blue line that signifies the heartbeat"/>
                </div>
            </div>
        {/if}
    </div>
</main>