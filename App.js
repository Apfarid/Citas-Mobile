import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Cita from "./src/components/Cita";
import Formulario from "./src/components/Formulario";

export default function App() {
  const [mostrarForm, setmostrarForm] = useState(false);

  //Definir el state de citas
  const [citas, setCitas] = useState([]);

  //elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };

  const mosrarFormulario = () => {
    setmostrarForm(!mostrarForm);
  };

  //Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>

        <View>
          <TouchableHighlight
            onPress={() => mosrarFormulario()}
            style={styles.btnSubmit}
          >
            <Text style={styles.textoSubmit}>
              {" "}
              {mostrarForm ? "Cancelar" : "Crear Nueva Cita"}{" "}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setmostrarForm={setmostrarForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0 ? "Administra tus citas" : "No hay citas"}
              </Text>
              <FlatList
                style={styles.listado}
                keyExtractor={(cita) => cita.id}
                data={citas}
                renderItem={({ item }) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#AA076B",
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  titulo: {
    color: "#fff",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  listado: {
    flex: 1,
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
