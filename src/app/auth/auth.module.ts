// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Ignite UI for Angular
import {
  IgxButtonModule,
  IgxCardModule,
  IgxCheckboxModule,
  IgxInputModule,
  IgxLabelModule
} from 'igniteui-angular/main';

import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// providers
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth-interceptor';

import { environment } from '../../environments/environment';
import { MockBackendInterceptor } from '../shared/mocks/mock-backend-interceptor';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,

    // Ignite UI for Angular
    IgxButtonModule,
    IgxCardModule,
    IgxCheckboxModule,
    IgxInputModule,
    IgxLabelModule,

    AuthRoutingModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    environment.production ?
    [] : {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true
    },
  ]
})
export class AuthModule { }
