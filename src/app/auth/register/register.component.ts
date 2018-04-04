import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    accept: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signup() {
    // validation
    if (!this.form.valid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
      }
      return;
    }

    const { email, password } = this.form.value;
    this.authService.register(email, password)
      .subscribe(user => console.log(user));
  }
}
