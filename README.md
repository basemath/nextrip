# NextripDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Linting and Code Formatting

- TODO

## Design Decisions

### Framework Selection

- considerations of Angular vs React vs Vue

### API Integration

- generated api interfaces with script from swagger JSON definition
- added layer of separation via service class

### Departure Time Displays

- Keeping up-to-date with timestamps vs using the time string form the server
- Polling interval

### Error handling

### Application Configuration

## Getting the app "Production Ready"

- business contract/relationship with API team
- testing for all supported devices
- select hosting solution aligned with access/uptime requirements
- fill out tests

## Development Challenges

- wording in API [e.g., "place" vs "stop"]

## Todo

[x] implement unit tests  
[x] implement e2e tests  
[ ] add routing handler  
[ ] clean up display of selected trip  
[ ] show loading indicator when calling API  
[ ] show error messages on errors thrown  
[ ] add polling of trip to keep departure times updated  
[ ] document design decisions  
[x] update favicon  
[ ] generally prettify and make it look app-like  
[ ] implement 'use current location feature'
