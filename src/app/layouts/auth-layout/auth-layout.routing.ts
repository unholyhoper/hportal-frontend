import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from 'src/app/pages/forget-password/forget-password.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: "forgotPassword", component: ForgetPasswordComponent},
];
