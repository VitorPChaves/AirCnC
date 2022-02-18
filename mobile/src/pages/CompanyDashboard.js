import React, { useEffect, useState} from 'react';
//import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../services/api';
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import SpotListCompany from '../components/SpotListCompany';

export default function CompanyDashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    const navigation = useNavigation();
    //const user_id = AsyncStorage.getItem('user');

    //executa a ação assim que o componente é exposto na tela
    useEffect(() => {
        async function loadSpots() {
            const user_id = AsyncStorage.getItem('user');
            const response = await api.get('/dashboard', {
                params: {user_id}
            });

            //console.log(response.data);
            setSpots(response.data);
            //console.log(spots);
        }
        loadSpots();
    }, []);

    async function handleNewSpot() {
        navigation.navigate('NewSpot');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logoStyle} source={logo}/>
            <Text style ={styles.title}>Your spots</Text>
            <Text>Hello</Text>

            {/* //percorre o array de techs e lista
            //"key" identifica os spots no map */}
            <ScrollView>
                {/*{spots.map(spot => <SpotListCompany key={spot._id} spot={spot}/>)}*/}
                {spots.map(spot => (
                    <View style={styles.itemList}>
                        <Image style={styles.thumbnail} source={{uri:spot.thumbnail_url}} />
                        <Text>Hello</Text>
                        <Text style={styles.price}>{spot.price ? `$${spot.price}/day` : 'Free Spot'}</Text>
                    </View>))}
            </ScrollView>
            <View style={styles.form}>
                <TouchableOpacity onPress={handleNewSpot} style={styles.button}>
                    <Text style={styles.buttonText}>ADD NEW SPOT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logoStyle: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
        marginTop: 30,
    },
    
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
        paddingBottom: 300,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        paddingHorizontal: 30,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});