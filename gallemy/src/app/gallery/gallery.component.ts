import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  files: string[] | null = [];
  user: User | null = null

  constructor(private storageService: StorageService, private userService: UserService){}
  
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
    const files = await this.storageService.getFiles(this.user?.email + "/")
    this.files = files
    console.log(this.files)
  }
}


