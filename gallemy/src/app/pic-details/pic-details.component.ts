import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PicInfoId } from '../picInfoId';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-pic-details',
  templateUrl: './pic-details.component.html',
  styleUrls: ['./pic-details.component.css']
})
export class PicDetailsComponent {
  pic: PicInfoId 

  constructor(private storeService: StoreService,private route: ActivatedRoute){}

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap
    const id = routeParams.get('picId')
    await this.storeService.getPicById(id).then( pic => {
      this.pic= pic[0]
    })
  }

}
