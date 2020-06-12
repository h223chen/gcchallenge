import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import BusinessComponent from './BusinessComponent';

/**
 * Businesses Component that shows a list of Business Components
 * @param {*} props
 * 		money - current money
 * 		setMoney - react hook to update money
 */
const BusinessesComponent = (props) => {
	const businesses = global.config.businesses;
	const [ownedBusinesses, setOwnedBusinesses] = useState(global.storageManager.getBusinesses());
	const [managedBusinesses, setManagedBusinesses] = useState(global.storageManager.getManagers());

	/**
	 * funtion that takes a delta amount and modifies 
	 * current money.
	 * 	+ve value means increase
	 * 	-ve value mean decrease
	 * @param {*} amount - Number value for how much to add/subtract from money
	 */
	const moneyTransaction = (amount) => {
		props.setMoney((prevMoney) => {
			const updatedMoney = prevMoney + amount;
			global.storageManager.setMoney(updatedMoney);

			return updatedMoney;
		});
	};

	/**
	 * update state to indicate we've bought a new business
	 * @param {*} business 
	 * @return boolean - if buying was successful
	 */
	const buyBusiness = (business) => {
		const canBuy = props.money >= business.cost && ownedBusinesses.indexOf(business.name) < 0;
		if (canBuy) {
			moneyTransaction(-business.cost);

			const updatedOwnedBusinesses = [...ownedBusinesses, business.name];
			setOwnedBusinesses(updatedOwnedBusinesses);
			global.storageManager.setBusinesses(updatedOwnedBusinesses);
		}

		return canBuy;
	};

	/**
	 * update state to indicate we've hired a manager for a business 
	 * @param {*} business 
	 * @return boolean - if hiring was successful
	 */
	const hireManager = (business) => {
		const canHire = props.money >= business.managerCost && managedBusinesses.indexOf(business.name) < 0
		if (canHire) {
			moneyTransaction(-business.managerCost); // TODO: moneyTransaction should check amount

			const updatedManagedBusinesses = [...managedBusinesses, business.name];
			setManagedBusinesses(updatedManagedBusinesses);
			global.storageManager.setManagers(updatedManagedBusinesses);
		}

		return canHire;
	};

	/**
	 * update business config to new values to indicate we've upgraded
	 * @param {*} business 
	 * @return boolean - if upgrading was successful
	 */
	const upgradeBusiness = (business) => {
		const upgradeCost = business.cost * business.costMult;
		const canUpgrade = props.money >= upgradeCost;

		if (canUpgrade) {
			moneyTransaction(-upgradeCost);

			business.cost *= business.costMult;
			business.revenue *= business.revenueMult;

			let financials = global.storageManager.getFinancials();
			financials[business.name].cost = business.cost;
			financials[business.name].revenue = business.revenue;

			global.storageManager.setFinancials(financials);
		}

		return canUpgrade;
	}

	return (
		<View style={styles.businessesComponent}>
			<ImageBackground source={require('../../assets/background.jpg')}>
				<FlatList
					data={businesses}
					extraData={moneyTransaction}
					keyExtractor={business => business.name}
					renderItem={({ item }) => {
						const business = item;
						return (
							<BusinessComponent
								business={item}
								money={props.money}
								moneyTransaction={moneyTransaction}
								buyBusiness={buyBusiness}
								hireManager={hireManager}
								upgradeBusiness={upgradeBusiness}
								automatic={managedBusinesses.indexOf(business.name) >= 0}
								disabled={ownedBusinesses.indexOf(business.name) < 0}
							/>
						);
					}}
				/>
			</ImageBackground>
		</View>
	)
};

const styles = StyleSheet.create({
	businessesComponent: {
		flex: 4,
		backgroundColor: 'grey',
		borderWidth: 1,
		borderColor: 'white',
		alignItems: 'stretch',
		padding: 10
	}	
});

export default BusinessesComponent;