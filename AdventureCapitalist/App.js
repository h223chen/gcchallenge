import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import GameScreen from './src/screens/GameScreen';
import config from './config/production';
import StorageManager from './src/managers/StorageManager';
import IdleManager from './src/managers/IdleManager';

/**
 * App entrypoint for the game, show/toggle various 
 * screens here as well as set up some app globals
 */
export default function App() {
	const [loading, setLoading] = useState(true); // if we've finished loading data from storage

	// initialize config and variables
	global.config = config;
	global.storageManager = StorageManager.getInstance();
	const idleManager = IdleManager.getInstance();

	// load data from storage and catch up blob data  from what
	// it previously was left at to what it should look like now
	if (config.loadFromStorage) {
		global.storageManager.loadBlob().then((blob) => {
			idleManager.catchUp();
			setLoading(false);
		});
	}

	/**
	 * DEBUG function, resets the blob to initial data.
	 * you need to refresh the game as soon as you hit the button.
	 * This is because if your businesses are being run by managers
	 * any revenue generated would write new data to the blob
	 */
	const resetButtonHandler = () => {
		global.storageManager.__resetBlob();
	}

	return (
		<View style={styles.container}>
			{(config.resetButton) &&
				<Button onPress={resetButtonHandler} title='RESET BLOB' />
			}

			{/* we want to load GameScreen if we don't care to 
					load from storage at all, or if we do but we've finished
					loading
			*/}
			{(!config.loadFromStorage || !loading) &&
				<GameScreen />
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: 'black'
	},
});
