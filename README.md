# Nextrip Demo

## Running Locally

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## App Configuration

A config file for the app is located at `src/assets/config.json`. This config defines the base URL for the NexTrip API and the polling interval.

## Testing

### Unit Tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

The unit tests ideally are used to catch edge cases, error cases, and everything that is hard to test in integration.

Only a sample of these have been implemented in this project. For examples, see `src/app/route-selector/route-selector.component.spec.ts` or `src/app/nex-trip.service.spec.ts`

### End-to-end tests

Run `npm run e2e` to execute the end-to-end tests via cypress.

The end-to-end tests test simple paths of functionality to verify that integration is hooked up correctly. For example, there are a few implemented to test route/direction/stop selection, URL handling, and handling the browser's back and forward buttons.

These are in the folder `cypress/e2e`

![screenshot of e2e tests](docs/e2e-screenshot.png)

## Linting and Code Formatting

To run the linter and format code, run `npm run lint`

## Design Decisions

### Framework Selection

The main frameworks I considered were Angular and Vue. React seems like a great framework but I don't have experience with it and didn't want to take on the learning curve for this time constraint. I have been using Angular for the last two years, and had done some small projects in Vue prior to that.

Between Vue and Angular, Vue seems more well suited for small projects like this, whereas Angular is better for large apps or large teams that want to keep consistent development patterns.

That said, Angular is the framework I've been using for the last two years, so after spending a few days working on this in Vue, I realized I was wasting too much time learning about the framework, as I wasn't nearly as familiar with it as I am with Angular, and so I switched over to Angular.

### Other Libraries

- NgPrime - used for UI components like form elements, icons
- Cypress - added to the Angular project for e2e testing

### API Integration

To integrate with the NexTrip API, I first used [a script I found online](https://github.com/acacode/swagger-typescript-api) to generate a TypeScript client class with interface definitions based on the Swagger API definition located at https://svc.metrotransit.org/swagger/index.html

I then created a service class (see `src/nex-trip.service.ts`) to handle the responsibilty of calling the API and keep a layer of separation between it and the rest of the app.

## Development Assumptions

## Getting the app "Production Ready"

This app is not "production ready".

To get there, the following need to be done:

- Need to make sure there are points of contact between the dev team for the NexTrip API and our dev team, and a way to know when the API will be deprecated or change, as well as make sure we are using their API in the intended way
- The tests need to be more robust. The ones defined in this project only cover basic functionality
- Tests must be developed to test the app on all supported devices as defined by the product owner
- A production hosting environment should be set up based on requirements from the product owner [e.g., considering how much traffic we expect, what kind of usage, where users are, runtime costs, etc]
- A testing/staging environment should be set up to host the app in a way similiar to how it would be hosted in production, so that it can be tested there before release
- Error handling must be implemented to handle errors and display them to the user as appropriate
- Error handling needs to be implmented to log errors and help support staff and developers debug issues in production

## Development Challenges

- wording in API [e.g., "place" vs "stop"]
