import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import CustomSideMenu from './pages/components/CustomSideMenu'
import Home from './pages/Home'
import Purchase from './pages/Purchase'
import Clock from './pages/Clock'
const Drawer = createDrawerNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSideMenu {...props} />}
        initialRouteName="Clock"
      >
        <Drawer.Screen
          options={{ headerShown: true}}
          name="Clock"
          component={Clock}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{ headerShown: true }}
          name="Login"
          component={Login}
        /> 
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Purchase"
          component={Purchase}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <SignUp/>
//       {/* <Login/> */}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})
