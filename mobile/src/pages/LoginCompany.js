import React, {useState, useEffect} from 'react';
import logo from '../assets/logo.png';
import api from '../services/api';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
               navigation.navigate('CompanyDashboard');
               //navi;
            }
        })
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', {email})
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('CompanyDashboard');
        console.log(_id);
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios' } behavoir="padding" style={style.container}>
            <Image style={style.logo} source={logo} />
            <Text style={style.text}>Proffer spots for developers and find talents to master your business</Text>

            <View style={style.form}>
                <Text style={style.label}>E-MAIL *</Text>
                <TextInput 
                    style={style.input}
                    placeholder="e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity 
                    onPress={handleSubmit} 
                    style={style.button}>
                    <Text style={style.buttonText}>ENTER</Text>
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
        borderRadius: 2
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

    logo: {
        alignSelf: "center",
        marginBottom: 30,
    },

    text: {
        paddingHorizontal: 20,
        color: '#444',
        marginBottom: 8,
        fontSize: 18,
        textAlign: 'center',
    }

});