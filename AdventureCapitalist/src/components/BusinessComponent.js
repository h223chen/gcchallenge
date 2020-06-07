import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import commonStyles from '../../assets/stylesheets/styles';

const BusinessComponent = (props) => {
    const business = props.business;

    return (
        <View style={styles.businessComponent}>
            <TouchableOpacity onPress={() => {
                props.addRevenue(business.revenue);
            }}>
                <Image style={styles.businessImage} source={require('../../assets/profile.png')}></Image>
            </TouchableOpacity>

            <View style={styles.businessInfo}>
                <Text style={commonStyles.buttonText}>Cost: {business.cost}</Text>
                <Text style={commonStyles.buttonText}>Returns: {business.revenue}</Text>
            </View>
            
            <TouchableOpacity style={styles.businessButton}>
                <Text style={commonStyles.buttonText}>Hire Manager</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
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

export default BusinessComponent;