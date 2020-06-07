import React from 'react';
import { StyleSheet, View, Image, FlatList, Button} from 'react-native';
import BusinessComponent from './BusinessComponent';

const BusinessesComponent = (props) => {
    const businesses = global.config.businesses;

    const addRevenue = (revenue) => {
        props.setMoney(props.money + revenue);
    };

    return (
        <View style={styles.businessesComponent}>
            <FlatList
                data={businesses}
                keyExtractor={business => business.name}
                renderItem={({ item }) => {
                    return (
                        <BusinessComponent business={item} addRevenue={addRevenue}></BusinessComponent>                        
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