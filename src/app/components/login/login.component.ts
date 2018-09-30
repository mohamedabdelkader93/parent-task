import { Component, OnInit, Input  } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
    status = false;
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService
        ) { }

    ngOnInit() {
        
    }
    

    login() {
        this.loading = true;
        this.userService.login(this.model.email, this.model.password)
            .subscribe(
            data => {
                this.router.navigate(['/']);
                window.location.reload();
            },
            error => {
                console.log(error)
                this.loading = false;
            });
    }

    showRegister(status) {
        this.status = true;
        console.log(status);
    }

}
