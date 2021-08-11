# Hands-on Angular & RxJS

Within this readme file there is the information needed for the hands-on. The readme itself contains the steps I executed to set up the entire project from 
scratch for those willing to start an Angular/Express application themselves. There is little information described on the Express Server, since this is not
the focus of the Hands-on. There should however be enough information to get you started.

# Table of contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [NX workspace setup](#nx-workspace-setup)
  - [Express server](#express-server)
    - [User router](#user-router)
    - [WebSocket server](#websocket-server)
  - [Angular App](#angular-app)
    - [Scaffolding](#scaffolding)
      - [Angular Material](#angular-material)
      - [Angular Router](#angular-router)
- [Hands-on Exercises](#hands-on-exercises)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
# NX workspace setup

This application is build on with NX and as such I set it up using the NX CLI by running the following commands:
```bash
npx create-nx-workspace@latest
```
After doing so the CLI prompts to choose one of the given presets, or start blank. The project is running and Angular client with Express server. 
There are presets for Angular and for React+Express. Neither of those fully fitted, so I used **Angular** and installed Express separate. 
```bash
npm install -D @nrwl/express
nx generate @nrwl/express:application server # server is the name of the application
```
After fully setting up the workspace environment there are 3 apps & 0 libs. The apps created are:
- client
- client-e2e
- server

## Express server

Since the hands-on is fully focussed on the development of Angular and RxJS the express server is already implemented. Within the server app you will 
find one router (users) containing 3 endpoint and a websocket server. The application is loaded with the body-parser library to make receiving json
payloads possible. It also makes use of JWT for authorisation. 

### User router

In the /app/users folder there is an express router containing the following endpoints:

| verb | name         | route                   | description                                            |
|------|--------------|-------------------------|--------------------------------------------------------|
| POST | authenticate | /api/users/authenticate | authenticate a user using username and password        |
| POST | register     | /api/users/register     | register a new user with username and password         |
| GET  | current      | /api/users/current      | get the current user based on the authorization header |

### WebSocket server

Next to the http routes there is a websocket you can connect to and send chat messages. Connecting to this socket requires an authorization header with the
Bearer token returned by the authentication api call. The route to this websocket is `ws://localhost:3333`.

## Angular App

The main part, and also the main app for the purpose of NX, is the client application. The **client** app that is located in the Apps folder contains a 
bare-bones Angular application. This application contains a few pre-written parts, however, most of it still needs to be developed. This is where the 
'hands-on' part of the repository comes in. 

### Scaffolding

Some minor parts of the application are already setup. The following things have been implemented:
- Angular Material has been added
- Angular router has been added

#### Angular Material

The first step that was taking was adding Angular Material to the project. Angular Material is a component library by Angular that contains some 'easy' to use
components that are pre-styled. This ensures that the developer does not have to fiddle around with css or scss. To add angular material to the project the 
developer needs to run the `add` command. This includes the module in the package json as well as updates the AppModule.

```bash
# With NX globally installed
nx add @angular/material
```
```bash
# Using the NPM wrapper
npm run nx -- add @angular/material
```
With Angular Material installed I created a quick module that imports and exports the required modules from Material. This helps us not to be repetitive and 
keeps the imports located in [a centralized file](handson/apps/client/src/app/material/material.module.ts). This import/export module can then be added to our 
application module. 

```typescript
@NgModule({
  imports: [
      ...
    MaterialModule,
  ]
})
export class AppModule {
}
```

#### Angular Router

With material added, but before we start adding more pages, it is time to add the router. By importing the `RouterModule` into the AppModule we can start adding
new routes to the application. There is a `forRoot` method on the module that allows us to add an array of routes.

```typescript
const routes: Routes = [
    // routes
];

@NgModule({
  imports: [
      ...
    RouterModule.forRoot(routes),
  ]
})
export class AppModule {
}
```

# Hands-on Exercises

A list of hands on exercises can be found in the exercises folder starting with [exercise one, code generation with the CLI](exercises/01-code-generation.md)
