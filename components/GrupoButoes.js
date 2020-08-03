import React, {useState} from "react";
import { Alert, View, Text } from "react-native";
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
    height: 80px;
`;



export default () => {
  const [msg, setMsg] = useState('Douglas');
  let finalizado = false;
  return (
    <Div>
      <Div>
        <Button color="#dc3545" title='Paradas'  mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>Paradas </Texto>
        </Button>
      </Div>
      <Div>
        <Button color="#28a745" mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>Operações </Texto>
        </Button>
      </Div>
      <Div>
        <Button color="#007bff" mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>C. Diarios </Texto>
        </Button>
      </Div>
      <Div>
        <Button color="#ffc107" mode="contained" onPress={() => console.log('Pressed')}>
          <Texto>T. de Paradas</Texto>
        </Button>
      </Div>
      {finalizado == false ? (
        <Div>
          <Button color="#6c757d" mode="contained" onPress={() => console.log('Pressed')}>
            <Texto>Finalizar</Texto>
          </Button>
        </Div>
      ) : (
          <Div>
            <Button color="#6c757d" mode="contained" disabled='true' onPress={() => console.log('Pressed')}>
              <Texto>Finalizar</Texto>
            </Button>
          </Div>
      )}
    </Div>
  );
};
