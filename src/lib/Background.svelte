<script lang="ts">
    import Property from "./Property.js";
    import {onMount} from "svelte";

    let properties: Array<Property> = [
        new Property("--triangle-length", 80, 150, "vh"),
        new Property("--triangle-width", 10, 30, "vw"),
        new Property("--triangle-color", 0, 16777215, "#"),
        new Property("--odd-triangle-color", 0, 16777215, "#"),
        new Property("--swirlie-thickness", 1, 20, "vw"),
        new Property("--swirlie-blend", 0, 100, "px"),
        new Property("--swirlie-length", 1, 10, "px"),
        new Property("--swirlie-offset", -20, 20, "px"),
        new Property("--swirlie-color", 0, 16777215, "#"),
        new Property("--swirlie-center", 15, 35, "vw"),
        new Property("--swirlies-shadow-height", 80, 120, "%"),
        new Property("--swirlies-shadow-width", 90, 120, "%"),

        new Property("--odd-color", 0, 16777215, "#"),
        new Property("--odd-swirlie-thickness", 1, 20, "vw"),
        new Property("--odd-swirlie-blend", 0, 100, "px"),
        new Property("--odd-swirlie-length", 1, 10, "px"),
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
    <span style="--i:0;"></span>
    <span style="--i:1;"></span>

    <span style="--i:2;"></span>

    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
</div>

<div class="swirlie-base swirlie">
    <span style="--i:0;"></span>
    <span style="--i:1;"></span>

    <span style="--i:2;"></span>

    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
</div>

<div class="swirlie-base swirlie-pills">
    <span style="--i:0;"></span>
    <span style="--i:1;"></span>

    <span style="--i:2;"></span>

    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
</div>