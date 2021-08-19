# Routing

With the inspection of the files completed we can start developing the application itself. Let's start with the login-page and use what we learn on the
registration-page. First add routing to our components. Within the `app.component.html` there exists a `<router-outlet>` which gets filled with the component in
the given route. This means we need to tell the router module which routes there are. In the `app.module.ts` there is a constant which holds the routes. We need
to add the login and registration page here.

```typescript
const routes: Routes = [
  {path: 'login', component: LoginPageComponent },
  {path: 'registration', component: RegistrationPageComponent },
]
```

With this router config the app knows that the `/login` path should render the `LoginPageComponent` and vice versa for the `/registration`. We can also add a
rule to tell the app we need to route to login if there is no route given. We can do this by adding a redirectTo property to an empty route:

```typescript
const routes: Routes = [
        ...
  {path: '', redirectTo: '/login', pathMatch: 'full'}
]
```


-----

[<< next exercise: Forms >>](./03-forms.md)

