<script>
    import lamp from "../assets/lamp.svg";
    import {createEventDispatcher} from "svelte";
    import lampSound from "../assets/lampOn.mp3";

    let dispatch = createEventDispatcher();

    let lightOn = true;

    let lampSoundEffect = new Audio(lampSound);


    async function toggleLight() {
        // pls stop the god damn bug its probably a memory leak
        await new Promise(r => setTimeout(r, 100));
        await lampSoundEffect.play();
        lightOn = !lightOn;
        dispatch("clicked", {});
    }


</script>

<style>
    img {
        z-index: 1000;
        width: 30vw;
    }


    .lamp {
        position: absolute;
        bottom: -40vh;
        left: 5vw;
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }


    #light {
        box-sizing: border-box;
        width: calc(32vw + 5px);
        border-left: 2vw solid transparent;
        border-right: 2vw solid transparent;
        border-bottom: 50vh solid #FFFF00;
        min-height: 50vh;
        transform: translate(-15px, 60vh);
        opacity: 0.3;
    }

    @media (orientation: portrait) {
        .lamp {
            bottom: -15vh;
        }

        img {
            width: 50vw;
        }

        #light {
            width: calc(53vw - 3px);
            transform: translate(-3px, 54vh);
        }
    }

    @media (orientation: portrait) and (min-width: 700px) {
        .lamp {
            bottom: -15vh;
        }

        img {
            width: 50vw;
        }

        #light {
            transform: translate(-8px, 54vh);
        }
    }

    @media (orientation: landscape) and (max-width: 1200px) {
        .lamp {
        }

        img {
            width: 30vw;
        }

        #light {
            width: calc(31vw - 3px);
            transform: translate(-1px, 54vh);
        }
    }


</style>


<div class="lamp" on:click={toggleLight}>
    {#if lightOn}
        <div id="light"></div>
    {/if}
    <img src={lamp}/>

</div>