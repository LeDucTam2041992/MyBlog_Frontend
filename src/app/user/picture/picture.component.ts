import {Component, OnInit, ViewChild} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ImageService} from '../../service/Image.service';
import {Img} from '../../model/Img';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {DetailPictureComponent} from '../detail-picture/detail-picture.component';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  selectImg: any = null;
  // imgSrc: any;
  listImage: Img[] = [];
  size = 5;
  img: Img = {
    id: 0,
    date: '',
    url: ''
  };
  constructor(private storage: AngularFireStorage,
              private imageService: ImageService,
              private dialog: MatDialog) { }
  ngOnInit(): void {
    this.imageService.getAll().subscribe(value => {
      this.listImage = value;
    });
  }
  submit(event): void{
    if (event.target.files && event.target.files[0]){
      this.selectImg = event.target.files[0];
      const filePath = `picture/${this.selectImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.img.url = url;
            this.imageService.create(this.img).subscribe(value => {
              this.listImage.push(value);
            });
          });
        })
      ).subscribe();
    }
  }

  // tslint:disable-next-line:typedef
  // showPre(event: any){
  //   if (event.target.files && event.target.files[0]){
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => this.imgSrc = e.target.result;
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.selectImg = event.target.files[0];
  //   } else {
  //     this.imgSrc = '';
  //     this.selectImg = null;
  //   }
  // }
  showIm(): void{
    console.log('zzz');
    const dialogRef = this.dialog.open(DetailPictureComponent);
    dialogRef.afterClosed().subscribe();
  }
}
