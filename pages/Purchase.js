import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Formik } from 'formik'
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
import * as yup from 'yup'
const validationScheme = yup.object().shape({
  checkNo: yup.string().required().label('Check No'),
  itemId: yup.string().required().label('Item id'),
  quantity: yup.string().required().label('Quantity'),
})
const Purchase = (props) => {
  const [taxType, setTaxType] = useState('exempt')
  const [taxValue, setTaxValue] = useState('')
  const [paymentType, setPaymentType] = useState('cash')
  const [price, setPrice] = useState('')
  const [total, setTotal] = useState('')

  // validation
  const [priceMessage, setPriceMessage] = useState('')
  const [dateMessage, setDateMessage] = useState('')

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

  const [date, setDate] = useState("Please select a date")
  const [datetouched, setDatetouched] = useState(false)
  const [show, setShow] = useState(false)
  // end of date states

  // date  functions
console.log("the date",date)
  const onChange = (event, selectedDate) => {
    // setDatetouched(true)
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
  }
  // end of date functions
  const priceOnChange = (value) => {
    setPriceMessage('')
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
        case 'exempt':
          setTaxValue(0)
        default:
          setTotal(value)
      }
    }
  }
  const vatOnSelect = (value) => {
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
        case 'exempt':
          setTaxValue(0)
        default:
          setTotal(price)
      }
    }
  }
  const cashOnSelect = (value) => {
    setPaymentType(value)
  }
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  })
  if (!fontsLoaded) {
    return <View />
  }
  return (
    <SafeAreaView>
      
      <ScrollView style = {styles.scrollview}>
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
        <View style={styles.container}>
          <Formik
            initialValues={{ checkNo: '', itemId: '', quantity: '' }}
            onSubmit={(values) => {
              if (price === '') {
                setPriceMessage('Please enter price')
              } 
              else if(date === 'Please select a date'){
                setDateMessage('Please Enter a date')}
              else {
                alert('submitted')
                values['price'] = price
                values['total'] = total
                values['taxType'] = taxType
                values['taxValue'] = taxValue
                values['paymentType'] = paymentType
                values['date'] = date
                }
                console.log(values)
            }}
            validationSchema={validationScheme}
          >
            {(formikProps) => (
              <View style={styles.purchaseForm}>
                <View style={styles.dateContainer}>
                  <View style={styles.dateTxtContainer}>
                    <Text style={styles.dateTxt}>
                      Date :
                      {date == "Please select a date"?
                          'Please Select Date':
                           date.toLocaleString().substring(0, 10) +
                            ' ' +
                            date.toLocaleString().substring(20, 24)}
                    </Text>

                    <Text style={styles.errorMessgeDate}>{dateMessage}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={showMode}
                      style={styles.chooseDateBtn}
                    >
                      <Text style={styles.btnTxt}>Choose Date</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Input
                  onBlur={formikProps.handleBlur('checkNo')}
                  onChangeText={formikProps.handleChange('checkNo')}
                  title="Check No"
                  marginTop={height * 0.03}
                />
                <Text style={styles.errorMessge1}>
                  {formikProps.touched.checkNo && formikProps.errors.checkNo}
                </Text>
                <Input
                  onBlur={formikProps.handleBlur('itemId')}
                  onChangeText={formikProps.handleChange('itemId')}
                  title="Item Id"
                />
                <Text style={styles.errorMessge1}>
                  {formikProps.touched.itemId && formikProps.errors.itemId}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <HalfInput
                    value={price}
                    onChangeText={priceOnChange}
                    title="Price"
                  />

                  <HalfInput
                    value={total}
                    onChangeText={(value) => {
                      setTotal(value)
                    }}
                    title="Total"
                  />
                </View>
                <Text style={styles.errorMessge1}>{priceMessage}</Text>
                <RadioButtonGroup
                  containerStyle={styles.radioButtonGroup}
                  selected={taxType}
                  onSelected={vatOnSelect}
                  radioBackground="#004C99"
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
                    Tax : {taxType != 'exempt' ? taxValue : '0'}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                  }}
                >
                  <HalfInput
                    onBlur={formikProps.handleBlur('quantity')}
                    onChangeText={formikProps.handleChange('quantity')}
                    title="Quantity"
                  />
                  <Text style={styles.errorMessge1}>
                    {formikProps.touched.quantity &&
                      formikProps.errors.quantity}
                  </Text>
                </View>
                <RadioButtonGroup
                  containerStyle={styles.radioButtonGroup}
                  selected={paymentType}
                  onSelected={cashOnSelect}
                  radioBackground="#004C99"
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
                    onPress={formikProps.handleSubmit}
                    style={styles.purchaseBtn}
                  >
                    <Text style={styles.purchasebtnTxt}>Purchase</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date == "Please select a date" ? new Date() : date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
              themeVariant="dark"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Purchase

const styles = StyleSheet.create({
  container: {
  flex : 1,
  },
  scrollview:{
  // backgroundColor : "red", 
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop : height*0.04,
    height: height * 0.13,
    alignItems: 'center',
    backgroundColor: '#1A334D',
  },
  headerTxt: {
    fontSize: 30,
    justifyContent: 'center',
    color : "#F5F6F8"
  },
  headerTxtContainer: {
    
    marginLeft: width * 0.25,
  },
  menuBar: {
    width: 25,
    height: 25,
  },
  purchaseForm: {
    backgroundColor : "#E0E3E9",
    flex: 1,
    paddingTop: height * 0.02,
  },
  chooseDateBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.4,
    // overflow: 'hidden',
    marginTop : height * 0.02,
    backgroundColor: '#004C99',
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
    // backgroundColor : "#004C99",
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
    fontFamily: 'Montserrat_400Regular',                
    color: 'black',
  },
  purchaseBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.5,
    // overflow: 'hidden',
    backgroundColor: '#004C99',
    borderRadius: 15,
    height: 55,
    marginTop: height * 0.05,
    marginBottom: height * 0.1,
  },
  purchasebtnTxt: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 25,
    color: 'white',
  },
  errorMessge1: {
    color: 'red',
    fontSize: 18,
    marginLeft: width * 0.05,
  },
  errorMessgeDate: {
    color: 'red',
    fontSize: 18,
    marginLeft: width * 0.2,
  },
})
