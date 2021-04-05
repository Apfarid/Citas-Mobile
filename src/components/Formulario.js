import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import shortid from "shortid";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ({ citas, setCitas, setmostrarForm }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [paciente, setPaciente] = useState("");
  const [propietario, setpropietario] = useState("");
  const [telefono, settelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [sintomas, setsintomas] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = { year: "numeric", month: "long", day: "2-digit" };
    setFecha(date.toLocaleDateString("es-ES", opciones));
    hideDatePicker();
  };

  // muestra u oculta time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (hora) => {
    const opciones = { hour: "numeric", minute: "2-digit" };
    setHora(hora.toLocaleString("en-US", opciones));
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    if (
      paciente.trim() === "" ||
      propietario.trim() === "" ||
      telefono.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      MostrarAlerta();
      return;
    }
    //crear una cita
    const cita = { paciente, propietario, telefono, fecha, hora, sintomas };
    cita.id = shortid.generate();

    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    //ocultar el formulario
    setmostrarForm();

    //resear el fomulario
  };

  //Muestra la alerta si falla la validacion
  const MostrarAlerta = () => {
    Alert.alert(
      "Error", // Titulo
      "Todos los campos son obligatorios", //mensaje
      [
        {
          text: "OK", //Arreglo de botones
        },
      ]
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(paciente) => setPaciente(paciente)}
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => {
              setpropietario(texto);
            }}
          />
        </View>

        <View>
          <Text style={styles.label}>Telefono de Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => {
              settelefono(texto);
            }}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => {
              setsintomas(texto);
            }}
            multiline
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}
          >
            <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: "#7d024e",
    marginVertical: 10,
  },
  textoSubmit: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Formulario;
