import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordStrengthValidator } from '../../validators/password-strength.validator';
import { IdenticalValidator } from '../../validators/identical.validator';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  form: FormGroup;
  token = '';
  tokenValidity = false;
  submitted = false;
  submitting = false;
  displayPasswords = {
    password: false,
    repeat: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Set language defined in url
    this.translate.setDefaultLang(this.activatedRoute.snapshot.params.lang);

    // Validity check
    this.token = this.activatedRoute.snapshot.params.token;
    this.userService.checkTokenValidity(this.token).subscribe(response => {
      if (response.code === 'TOKEN_VALID') {
        this.tokenValidity = true;
      }
    });

    // Build form
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, passwordStrengthValidator()]],
      repeatPassword: ['', [Validators.required]]
    }, {validators: IdenticalValidator(['password', 'repeatPassword'])});
  }

  /**
   * return form controls
   */
  get f(): any {
    return this.form.controls;
  }

  /**
   * Submit new password form
   */
  submit(): void {
    // Enter submitting mode
    this.submitting = this.submitted = true;

    // Check validity
    if (this.form.invalid) {
      this.submitting = false;
      return;
    }

    // Get form values and send to backend
    const formValues = this.form.getRawValue();
    this.userService.createNewPassword({ newPassword: formValues.password, token: this.token }).subscribe(response => {
      // Display alert remove submitiing state
      this.submitting = false;
      if (response.code === 'PASSWORD_CHANGED') {
        this.alertService.success(this.translate.instant(`ALERTS.${response.code}`), {keepAfterRouteChange: true, autoClose: true});
        this.router.navigate(['login']).then();
      } else {
        this.alertService.error(this.translate.instant(`ALERTS.${response.code}`));
      }
    });
  }

  toggleInputDisplay(key: string): void {
    this.displayPasswords[key] = this.displayPasswords[key] ? false : true;
  }

}
