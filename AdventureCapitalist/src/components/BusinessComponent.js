import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import commonStyles from '../../assets/stylesheets/styles';
import ProgressBar from 'react-native-progress/Bar';

const BusinessComponent = (props) => {
    const [progress, setProgress] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [automatic, setAutomatic] = useState(false);

    const business = props.business;
    const progressRefreshInterval = 30;

    const pollProgress = (delay, startTime, stopTime, revenue) => {
        setTimeout(function() {
            const nowTime = Date.now();
            setProgress(1 - (stopTime - nowTime)/(stopTime - startTime));

            if (nowTime < stopTime) {
                pollProgress(delay, startTime, stopTime, revenue);
            } else {
                props.addRevenue(revenue);
                setAnimating(false);
                setProgress(0);
                                
                if (automatic) {
                    setAnimating(true);
                    addRevenueToBusiness(business);
                }
            }
          }, delay)
    };
    
    const addRevenueToBusiness = (business) => {       
        const nowTime = Date.now();
        const workTime = business.time * 1000; // in ms
        const finishTime = nowTime + workTime;

        pollProgress(progressRefreshInterval, nowTime, finishTime, business.revenue);
    };    

    return (
        <View style={styles.businessComponent}>                        
            <TouchableOpacity 
                pointerEvents={props.disabled ? 'none' : 'auto'} 
                style={[props.disabled ? commonStyles.disabled : '']}
                onPress={() => {
                if (!animating) {
                    setAnimating(true);
                    addRevenueToBusiness(business);
                }
            }}>                
                <Image style={styles.businessImage} source={require('../../assets/profile.png')}></Image>
            </TouchableOpacity>

            <View style={styles.businessInfo}>
                <Text style={commonStyles.buttonText}>Cost: {business.cost}</Text>
                <Text style={commonStyles.buttonText}>Returns: {business.revenue}</Text>
            </View>            
            {props.disabled ? 
                <View style={styles.businessButton}>
                    <TouchableOpacity onPress={() => {
                        props.buyBusiness(business);
                    }}>
                        <Text style={commonStyles.buttonText}>Buy Business: ${business.cost}</Text>
                    </TouchableOpacity>
                </View> 
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
                style={[styles.businessButton, props.disabled || automatic ? commonStyles.disabled : '']}
                onPress={() => {
                    setAutomatic((automatic) => {
                        return automatic = true;
                    });
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