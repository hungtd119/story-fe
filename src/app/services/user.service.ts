import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../store/user/user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';
  isAuthenticate = false;
  constructor(private http: HttpClient, private store: Store) {
    this.store.select(selectIsAuth).subscribe((isAuthenticate) => {
      this.isAuthenticate = isAuthenticate;
    });
  }
  login(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', { ...body });
  }
  register(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', { ...body });
  }
}
