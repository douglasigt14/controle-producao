import React, {useState} from "react";
import { Button, Alert, View, Text } from "react-native";
import Padrao from "../style/Padrao";
import Teste from "./Bola";


export default () => {
  const [msg, setMsg] = useState('Douglas');
  let finalizado = true;
  return (
    <View style={Padrao.grupobutoes}>
      <View style={Padrao.viewButton}>
        <Button
          onPress={() => Alert.alert("Paradas")}
          title="Paradas"
          accessibilityLabel="Learn more about this purple button"
          color="#dc3545"
        />
      </View>
      <View style={Padrao.viewButton}>
        <Button
          style={Padrao.view}
          onPress={() => Alert.alert("Operações")}
          title="Operações"
          accessibilityLabel="Learn more about this purple button"
          color="#28a745"
        />
      </View>
      <View style={Padrao.viewButton}>
        <Button
          style={Padrao.view}
          onPress={() => Alert.alert("Simple Button pressed")}
          title="Controles Diarios"
          accessibilityLabel="Learn more about this purple button"
          color="#007bff"
        />
      </View>
      <View style={Padrao.viewButton}>
        <Button
          style={Padrao.view}
          onPress={() => Alert.alert("Simple Button pressed")}
          title="Tipos de Paradas"
          accessibilityLabel="Learn more about this purple button"
          color="#ffc107"
        />
      </View>
      {finalizado == false ? (
        <View style={Padrao.viewButton}>
          <Button
            style={Padrao.view}
            onPress={() => Alert.alert("Simple Button pressed")}
            title="Finalizar"
            accessibilityLabel="Learn more about this purple button"
            color="#6c757d"
          />
        </View>
      ) : (
        false
      )}
    </View>
  );
};
