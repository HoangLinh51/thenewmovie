import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs";
import { AuthService } from 'src/app/data/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private AuthService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {this.initForm()
  }

  get f() {
    return this.form.controls;
  }

  
  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.loading = true;
      this.AuthService.register(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.toastrService.success('Register Success!', 'Success!');
            this.router.navigate(['/settings/sign-in'], { relativeTo: this.route });
          },
          error: (error) => {
            console.log('error',error)
            this.toastrService.error(error, 'Error!');
            this.loading = false;
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  vietnamesePhoneNumberValidator() {
    return (control: any) => {
      const phoneNumber = control.value;
      const phoneNumberPattern = /(84|\+84|0)(\d{9,10})/;
      const isValid = phoneNumberPattern.test(phoneNumber);

      return isValid ? null : { invalidPhoneNumber: true };
    };
  }


  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.minLength(8), Validators.email],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          this.vietnamesePhoneNumberValidator(),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
