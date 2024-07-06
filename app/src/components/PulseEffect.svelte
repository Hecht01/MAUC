<script lang="ts">
    import heart from "$lib/assets/heart.png"
    import {spring} from "svelte/motion";
    import type {Action} from "svelte/action";

    let animate = true;
    let checked = true;
    type SpringInParams = {
        scale: number
        rotate: number
    }

    type SpringInAction = Action<HTMLElement, SpringInParams>

    const springIn: SpringInAction = (node, params) => {
        if (!params){
            return
        }
        const {scale, rotate} = params;
        const value = {rotate: 0, scale: 1};
        const options = {stiffness: 0.1, damping: 0.6};

        let transition = spring(value, options);

        const unsubscribe = transition.subscribe(
            ({rotate, scale}) => {
                node.style.transform = `scale(${scale}) rotate(${rotate}deg)`
            }
        )

        transition.set(({scale, rotate}))
        return{
            destroy: () => unsubscribe()
        }
    }
</script>

{#if animate}
    <div
    class = "image"
    use:springIn={{scale:2, rotate: 90}}
    />
{/if}

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
        background-color: aqua;
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
        <div class = "img_holder">
            <label>
                <input type="checkbox" bind:checked={animate}/>
                Enable/ Disable Beat Animation
            </label>

            <div class = "image" id = "image">
                <img src ={heart} alt = "red heart symbol with a blue line that signifies the heartbeat"/>
            </div>
        </div>
    {:else}
        <p>Check to box to reenable the heartbeat.</p>
    {/if}
</div>
</main>