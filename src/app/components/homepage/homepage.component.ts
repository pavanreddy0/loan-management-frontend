import {Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {LoginPostData} from "../../interfaces/auth";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ButtonModule, CardModule, InputTextModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);


  loanForm = new FormGroup(
    {
      loanAmount: new FormControl(0, [Validators.required])
    },

  );

  get loanAmount() {
    return this.loanForm.controls['loanAmount'];
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  async checkEligibleForLoan() {
    try {
      const response = await this.authService.checkEligibleForLoan(this.loanForm.value.loanAmount).toPromise();

      if (response && response.status === "OK") {
        let message = ""
        if(response.data.eligible)
          message = "You're eligible for loan"
        else message = "You're not eligible for loan"
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: message,
        });

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
