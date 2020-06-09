import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import BusinessComponent from './BusinessComponent';

const BusinessesComponent = (props) => {
    const businesses = global.config.businesses;
    const [ownedBusinesses, setOwnedBusinesses] = useState([businesses[0].name])

    const addRevenue = (revenue) => {
        props.setMoney(prevMoney => prevMoney + revenue);
    };

    const buyBusiness = (business) => {
        setOwnedBusinesses([...ownedBusinesses, business.name]);
    };

    return (
        <View style={styles.businessesComponent}>
            <FlatList
                data={businesses}
                extraData={addRevenue}
                keyExtractor={business => business.name}
                renderItem={({ item }) => {
                    const business = item;
                    return (
                        <BusinessComponent 
                            business={item}
                            addRevenue={addRevenue}
                            buyBusiness={buyBusiness}
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