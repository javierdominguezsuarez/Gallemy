import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PicInfoId } from '../picInfoId';

@Component({
  selector: 'app-pic-card',
  templateUrl: './pic-card.component.html',
  styleUrls: ['./pic-card.component.css']
})
export class PicCardComponent {
  @Input() pic : PicInfoId
  @Output() editEvent = new EventEmitter<string>();
  editClick(id: string) {
    this.editEvent.emit(id)
  }

}
