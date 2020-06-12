import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import BusinessComponent from './BusinessComponent';

const BusinessesComponent = (props) => {
	const businesses = global.config.businesses;
	const [ownedBusinesses, setOwnedBusinesses] = useState(global.storage.getBusinesses());
	const [managedBusinesses, setManagedBusinesses] = useState(global.storage.getManagers());

	const moneyTransaction = (amount) => {
		props.setMoney((prevMoney) => {
			const updatedMoney = prevMoney + amount;
			global.storage.setMoney(updatedMoney);

			return updatedMoney;
		});
	};

	const buyBusiness = (business) => {
		const canBuy = props.money >= business.cost && ownedBusinesses.indexOf(business.name) < 0;
		if (canBuy) {
			moneyTransaction(-business.cost);

			const updatedOwnedBusinesses = [...ownedBusinesses, business.name];
			setOwnedBusinesses(updatedOwnedBusinesses);
			global.storage.setBusinesses(updatedOwnedBusinesses);
		}

		return canBuy;
	};

	const hireManager = (business) => {
		const canHire = props.money >= business.managerCost && managedBusinesses.indexOf(business.name) < 0
		if (canHire) {
			moneyTransaction(-business.managerCost); // TODO: moneyTransaction should check amount

			const updatedManagedBusinesses = [...managedBusinesses, business.name];
			setManagedBusinesses(updatedManagedBusinesses);
			global.storage.setManagers(updatedManagedBusinesses);
		}

		return canHire;
	};

	const upgradeBusiness = (business) => {
		const upgradeCost = business.cost * business.costMult;
		const canUpgrade = props.money >= upgradeCost;

		if (canUpgrade) {
			moneyTransaction(-upgradeCost);

			business.cost *= business.costMult;
			business.revenue *= business.revenueMult;

			let financials = global.storage.getFinancials();
			financials[business.name].cost = business.cost;
			financials[business.name].revenue = business.revenue;

			global.storage.setFinancials(financials);
		}

		return canUpgrade;
	}

	return (
		<View style={styles.businessesComponent}>
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