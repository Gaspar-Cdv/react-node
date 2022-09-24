# React / Node boilerplate

## Description

This is a React / Node boilerplate with basic front-end components and authentification system. Still work in progress.

## Client

### Start

Before running client, don't forget to create a .env file.\
To run client on port 3000, run :
```
npm start
```

### Test

To run all tests, run :
```
npm test
```
To run storybook on port 6006, run :
```
npm run storybook
```

### Eslint

To see all eslint issues, run :
```
npm run eslint
```
To fix all fixable eslint issues, run :
```
npm run eslint-fix
```

## Server

### Start

Before running server, don't forget to create a .env file.\
To migrate Prisma database, run :
```
npm run migrate [name of the migration]
```
To run server on port 3001, run :
```
npm start
```

### Test

To run a specific test, run :
```
npm test [name of the test]
```
To run all tests, run :
```
npm run test-all
```

### Eslint

To see all eslint issues, run :
```
npm run eslint
```
To fix all fixable eslint issues, run :
```
npm run eslint-fix
```

## Common

This lib is shared between client and server.

### Build

To access it, this lib need to be built :
```
npm run build
```
