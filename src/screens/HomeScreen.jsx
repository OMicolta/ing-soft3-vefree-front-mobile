import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-web";
import { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import axios, { AxiosResponse } from "axios";

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8090/services/getAll").then((resp) => {
      setServices(resp.data);
      console.log(resp.data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.view_profile}>
          <Text style={styles.address}>Hola, Bienvenido a VeFree</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require("../assets/images/userAccount.png")}
              style={styles.icon_profile}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {services.map(
          ({
            id,
            name,
            description,
            source,
            destination,
            initialDate,
            providerUser,
            vehicleTypeId,
          }) => (
            <View>
              <Card image={source} key={id}>
                <Text style={{ marginBottom: 10 }}>{name}.</Text>
                <Text style={{ marginBottom: 10 }}>{description}.</Text>
                <Text style={{ marginBottom: 10 }}>Origen: {source}.</Text>
                <Text style={{ marginBottom: 10 }}>
                  Destino: {destination}.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Fecha y Hora: {new Date(initialDate).toLocaleString()}.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Ofrecido por: {providerUser}.
                </Text>
              </Card>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    padding: 20,
  },
  view_profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  address: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  icon_profile: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  view_search: {
    flexDirection: "row",
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  view_search_feather: {
    marginRight: 5,
  },
});
