# Reviews With Friends

Built with React and hosted on Heroku

![rwf-reviews](https://user-images.githubusercontent.com/58963267/116177968-c43bb880-a6e2-11eb-92a5-22faa3ba7d94.png)

![rwf-favorites](https://user-images.githubusercontent.com/58963267/116177405-bd607600-a6e1-11eb-8e95-c4c19ed97d64.png)

## Table of Contents

[Installation](#Installation)

[Technologies](#Technologies)

[Contributing](#Contributing)

## Installation

Clone the repo
```
git clone git@github.com:henryni914/Reviews-with-friends.git
```

In the root directory, run the following: 
```
npm install
```

Create a .env file inside in the root directory with the following:
```
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
```

Create a .env file inside the client directory with the following: 
```
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_TMDB_API_KEY=
```

Change "force: false" in server.js (line 30) to true 
```
force: true
```

Start the server
```
npm run start:dev
```

After starting the server, close the server and change "force: true" back to "false"
```
force: false
```
Enjoy!


## Technologies
[React](https://reactjs.org/)

[React Redux](https://react-redux.js.org/)

[React Router](https://reactrouter.com/)

[React Hooks](https://reactjs.org/docs/hooks-intro.html)

[Moment.js](https://momentjs.com/)

[Semantic UI React](https://react.semantic-ui.com/)

[Auth0](https://auth0.com/)

## Contributing

Feel free to contribute and suggest any improvements.

## License

[MIT](https://choosealicense.com/licenses/mit/)
