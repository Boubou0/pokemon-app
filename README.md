# pokemon-app

Welcome to the Pokémon App documentation! This documentation provides information on how to use, build, test, and run the application locally.

## Participants
Made by:
- Boubou Jean-Philippe
- Masset Eliot

## Github
https://github.com/Boubou0/pokemon-app

# Docker Hub
https://hub.docker.com/r/fabrien/poke-app

## What is the Pokémon Project?

The Pokémon App is a web application that offers two main functionalities:

- Pokémon Retrieval by Zone: This feature allows the user to retrieve Pokémon available in a specific zone.
- Pokémon Information Retrieval: Allows the user to obtain detailed information about a Pokémon by specifying its name or Pokédex number.

## Features Offered

### 1. Pokémon Retrieval by Zone

Users can select a geographic zone.

The application displays the Pokémons available in that zone.

### 2. Pokémon Information Retrieval
Users can search for a Pokémon by its name or Pokédex number.

The application displays details about the Pokémon, such as its type, sprite, etc.

## How to Build the Pokémon App?

- Make sure you have Node.js installed on your system.
- Clone the GitHub repository of the project.
- In the project's root directory, install dependencies with : 

```sh
npm install
```

- To build the application, run this command : 

```sh
npm run build
```

## How to Run Tests?

Tests are conducted using vitest. 

Follow these steps to run the tests:

- Ensure the application is built using the steps above.
- Run this command :

```sh
npm run vitest
```

## How to Run the Pokémon App Locally?

To run the Pokémon App locally, follow these steps:

- Make sure you have Node.js installed on your system.
- Clone the GitHub repository of the project.
- In the project's root directory, install dependencies with :

```sh
 npm install
```

- Then, launch the application in development mode with :

```sh
 npm run dev
```

## Running in a Docker Container

If you prefer to run the Pokémon App in a Docker container, follow these steps:

- Make sure you have Docker and Docker Compose installed on your system.
- Clone the GitHub repository of the project.
- In the project's root directory, run this command :

```sh
docker-compose up
```

The Pokémon App will be accessible at the http://localhost:8080/.



We hope this documentation helps you successfully use, test, and run the Pokémon App. For any questions or issues, feel free to check the issues section on the project's GitHub repository. Have fun looking for Pokémons! 🎉
