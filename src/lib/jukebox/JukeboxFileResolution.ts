import type JukeboxBuffer from "./JukeboxBuffer";
import {lJStoreName} from 'appConstants/dbconstants.ts';
import IDBStore from "db/IDBStore";

class JukeboxFileResolver {

    static jukeBoxStore: IDBStore<Blob> = null;//

    static {
        IDBStore.from<ArrayBuffer>(lJStoreName)
            .then(r => JukeboxFileResolver.jukeBoxStore = r);
    }

    static async resolve(path: string, buffer: JukeboxBuffer): Promise<void> {
        await JukeboxFileResolver.dbFetch(path)
            .then(abuffer => buffer.audioContext.decodeAudioData(abuffer, decodedBuffer => {
                    // 🤮
                    buffer.buffer.buffer = decodedBuffer;
                    buffer.duration = decodedBuffer.duration
                    buffer.isInited = true;
                })
            )
    }

    static async dbFetch(path: string): Promise<ArrayBuffer | null> {
        let blob: Blob | null = await JukeboxFileResolver.jukeBoxStore.get(path);

        if (blob) {
            return await JukeboxFileResolver.fromBlob(blob);
        }

        let blobPromise: Promise<Blob> | null = null;
        let aBuffer: ArrayBuffer | null = null;

        await fetch(path)
            .then(response => {
                return response;
            })
            .then(response => {
                blobPromise = response.blob()
                return blobPromise
            });

        blob = await blobPromise
        JukeboxFileResolver.save(path, blob);

        aBuffer = await JukeboxFileResolver.fromBlob(blob);

        return aBuffer;
    }

    static async save(path: string, blob: Blob) {
        await JukeboxFileResolver.jukeBoxStore.put(path, blob);
    }

    static async fromBlob(blob: Blob): Promise<ArrayBuffer> {
        return new Promise((res, rej) => {
            let reader: FileReader = new FileReader();

            reader.onload = () => {
                res(reader.result)
            }

            reader.onerror = (e: ProgressEvent<FileReader>) => {
                rej(e.target.error)
            }
            reader.readAsArrayBuffer(blob);
        })
    }
}

export default JukeboxFileResolver;