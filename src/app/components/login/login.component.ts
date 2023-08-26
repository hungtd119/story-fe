import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule } from '@angular/router';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatGridListModule,
    RouterModule,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  ngOnInit(): void {}
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const credentials = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.http
      .post<any>('http://127.0.0.1:8000/api/auth/login', credentials)
      .subscribe({
        next: (response) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log('Login error: ', error);
        },
      });
  }
}
