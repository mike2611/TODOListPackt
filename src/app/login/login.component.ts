import { TokenService } from '../token.service';
import { UserData } from '../userdata';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private tokenService: TokenService, private router: Router) { }

  userData: UserData = new UserData();

  error = false;

  login() {
    if(this.userData.username.length > 0 && this.userData.password.length > 0) {
      this.tokenService.getToken(this.userData).subscribe(result => {

        result.expires_in = new Date().getTime() + result.expires_in * 1000;

        sessionStorage.setItem('jsessionid', JSON.stringify(result));

        this.router.navigateByUrl('/home');

      }, error => this.error = true);
    }
  }

}
