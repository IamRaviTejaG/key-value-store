# Key Value Store

[![Build Status](https://travis-ci.org/IamRaviTejaG/product-catalog.svg?branch=master)](https://travis-ci.org/IamRaviTejaG/product-catalog) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)

## Contents
- [Contents](#contents)
- [Getting Started](#getting-started)
- [Dependencies &amp; Packages](#dependencies-amp-packages)
- [Running locally](#running-locally)
  - [The .env file](#the-env-file)
  - [npm scripts](#npm-scripts)
- [Using the CLI](#using-the-cli)
- [API endpoints](#api-endpoints)
    - [1. /get](#1-get)
    - [2. /set](#2-set)
      - [2.1. For string type key-value pairs](#21-for-string-type-key-value-pairs)
      - [2.2. For values of type object](#22-for-values-of-type-object)
  - [3. /delete](#3-delete)

## Getting Started
Start by cloning the repository using: `git clone https://github.com/IamRaviTejaG/key-value-store.git` followed by `cd key-value-store`.

Install all the dependencies (including the dev dependencies) using the `npm install` or `npm i` command. Once the dependencies are installed, use `npm start` to start the server.

Use an API testing tool like [Postman](https://www.getpostman.com/downloads/) or [Insomnia](https://insomnia.rest/download/) to send/receive HTTP requests.

## Dependencies & Packages
- `body-parser`
- `commander`
- `dotenv`
- `express`
- `mongoose`
- `morgan`

Developer dependencies:

- `@babel/cli`
- `@babel/core` (Transpiling ES6 code for use with NodeJS)
- `@babel/present-env`
- `@babel/register`
- `chai` (Assertion)
- `mocha` (Testing)
- `nyc` (Test coverage)
- `request`
- `request-promise` (For sending HTTP requests to the server while testing)
- `rimraf` (The UNIX rm -rf command for Node)
- `standard` (Linting)

## Running locally
### The `.env` file
The `.env` file holds the important variables for the whole application which include the database URL, database port, application port, etc.

##### Please make sure that the both the `index.js`, which is the core app file and `store-cli.js`, which is the cli utility file have access to the `.env` file. This is important for them to function properly.


### npm scripts
The `package.json` file contains five scripts for running locally: `linter`, `test`, `coverage`, `build` & `start`.

- `"linter": "standard --fix"`

Runs the StandardJS linter along with the `--fix` flag, which lints code to a great extent. The traceback (if one shows up) is the list of errors that need to be fixed manually.

- `"test": "mocha --require @babel/register --timeout 5000 --exit"`

Runs **only** the tests.

- `"coverage": "nyc --reporter=text mocha --require @babel/register --timeout 5000 --exit"`

Runs the test coverage & shows up detailed report.

- `"build": "rimraf dist/ && babel ./ --out-dir dist/ --copy-files"`

Builds the project.

- `"start": "npm run build && node dist/index.js --no-deprecation"`

First builds and then starts the server.

## Using the CLI

To use the CLI, you must make sure that the server is up and running. The steps for successful usage are:

1. Open a terminal window, and run `npm start`. This fires up the server. Please keep this terminal window running.
2. Open another terminal window, and run `node store-cli --help`. This will show a list of commands, which are `get`, `set` & `delete`.
3. The syntax is:
   - `node store-cli get <key>`
   - `node store-cli set <key> <value>`
   - `node store-cli delete <key>`

## API endpoints
#### 1. `/get`
```
URL: /get/:key
Request type: GET
Data parameters: key
```

#### 2. `/set`
##### 2.1. For string type key-value pairs
```
URL: /set/:key/:value
Request type: GET
Data parameters: key, value
```

##### 2.2. For values of type object
```
URL: /set
Request type: POST
Data parameters: {"key": "key", "value": { "sample-object": "true" } }
Headers: {
  "Content-type": "application/json"
}
```

##### **Please note that the `Content-type: "application/json"` header is important for the server to understand that the value being passed is an object.**

### 3. `/delete`
```
URL: /delete/:key
Request type: GET
Data parameters: key
```
---
##### **_© 2019 Ravi Teja Gannavarapu_**