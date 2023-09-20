import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { setIsAuthenticate } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegister!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NzNotificationService,
    private store: Store,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submitForm(): void {
    if (!this.formRegister.valid) {
      this.notification.create(
        'error',
        'Validate notification',
        'Validate error'
      );
    } else {
      this.userService
        .register(this.formRegister.value)
        .subscribe((response) => {
          if (response.status) {
            this.store.dispatch(setIsAuthenticate({ value: true }));
            this.notification.create(
              'success',
              'Register notification',
              response.message
            );
            localStorage.setItem('accessToken', response.token);
            this.router.navigate(['/dashboard/story']);
          } else {
            this.notification.create(
              'error',
              'Register notification',
              response.message
            );
          }
        });
    }
  }
}
