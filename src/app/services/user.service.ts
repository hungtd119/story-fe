import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuth, selectIsLoading } from '../store/user/user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';
  constructor(private http: HttpClient, private store: Store) {}
  ngOnInit(): void {}
  login(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', { ...body });
  }
  register(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', { ...body });
  }
  loadUser(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/loadUser', { accessToken: body });
  }
}
