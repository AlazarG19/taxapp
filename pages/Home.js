import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native'
import React from 'react'
import MenuBar from '../Icons/menu.png'
import sales from '../Images/purchase.png'
const { width, height } = Dimensions.get('window')
const Home = (props) => {
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
          <Text style={styles.headerTxt}>Home</Text>
        </View>
      </View>
      <View style={styles.homeItems}>
        <View style={styles.homeItemsRow}>
          <View style={styles.homeItem}>
            <ImageBackground
              source={sales}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.homeItemTxt}>Inside</Text>
            </ImageBackground>
          </View>
          <View style={styles.homeItem}>
            <ImageBackground
              source={sales}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.homeItemTxt}>Inside</Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.homeItemsRow}>
        <View style={styles.homeItem}>
            <ImageBackground
              source={sales}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.homeItemTxt}>Inside</Text>
            </ImageBackground>
          </View>
          <View style={styles.homeItem}>
            <ImageBackground
              source={sales}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.homeItemTxt}>Inside</Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Home

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
    height: 25
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  homeItems: {
    flex: 1,
    flexDirection: 'column',
    marginTop: height * 0.1,
  },
  homeItemsRow: {
    flexDirection: 'row',
  },
  homeItem: {
    marginTop: height * 0.1,
    // marginRight: width * 0.1,
    marginLeft: width * 0.07,
    // backgroundColor: 'red',
    width: width * 0.40,
    height: width * 0.40,
  },
  homeItemTxt: {
    color: "black",
    fontSize: 42,
    paddingTop: height * 0.15,
    fontWeight: "bold",
    textAlign: "center"
  }
})
