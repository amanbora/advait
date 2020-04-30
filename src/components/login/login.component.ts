import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  user = new User('', '');

  ngOnInit() {
  }

  fbLogin() {
    this.userService.fbLogin().then(() => {
      console.log('Called service from login component');
      // console.log(response);
      this.router.navigate(['dashboard']);
    });
  }

  submit(){
    if (this.userService.normalLogin(this.user)){
      console.log('Normal Login called');
      this.router.navigate(['dashboard']);
    }
  }

}
