import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "./src/screens/HomeScreen";
import ServiceScreen from "./src/screens/ServiceScreen";
import NavigationTab from "./src/navigation/NavigacionTab";
import CancelService from "./src/screens/CancelServices";

/**
 * Metodo encargado de  obtener el Contenido del cajón personalizado al oprimir la tecla cerrar
 * con el fin de cerrar la aplicación 
 * @param {*} props accesorios
 * @returns DrawerContentScrollView  se hace un retorno del cajon de contenido 
 */

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={NavigationTab} />
      <Drawer.Screen
        name="Ofrecer servicio"
        component={ServiceScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Cancelar servicio"
        component={CancelService}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
