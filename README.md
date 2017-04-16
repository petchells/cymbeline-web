# CymbelineWeb

    Development status: Only plays a human vs machine game. 

A front-end for [Cymbeline](https://github.com/petchells/cymbeline) &mdash; the King of Reversi games.

Cymbeline lets you play a game of Reversi against your friends or one of the bots on the Cymbeline network.
  Advanced players can build their own Cymbeline bots and match them against each other in a 1,000-round chip-turning
  Reversi Gigafest. Only one bot will survive.
  
  [Rules on Wikipedia](https://en.wikipedia.org/wiki/Reversi#Rules)

## The Cybelinean Bot Army

* HAL 9000
* NCC-1701
* Optimus Prime
* Wall-E

# Developer notes

## Prerequisites

* [Cymbeline](https://github.com/petchells/cymbeline) binary
* A working NodeJS environment
* `npm install -g angular-cli`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Don't forget to run `npm install` after checking out the first time. Start the `cymbeline` command
 from a terminal then run `ng serve` to start the CymbelineWeb server. Navigate to `http://localhost:4200/`. The app 
 will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# TODO

* Report moves in interface
* Show valid moves, option to auto-play if there's only one
* History: save positions, take back moves
* Bot selector
