import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';




type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  User: { firstName: string, lastName: string, email: string, password: string };

  userForm: FormGroup;
  newUser = false; // to toggle login or signup form
  formErrors: FormErrors = {
   
    email: '',
    password: ''
  };

  validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Email must be a valid email'
    },
    password: {
      required: 'Password is required.',
      pattern: 'Password must be include at one letter and one number.',
      minlength: 'Password must be at least 4 characters long.',
      maxlength: 'Password cannot be more than 40 characters long.'
    }
  };







  constructor(
    public authService: AuthService,
    private router: Router,
    // private route: ActivatedRoute,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.buildForm();
  }

  _
  toggleForm() {
    this.newUser = !this.newUser;
  }


  // signup(input) {
  //   this.auth.emailSignUp(
  //     this.userForm.value['email'],
  //     this.userForm.value['password']
  //   );
  //   this.navigate();
  // }








  login() {
    console.log('form data', this.userForm.value.email, this.userForm.value.password);
 

    this.authService.doRegister(
      this.userForm.value.email, this.userForm.value.password
    ).then(res => {
      console.log(res);
      this.navigate();
    }, err => {
      console.log(err);
    });
  }


  buildForm() {
    this.userForm = this.fb.group({
         email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }


  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (
        Object.prototype.hasOwnProperty.call(this.formErrors, field) &&
        (field === 'email' || field === 'password')
      ) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${
                  (messages as { [key: string]: string })[key]
                  } `;
              }
            }
          }
        }
      }
    }
  }

  navigate() {
    this.router.navigate(['listing']);
  }


}
