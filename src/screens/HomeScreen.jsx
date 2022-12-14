import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Button,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { Card } from "react-native-elements";
import axios, { AxiosResponse } from "axios";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { urls } from "../utils/Constants";

export default function HomeScreen({ navigation }) {
  const [state, setState] = useState({
    visibleModal: null,
  });

  const [services, setServices] = useState([]);

  const [serviceId, setServiceId] = useState("");
  const [beneficiaryId, setBeneficiaryId] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");

  const allServices = async () => {
    await axios
      .create()
      .get(urls.getAllServices)
      .then((resp) => {
        setServices(resp.data);
        console.log(resp.data);
      })
      .catch((error) => console.log(error));
  };
  /**
   * Permite a un usuario aceptar un servicio
   */
  const acceptService = async () => {
    await axios
      .create()
      .post(
        urls.acceptService,
        JSON.stringify({
          serviceId: serviceId,
          beneficiaryId: beneficiaryId,
          beneficiaryName: beneficiaryName,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        console.log({
          serviceId: serviceId,
          beneficiaryId: beneficiaryId,
          beneficiaryName: beneficiaryName,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    allServices();
  }, [services]);

  const _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bottomModal}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Aceptar Servicio</Text>
      <TextInput
        value={beneficiaryName}
        onChangeText={setBeneficiaryName}
        placeholder={"Nombre"}
        style={styles.input}
      />
      <TextInput
        value={beneficiaryId}
        onChangeText={setBeneficiaryId}
        placeholder={"Cédula"}
        style={styles.input}
      />
      <View style={{ flex: 1, flexDirection: "row" }}>
        {_renderButton("Cancelar", () => setState({ visibleModal: null }))}
        {_renderButton("Aceptar", () => {
          setState({ visibleModal: null });
          acceptService();
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "space-evenly",
          alignContent: "center",
        }}
      >
        <View style={styles.view_profile}>
          <Text style={styles.address}>Bienvenido a FreeDriver</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require("../assets/images/userAccount.png")}
              style={styles.icon_profile}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold" }}>Servicios Disponibles</Text>
        <Ionicons
          name="reload"
          size={24}
          color="black"
          selectionColor="red"
          onPress={allServices}
        />
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
          }) => (
            <View style={styles.card}>
              <Card image={source} key={id}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  {name}.
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
                  Ofrecido por: {providerUser}.
                </Text>
                <View>
                  {_renderButton("Aceptar Servicio", () => {
                    setState({ visibleModal: 1 });
                    setServiceId({ id }.id);
                  })}
                  <Modal
                    isVisible={state.visibleModal === 1}
                    style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}
                  >
                    {_renderModalContent()}
                  </Modal>
                </View>
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
    paddingTop: 30,
  },
  scrollView: {
    padding: 20,
  },
  view_profile: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 40,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  address: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    fontWeight: "bold",
    color: "tomato",
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
  card: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "80%",
    height: "40%",
  },
  bottomModal: {
    backgroundColor: "tomato",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
});
