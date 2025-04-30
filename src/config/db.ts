import { Stores } from "./stores";

let db: IDBDatabase; // Base de datos
let request: IDBOpenDBRequest; // Para abrir la base de datos
const version = 1; // Versión de la base de datos
const dbName = "test-conteo"; // Nombre de la base de datos

export const openDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Abrir la base de datos
    request = indexedDB.open(dbName, version);
    // Si la base de datos no existe, se crea
    request.onupgradeneeded = (event) => {
      db = (event.target as IDBOpenDBRequest).result;

      // Si no existe la store, se crea
      if (!db.objectStoreNames.contains(Stores.Product)) {
        db.createObjectStore(Stores.Product, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    }

    // Si la base de datos se abre correctamente
    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(true);
    }
    // Si hay un error al abrir la base de datos
    request.onerror = () => {
      console.error("Error al abrir la base de datos");
      reject(false);
    }
  })
}
