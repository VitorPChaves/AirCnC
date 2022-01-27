import React, {useState, useMemo} from 'react';
import { View, Image, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
//import Constants from 'expo-constants';
//import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios";

import camera from '../assets/camera.svg';
import office from '../assets/randomoffice.png';

export default function Book() {
    const [thumbnail, setThumbnail] = useState('');
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    //thumbnail = office;

    
    // const preview = useMemo(() => {
    //     return thumbnail ? URL.createObjectURL(thumbnail) : null;
    // }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const user_id = await AsyncStorage.getItem('user');
        const data = new FormData();

        //const thumbPath = thumbnail.uri.split('/');
        //const thumbName = thumbPath[thumbPath.length-1];
        //const thumbType = thumbnail;
        //thumbnail = thumbName;


        data.append('thumbnail', {
            uri: thumbnail.uri,
            type: thumbnail.type
        });
        //data.append('thumbnail', thumbnail)
        //data.append('thumbnail', thumbName);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        //console.log(thumbName);
        console.log(thumbnail);
        navigation.navigate('Dashboard');


        await api.post('/spots', data, {
            headers: {user_id}
        });

        
        Alert.alert('New spot created succesfully!');
        //console.log(data);
    }

    async function imagePickerCall() {
        // if (Constants.platform.ios) {
        //     const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        //     if (status !== "granted") {
        //         alert("Permission needed!");
        //         return;
        //     }
        // }

        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All
        });

        if (data.cancelled) {
            return;
        }

        if (!data.uri) {
            return;
        }

        setThumbnail(data);
        // const thumbnail = "https://cdn.homedsgn.com/wp-content/uploads/2013/10/Random-Studio-Office-09-800x531.jpg";
        // setThumbnail(thumbnail);
    }

    // async function handleImage() {
    //     uri: image ? image.uri : '../assets/randomoffice.png'
    // }

    // async function uploadImaage() {
    //     const data = new FormData();

    //     data.append("image", {
    //         uri: image.uri,
    //         type: image.type
    //     });
    // }

    

    function handleCancel() {
        navigation.navigate('Dashboard');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={{
                    uri: thumbnail 
                        ? thumbnail.uri 
                        : "https://media.gettyimages.com/photos/business-people-working-at-desk-by-windows-picture-id669887350?s=612x612"
                }}
                style={styles.image}
            />
            <TouchableOpacity
                onPress={imagePickerCall}
                style={styles.buttonImage}>
                <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Company name</Text>
            <TextInput
                style={styles.input}
                placeholder="ECorp"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={company}
                onChangeText={setCompany}
            />
            <Text style={styles.label}>Technologies</Text>
            <TextInput
                style={styles.input}
                placeholder="COBOL"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
            <Text style={styles.label}>Daily rate</Text>
            <TextInput
                style={styles.input}
                placeholder="$369"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={price}
                onChangeText={setPrice}
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
        flex: 1,
        margin: 30,
        justifyContent: 'center',
        //alignItems: 'center'
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
    },

    buttonImage: {
        width: 150,
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginLeft: 92
    },

    image: {
        width: 200,
        height: 100,
        //marginTop: 5,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 65
        //resizeMode: "contain",
        //borderRadius: 50
    },

    imageButton: {
        width: 150,
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        //marginTop: 20
    }
});