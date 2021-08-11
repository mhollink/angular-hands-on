# Registration 

To be able to login we also need a registration page. This page is almost exactly the same as the login page. 
To navigate to this page lets add a link under our login for with a link to the registation url

Under the `<form>` of the login page, but still in the `<maf-card-content>` add a link to the registration page

```html
<aside>
    <a routerLink="/registration">
        or register!
    </a>
</aside>
```

## Template

The template of the registration page is exactly the same as that of the login page, with a few exceptions. 

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Register a new account</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username">
        <mat-error *ngIf="username?.hasError('required')">
          A username is required
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error *ngIf="password?.hasError('required')">
          A password is required
        </mat-error>
      </mat-form-field>
      <button mat-stroked-button color="accent" (click)="submit()">create</button>
    </form>
    <aside>
      <a routerLink="/login">
        or login!
      </a>
    </aside>
  </mat-card-content>
</mat-card>
```

## Controller

Without too much peeking in the login page component, try to implement the Registration page. 

-----

[<< next exercise: Websocket chat >>](./06-rxjs.md)
