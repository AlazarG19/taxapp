import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'
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
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window')
const Purchase = () => {
  console.log(DatePicker)
  const [taxType, setTaxType] = useState('')
  const [price, setPrice] = useState('')
  const [total, setTotal] = useState('')
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  console.log(total, 'total')
  console.log(taxType)
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
          setTotal(`${finalprice}`)
          break
        case 'tot':
          finalprice = Math.round(100 * (intPrice + intPrice * 0.02)) / 100
          setTotal(`${finalprice}`)
          break
        default:
          setTotal(value)
      }
    }
  }

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
          setTotal(`${finalprice}`)
          break
        case 'tot':
          finalprice = Math.round(100 * (intPrice + intPrice * 0.02)) / 100
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
            <Text style={styles.dateTxt}>Date</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={styles.chooseDateBtn}
            >
              <Text style={styles.btnTxt}>Choose Date</Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </View>
        <Input on title="Check No" marginTop={height * 0.03} />
        <Input title="Item Id" marginTop={height * 0.03} />
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
          radioBackground="green"
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
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: height * 0.02,
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
            label={<Text style={styles.radioBtnLabel}>VAT 15%</Text>}
          />
          <RadioButtonItem
            value="credit"
            label={<Text style={styles.radioBtnLabel}>TOT 2%</Text>}
          />
        </RadioButtonGroup>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={styles.purchaseBtn}>
            <Text style={styles.purchasebtnTxt}>Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: width * 0.4,
    // backgroundColor : "green",
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: width * 0.1,
  },
  dateTxt: {
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
    flexDirection: 'row',
    // backgroundColor : "blue",
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.03,
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
