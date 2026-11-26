import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthEntry } from '../../../services/auth-entry';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router)
  private fb = inject(FormBuilder);
  private authService = inject(AuthEntry);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  OnSubmit()  {
    if(this.loginForm.invalid)  {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.enter(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        sessionStorage.setItem('accessToken', response.token);
        this.router.navigate(['/dashboard']);
      }, error: (error) => {
        console.error('Authentication Failed: ', error);
      }
    })
  }
}
