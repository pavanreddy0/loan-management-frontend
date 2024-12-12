import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import {LoginPostData, LoginResponse, LoginResponseData} from "../../interfaces/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  async onLogin() {
    const { email, password } = this.login;

    try {
      const response = await this.authService.getUserDetails(this.login as LoginPostData).toPromise();

      if (response && response.status === "OK") {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('token', response.data.token);
        this.router.navigate(['home']);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong',
      });
    }
  }

}
