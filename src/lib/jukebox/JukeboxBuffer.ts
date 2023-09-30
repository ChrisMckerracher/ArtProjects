import {sleep} from "utils/util.ts";
import JukeboxFileResolver from "./JukeboxFileResolution";

class JukeboxBuffer {

    audioContext: AudioContext;
    buffer: AudioBufferSourceNode;

    isInited: boolean;
    duration: number;
    isPlaying: boolean;

    callback: (() => void)

    constructor(audioContext: AudioContext) {
        this.audioContext = audioContext;
        this.buffer = audioContext.createBufferSource();
        this.isInited = false;
        this.duration = -1;
        this.isPlaying = false;

        this.callback = () => null;

        this.next = this.next.bind(this);
    }


    async init(path: string) {
        await JukeboxFileResolver.resolve(path, this);
        this.buffer.connect(this.audioContext.destination);
    }

    async play(offset: number, callback: () => void) {
        this.callback = callback;

        this.isPlaying = true;

        this.buffer.start(this.audioContext.currentTime);
        this.buffer.stop(this.audioContext.currentTime + this.duration - offset);

        this.buffer.addEventListener('ended', this.next)
        await sleep(this.duration - offset);
    }

    async next() {
        this.buffer.removeEventListener('ended', this.next);
        this.isPlaying = false;
        this.reInitBuffer();
        this.callback();
    }

    async stop() {
        this.buffer.removeEventListener('ended', this.next);
        if (this.isPlaying) {
            this.isPlaying = false;
            this.buffer.stop();
            this.reInitBuffer();
        } else {
            this.isPlaying = false;
            this.reInitBuffer();
        }
    }

    reInitBuffer(): void {
        let tmpBuffer = this.buffer.buffer
        this.buffer = this.audioContext.createBufferSource();
        this.buffer.buffer = tmpBuffer;
        this.buffer.connect(this.audioContext.destination);
    }

}

export default JukeboxBuffer;