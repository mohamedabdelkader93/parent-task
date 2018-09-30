import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UsersService
  ) { }

  ngOnInit() {
    this.userService.logout();
  }

}
