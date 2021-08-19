# Http Calls

Making http calls in Angular is quite simple. Using the Http Client that is provided by the Angular HttpClientModule
makes this a breeze. The HttpClient service has methods to do all kinds of requests. 

## Module

To make use of the HttpClient service we first need to add the module to our dependencies in the app.module.

```typescript
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class AppModule {
}
```

## Service

With the module available in our app we can start working on the UserService. Within the user service we add the dependency
in the constructor and create a public method `login`. 

```typescript
import {HttpClient} from "@angular/common/http";

export class UserService {
  constructor(private http: HttpClient) {
  }
}
```

In the login method we can use the http service to make a post call for the authenticate-endpoint on the server. 
Within this method we expect to receive a username and password. To ensure that we can only accept objects with these 
properties we can define a type.

```typescript
type Credentials = {
  username: string,
  password: string
}
```

Our login method than can take shape by expecting the arguments required to make the api-call. Using the HttpClient we
can now post the request body in the following way:

```typescript
public login({username, password}: Credentials) {
    return this.http.post<any>('/api/users/authenticate', {username, password})
}
```

Let's also create a method to create a user. This method uses the same structure as the login, but using a different 
name and url.

```typescript
public createUser({username, password}: Credentials) {
    return this.http.post('/api/users/register', {username, password})
}
```

## Using the service

Earlier we created a submit method in the login page component. With our service in place we can now add the required 
logic to authenticate and redirect. 

In the login page component, add the UserService to the dependencies and complete the submit-method.

```typescript
constructor(private fb: FormBuilder, private user: UserService) {...}
```
```typescript
submit() {
    if(!this.form.valid) return;
    this.user.login(this.form.value)
        .subscribe(
            () => this.handleLogin(),
            er => this.handleLoginError(er)
        )
}
```

After calling the login method on the user service we can subscribe to the result. In the subscribe there are 2 callbacks.
One for success, and one for failure. To keep the code neat we can make 2 methods in the controller to handle these 
situations. 

```typescript
handleLogin() {
    console.log('login success')
}

handleLoginError(error: any) {
    console.error(error)
}
```

## Feedback

When the user signs in using their account they have some expectations. They either entered their credentials correct
and expect to be redirected to their profile, or in our case the chat. And if the user did not enter the correct credentials
they expect to be notified of their error. 

Let's start with the error notifiction. By injecting the `MatSnackBar` service from angular material we can easily add
a text notification. First add the `private snackbar: MatSnackBar` to the constructor and then complete the handleLoginError 
method.

```typescript
openSnackbar(message: string) {
    this.snackbar.open(message, 'close', {
        horizontalPosition: "center",
        verticalPosition: 'bottom',
        panelClass: 'error'
    });
}

handleLoginError(error: any) {
    if (error.status !== 400) {
        console.error(error);
        this.openSnackbar('unknown login error!')
    } else {
        this.openSnackbar('incorrect username and/or password!')
    }
}
```

When the user enters incorrect credentials they now get a notification telling them they used incorrect username or password.
However, if the server responds with any other error they get presented a notification saying something else is wrong.

## Redirect

When the server responds with success we want the redirect the user to the (non existing) chat page. To do so, we need the 
Router service. Injecting the `private router: Router` into the constructor. To navigate the user to the chat page, simply 
call `nagivate` on this services and provide the path to navigate to.

```typescript
handleLogin() {
    this.router.navigate(['/chat']);
}
```

The navigate method accepts an array with all the url parts. For us this does not matter, since we have chat on the root. 

-----

[<< next exercise: Registration Page >>](./05-repeat.md)
