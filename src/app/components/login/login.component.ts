import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { Credential } from '../../classes/credential';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public myClientId = '24761230184-50lusmd8j5ejqu4egfroag7r8t3rd7ne.apps.googleusercontent.com';

  formState = {
    loginForm: true,
    resetForm: false,
    emailSentForm: false
  };

  loginForm: FormGroup;
  submitting = false;
  submitted = false;
  resetPassword = false;

  internal = false;
  loading = true;
  returnUrl: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private translate: TranslateService,
    private alertService: AlertService,
    private appService: AppService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.appService.isInternalUrl(window.location.hostname)) {
      this.internal = true;
    }
    this.returnUrl = '/home';
  }

  onSubmit(): void {

    this.submitted = this.submitting = true;
    if (this.loginForm.invalid && !this.resetPassword) {
      this.submitting = false;
      return;
    }

    if (this.resetPassword) {
      this.loginForm.get('password').setErrors(null);
      // Implement password recovery with UserService here
      this.userService.requestPasswordRecovery(this.loginForm.get('email').value).subscribe(response => {
        this.alertService.info(this.translate.instant(`ALERTS.${response.code}`));
        this.resetPassword = this.submitting = false;
      });
      return;
    }

    const values = this.loginForm.getRawValue();
    const credentials = new Credential({ login: values.email, password: values.password });
    this.userService.basicAuth(credentials)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(this.translate.instant('ALERTS.LOGIN_FAILED'), { autoClose: true });
        });
  }

  triggerReset(): void {
    this.resetPassword = !this.resetPassword;
  }
}
