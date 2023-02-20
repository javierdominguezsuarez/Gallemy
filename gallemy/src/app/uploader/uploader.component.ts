import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {
  
  user: User | null = null

  constructor(private storageService: StorageService, private userService: UserService){}
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
  }
}
