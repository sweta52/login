import React, {usetstate, createRef} from 'react';
import {Stylesheet, TextInput, View, Text,ScrollView,Image,KebordTouchableOpacity,KeyboardAvoidingView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = ({Navigation}) =>
{
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const passwordInputRef= createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (! userEmail) {
            altert('Please Enter the Email')
            return;
        }
        if(! userPassword){
            alert ('please Enter the Password')
            return;
        }
        setloading(true);
        let dataToSend = {email: userEmail, password: userPassword};
        let formBody= [];
        for (let Key in dataToSend ) {
            let encodedKey = encodeURIComponent(Key);
            let encodedValue = encodeURIComponent(dataToSend[Key]);
            formBody.push(encodedKey + '=' + encodedValue);


        }
        formBody= formBody.join('&');

        fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            body: formBody,
            headers: {
              //Header Defination
              'Content-Type':
              'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((responseJson) => {
              //Hide Loader
              setLoading(false);
              console.log(responseJson);
              // If server response message same as Data Matched
              if (responseJson.status === 'success') {
                AsyncStorage.setItem('user_id', responseJson.data.email);
                console.log(responseJson.data.email);
                navigation.replace('DrawerNavigationRoutes');
              } else {
                setErrortext(responseJson.msg);
                console.log('Please check your email id or password');
              }
            })
            .catch((error) => {
              //Hide Loader
              setLoading(false);
              console.error(error);
            });
        };
        return(
            <View style ={Stylesheet.mainBody}>
<Loader loading ={loading}/>
<ScrollView keyboardShouldPersistTaps="handled"
contentContainerStyle={{flex: 1,
    justifyContent: 'center',
    alignContent: 'center',}}>
        <View>
            <KeyboardAvoidingView enabled>
                <View style={{alignItems: 'center'}}
                >
<Image source={require("./assets/images.jpg")}
            style={{
                width: '50%',
                height: 100,
                resizeMode: 'contain',
                margin: 30,
                }}/></View>
                <View style ={styles.SectionStyle}>
                    <TextInput style={Stylesheet.inputStyle}
                    onChangeText={(userEmail) =>
                   setUserEmail(userEmail)}
                  placeholder= "Enter Email"
                  placeholderTextColor= "#8b9cb5"
                  autoCapitalize= "none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                }
                  underlineColorAndroid=" #f000"
                  blurOnSubmit={false}

                   />

                </View>
                <View style ={styles.SectionStyle}>
                <TextInput style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)}
                placeholder= "Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={{passwordInputRef}}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType= "next"/>
                </View>
                {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}

<TouchableOpacity style = {styles. buttonStyle} 
 activeopacity={0.5}
 onPress={handleSubmitPress}>
     <Text style= {styles.buttonTextStyle}>LOGIN</Text>

</TouchableOpacity>
<Text style={styles.registerTextStyle}
onPress = {() =>
    navigation.navigate('RegisterScreen')}>
        New Here ? Register
        </Text>
</KeyboardAvoidingView>
</View>
</ScrollView>
 </View>
        )
}
export default LoginScreen;

const styles=Stylesheet.create({

    mainBody:{

        flex:1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
       },
       SectionStyle:{
     flexDirection: 'row',
     height:40,
     marginTop:20,
     marginLeft:35,
     marginRight:35,
     margin:10,

       },
       
})