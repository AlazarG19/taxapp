import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import profiePic from '../../Images/Photo.png'
import sales from '../../Icons/sale.png'
import purchase from '../../Icons/purchase.png'
import salesReport from '../../Icons/salesReport.png'
import purchaseReport from '../../Icons/purchaseReport.png'
// import Home  from '../../Icons/index'
const CustomSideMenu = () => {
  const sideList = [
    // { icon: Home, title: 'Home', keys: 1 },
    { icon: sales, title: 'Sales', keys: 2 },
    { icon: purchase, title: 'Purchase', keys: 3 },
    { icon: salesReport, title: 'Sales Report', keys: 4 },
    { icon: purchaseReport, title: 'Purchase Report', keys: 5 },
  ]
  const sideList2 = [
    // { icon: Home, title: 'Home', keys: 1 },
    { icon: sales, title: 'Share', keys: 2 },
    { icon: purchase, title: 'Help And Feeback', keys: 3 },
  ]
  const [selectedId, setSelectedId] = useState(null)
  const Item = ({  onPress,icon,title, backgroundColor, color }) => {
    return(
    <TouchableOpacity
      onPress={onPress}
      style={[styles.sideitem, { backgroundColor }]}
    >
      <Image source={icon} style={styles.icon} />
      {/* <Home  /> */}
      <View style={styles.iconTxtContainer}>
        <Text style={[styles.iconTxt, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
    )
  }
  const renderItem = ({ item, onPress }) => {
    const backgroundColor = item.keys == selectedId ? 'wheat' : 'white'
    const color = item.keys == selectedId ? 'teal' : 'black'
    console.log(item.title ,backgroundColor)
    return (
      <Item
        onPress={() => {setSelectedId(item.keys)}}
        title={item.title}
        icon = {item.icon}
        backgroundColor={backgroundColor}
        color={color}
      />
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerPart1}>
        <Image source={profiePic} style={styles.logo} />
        <Text style={styles.brand}>Brand</Text>
      </View>
      <View style={styles.containerPart2}>
        <FlatList
          data={sideList}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.keys}
        />
      </View>
      <View style={styles.containerPart3}>
        <FlatList
          data={sideList}
          renderItem={(item) => {
            return (
              <View style={styles.sideitem}>
                <Image source={item.item.icon} style={styles.icon} />
                {/* <Home  /> */}
                <View style={styles.iconTxtContainer}>
                  <Text style={styles.iconTxt}>{item.item.title}</Text>
                </View>
              </View>
            )
          }}
          keyExtractor={(item) => item.keys}
        />
      </View>
    </View>
  )
}

export default CustomSideMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPart1: {
    paddingTop: 50,
    paddingHorizontal: 10,
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#1A334D',
  },
  brand: {
    paddingTop: 25,
    fontSize: 35,
    paddingLeft: 15,
    color : "#F5F6F8"
  },
  containerPart2: {
    flex: 0.65,
  },
  containerPart3: {
    flex: 0.25,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  icon: {
    width: 35,
    height: 35,
  },
  sideitem: {
    padding: 20,
    paddingVertical: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius : 10
  },
  iconTxtContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  iconTxt: {
    fontSize: 23,
  },
})
