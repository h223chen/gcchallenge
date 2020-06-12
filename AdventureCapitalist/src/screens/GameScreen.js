import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BusinessesComponent from '../components/BusinessesComponent';
import ProfileComponent from '../components/ProfileComponent';

/**
 * Main game screen
 * 
 * Contains a top Profile component showing profile pic and money
 * and a businesses component that lists out the businesses the player
 * can interact with
 */
const GameScreen = () => {
	const [money, setMoney] = useState(global.storageManager.getMoney()); // total money

	return (
		<View style={styles.GameScreen}>
			<ProfileComponent money={money}></ProfileComponent>
			<BusinessesComponent money={money} setMoney={setMoney}></BusinessesComponent>
		</View>
	)
};

const styles = StyleSheet.create({
	GameScreen: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		backgroundColor: 'grey',
		margin: 10
	}
});

export default GameScreen;