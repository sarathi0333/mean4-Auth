import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  onLogin() {
    if (!this.email || !this.password) {
      console.log('Both field are required');
      return false;
    }
    const user = {
      email: this.email,
      password: this.password
    };

    this.userService.auth(user).subscribe(
      (res) => {
        if (!res.success) {
          console.log('check your credentials');
          return false;
        }
        this.userService.saveUserData(res.user.token, res.user);
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
