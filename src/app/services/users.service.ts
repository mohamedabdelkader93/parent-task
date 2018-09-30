import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { User, CurrentUser } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UsersService implements OnInit {
  currentUser: CurrentUser;
  loggedUser: any;
  mainUrl: string = "https://reqres.in/api";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {

  }
  ngOnInit() {

  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(this.mainUrl + '/login', { email: email, password: password }).pipe(
      map(user => {
        if (user && user.token) {
          this.loggedUser = JSON.stringify(user);
          localStorage.setItem('loggedUser', this.loggedUser);
          this.toastr.success('Logged in successfully');
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Try to login again please');
        }
        return user;
      }));
  }

  register(registerInfo) {
    if (!this.loggedUser) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' });
      let bodyObj = {
        "email": registerInfo.email,
        "password": registerInfo.password,
      };
      this.httpClient.post(this.mainUrl + '/register', bodyObj, { headers: headers })
        .toPromise()
        .then(() => {
          this.toastr.success('You Registered successfully');
          this.router.navigate(['/login']);
        })
        .catch((err: HttpErrorResponse) => {
          this.toastr.success('Try to register again');
          return err.error;
        })
    } else {
      console.log("please login");
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.toastr.success('You logged out successfully');
    this.router.navigate(['login']);
    window.location.reload();
  }

  getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' })
    };
    return this.httpClient.get<User[]>(this.mainUrl + "/users/", httpOptions);
  }

  getUserById(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' });
    return this.httpClient.get("https://reqres.in/api/users/" + id, { headers: headers });
  }

  createUser(createInfo) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' });
    let bodyObj = {
      "name": createInfo.name,
      "job": createInfo.job,
    };
    this.httpClient.post(this.mainUrl + '/users', bodyObj, { headers: headers })
      .toPromise()
      .then(() => {
        this.toastr.success('User Created successfully');
      })
      .catch((err: HttpErrorResponse) => {
        this.toastr.error('Try again');
        return err.error;
      })
  }

  updateUser(updatedUser, updateInfo) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' });
    let bodyObj = {
      "name": updateInfo.name,
      "job": updateInfo.job,
    };
    this.httpClient.put(this.mainUrl + '/users' + updatedUser.id, bodyObj, { headers: headers })
      .toPromise()
      .then(() => {
        this.toastr.success('User Updated successfully');
      })
      .catch((err: HttpErrorResponse) => {
        this.toastr.error('Try again');
        return err.error;
      })
  }

  deleteUser(user){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' });
    this.httpClient.post(this.mainUrl + '/users/' + user.id, { headers: headers })
      .toPromise()
      .then(() => {
        this.toastr.success('User Deleted successfully');
      })
      .catch((err: HttpErrorResponse) => {
        this.toastr.error('Try again');
        return err.error;
      })
  }

}
