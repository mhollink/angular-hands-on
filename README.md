# Hands-on Angular & RxJS

Within this readme file there is the information needed for the hands-on. The readme itself contains the steps I executed to set up the entire project from scratch for those willing to 
start an Angular/Express application themselves. There is little information described on the Express Server, since this is not the focus of the Hands-on. There should however be enough 
information to get you started.

## How did I set up the current workspace

This application is build on top of NX and as such I set it up using the NX CLI by running the following commands:
```bash
npx create-nx-workspace@latest
```
After doing so the CLI prompts to choose one of the given presets, or start blank. The project is running and Angular client with Express server. 
There are presets for Angular and for React+Express. Neither of those fully fitted, so i used Angular and installed Express seperate. 
```bash
npm install -D @nrwl/express
nx generate @nrwl/express:application server # server is the name of the application
```
after fully setting up the workspace environment there are 3 apps & 0 libs. The apps created are:
- client
- client-e2e
- server

### Express server

Since the hands-on is fully focussed on the development of Angular and RxJS the express server is already implemented. Within the server app you will find that there is a user api with 3 routes.

| verb | name         | route                   | description                                            |
|------|--------------|-------------------------|--------------------------------------------------------|
| POST | authenticate | /api/users/authenticate | authenticate a user using username and password        |
| POST | register     | /api/users/register     | register a new user with username and password         |
| GET  | current      | /api/users/current      | get the current user based on the authorization header |

Next to the http routes there is a websocket you can connect to and send chat messages. Connecting to this socket requires an authorization header with the
Bearer token returned by the  authentication api call. The route to this websocket is `ws://localhost:3333`.

### Angular App

The Angular app is where you come in. There is a folder called *client* in apps that contains a bare Angular application. 
*@angular/material* has already been installed, and some modules are already added. The installation was done via the ng schematics: `nx add @angular/material`

// todo
