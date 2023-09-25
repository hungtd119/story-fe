import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { setIsAuthenticate } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NzNotificationService,
    private store: Store,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submitForm(): void {
    if (!this.formLogin.valid) {
      this.notification.create(
        'error',
        'Validate notification',
        'Validate error'
      );
    } else {
      this.userService.login(this.formLogin.value).subscribe((response) => {
        if (response.success) {
          this.store.dispatch(setIsAuthenticate({ value: true }));
          this.notification.create(
            'success',
            'Login notification',
            response.message
          );
          localStorage.setItem('accessToken', response.access_token);
          this.router.navigate(['/dashboard/story']);
        } else {
          this.notification.create(
            'error',
            'Login notification',
            response.message
          );
        }
      });
    }
  }
}
