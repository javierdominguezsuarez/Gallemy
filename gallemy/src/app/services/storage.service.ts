import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
  export class StorageService {

    private storage = getStorage();

    async uploadFile(file: File, path: string): Promise<string> {
      const storageRef = ref(this.storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }
  
    async getFiles(path: string): Promise<string[]> {
      const storageRef = ref(this.storage, path);
      const files = await listAll(storageRef);
      const downloadURLs = await Promise.all(files.items.map(async (file) => {
        return await getDownloadURL(file);
      }));
      return downloadURLs;
    }
  }
  
