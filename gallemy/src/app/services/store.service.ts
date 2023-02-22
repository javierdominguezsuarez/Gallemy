import { Injectable } from '@angular/core';
import { Firestore,  collection } from '@angular/fire/firestore';
import { addDoc, getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { PicInfo } from '../picInfo';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  collectionRef = collection(this.afs, "images")
  constructor(private afs:Firestore) {}
  add(pic:PicInfo){
    addDoc(this.collectionRef,pic).then(docref =>{
      console.log(docref)
    })
  }
  async getAll(): Promise<PicInfo[]> {
    const snapshot: QuerySnapshot = await getDocs(query(this.collectionRef));
    const picInfoList: PicInfo[] = snapshot.docs.map((doc) => {
      const picData = doc.data();
      return new PicInfo(
        picData['name'],
        picData['description'],
        picData['date'],
        picData['category'],
        picData['user'],
        picData['url']
      );
    });
    console.log(picInfoList)
    return picInfoList;
  }
}