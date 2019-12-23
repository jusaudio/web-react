# JusAudio Progressive Web App

Written by: JusAudio Dev Contributors

## Some Core Goals

- Really simple no distractions audio streaming, reduce UI distractions
- Save data bandwidth for users
- Privacy centric, user data store on device
- Supports multiple platforms, YT, soundcloud, spotify, ambient sounds, user-generated tracks

## Getting Started

These instructions will get you up and running with the project on your local machine.

### Prerequisites for setting up

Knowledge of git, node, npm or yarn is required. The application was bootstrapped using Create-React-App with Typescript

### Prerequisites for development

Firebase, Typescript, React.

### Installing and preparation

1. Fork the repo, ```git clone``` into the folder on your machine
2. ```yarn install``` in repository
3. Then run ```yarn dev``` for local start
4. The build system will automatically open up the browser local environment

### Configurations and .env variables

- We use .env variables to set secrets in a 12 factors approach:
  - Ask project owner for `.envs` shell script for staging variables
  - FIREBASE_API_KEY=String
  - FIREBASE_MESSAGE_SENDER_ID=String
  - FIREBASE_APP_ID=String
  - FIREBASE_MEASUREMENT_ID=String
  - YOUTUBE_API_KEY=String
  - add any additional variables...
- Configurations for constancts and Youtube apis are in ```src/constants/settings.ts```. Change the settings here to accommodate your scenerio

### Firebase

We used Firebase Hosting to deploy the app, Firebase Firestore to store our data. Firebase is a fast way to prove a new concept although we could move alway from it later.

## Built with

- [React via Create React App (Typescript)](https://reactjs.org/) - Javascript library for building UI
- Yarn - Dependency manager
- Firebase Firestore and Hosting (Want to Move away from this)
- Tslint - Typescript linting
- Youtube APIs, Soundcloud, Spotify

## Source History

- Some of the base client shell is extracted from a project done for an NGO organization in Chile designed for improvement of memory via music therapy in eldery dementia patients. Most of the code has been removed, and new code will be added as the 2 projects will diverge very much in it's features going further.
