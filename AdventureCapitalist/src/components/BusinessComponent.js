import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import commonStyles from '../../assets/stylesheets/styles';
import ProgressBar from 'react-native-progress/Bar';

/**
 * A Business Component that allows the player to perform
 * various operations such as buy, upgrade or hire a manager
 * @param {*} props 
* 	business - business object
		money - current spendable money
		moneyTransaction - function to update money
		buyBusiness - function to buy a business
		hireManager - function to hire a manager
		upgradeBusiness - function to upgrade a business
		automatic - if this business is being managed
		disabled - if this business is not yet purchased/available
 */
const BusinessComponent = (props) => {
	const [progress, setProgress] = useState(0); // a value betwee 0 and 1, indicate work progress
	const [animating, setAnimating] = useState(false); // prevents progress bar concurrency issues
	const [hired, setHired] = useState(props.automatic); // indicates if we've just hired a manager

	var business = props.business;
	const progressRefreshInterval = 30;

	/**
	 * Manages rerendering progress bar on a fixed interval
	 * 
	 * @param {*} delay - how often to rerender new progress
	 * @param {*} startTime - when this business started work
	 * @param {*} stopTime - when this business will end work
	 * @param {*} revenue - how much this business will earn once work is doen
	 */
	const pollProgress = (delay, startTime, stopTime, revenue) => {
		setTimeout(() => {
			const nowTime = Date.now();
			const progressPercentage = 1 - (stopTime - nowTime) / (stopTime - startTime);

			setProgress(progressPercentage);

			if (nowTime < stopTime) { // we're not done, continue to rerender
				pollProgress(delay, startTime, stopTime, revenue);
			} else { // we're done with this work, get our payout
				props.moneyTransaction(revenue);
				setAnimating(false);
				setProgress(0);

				if (props.automatic) { // if we've hired a manager, auto-restart work 
					addRevenueToBusiness();
				}
			}
		}, delay);
	};

	/**
	 * kick start work for this business, start progress bar renders
	 */
	const addRevenueToBusiness = () => {
		setAnimating(true); // do this so players can't spam work button
		const nowTime = Date.now(); // time of starting this work
		const workTime = business.time * 1000; // in ms
		const finishTime = nowTime + workTime; // time we expect to finish work

		pollProgress(progressRefreshInterval, nowTime, finishTime, business.revenue);
	};

	// full disclaimer, I have no idea if this is the right way to do this ...
	// RN state updates are async, so we can't call addRevenueToBusiness right after
	// invoking the button handler. Doing it this way so that when RN rerenders it will
	// start the work and set the flag to false so it'll only do it once
	if (hired) {
		setHired(false);
		addRevenueToBusiness();
	}

	return (
		<View style={styles.businessComponent}>
			<TouchableOpacity
				pointerEvents={props.disabled ? 'none' : 'auto'}
				style={[props.disabled ? commonStyles.disabled : '']}
				onPress={() => {
					if (!animating) { // anti-spam check
						addRevenueToBusiness();
					}
				}}>
				<Image style={styles.businessImage} source={require('../../assets/profile.jpg')}></Image>
			</TouchableOpacity>

			<View style={styles.businessInfo}>
				<Text style={commonStyles.buttonText}>Returns: {business.revenue}</Text>
			</View>
			{props.disabled ? // show either progress bar, or buy business button. Never both
				<TouchableOpacity
					style={styles.businessButton}
					onPress={() => {
						props.buyBusiness(business);
					}}>
					<Text style={commonStyles.buttonText}>Buy Business: ${business.cost}</Text>
				</TouchableOpacity>
				:
				<View style={styles.businessProgress}>
					<ProgressBar
						animated={false}
						color={'green'}
						borderWidth={0}
						progress={progress}
						width={null}
						height={20}
					/>
				</View>
			}
			<TouchableOpacity
				pointerEvents={props.disabled ? 'none' : 'auto'}
				style={styles.businessButton}
				onPress={() => {
					props.upgradeBusiness(business);
				}}>

				<Text style={commonStyles.buttonText}>upgrade: ${business.cost * business.costMult}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				pointerEvents={props.disabled ? 'none' : 'auto'}
				style={[styles.businessButton, props.disabled || props.automatic ? commonStyles.disabled : '']}
				onPress={() => {
					if (props.hireManager(business)) {
						setHired(true);
					}
				}}>

				<Text style={commonStyles.buttonText}>Hire Manager: ${business.managerCost}</Text>
			</TouchableOpacity>
		</View>
	)
};

const styles = StyleSheet.create({
	businessComponent: {
		flexDirection: 'row',
		margin: 10,
		borderWidth: 1,
		borderColor: 'blue',
		opacity: 1
	},
	businessImage: {
		margin: 5,
		borderRadius: 50,
		width: 50,
		height: 50
	},
	businessInfo: {
		flexDirection: 'column',
		flex: 1,
		margin: 5
	},
	businessProgress: {
		flex: 2,
		paddingVertical: 20,
		paddingHorizontal: 5,
		borderWidth: 0,
		borderRadius: 10
	},
	businessButton: {
		...commonStyles.button,
		flex: 2,
		height: 50,
		marginVertical: 5,
		marginHorizontal: 10
	}
});

export default BusinessComponent;
