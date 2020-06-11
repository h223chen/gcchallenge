import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GameScreen from './src/screens/GameScreen';
import config from './config/development';
import StorageManager from './src/managers/StorageManager';
import IdleManager from './src/managers/IdleManager';

export default function App() {
	const [loading, setLoading] = useState(true);

	global.config = config;
	global.storage = StorageManager.getInstance();
	const idle = IdleManager.getInstance();

	if (config.loadFromStorage) {
		global.storage.loadBlob().then(() => {
			idle.catchUp();
			setLoading(false);
		});
	}

	return (
		<View style={styles.container}>
			{ (!config.loadFromStorage || !loading) &&
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
