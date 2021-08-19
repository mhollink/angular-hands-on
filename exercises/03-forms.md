# Login form

## Template 

Since Material is already imported in the app module we can use the `mat` components that it comes with. Let's create a card component that hold the login form.

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Log in</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <!--  Login Form -->
  </mat-card-content>
</mat-card>
```

Within the body of the card we can add the form with fields for username and password. Using the correct material directives we can also make use the material styling.

```html
 <form>
  <mat-form-field appearance="outline">
    <mat-label>Username</mat-label>
    <input matInput>
  </mat-form-field>
  <mat-form-field appearance="outline">
    <mat-label>Password</mat-label>
    <input matInput type="password">
  </mat-form-field>
  <button mat-stroked-button color="accent">Log in</button>
</form>
```

## Forms module

The scaffolding of the login form is enough to render a neat looking form on the screen. There is some CSS in the root of the project that centers the card.
The next step is to wire the form to the component. Angular makes this quite easy. By importing the Angular forms module we get access to a load of powerfull
features. Within the `app.module` we import the `FormsModule` and the `ReactiveFormsModule` both coming from `@angular/forms`. 

## FormGroup

With this done, lets create a form within our `login.page.component`. Add a public field to the class that holds the form and add inject the FormBuilder service.

```typescript
class LoginPageComponent {
    
  public readonly form: FormGroup;
  
  constructor(private fb: FormBuilder) {
  }
}
```

We now need to initialize the form with correct fields and their initial value. Since we want to group the username and password together we make use of the 
`group` function.

```typescript

this.form = fb.group({
  username: ['', [/*validators*/]],
  password: ['', [/*validators*/]]
})

```

We can create some TypeScript `get` functions to get easy access to the form control, its value and its possible validation errors. Each form control can be retrieved 
by its name from the group that is assigned to. By calling `this.form.get('controlName');` we can get the control. Let's wrap this function in 2 getters for username 
and password. 

```typescript
get password() {
    return this.form.get('password')
}

get username() {
    return this.form.get('username')
}
```

## Controller/Template connection

With the form group created, and the getter methods available we can connect the controller and the template. Within the earlier created `<form>` tag, add the formGroup 
directive by adding `[formGroup]="form"`. Both inputs need to be assigned the name of the value within the formGroup. This can be done by using the `formControlName` 
directive: `<input matInput formControlName="username">` and `<input matInput formControlName="password" type="password">`.

## Validation

We need to make sure that the user fills in the correct data before we send the form. To ensure the form is filled correctly we can add validators. We can retrieve the user 
errors using the `hasError` method on the form group or form controls. First we need to add the validators. Within the `@angular/forms` package there is a class called 
`Validators`. This class contains a set of predefined validators such as required, email and minLength/maxLength or pattern (regex). A form control can have multiple validators,
and as such we have an array already created in the form builder. Let's make both fields required:

```typescript
this.form = fb.group({
  username: ['', [Validators.required]],
  password: ['', [Validators.required]]
})
```

Just making the field required does not do anything within the application. Forms can still be submitted, and the user is unaware of any validation errors. We can add a `mat-error` 
to show the user that the validation has failed. Within the HTML, inside the `maf-form-field` and directly under the `input`, add:

```html
<mat-error *ngIf="username?.hasError('required')">
  A username is required
</mat-error>
```

Don't forget to also the mat-error to the password field.

## Submit

To submit the form we need to wire the button with a click event. This then should trigger a http call to the server that checks the credentials. For this we need a new method within
the controller that is called when the button is clicked. 

```typescript
submit() {
    if(!this.form.valid) return;

    console.log('form submitted', this.form.value)
}
```

In the html we can bind the submit function on the click event of the button. By doing so, everytime the submit button is clicked the method is called.

```html
<button mat-stroked-button color="accent" (click)="submit()">Log in</button>
```

-----

[<< next exercise: Services >>](./04-sevices.md)
