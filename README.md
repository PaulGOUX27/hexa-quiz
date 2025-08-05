# Hexa Quiz App

An awesome app to make quiz between 2 teams.

## Run the App
[Node](https://nodejs.org/fr) should be installed.  
To install dependencies, run `npm i`.

### Server
To start the app in mode production, go to `packages/api` run `npm run start`. WebSocket server will be available on port 8080.

### Web app
In the folder `packages/app`:  
- Copy `.env` to `.env.local` and set the env vars.  
- In `public/sounds/teams` add files `blue.mp3` and `red.mp3`

Then to start the app in mode production run `npm run start`. Web app will be available on port 5173.

## Keyboard shortcut

- m: Change between modes "scores" and "QR Codes"
- r: Reset buzzer
- a: +1 for red
- q: -1 for red
- z: +1 for blue
- s: -1 for blue