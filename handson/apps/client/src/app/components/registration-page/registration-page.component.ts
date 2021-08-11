import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'handson-registration-page',
  templateUrl: './registration-page.component.html',
})
export class RegistrationPageComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private router: Router, private user: UserService) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get password() {
    return this.form.get('password')
  }

  get username() {
    return this.form.get('username')
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, 'close', {
      horizontalPosition: "center",
      verticalPosition: 'bottom',
      panelClass: 'error'
    });
  }

  handleCreated() {
    this.router.navigate(['/login'])
      .then(() => console.log('routed to chat page'))
  }

  handleLoginError(error: any) {
    if (error.status !== 409) {
      console.error(error);
      this.openSnackbar('unknown login error!')
    } else {
      this.openSnackbar('Username already taken')
    }
  }

  submit() {
    if(!this.form.valid) return;
    this.user.createUser(this.form.value)
      .subscribe(
        () => this.handleCreated(),
        er => this.handleLoginError(er)
      )
  }
}
