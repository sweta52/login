import React, {useState,UseEffect} from 'react';
import { ActivityIndicator,View,StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Value } from 'react-native-reanimated';

const SplashScreen=({Navigation}) => {
const [animating, setAnimating] = useState(true);


useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
        AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        ),
      );
    }, 5000);
  }, []);
  return(

    <View style ={StyleSheet.container}>
        <Image source={require("./assets/images.jpg")}
         style= {{width: '90%' , resizeMode: 'contain', margin:30}}/>
         <ActivityIndicator animating={animating}
         color="#FFFFFF"
         size="large"
         style={StyleSheet.ActivityIndicator}/>
         </View>
  );
  };
  export default SplashScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    ActivityIndicator: {
        alignItems: 'center',
        height: 80,

    },
})










