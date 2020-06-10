import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import BusinessComponent from './BusinessComponent';

const BusinessesComponent = (props) => {
    const businesses = global.config.businesses;
    const [ownedBusinesses, setOwnedBusinesses] = useState([businesses[0].name]);
    const [managedBusinesses, setManagedBusinesses] = useState([]);

    const moneyTransaction = (amount) => {
        props.setMoney(prevMoney => prevMoney + amount);
    };

    const buyBusiness = (business) => {
        if (props.money >= business.cost && ownedBusinesses.indexOf(business.name) < 0) {
            moneyTransaction(-business.cost);
            setOwnedBusinesses([...ownedBusinesses, business.name]);
        }
    };

    const hireManager = (business) => {
        if (props.money >= business.managerCost && managedBusinesses.indexOf(business.name) < 0) {
            moneyTransaction(-business.managerCost);
            setManagedBusinesses([...managedBusinesses, business.name]);
        }
    };

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