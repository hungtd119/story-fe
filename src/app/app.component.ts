import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Store } from '@ngrx/store';
import {
  setIsAuthenticate,
  setIsLoading,
  setUser,
} from './store/user/user.actions';
import { selectIsAuth, selectIsLoading } from './store/user/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'story-fe';
  isCollapsed = false;
  constructor(private userService: UserService, private store: Store) {}
  ngOnInit() {
    this.userService
      .loadUser(localStorage.getItem('accessToken'))
      .subscribe((response) => {
        if (response.success) {
          this.store.dispatch(setIsLoading({ value: false }));
          this.store.dispatch(setIsAuthenticate({ value: true }));
          this.store.dispatch(setUser({ value: response.data }));
        } else {
          this.store.dispatch(setIsLoading({ value: false }));
          this.store.dispatch(setIsAuthenticate({ value: false }));
          localStorage.removeItem('accessToken');
        }
      });
  }
}
