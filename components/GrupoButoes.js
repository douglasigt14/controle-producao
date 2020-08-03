import React, {useState} from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import { Button } from 'react-native-paper';

const Texto = styled.Text`
    font-size: 18px;
  `;

const Div = styled.View`
    display: flex;    
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    justify-content: space-around;
`;



export default () => {
  const [msg, setMsg] = useState('Douglas');
  let finalizado = false;
  return (
    <Div>
      <Div>
        <Button style={{ height: 60 }} mode='outlined' title='Paradas' color="#dc3545" title='Paradas' mode="contained" onPress={() => Alert.alert("Paradas")}>
          <Texto>Paradas </Texto>
        </Button>
      </Div>
      <Div>
        <Button color="#28a745" title='Operações'  mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>Operações </Texto>
        </Button>
      </Div>
      <Div>
        <Button color="#007bff" title='C. Diarios'  mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>C. Diarios </Texto>
        </Button>
      </Div>
      <Div>
        <Button color="#ffc107" title='T. de Paradas'  mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>T. de Paradas</Texto>
        </Button>
      </Div>
      {finalizado == false ? (
        <Div>
          <Button color="#6c757d" title='Finalizar'  mode="contained" onPress={() => console.log('Pressed')}>
            <Texto>Finalizar</Texto>
          </Button>
        </Div>
      ) : (
          <Div>
            <Button color="#6c757d" title='Finalizar' mode="contained" disabled='true' onPress={() => console.log('Pressed')}>
              <Texto>Finalizar</Texto>
            </Button>
          </Div>
      )}
    </Div>
  );
};
