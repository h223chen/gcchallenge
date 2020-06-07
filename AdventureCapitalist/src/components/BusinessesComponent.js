import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import BusinessComponent from './BusinessComponent';
import commonStyles from '../../assets/stylesheets/styles';

const BusinessesComponent = (props) => {
    const businesses = global.config.businesses;

    const addRevenue = (revenue) => {
        console.log(props.money);
        props.setMoney(props.money + revenue);
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
    },
    businessComponent: {
        flexDirection: 'row',
        margin: 10,
        borderWidth: 1,
        borderColor: 'blue'
    },
    businessImage: {
        margin: 5,
        borderRadius: 50,
        width: 50,
        height: 50
    },
    businessInfo: {        
        flexDirection: 'column',
        margin: 5
    },
    businessButton: {
        ...commonStyles.button,
        flex: 2,
        height: 50,
        marginVertical: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
            
    }
});

export default BusinessesComponent;