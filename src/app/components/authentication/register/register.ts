import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationService } from '../../../services/registration';

const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl): ValidationErrors|null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register { 
  
    private router = inject(Router)
    private fb = inject(FormBuilder);
    private regService = inject(RegistrationService);
  
    registerForm = this.fb.nonNullable.group({
      displayName: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  
    OnSubmit()  {
      if(this.registerForm.invalid)  {
        this.registerForm.markAllAsTouched();
        return;
      }
  
      const {confirmPassword, ...registrationData} = this.registerForm.getRawValue();
    
      this.regService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration Success: ', response);
          this.router.navigate(['/login']);
        }, error: (error) => {
          console.error('Authentication Failed: ', error);
        }
      })
    }
  }
