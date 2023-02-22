import { Component, Input } from '@angular/core';
import { PicInfo } from '../picInfo';

@Component({
  selector: 'app-pic-card',
  templateUrl: './pic-card.component.html',
  styleUrls: ['./pic-card.component.css']
})
export class PicCardComponent {
@Input() pic : PicInfo

}
