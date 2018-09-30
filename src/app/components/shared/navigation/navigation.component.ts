import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedUser: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  ngOnInit() {
  }

}
