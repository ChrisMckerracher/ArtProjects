import type JukeboxBuffer from "./JukeboxBuffer";

class JukeboxFileResolver {

    static async resolve(path: string, buffer: JukeboxBuffer): Promise<void> {
        await JukeboxFileResolver.localStorageOrFetch(path)
            .then(abuffer => buffer.audioContext.decodeAudioData(abuffer, decodedBuffer => {
                    // 🤮
                    buffer.buffer.buffer = decodedBuffer;
                    buffer.duration = decodedBuffer.duration
                    buffer.isInited = true;
                })
            )
            .then(abuffer => JukeboxFileResolver.save(path, abuffer));
    }

    static async localStorageOrFetch(path: string): Promise<ArrayBuffer | undefined> {
        let storageString: string | null = localStorage.getItem(path);

        if (storageString && storageString != "{}") {
            console.log(new Uint8Array(JSON.parse(storageString)).buffer);
            return new Uint8Array(JSON.parse(storageString)).buffer; //Object.setPrototypeOf(JSON.parse(storageString), ArrayBuffer.prototype);
        }

        let aBuffer: ArrayBuffer | undefined;
        await fetch(path)
            .then(response => response.arrayBuffer())
            .then(data => aBuffer = data);

        return aBuffer;
    }

    static save(path: string, aBuffer: ArrayBuffer) {
        let lStorageBuffer: string | null = localStorage.getItem(path)
        if (!lStorageBuffer || lStorageBuffer != "{}") {
            return;
        }

        localStorage.setItem(path, JSON.stringify(Array.from(new Uint8Array(aBuffer))));
    }

}

export default JukeboxFileResolver;