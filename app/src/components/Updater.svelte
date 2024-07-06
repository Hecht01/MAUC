<script>
    import {writableHeartRateArray} from "$lib/stores.js";

    function updateArray() {
        writableHeartRateArray.set([9, 11, 12, 13, 14, 15, 16]);
    }

</script>

<button on:click={updateArray} id="updater">
    reset
</button>