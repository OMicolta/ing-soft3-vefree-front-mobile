import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';

export default function App() {
  const [source, setOrigen] = useState("");
  const [destination, setDestino] = useState("");
  const [initialDate, setFechaH] = useState("");
  const [vehicleTypeId, setTipoV] = useState("");
  const [name, setNombreSer] = useState("");
  const [description, setDescripcion] = useState("");
  const [providerUser, setNombrePersona] = useState("");
  const [MensajeInvalido, setMensajeInvalido] = useState("...");

  const api = axios.create();
  const sendData = async (data) => {
    const source = "https://jsonplaceholder.typicode.com/posts"
    return await api.post(source,
      data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    );
  }

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
  
    }

  const getData = () => {
    let data = {};

    data["origen"] = source;
    data["destino"] = destination;
    data["fecha-Hora"] = initialDate;
    data["tipoV"] = vehicleTypeId;
    data["nombre Servicio"] = name;
    data["descripcion"] = description;
    data["nombre de usuario"] = providerUser;
    console.log(data);

    if(campoInvalido(data) === false){
      sendData(data).then((response) => {
        console.log(response);
        console.log("envie datos")
      }, (error) => {
        console.log(error);
      });
    }else{
      console.log("no envie datos");
      
    }
  }


  
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.titulo} >Ofrecer Servicio</Text>
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
        <Text>tipo de vehiculo</Text>
        <Picker
          selectedValue={vehicleTypeId}
          style={{ height: 200, width: 320 }}
          accessibilityLabel="tipo vehiculo"

          onValueChange={(itemValue, itemIndex) =>
            setTipoV(itemValue)
          }
        >
          <Picker.Item style={{ height: 40 }} label="Seleciona Tipo de Vehiculo" value="00" />
          <Picker.Item label="Moto" value="01" />
          <Picker.Item label="carro" value="02" />
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

      <Text>
        {MensajeInvalido}
      </Text>
      <TouchableOpacity style={styles.button}  
      
      onPress={getData}>
      <Text>Enviar datos</Text>
      </TouchableOpacity>
    </View>
  );
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start ',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  titulo: {
    alignItems: "center",
    fontSize: 18
  },
  titulosCasillas: {
    height: 60,
    margin: 15,
    padding: 10,
  },

});
