import {Component, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {IUser} from '../../model/IUser';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isAdmin: boolean;
  constructor(private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private loginService: LoginService,
              private router: Router,
              public snackBar: MatSnackBar) {}

  login(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
        const data: IUser = result;
        this.loginService.doLogin(data).subscribe(
        (response) => {
          localStorage.setItem('token', response.tokenUser);
          response.roles.forEach(r => {
            if (r.authority.includes('ROLE_ADMIN')) {
              this.isAdmin = true;
              this.openSnackBar('Welcome Admin', '');
            } else {
              this.openSnackBar('Welcome User', '');
            }
          });
        },
        () => {
          this.openSnackBar('Login fail!', 'try again');
        });
    });
  }
  openSnackBar(message: string, action: string): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 2000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
    });
  }
}
