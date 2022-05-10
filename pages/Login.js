import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import React from 'react'
import Input from './components/Input'
import { useFonts, Montserrat_400Regular,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
const { width, height } = Dimensions.get('window')
const Login = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold
  })
  if (!fontsLoaded) {
    return <View />
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback>
          <View>
            <View>
              <Text style={styles.loginTxt}>Log in</Text>
            </View>
            <Input title="Phone Number" />
            <Input title="Password" password="true" />
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.btnTxt}>Log in</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.footer} >
              <View style={styles.txtContainer}>
                <Text style = {styles.accountTxt} >Don't have an account?</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity style={styles.signUpBtn}>
                  <Text style = {styles.signUpTxt}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.1,
    width: width,
  },
  loginTxt: {
    fontFamily: 'Montserrat_400Regular',
    paddingLeft: width * 0.05,
    fontSize: 30,
    marginBottom: height * 0.05,
  },
  loginBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    marginTop: height * 0.02,
    // overflow: 'hidden',
    backgroundColor: '#add8e6',
    borderRadius: 15,
    height: 45,
  },
  btnTxt: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 30,
    color: 'white',
  },
  txtContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    marginTop: height * 0.34,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountTxt : {
    fontSize: 18,
    fontFamily : "Montserrat_400Regular",
  },
  signUpBtn:{
    flex: 1,
    alignItems: 'center',
    justifyContent : "center",
    width : width *.4,
    borderRadius : 10,
  },
  signUpTxt:{
    fontFamily : "Montserrat_700Bold",
    color : "#add8e6",
    fontSize : 33,
  }
})
 