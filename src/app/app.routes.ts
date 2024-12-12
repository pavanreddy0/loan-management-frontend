import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: RegisterComponent},
    {path: 'home', component: HomepageComponent, canActivate: [authGuard]},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];
