import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { StoreService } from '../services/store.service'
import { PicInfo } from '../picInfo';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  files: PicInfo[] | null = [];
  user: User | null = null

  constructor(private storageService: StorageService, private userService: UserService, private storeService: StoreService){}
  
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
    //const files = await this.storageService.getFiles(this.user?.email + "/")
    const files = await this.storeService.getAllByUser(this.user?.email)
    this.files = files
    //TO**DO** create component card that receive as input each of those files from the getAllByUser
    // REMINDER: Create a single route for every element on the list,everytime smeone clicks on one element they are redirected to this route with the whole view of the element 
    console.log(this.storeService.getAllByUser(this.user?.email))

  }
}


