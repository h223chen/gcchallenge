import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

/**
	 * DEBUG function, resets the blob to initial data.
	 * you need to refresh the game as soon as you hit the button.
	 * This is because if your businesses are being run by managers
	 * any revenue generated would write new data to the blob
	 */
	const resetButtonHandler = () => {
		global.storageManager.__resetBlob();
	}

/**
 * Profile Component that shows a profile picture and the player's
 * current money
 * @param {*} props.money
 */
const ProfileComponent = ({ money }) => {
	return (
		<View style={styles.profileComponent}>
			{(config.resetButton) &&
				<Button onPress={resetButtonHandler} title='RESET BLOB' />
			}
			<Image style={styles.profileImage} source={require('../../assets/profile.jpg')} />
			<Text style={styles.money}>${money}</Text>
		</View>
	)
};

const styles = StyleSheet.create({
	profileComponent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		backgroundColor: 'grey',
		margin: 10,
	},
	money: {
		flex: 1,
		fontSize: 50,
		color: 'white',
		justifyContent: 'center',
		marginTop: 20
	},
	profileImage: {
		width: 100,
		height: 100,
		margin: 10
	}
});

export default ProfileComponent;