import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  constructor(private userService: UserService, private router: Router) {
   }

  ngOnInit() {
  }

  onRegister() {
   if (!this.name || !this.email || !this.password) {
    return false;
   }

   const user = {
     name: this.name,
     email: this.email,
     password: this.password
    };

    this.userService.createAccount(user)
    .subscribe((res) => {
      if (!res.success) {
        console.log('registeration failure');
        return false;
      }
      console.log('registered successfully');
      return this.router.navigate(['/login']);
    });
  }
}
