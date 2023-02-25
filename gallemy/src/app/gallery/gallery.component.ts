import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service'
import { PicInfoId } from '../picInfoId';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  files: PicInfoId [] | null 
  user: User | null = null
  edition: boolean = false
  idEdit: string
  constructor(private userService: UserService, private storeService: StoreService){}
  
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })

    const files = await this.storeService.getAllByUser(this.user?.email)
    this.files = files
  }
  editPic(id : string){
    this.edition = true
    this.idEdit= id
    console.log(id)
  }
  async resetEdit(){
    this.edition=false
    const files = await this.storeService.getAllByUser(this.user?.email)
    this.files = files
  }
}


