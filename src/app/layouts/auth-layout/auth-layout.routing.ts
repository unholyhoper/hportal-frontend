import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: "forgotPassword", component: ForgotPasswordComponent},
];
