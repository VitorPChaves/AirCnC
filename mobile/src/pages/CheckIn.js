import React, {useState, useEffect} from 'react';
import logo from '../assets/logo2x.png';
import api from '../services/api';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CheckIn() {
    const navigation = useNavigation();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    }, [])


    async function handleUser() {
        navigation.navigate('LoginUser');
    }  
    async function handleCompany() {
        navigation.navigate('LoginCompany');
    }  

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios' } behavoir="padding" style={style.container}>
            <Image style={style.logo} source={logo} />

            <View style={style.form}>
                <TouchableOpacity 
                    onPress={handleUser} 
                    style={style.button}>
                    <Text style={style.buttonText}>USER LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleCompany}
                    style={style.button}>
                    <Text style={style.buttonText}>COMPANY LOGIN</Text>
                </TouchableOpacity>
            </View>        
        </ KeyboardAvoidingView>
    );
}

//cria o container com a estilização css da aplicação
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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
        borderRadius: 2,
        marginBottom: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

    logo: {
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 20
        
    }
});