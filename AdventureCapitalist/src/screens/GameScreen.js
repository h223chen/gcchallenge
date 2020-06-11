import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import BusinessesComponent from '../components/BusinessesComponent';
import ProfileComponent from '../components/ProfileComponent';

const GameScreen = () => {
    const [money, setMoney] = useState(global.storage.getMoney());

    return (
        <View style={styles.GameScreen}>            
            <ProfileComponent money={money}></ProfileComponent>
            <BusinessesComponent money={money} setMoney={setMoney}></BusinessesComponent>           
        </View>
    )
};

const styles = StyleSheet.create({
    GameScreen: {
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'stretch',
        backgroundColor: 'grey',
        margin: 10
    }
});

export default GameScreen;