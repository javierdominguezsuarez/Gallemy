import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PicInfo } from '../picInfo';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {
  @Input ()user: User | null

  selectedFile: File | null
  imageSrc: string | null
  step: number = 1
  form: PicInfo = {
    name: '',
    description: '',
    date: '',
    category: '',
    user: '',
    url: ''
  }
  

  constructor(private storageService: StorageService, private storeService: StoreService, private userService: UserService,private readonly router: Router,public sanitizer: DomSanitizer){}
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
  }

  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0]
    this.imageSrc = URL.createObjectURL(event.target.files[0])
    console.log(this.selectedFile)
  }
  async onUploadFile(): Promise<void> {
    if (this.selectedFile) {
     this.storageService.uploadFile(this.selectedFile, this.user?.email + "/" + this.selectedFile.name)
      .then(url => {
        this.form.url = url
        this.form.user = this.user?.email
        console.log(this.form)
      })
      .then(() => {
        this.storeService.add(this.form)
        this.router.navigate(['gallery'])
        console.log("file uploaded")
      })
 
    
    }
  }
  onNextStep(){
    this.step+=1
  }
  onPreviousStep(){
    this.step-=1
  }
  getUrl(){
    return this.imageSrc
  }

}
