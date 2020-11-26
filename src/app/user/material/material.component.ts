import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  date = new FormControl(new Date());
  constructor() { }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  ngOnInit(): void {
  }

}
