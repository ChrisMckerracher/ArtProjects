<script lang="ts">
    import Property from "./Property.js";
    import {onDestroy, onMount} from "svelte";
    import thisMustStart from "../assets/thisloop/intro.mp3";
    import thisMustLoop from "../assets/thisloop/main.mp3";
    import thisMustCool from "../assets/thisloop/coolbit.mp3"
    import Jukebox from "./Jukebox";

    let jukeBox: Jukebox | undefined;

    onMount(async () => {
        jukeBox = new Jukebox(thisMustStart, thisMustLoop, thisMustCool);
        jukeBox.play();
    });

    onDestroy(async () => {
        (jukeBox as Jukebox).stop();
    })

    let properties: Array<Property> = [
        new Property("--triangle-length", 80, 150, "vh"),
        new Property("--triangle-width", 10, 30, "vw"),
        new Property("--triangle-color", 0, 16777215, "#"),
        new Property("--odd-triangle-color", 0, 16777215, "#"),
        new Property("--swirlie-thickness", 1, 15, "vw"),
        new Property("--swirlie-blend", 0, 100, "px"),
        new Property("--swirlie-length", 10, 10, "px"),
        new Property("--swirlie-offset", -20, 20, "px"),
        new Property("--swirlie-color", 0, 16777215, "#"),
        new Property("--swirlie-center", 15, 35, "vw"),
        new Property("--swirlies-shadow-height", 80, 120, "%"),
        new Property("--swirlies-shadow-width", 90, 120, "%"),

        new Property("--odd-color", 0, 16777215, "#"),
        new Property("--odd-swirlie-thickness", 1, 15, "vw"),
        new Property("--odd-swirlie-blend", 0, 100, "px"),
        new Property("--odd-swirlie-length", 10, 10, "px"),
        new Property("--odd-swirlie-offset", -20, 20, "px"),
        new Property("--odd-swirlie-color", 0, 16777215, "#"),

        new Property("--pills-border-size", 1, 10, "px"),
        new Property("--pills-height", 20, 110, "vh"),
        new Property("--pills-width", 10, 120, "vw"),


        new Property("--swirlies-animation-speed", 5, 20, "s"),
        new Property("--triangles-animation-speed", 5, 15, "s"),
        new Property("--swirlies-animation-direction", 1, 11, "direction"),
        new Property("--triangles-animation-direction", 1, 7, "direction")
    ]

    onMount(async () => {
        setProperties();
    })


    async function setProperties() {
        properties.forEach(x => {
                document.documentElement.style
                    .setProperty(x.name, x.value);
            }
        )
    }
</script>
<div class="swirlie-base swirlie-triangles">
    {#each Array(12) as _, i}
        <span style="--i:{i};"></span>
    {/each}
</div>

<div class="swirlie-base swirlie">
    {#each Array(12) as _, i}
        <span style="--i:{i};"></span>
    {/each}
</div>

<div class="swirlie-base swirlie-pills">
    {#each Array(12) as _, i}
        <span style="--i:{i};"></span>
    {/each}
</div>

<audio id="intro">
    <source src={thisMustStart} type="audio/mp3">
</audio>
<audio src={thisMustLoop} id="loop">
    <source src={thisMustLoop} type="audio/mp3">
</audio>

<audio src={thisMustCool} id="cool">
    <source src={thisMustCool} type="audio/mp3">
</audio>
