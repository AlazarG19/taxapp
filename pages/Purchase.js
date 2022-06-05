import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import MenuBar from '../Icons/menu.png'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import Input from './components/Input'
import HalfInput from './components/HalfInput'
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button'
const { width, height } = Dimensions.get('window')
const Purchase = () => {
  const [taxType, setTaxType] = useState('')
  const [taxValue, setTaxValue] = useState('')
  const [price, setPrice] = useState('')
  const [total, setTotal] = useState('')
  const [checkValue ,setCheckValue] = useState('')
  const [itemid,setItemid] = useState('')
  const [quantity,setQuantity] = useState('')
  // function to change text 
  const onCheckChange = (value) => {
    setCheckValue(value)
  }
  const onItemIdChange = (value) => {
    setItemid(value)
  }
  const onQuantityChange = (value) => {
    setQuantity(value)
  }
  // end of function to change text
  // date states

  const [date, setDate] = useState(new Date())
  const [datetouched, setDatetouched] = useState(false)
  const [show, setShow] = useState(false)
  // end of date states

  // date  functions

  const onChange = (event, selectedDate) => {
    setDatetouched(true)
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
  }
  // end of date functions
  const priceOnChange = (value) => {
    if (value === '') {
      console.log('nothing to change')
      setPrice('')
      setTotal('')
    } else {
      let intPrice = parseInt(value)
      setPrice(value)
      let finalprice
      switch (taxType) {
        case 'vat':
          finalprice = Math.round(100 * (intPrice + intPrice * 0.15)) / 100
          setTaxValue(intPrice * 0.15)
          setTotal(`${finalprice}`)
          break
        case 'tot':
          finalprice = Math.round(100 * (intPrice + intPrice * 0.02)) / 100
          setTaxValue(intPrice * 0.02)
          setTotal(`${finalprice}`)
          break
        default:
          setTotal(value)
      }
    }
  }
  // validation 
  // const [validCheck, setValidCheck] = useState(true)
  // const [validItemId, setValidItemId] = useState(true)
  // const [validation, setValidation] = useState(true)
  // const [validationMessage, setValidationMessage] = useState('')
  // const validate = () => {

  //   if (checkValue === '') {
  //     setValidCheck(false)
  //     Alert.alert("Please fill all the fields","Please fill in check number",[
  //       {text:"OK",onPress:()=>{
  //       }}
  //     ])
  //   } 
  //   if( itemid === "" ){
  //     Alert.alert("Please fill all the fields","Please fill in the item id",[
  //       {text:"OK",onPress:()=>{
  //       }}
  //     ])
  //   }
  //   else {
  //     setValidation(true)
  //     setValidationMessage('')
  //   }
  //   if(!validation){
  //     console.log("this is validation message",validationMessage)
      
  //   }
  // }


  // end of validation 
  const vatOnSelect = (value) => {
    console.log('vat type')
    setTaxType(value)
    let intPrice = parseInt(price)
    if (price === '' || total === '') {
      console.log('nothing to change')
    } else {
      let finalprice
      switch (value) {
        case 'vat':
          finalprice = Math.round(100 * (intPrice + intPrice * 0.15)) / 100
          console.log('finalprice in vat', intPrice + intPrice)
          setTaxValue(intPrice * 0.15)
          setTotal(`${finalprice}`)
          break
        case 'tot':
          finalprice = Math.round(100 * (intPrice + intPrice * 0.02)) / 100
          setTaxValue(intPrice * 0.02)
          setTotal(`${finalprice}`)
          break
        default:
          setTotal(price)
      }
    }
  }
  const cashOnSelect = () => {
    console.log('pressed')
  }
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  })
  if (!fontsLoaded) {
    return <View />
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.openDrawer()
          }}
        >
          <Image style={styles.menuBar} source={MenuBar} />
        </TouchableOpacity>
        <View style={styles.headerTxtContainer}>
          <Text style={styles.headerTxt}>Purchase</Text>
        </View>
      </View>
      <View style={styles.purchaseForm}>
        <View style={styles.dateContainer}>
          <View style={styles.dateTxtContainer}>
            <Text style={styles.dateTxt}>
              Date :
              {datetouched
                ? date.toLocaleString().substring(0, 10) +
                  ' ' +
                  date.toLocaleString().substring(20, 24)
                : 'Please Select Date'}
            </Text>
          </View>
          <View style={styles.dateInputContainer}></View>
          <View>
            <TouchableOpacity onPress={showMode} style={styles.chooseDateBtn}>
              <Text style={styles.btnTxt}>Choose Date</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Input onChangeText = {onCheckChange} title="Check No" marginTop={height * 0.03} />

        <Input onChange = {onItemIdChange} title="Item Id" marginTop={height * 0.03} />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <HalfInput value={price} onChangeText={priceOnChange} title="Price" />
          <HalfInput
            value={total}
            onChangeText={(value) => {
              setTotal(value)
            }}
            title="Total"
          />
        </View>
        <RadioButtonGroup
          containerStyle={styles.radioButtonGroup}
          selected={taxType}
          onSelected={vatOnSelect}
          radioBackground="blue"
        >
          <RadioButtonItem
            value="vat"
            label={<Text style={styles.radioBtnLabel}>VAT 15%</Text>}
          />
          <RadioButtonItem
            value="tot"
            label={<Text style={styles.radioBtnLabel}>TOT 2%</Text>}
          />
          <RadioButtonItem
            value="exempt"
            label={<Text style={styles.radioBtnLabel}>EXEMPT</Text>}
          />
        </RadioButtonGroup>
        <View style={styles.taxTxtContainer}>
          <Text style={styles.taxTxt}>
            Tax : {taxType ? taxValue : 'None '}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
          }}
        >
          <HalfInput
            value={''}
            onChangeText={(value) => {
              console.log('hello')
            }}
            title="Quantity"
          />
        </View>
        <RadioButtonGroup
          containerStyle={styles.radioButtonGroup}
          selected={taxType}
          onSelected={cashOnSelect}
          radioBackground="green"
        >
          <RadioButtonItem
            value="cash"
            label={<Text style={styles.radioBtnLabel}>Cash</Text>}
          />
          <RadioButtonItem
            value="credit"
            label={<Text style={styles.radioBtnLabel}>Credit</Text>}
          />
        </RadioButtonGroup>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity 
          style={styles.purchaseBtn}>
            <Text style={styles.purchasebtnTxt}>Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          themeVariant="dark"
        />
      )}
    </View>
  )
}

export default Purchase

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.1,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 20,
    height: height * 0.05,
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 30,
    justifyContent: 'center',
  },
  headerTxtContainer: {
    marginLeft: width * 0.25,
  },
  menuBar: {
    width: 25,
    height: 25,
  },
  purchaseForm: {
    flex: 1,
    paddingTop: height * 0.02,
  },
  chooseDateBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.4,
    // overflow: 'hidden',
    backgroundColor: 'blue',
    borderRadius: 15,
    height: 45,
  },
  dateTxtContainer: {
    height: 45,
    // backgroundColor : "green",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  taxTxtContainer: {
    paddingTop: height * 0.02,
    width: '100%',
    alignItems: 'center',
  },
  dateTxt: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 25,
  },
  taxTxt: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 25,
  },
  btnTxt: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    color: 'white',
  },
  dateContainer: {
    width: width,
    flexDirection: 'column',
    // backgroundColor : "blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.01,
  },
  radioBtnLabel: {
    fontSize: 20,
    color: 'black',
  },
  purchaseBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.5,
    // overflow: 'hidden',
    backgroundColor: 'blue',
    borderRadius: 15,
    height: 55,
    marginTop: height * 0.05,
  },
  purchasebtnTxt: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 25,
    color: 'white',
  },
})
