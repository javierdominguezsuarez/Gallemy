import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private files = new BehaviorSubject<string[]>([])
  private storage = getStorage()

  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log("servicio llamado")
    await this.getFiles(path)
    return downloadURL
  }

  async getFiles(path: string): Promise<string[]> {
    const storageRef = ref(this.storage, path)
    const files = await listAll(storageRef)
    const downloadURLs = await Promise.all(
      files.items.map(async (file) => {
        return await getDownloadURL(file)
      })
    )
    this.files.next(downloadURLs)
    return downloadURLs
  }
}
