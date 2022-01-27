import React, { useEffect, useState} from 'react';
//import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../services/api';
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.png';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();
  const user_id = AsyncStorage.getItem('user');
  
//   const socket = useMemo(() => socketio('http://localhost:3333', {
//     query: { user_id },
//   }), [user_id]);
  
//   useEffect(() => {
//     socket.on('booking_request', data => {
//       setRequests([...requests, data]);
//     })
//   }, [requests, socket]);


  useEffect(() => {
    async function loadSpots() {
        const user_id = await AsyncStorage.getItem('user');
        const response = await api.get('/dashboard', {
            headers: { user_id }
        });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

//   async function handleAccept(id) {
//     await api.post(`/bookings/${id}/approvals`);

//     setRequests(requests.filter(request => request._id !== id));
//   }

//   async function handleReject(id) {
//     await api.post(`/bookings/${id}/rejections`);

//     setRequests(requests.filter(request => request._id !== id));
//   }

  async function handleNewSpot() {
    navigation.navigate('NewSpot');
  }

//   async function handleNavigate(id) {
//     navigation.navigate('Book', {id});
// }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logoStyle} source={logo}/>

            {/* //percorre o array de techs e lista
            //"key" identifica os spots no map */}
            <ScrollView>
                {spots.map(spot => (
                    <SpotListCompany key={spot} spot={spot}/>
                ))}
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