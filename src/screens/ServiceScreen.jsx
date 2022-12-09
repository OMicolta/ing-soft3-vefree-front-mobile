import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";

export default function ServiceScreen({ navigation }) {
  const [source, setOrigen] = useState("");
  const [destination, setDestino] = useState("");
  const [initialDate, setFechaH] = useState("");
  const [vehicleTypeId, setTipoV] = useState("");
  const [name, setNombreSer] = useState("");
  const [description, setDescripcion] = useState("");
  const [providerUser, setNombrePersona] = useState("");
  const [MensajeInvalido, setMensajeInvalido] = useState("...");
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const api = axios.create();
  const sendData = async (data) => {
    const source = "http://localhost:8090/services/create";
    return await api.post(source, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const showAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );

  const campoInvalido = (data) => {
    for (let i = 0; i < 4; i++) {
      if (Object.values(data)[i] === "") {
        setMensajeInvalido("Campos vacios por favor verifique");
        return true;
      }
    }
    return false;
  };

  const getData = () => {
    let data = {};

    data["source"] = source;
    data["destination"] = destination;
    data["initialDate"] = initialDate;
    data["vehicleTypeId"] = parseInt(vehicleTypeId);
    data["name"] = name;
    data["description"] = description;
    data["providerUser"] = providerUser;
    console.log(data);

    if (campoInvalido(data) === false) {
      sendData(data).then(
        (response) => {
          console.log(response);
          console.log("envie datos");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("no envie datos");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8090/vehicleType/getAll").then((resp) => {
      setVehicleTypes(resp.data);
      console.log(resp.data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.titulo}>
          <Text style={styles.titulo}>Ofrecer Servicio</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setOrigen}
          value={source}
          placeholder="Origen"
        />
        <TextInput
          style={styles.input}
          onChangeText={setDestino}
          value={destination}
          placeholder="Destino"
        />
        <TextInput
          style={styles.input}
          onChangeText={setFechaH}
          value={initialDate}
          placeholder="Fecha y Hora"
        />
        <View style={styles.titulosCasillas}>
          <Text style={{ alignSelf: "flex-start" }}>Tipo de vehiculo</Text>
          <Picker
            selectedValue={vehicleTypeId}
            style={{
              height: 200,
              width: 300,
              borderEndWidth: 2,
              borderColor: "#DDDDDD",
            }}
            accessibilityLabel="tipo vehiculo"
            onValueChange={(itemValue, itemIndex) => setTipoV(itemValue)}
          >
            <Picker.Item
              style={{ height: 30 }}
              label="Seleciona Tipo de Vehiculo"
              value="00"
            />
            {vehicleTypes.map(({ id, name }) => (
              <Picker.Item
                style={{ width: 30, alignSelf: "center" }}
                label={name}
                value={id}
              />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setNombrePersona}
          value={providerUser}
          placeholder="Nombre de proveedor "
        />
        <TextInput
          style={styles.input}
          onChangeText={setNombreSer}
          value={name}
          placeholder="Nombre Servicio "
        />

        <TextInput
          style={styles.input}
          onChangeText={setDescripcion}
          value={description}
          placeholder="Descripcion del servicio"
        />

        <Text>{MensajeInvalido}</Text>
        <TouchableOpacity style={styles.button} onPress={getData}>
          <Text>Enviar datos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
  },
  from: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  button: {
    alignItems: "center",
    backgroundColor: "tomato",
    padding: 10,
  },
  titulo: {
    alignItems: "center",
    fontSize: 18,
  },
  titulosCasillas: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
});
