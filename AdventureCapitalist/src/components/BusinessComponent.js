import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import commonStyles from '../../assets/stylesheets/styles';
import ProgressBar from 'react-native-progress/Bar';

const BusinessComponent = (props) => {
    const [progress, setProgress] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [hired, setHired] = useState(props.automatic);

    var business = props.business;
    const progressRefreshInterval = 30;

    let progressTimeout;

    const pollProgress = (delay, startTime, stopTime, revenue) => {
        if (!progressTimeout) { }
        setTimeout(() => {
            const nowTime = Date.now();
            setProgress(1 - (stopTime - nowTime) / (stopTime - startTime));

            if (nowTime < stopTime) {
                pollProgress(delay, startTime, stopTime, revenue);
            } else {
                props.moneyTransaction(revenue);
                setAnimating(false);
                setProgress(0);

                if (props.automatic) {
                    addRevenueToBusiness();
                }
            }
        }, delay)
    };

    const addRevenueToBusiness = () => {
        setAnimating(true);
        const nowTime = Date.now();
        const workTime = business.time * 1000; // in ms
        const finishTime = nowTime + workTime;

        pollProgress(progressRefreshInterval, nowTime, finishTime, business.revenue);
    };

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
                    if (!animating) {
                        setAnimating(true);
                        addRevenueToBusiness();
                    }
                }}>
                <Image style={styles.businessImage} source={require('../../assets/profile.png')}></Image>
            </TouchableOpacity>

            <View style={styles.businessInfo}>
                <Text style={commonStyles.buttonText}>Cost: {business.cost}</Text>
                <Text style={commonStyles.buttonText}>Returns: {business.revenue}</Text>
            </View>
            {props.disabled ?
                <TouchableOpacity
                    style={styles.businessButton}
                    onPress={() => {
                        props.buyBusiness(business);
                    }
                    }>
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

                <Text style={commonStyles.buttonText}>upgrade: ${business.cost*business.costMult}</Text>
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