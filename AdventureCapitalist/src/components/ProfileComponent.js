import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ProfileComponent = ({money}) => {
    return (
        <View style={styles.profileComponent}>
            <Image style={styles.profileImage} source={require('../../assets/profile.png')}/>
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