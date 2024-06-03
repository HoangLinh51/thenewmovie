import { Component, DestroyRef } from '@angular/core';
import { FormGroup, Validators, AbstractControl, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/service/auth.service';
import { Credentials } from 'src/app/data/modal/auth.modal';
import { StorageService } from 'src/app/data/service/localstorage.service';

enum FormKey {
  EMAIL = 'email',
  PASSWORD = 'password',
  KEEP_ME_LOGGED_IN = 'keepMeLoggedIn'
}
enum InputTextType {
  TEXT = 'text',
  PASSWORD = 'password'
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  formGroup!: FormGroup;
  formKey = FormKey;
  inputTextType = InputTextType;
  emailControl!: AbstractControl<string>;
  passwordControl!: AbstractControl<string>;
  keepMeLoggedInControl!: AbstractControl<boolean>;
  errorMessage: string | undefined;
  credentials!: Credentials

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly router: Router,
    private storageService: StorageService,private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.handleLoginFailure();
  }
  
  get f() {
    return this.formGroup.controls;
  }

  login(): void {
    this.errorMessage = '';
    if (this.formGroup.valid) {
      
      const payload = this.formGroup.value;
      this.authService.login(payload).subscribe({
        next: credentials => {
          this.storageService.set('user', payload)
          this.storageService.set('credentials',credentials)
          this.router.navigate(['/'])
        },
        error: err => {         
          console.log('err',err)
        }
      });
    }
  }
 
  navigateToForgotPasswordPage(): void {
    this.router.navigate(['forgot-password']);
  }

  // private handleLoginFailure(): void {
  //   this.actions$
  //     .pipe(
  //       ofType(authActions.loginFailure),
  //       map(({ customCode }) => {
  //         return this.getTranslateKey(customCode);
  //       }),
  //       switchMap(key => this.translocoService.selectTranslate(key)),
  //       takeUntilDestroyed(this.destroyRef)
  //     )
  //     .subscribe(message => (this.errorMessage = message));
  // }

  // private getTranslateKey(customCode: CustomCode): string {
  //   switch (customCode) {
  //     case CustomCode.EMAIL_PASSWORD_INCORRECT:
  //       return 'login.incorrectEmailPassword';
  //     case CustomCode.MAXIMUM_ATTEMPT_LOGIN:
  //       return 'login.maximumAttemptLogin';
  //     case CustomCode.WAITING_TO_LOGIN:
  //       return 'login.waitingToLogin';
  //     default:
  //       return '';
  //   }
  // }

  private initForm(): void {
    this.formGroup = this.fb.group({
      [FormKey.EMAIL]: ['', [Validators.required, Validators.email]],
      [FormKey.PASSWORD]: ['', [Validators.required]],
      [FormKey.KEEP_ME_LOGGED_IN]: [false]
    });

    this.emailControl = this.formGroup.get(FormKey.EMAIL) as AbstractControl<string>;
    this.passwordControl = this.formGroup.get(FormKey.PASSWORD) as AbstractControl<string>;
    this.keepMeLoggedInControl = this.formGroup.get(FormKey.KEEP_ME_LOGGED_IN) as AbstractControl<boolean>;
  }
}