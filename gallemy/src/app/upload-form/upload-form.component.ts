import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {
  @Input ()user: User | null
  selectedFile: File | null

  constructor(private storageService: StorageService, private userService: UserService,private readonly router: Router){}
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
  }

  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
  }
  async onUploadFile(): Promise<void> {
    if (this.selectedFile) {
      this.storageService.uploadFile(this.selectedFile, this.user?.email + "/" + this.selectedFile.name).then(() => this.router.navigate(['gallery']))
      this.selectedFile = null
      console.log("file uploaded")
    }
  }
}
