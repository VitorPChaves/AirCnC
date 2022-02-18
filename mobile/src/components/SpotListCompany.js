import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import api from '../services/api';
//import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import { socketio } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SpotListCompany() {
    const [spots, setSpots] = useState([]);
    //const navigation = useNavigation();
    //const navigation = this.props.navigation;    

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                //renders the list of spots
                renderItem={({ item }) => (
                    <View style={styles.itemList}>
                        <Image style={styles.thumbnail} source={{uri:item.thumbnail_url}} />
                        <Text>Hello</Text>
                        <Text style={styles.price}>{item.price ? `$${item.price}/day` : 'Free Spot'}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    bold : {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20,
    },

    itemList: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
});

//export default withNavigation(SpotList);