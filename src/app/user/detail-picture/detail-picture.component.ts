import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Img} from '../../model/Img';

@Component({
  selector: 'app-detail-picture',
  templateUrl: './detail-picture.component.html',
  styleUrls: ['./detail-picture.component.scss']
})
export class DetailPictureComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {img: Img}) { }

  ngOnInit(): void {
  }

}
