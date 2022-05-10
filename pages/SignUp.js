import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useState } from 'react'
import Input from './components/Input'
import { useFonts,Montserrat_400Regular,Montserrat_700Bold} from '@expo-google-fonts/montserrat'
const { width, height } = Dimensions.get('window')
const SignUp = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold
  });
  if (!fontsLoaded) {
    return <View/>;
  }
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.signUpTitle}>Sign Up</Text>
            <Input title="Name" />
            <Input title="Phone Number" />
            <Input title="Password" password="true" />
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity style={styles.signUpBtn}>
                <Text style={styles.btn}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.alreadyText}>Already have an account ?</Text>
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginBtnTxt}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.1,
    width: width,
  },
  signUpTitle: {
    fontFamily : "Montserrat_400Regular",
    paddingLeft: width * 0.05,
    fontSize: 30,
    marginBottom: height * 0.05,
  },
  btn: {
    fontFamily : "Montserrat_400Regular",
    fontSize: 30,
    color : "white" 
  },

  signUpBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent : "center",
    width: width * 0.9,
    marginTop: height * 0.02,
    // overflow: 'hidden',
    backgroundColor: '#add8e6',
    borderRadius: 15,
    height : 45
  },
  signUpText: {
    fontSize: 20,
    paddingLeft: width * 0.05,
  },
  loginBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent : "center",
    width : width *.4,
    borderRadius : 10,
  },
  alreadyText: {
    fontSize: 18,
    fontFamily : "Montserrat_400Regular",
  },
  footer: {
    marginTop: height * 0.3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnTxt :{
    fontFamily : "Montserrat_700Bold",
    color : "#add8e6",
    fontSize : 33,
  }
})
