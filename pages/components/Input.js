import { StyleSheet, Text,TextInput, View ,Dimensions} from 'react-native'
import React,{useState} from 'react'
const { width, height } = Dimensions.get('window')

const Input = (props) => {
    const [borderWidth,setBW] = useState(0)
  return (
    <View style={"marginTop" in props ? [styles.formContainer,{marginTop : props.marginTop}] : styles.formContainer }>
        <Text style={styles.Title}>{props.title}</Text>
        <TextInput  onFocus={()=>{setBW(2)}} onEndEditing = {()=>{setBW(0)}} style={[styles.Input,{borderWidth}]} placeholder={props.title} secureTextEntry = {"password" in props ? true : false}/>
      </View>
  )
}

export default Input

const styles = StyleSheet.create({
    formContainer: {
        marginTop: height * 0.01,
        paddingLeft: width * 0.05,

      },
      Title: {
        fontSize: 18,
        fontFamily : "Montserrat_400Regular",
      },
      Input : {
        marginTop : height * 0.005,
        height : 40,
        fontSize: 18,
        paddingLeft:10,
        borderRadius : 10,
        width : width *.8,
        borderColor : "#add8e6",
        fontFamily : "Montserrat_400Regular",
      }
})