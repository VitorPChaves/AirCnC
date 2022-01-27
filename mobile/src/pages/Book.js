import React, {useState} from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

// Obs: adicionar foto e nome do escritorio

export default function Book() {
    const [date, setDate] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        const spot_id = route.params;
        //const company = route.params.company;
        //const spot_id = await AsyncStorage.getItem('_id');
        //const spot_id = navigation.getParam('id');

        console.log(user_id, spot_id);

        await api.post(`/spots/${spot_id}/bookings`, {date}, {
            headers: {user_id}
        });

        Alert.alert('Booking requested succesfully!');
        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Booking Date</Text>
            <TextInput 
                style={styles.input}
                placeholder="00/00/0000"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity 
                onPress={handleSubmit} 
                style={styles.button}>
                <Text style={styles.buttonText}>SEND REQUEST</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleCancel} 
                style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});