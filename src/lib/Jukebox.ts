class Jukebox {
    audioContext: AudioContext;
    intro: AudioBufferSourceNode
    loop: AudioBufferSourceNode
    coolBit: AudioBufferSourceNode
    loopCount: number;

    introDuration: number;
    loopDuration: number;
    coolBitDuration: number;

    offsetTime: number;

    hasIntroPlayed: Boolean

    loopPlaying: Boolean
    coolPlaying: Boolean

    constructor(intro: string, loop: string, coolBit: string) {
        this.audioContext = new AudioContext();
        this.intro = this.audioContext.createBufferSource();
        this.loop = this.audioContext.createBufferSource();
        this.coolBit = this.audioContext.createBufferSource();

        this.loopCount = 0;
        this.hasIntroPlayed = false;

        this.introDuration = -1;
        this.loopDuration = -1;
        this.coolBitDuration = -1;

        this.initAudio(intro, this.intro)
            .then(result => this.introDuration = result);
        this.initAudio(loop, this.loop)
            .then(result => this.loopDuration = result)
            .then(() => console.log(this.introDuration))
        this.initAudio(coolBit, this.coolBit)
            .then(result => this.coolBitDuration = result);

        this.intro.connect(this.audioContext.destination);
        this.loop.connect(this.audioContext.destination);
        this.coolBit.connect(this.audioContext.destination);

        this.playLoop = this.playLoop.bind(this);
        this.loopMain = this.loopMain.bind(this);
        this.handleCool = this.handleCool.bind(this);
        this.offsetTime = 0.06;

        this.loopPlaying = false;
        this.coolPlaying = false;
    }

    async isInited() {
        console.log(this.coolBitDuration);
        while (this.coolBitDuration < 0 || this.introDuration < 0 || this.loopDuration < 0) {
            await new Promise(r => setTimeout(r, 100));
        }
        console.log('sup?')
    }

    async play() {
        await this.isInited();
        if (!this.hasIntroPlayed) {
            this.intro.addEventListener('ended', this.playLoop)
            this.intro.start(this.audioContext.currentTime);
            this.intro.stop(this.audioContext.currentTime + this.introDuration - this.offsetTime);
        }
    }

    async initAudio(audioSource: string, srcNode: AudioBufferSourceNode) {
        let duration: number = 0;
        await fetch(audioSource)
            .then(response => response.arrayBuffer())
            .then(data => {
                return this.audioContext.decodeAudioData(data, decodedBuffer => {
                    srcNode.buffer = decodedBuffer;
                    duration = decodedBuffer.duration
                });
            })
        return duration
    }

    async playLoop() {
        this.hasIntroPlayed = true;
        this.loopCount = Math.floor(Math.random() * 3);
        this.loopCount *= 4;
        this.loop.addEventListener('ended', this.loopMain)
        this.loopMain();
    }

    async loopMain() {
        if (this.loopCount > 0) {
            if (this.loopPlaying) {
                this.loopPlaying = false;

                this.loop.stop(0);
                this.loop.removeEventListener('ended', this.loopMain)

                let tmpBuffer = this.loop.buffer;
                this.loop = this.audioContext.createBufferSource();
                this.loop.buffer = tmpBuffer;
                this.loop.connect(this.audioContext.destination);
                this.loop.addEventListener('ended', this.loopMain);
            }

            this.loopCount--;
            this.loopPlaying = true;
            this.loop.start(this.audioContext.currentTime);
            this.loop.stop(this.audioContext.currentTime + this.loopDuration - this.offsetTime);
        } else {
            this.loop.removeEventListener('ended', this.loopMain);
            this.coolBit.addEventListener('ended', this.handleCool);
            this.coolPlaying = true;
            this.coolBit.start(this.audioContext.currentTime);
            this.coolBit.stop(this.audioContext.currentTime + this.coolBitDuration - this.offsetTime);
        }
    }

    async handleCool() {
        if (this.coolPlaying) {
            this.coolBit.stop();
            this.coolBit.removeEventListener('ended', this.handleCool);
            let tmpBuffer = this.coolBit.buffer
            this.coolBit = this.audioContext.createBufferSource();
            this.coolBit.buffer = tmpBuffer;
            this.coolBit.connect(this.audioContext.destination);
        }


        this.loopMain();
    }

    stop() {
        if (!this.hasIntroPlayed) {
            this.intro.stop();
            this.intro.removeEventListener('ended', this.playLoop);
        }
        if (this.loopPlaying) {
            console.log("?")
            this.loop.stop();
            this.loop.removeEventListener('ended', this.loopMain);
        }
        if (this.coolPlaying) {
            this.coolBit.stop();
            this.coolBit.removeEventListener('ended', this.handleCool);
        }

        this.intro.removeEventListener('ended', this.loopMain);
        this.loop.removeEventListener('ended', this.loopMain)
        this.coolBit.removeEventListener('ended', this.handleCool);
    }
}

export default Jukebox;