<script lang="ts">
    import Background from "./Background.svelte";
    import Lamp from "./Lamp.svelte";

    let showBackground = false;

    function toggleBackground() {
        showBackground = !showBackground;

        if (!showBackground) {
            // reset the background
            document.documentElement.style
                .setProperty("--triangle-color", "#000000");

        }
    }
</script>

<style>

</style>


{#if showBackground}
    <Background></Background>
{/if}
<Lamp on:clicked={toggleBackground}></Lamp>


