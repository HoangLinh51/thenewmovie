import { Component, Input } from '@angular/core';
import { IMGURL } from '../../data/constant/localstorage-key'
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() dataResults: any;
  imgUrl: string = ''
  
  ngOnInit() {
    this.imgUrl = IMGURL
  }
}
