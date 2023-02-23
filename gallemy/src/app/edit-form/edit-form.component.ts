import { Component, Input } from '@angular/core';
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

  step: number = 1
  form: PicInfoId 

  constructor( private storeService: StoreService, private userService: UserService,private readonly router: Router,public sanitizer: DomSanitizer){}
  
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
    const query = await this.storeService.getPicById(this.id)
    this.form = query[0]
  }
  editInformation(){
    //////// TODO Update the element on firestore using the service 
    //// CALL THIS FUNTION ON CLICK OF THE FORM BUTTOM 
    ///// EMIT ANOTHER EVENT TO THE GALLERY COMPONENT TO SET THE STATE ON EDITION FALSE 
    this.storeService.add(this.form)
    this.router.navigate(['gallery'])
    console.log("file uploaded")  
  }
  onNextStep(){
    this.step+=1
  }
  onPreviousStep(){
    this.step-=1
  }

}
