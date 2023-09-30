import type JukeboxBuffer from "./JukeboxBuffer";

class JukeboxFileResolver {

    static async resolve(path: string, buffer: JukeboxBuffer): Promise<void> {
        await fetch(path)
            .then(response => response.arrayBuffer())
            .then(data => {
                buffer.audioContext.decodeAudioData(data, decodedBuffer => {
                    // 🤮
                    buffer.buffer.buffer = decodedBuffer;
                    buffer.duration = decodedBuffer.duration
                    buffer.isInited = true;
                });
                return data;
            })
            .then(buffer => JukeboxFileResolver.save(path, buffer));
    }

    static async localStorageOrFetch(path: string): Promise<ArrayBuffer | undefined> {
        let storageString: string | null = localStorage.getItem(path);

        if (storageString) {
            return Object.setPrototypeOf(JSON.parse(storageString), ArrayBuffer.prototype);
        }

        let aBuffer: ArrayBuffer | undefined;
        await fetch(path)
            .then(response => response.arrayBuffer())
            .then(data => aBuffer = data);

        return aBuffer;
    }

    static save(path: string, aBuffer: ArrayBuffer) {
        if (localStorage.getItem(path)) {
            return;
        }
        localStorage.setItem(path, JSON.stringify(aBuffer));
    }

}

export default JukeboxFileResolver;