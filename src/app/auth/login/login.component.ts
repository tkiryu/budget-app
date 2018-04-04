import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    // validation
    if (!this.form.valid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
      }
      return;
    }

    const { email, password } = this.form.value;
    this.authService.login(email, password)
      .subscribe(user => {
        console.log(user)
        this.router.navigate(['/budget']);
      });
  }
}
