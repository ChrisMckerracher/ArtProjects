import JukeboxBuffer from "./JukeboxBuffer";

class Jukebox {
    audioContext: AudioContext;
    intro: JukeboxBuffer
    loop: JukeboxBuffer
    loopCount: number;

    offsetTime: number;

    hasIntroPlayed: Boolean
    dontStart: Boolean

    constructor(intro: string, loop: string) {
        this.dontStart = false;
        this.audioContext = new AudioContext();

        this.intro = new JukeboxBuffer(this.audioContext);
        this.loop = new JukeboxBuffer(this.audioContext);

        this.loopCount = 0;
        this.hasIntroPlayed = false;

        this.intro.init(intro);
        this.loop.init(loop);

        this.playLoop = this.playLoop.bind(this);
        this.offsetTime = 0.057;

    }

    async isInited() {
        while (!this.intro.isInited || !this.loop.isInited) {
            await new Promise(r => setTimeout(r, 100));
        }
    }

    async play() {
        await this.isInited();
        if (this.dontStart) {
            return;
        }
        if (!this.hasIntroPlayed) {
            this.intro.play(this.offsetTime, this.playLoop)

        } else {
            this.playLoop();
        }
    }

    async playLoop() {
        this.hasIntroPlayed = true;

        this.loop.play(this.offsetTime, this.playLoop);
    }

    stop() {
        this.intro.stop();
        this.loop.stop();
    }
}

export default Jukebox;