import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StoreService } from '../services/store.service';
import { PicInfoId } from '../picInfoId';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {
  @Input () id: string
  @Input () user: User | null
  @Output() editSubmitEvent = new EventEmitter()

  step: number = 1
  form: PicInfoId 

  constructor( private storeService: StoreService, private userService: UserService,private readonly router: Router,public sanitizer: DomSanitizer){}
  
  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
    this.form = new PicInfoId
      
    
    this.getForm()
  
  }

  async getForm(){
    const query = await this.storeService.getPicById(this.id)
    console.log("HOOLAAA")
    console.log(query[0])
    this.form = query[0]
  }
    
  onSubmit(){
    this.storeService.update(this.id,this.form)
    this.router.navigate(['gallery'])
    console.log("file updated") 
    this.editSubmitEvent.emit()

  }


}
