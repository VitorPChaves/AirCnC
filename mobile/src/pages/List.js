import React, {useState, useEffect} from 'react'; 
import { SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
    //seta as techs em um array
    const [techs, setTechs] = useState([]);

    //pega as strings das techs do storage e transforma em array
    useEffect(() => {
        AsyncStorage.getItem('techs').then(techStorage => {
            //"split"separa as posições do array por virgula e "trim" remove os espaços  
            const techsArray = techStorage.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logoStyle} source={logo}/>

            {/* //percorre o array de techs e lista
            //"key" identifica as techs no map */}
            <ScrollView>
                {techs.map(techno => <SpotList key={techno} tech={techno}/>)}
            </ScrollView>
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
    }
});