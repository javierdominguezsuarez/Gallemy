import { Injectable } from '@angular/core';
import { Firestore,  collection, where } from '@angular/fire/firestore';
import { addDoc, doc, documentId, getDoc, getDocs, query, QuerySnapshot, setDoc } from 'firebase/firestore';
import { PicInfo } from '../picInfo';
import { PicInfoId } from '../picInfoId';

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
    const picInfoList: PicInfoId[] = snapshot.docs.map((doc) => {
      const picData = doc.data();
      return new PicInfoId(
        picData['name'],
        picData['description'],
        picData['date'],
        picData['category'],
        picData['user'],
        picData['url'],
        ""
      );
    });
    console.log(picInfoList)
    return picInfoList
  }
  async getPicById(id:string | null) {
    const snapshot: QuerySnapshot  = await getDocs(query(this.collectionRef, where(documentId(), '==', id)))
    
    const picInfoList: PicInfoId[] = snapshot.docs.map((doc) => {
      
      const picData = doc.data()
      const picId = doc.id
      return new PicInfoId(
        picData['name'],
        picData['description'],
        picData['date'],
        picData['category'],
        picData['user'],
        picData['url'],
        picId
      )
    })
    console.log(picInfoList)
    return picInfoList;
  
  
    
  }

  async getAllByUser(user: string | null | undefined): Promise<PicInfo[]> {
    const snapshot: QuerySnapshot = await getDocs(query(this.collectionRef, where("user", "==", user)))
    const picInfoList: PicInfoId[] = snapshot.docs.map((doc) => {
      
      const picData = doc.data()
      const picId = doc.id
      return new PicInfoId(
        picData['name'],
        picData['description'],
        picData['date'],
        picData['category'],
        picData['user'],
        picData['url'],
        picId
      )
    })
    console.log(picInfoList)
    return picInfoList;
  }
  
  async update(id: string, updatedPic: PicInfoId): Promise<void> {
    const docRef = doc(this.afs, 'images', id)
    const updatedPicObj = Object.assign({}, updatedPic)
    await setDoc(docRef, updatedPicObj)
  }
}