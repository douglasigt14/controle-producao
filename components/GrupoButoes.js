import React, {useState} from "react";
import { Alert, View, Text } from "react-native";
import Padrao from "../style/Padrao";
import styled from "styled-components";
import { Button } from 'react-native-paper';

const Texto = styled.Text`
    font-size: 23px;
  `;

export default () => {
  const [msg, setMsg] = useState('Douglas');
  let finalizado = true;
  return (
    <View style={Padrao.grupobutoes}>
      <View style={Padrao.viewButton}>
        <Button color="#dc3545"  mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>Paradas </Texto>
        </Button>
      </View>
      <View style={Padrao.viewButton}>
        <Button color="#28a745" mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>Operações </Texto>
        </Button>
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
