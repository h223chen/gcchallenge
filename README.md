# GC-Challenge (Adventure Capitalist)
This repo was created for the purpose of a coding challenge. The challenge was to implement a simple idle game called AdventureCapitalist

> Adventure Capitalist is an idle business sim-game. The basic idea is to purchase a business, win capital from that business, upgrade the business and then purchase more businesses.

>The way to win capital in Adventure Capitalist is once you've purchased a business, you need to click on the business and it takes some time to gain the capital. Once done, you can click again.

> In order to automate this, you can hire a manager who can run the business for you, so you don't have to click manually anymore. Then you can upgrade the business and gain even more money.

## Installation
		cd AdventureCapitalist
    npm install
    npm start

The Expo Bundler should load automatically, but if not you can find the URL (likely localhost:19###) and paste it into your browser. On the left sidebar, choose "Run in web browser"

## Configuration
There are a few options you can play around with for testing found in config/development.js. This file overwrites the default configuration values and can be used to show a reset blob button or disabling loading blob from storage (disabling idle). I did not have time to implement something into the run commands to do this at build time so you'll need to modify the import line in App.js for the time being.

## Project Info
This implementation uses React Native and Expo for convenient development, testing and deployment of the game to multiple platforms. While the game technically will run on iOS and Android devices, the game is designed to be run in the browser and has not yet been implemented with reactive design due to time constraints. 

The game contains the required MVP functionality of buying and upgrading businesses, making money from businesses, hire managers and being able to pick up from a previous session even after closing the game.

The `#beautiful` UI was done by your's truly but as nothing is perfect, there is always room for improvement (please read and interpret as sarcasm).

## Architecture
This implementation is purely client-side. A server was not considered since this is a single player idle game. There's no need to communicate with other players with the current feature set and if a player decides to cheat they impact nothing but their own enjoyment of the game. 

### Project structure and notable files as follows:

 - App
	 - GameScreen
		 - ProfileComponent
		 - BusinessesComponent
			 - BusinessComponent
 - StorageManager
 - IdleManager

**App** -- main entry point of the application

**GameScreen** -- main page, set up this way to support more pages

**ProfileComponent** -- A nice profile picture and shows money counter

**BusinessesComponent** -- Where businesses are shown

**BusinessComponent** -- an individual business, interact-able elements here

**StorageManager** -- handles reading/writing to user blob, keeps track of progress

**IdleManager** -- contains logic to figure out how much money was made while player is offline

### Considerations
Assuming no time constraints, some possible extensions to the game that might include client-server architecture might be a registration/login system using Firebase, that way a user's save/blob can be persisted even if they clear their local storage. Another might be multiplayer features such as leaderboards that would necessitate a server to manage requests about other players.

*note: I thought about whether or not I should include this information since it feels like I'm giving myself an out ... but I have never used React Native before. The JS framework I'm most familiar with happens to be an in-house proprietary game engine from my company, which I couldn't really use for this game. A significant chunk of the past week was spent on watching/reading tutorials which ate into implementation time ...*


