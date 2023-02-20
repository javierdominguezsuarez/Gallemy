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
  selectedFile: File | null;
  files: string[] = [];
  user: User | null = null
  constructor(private storageService: StorageService, private userService: UserService){}
  
  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];
  }

  async onUploadFile(): Promise<void> {
    if (this.selectedFile) {
      const downloadURL = await this.storageService.uploadFile(this.selectedFile, this.user?.email + "/" + this.selectedFile.name);
      this.files.push(downloadURL);
      this.selectedFile = null;
    }
  }

  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
    this.files = await this.storageService.getFiles(this.user?.email + "/");
    console.log(this.files)
  }
}


