import React from 'react'
import LottieView from "lottie-react-native"
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Splash() {
    const navigation = useNavigation();

    return (
        <View style={styles.form}>
            <LottieView 
                source={require('../assets/splash.json')} 
                autoPlay 
                loop={false}
                onAnimationFinish={() => navigation.navigate('CheckIn')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ff5a6f',
    }
})