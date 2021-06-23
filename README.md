# Fallout Style Password Game

![fallout 3 Image](./fallout.gif)

## About this game

This is my attempt at Fallout hacking minigame. If you have ever played any of the
fallout games then you have most likely seen the hacking minigame where you have
to guess a password.

This is still a work in progress.

## Tech Used

The game was built using **Vanilla JavaScript** and **Webpack** for bundling the source.

If you fail at guessing the password you are shown an **Access Denied** dialog and the
game will reset after 3 seconds.

If you guess correctly you will be shown an **Access Granted** dialog and the game will
also reset after 3 seconds.

## The word server

The game uses an express server that provides a list of random words for the game. You
can find the actual word list in server/data/bigwordlist.txt.

## Things I want to add:

  - An overlay for when the game finishes.
  - A settings dialog for changing difficulty (word length)
  - Just like in the actual game when you click on one of the random strings enclosed
    in [], {}, or () you get some kind of cheat.
  - Make it more responsive on mobile.

## Setting the game up

### Client Side

You can build the client side JavaScript by running:

```
npm run build
```

or

```
npm run build:watch
```

Then all you have to do is copy the **client/dist** folder to a web server and serve index.html.
**The word server must be running or the game won't work.**

You can set the location of the word server by setting:


*client/src/server.js*

```javascript
const apiUrl = `http://localhost:8000/words?count=${numWords}&length=${wordLength}`;
```

### Backend

The backend is an express app and is located in the **server/** directory.

You can start the server by running:

```
npm run start
```

or

```
npm run dev
```

You can set the port you want to use in **server/index.js**.
