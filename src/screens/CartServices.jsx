import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-elements";
import axios, { AxiosResponse } from "axios";

export default function CartServices() {
  const [userId, setUserId] = useState("");
  const [services, setServices] = useState([]);

  const servicesByUser = async () => {
    await axios
      .create()
      .get(`http://192.168.0.102:8090/services/getByUserId?userId=${userId}`)
      .then((resp) => {
        setServices(resp.data);
        console.log(resp.data);
        console.log(userId);
      })
      .catch((error) => console.log(error));
  };

  const cancelService = async (ServiceId, UserId) => {
    await axios
      .create()
      .patch(
        `http://192.168.0.102:8090/services/cancelService`,
        JSON.stringify({
          serviceId: ServiceId,
          userId: UserId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        setServices(resp.data);
        console.log(resp.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setUserId}
          value={userId}
          placeholder="Ingresa tu cédula"
        />
        <Button onPress={servicesByUser} title="Buscar" color="tomato" />
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
            providerName,
          }) => (
            <View style={styles.card}>
              <Card image={source} key={id}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  {name}
                </Text>
                <Text style={{ marginBottom: 10 }}>{description}.</Text>
                <Text style={{ marginBottom: 10 }}>Origen: {source}.</Text>
                <Text style={{ marginBottom: 10 }}>
                  Destino: {destination}.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Fecha y Hora: {new Date(initialDate).toLocaleString()}.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Ofrecido por: {providerName}.
                </Text>
                <Button
                  title="Cancelar Servicio"
                  color="tomato"
                  onPress={() => {
                    cancelService({ id }.id, userId);
                  }}
                />
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
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 5,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  scrollView: {
    padding: 20,
  },
  card: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});
