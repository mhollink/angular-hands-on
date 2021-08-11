import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'handson-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {

  public readonly form: FormGroup;

  constructor(private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private router: Router,
              private user: UserService) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.user.isLoggedIn()
      .subscribe(isLoggedIn => {
        if(isLoggedIn) this.handleLogin();
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

  handleLogin() {
    this.router.navigate(['/chat'])
      .then(() => console.log('routed to chat page'))
  }

  handleLoginError(error: any) {
    if (error.status !== 400) {
      console.error(error);
      this.openSnackbar('unknown login error!')
    } else {
      this.openSnackbar('incorrect username and/or password!')
    }
  }

  submit() {
    if(!this.form.valid) return;
    this.user.login(this.form.value)
      .subscribe(
        () => this.handleLogin(),
        er => this.handleLoginError(er)
      )
  }

}
