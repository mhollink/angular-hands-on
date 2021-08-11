# Using the Angular (NX) CLI

To get familiar with the CLI and we start of by creating a login page that uses a service that handles the http calls to the backend. Creating new components
and services is a breeze with the the help of the CLI, by running the generate command it automatically creates the files and adds to component or service to
the module.

## Generate components
```bash
# With NX globally installed
nx generate component components/login-page
```
```bash
# Using the NPM wrapper
npm run nx -- generate component components/login-page
```
The commands shown above will generate the typescript file for the component along with the scss, spec and html files. Using slashes in the name assures that the
component is placed in the correct folder and is added to the correct module. The CLI will do a look up to the nearest module and adds the generated component to
the declarations.

```typescript
@NgModule({
  declarations: [AppComponent, LoginPageComponent]
})
export class AppModule {
}
```

The NX part of the command is for this project a wrapper around the normal Angular CLI. when working in a plain Angular application you can replace `nx` with `ng`.

## One letter arguments

Using the NX or Angular CLI reduces the amount of work for the developer by automatically generating and updating the files needed when creating a new component,
service or whatever is needed. To reduce the work even more the CLI also provides one letter shortcuts for the commands. For example, the `generate` part of the
previous command be shortened to just the letter `g`, and the `component` can be replaced by `c`. To demonstrate, lets also create a registration page component.

```bash
nx g c components/registration-page
```

With the first components created, lets also add a service, so we do not duplicate business logic among them.

```bash
nx g s services/user
```

** Other generations **

> Next to components and services there is a whole list of generators available at [angular.io/cli](https://angular.io/cli/generate#schematic-commands)

## Inspecting generated files

With the files generated, lets inspect what we just created. In our folder structure we have added 2 extra folders. Under
[the app folder](../handson/apps/client/src/app) there is a services and a components folder. within the service folder there is a typescript file called
user.service.ts which contains and empty typescript class with the `@Injectable` decorator telling Angular that this is a service.

Next to the Service folder there are the components folder with 2 extra folders inside. These are the generated components with their component.ts, html, scss
and spec file. These components are decorated with the `@Component` decorator telling Angular that these are components. Within the decorator there is a link
to the html and style file.


-----

[<< next exercise: Routing >>](./02-routing.md)

