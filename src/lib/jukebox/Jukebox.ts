import JukeboxBuffer from "./JukeboxBuffer";

class Jukebox {
    audioContext: AudioContext;
    intro: JukeboxBuffer
    loop: JukeboxBuffer
    coolBit: JukeboxBuffer
    loopCount: number;

    offsetTime: number;

    hasIntroPlayed: Boolean
    dontStart: Boolean

    constructor(intro: string, loop: string, coolBit: string) {
        this.dontStart = false;
        this.audioContext = new AudioContext();

        this.intro = new JukeboxBuffer(this.audioContext);
        this.loop = new JukeboxBuffer(this.audioContext);
        this.coolBit = new JukeboxBuffer(this.audioContext);

        this.loopCount = 0;
        this.hasIntroPlayed = false;

        this.intro.init(intro);
        this.loop.init(loop);
        this.coolBit.init(coolBit);


        this.playLoop = this.playLoop.bind(this);
        this.loopMain = this.loopMain.bind(this);
        this.offsetTime = 0.06;

    }

    async isInited() {
        while (!this.intro.isInited || !this.loop.isInited || !this.coolBit.isInited) {
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
        this.loopCount = Math.floor(Math.random() * 3);
        this.loopCount *= 4;
        this.loopMain();
    }

    async loopMain() {
        if (this.loopCount > 0) {
            this.loopCount--;
            this.loop.play(this.offsetTime, this.loopMain);
        } else {
            this.coolBit.play(this.offsetTime, this.playLoop)
        }
    }

    stop() {
        this.intro.stop();
        this.loop.stop();
        this.coolBit.stop();
    }
}

export default Jukebox;