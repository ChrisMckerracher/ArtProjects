import * as constants from "appConstants/dbconstants.ts";

class IDBStore<T> {
    static dbName = constants.dbName;
    static dbVersion = constants.dbVersion;

    dbStore: string;

    db: IDBDatabase

    constructor(db: IDBDatabase, dbStore: string) {
        this.db = db;
        this.dbStore = dbStore;
    }

    async put(id: string, value: T): Promise<void> {
        let putObject: object & {id: string, value: T} = {
            id: id,
            value: value
        }

        let transaction: IDBTransaction = this.db.transaction(this.dbStore, 'readwrite');
        let objectStore: IDBObjectStore = transaction.objectStore(this.dbStore);
        let req: IDBRequest<IDBValidKey> = objectStore.put(putObject);

        return new Promise((res, rej) => {
            req.onsuccess = () => {
                res();
            }

            req.onerror = (e) => {
                rej((e.target as IDBRequest).error)
            }
        })
    }

    async get(id: string): Promise<T | null> {
        let transaction: IDBTransaction = this.db.transaction(this.dbStore, "readonly");
        let objectStore: IDBObjectStore = transaction.objectStore(this.dbStore);
        let req: IDBRequest<IDBValidKey> = objectStore.get(id);

        return new Promise<T>((res, rej) => {
            req.onsuccess = (e: Event) => {
                let result: object & {id: string, value: T} =  (e.target as IDBRequest).result;
                if (result) {
                    res(result.value)
                }
                res(null);
            }

            req.onerror = (e) => {
                rej((e.target as IDBRequest).error)
            }
        })
    }

    static async openDB(dbStore: string): Promise<IDBDatabase> {
        let req: IDBOpenDBRequest = indexedDB.open(IDBStore.dbName, IDBStore.dbVersion);

        return new Promise((res, rej) => {
            req.onerror = (event: Event): void => {
                rej((event.target as IDBOpenDBRequest).error);
            }

            req.onsuccess = (e: Event): void => {
                res((e.target as IDBOpenDBRequest).result);
            }

            req.onupgradeneeded = (e: Event): void => {
                let db: IDBDatabase = (e.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains(dbStore)) {
                    db.createObjectStore(dbStore, {keyPath: 'id'})
                }
            }
        })
    }

    static async from<T>(dbStore: string): Promise<IDBStore<T>> {
        let db: IDBDatabase = await IDBStore.openDB(dbStore);

        return new IDBStore(db, dbStore);
    }

}

export default IDBStore;