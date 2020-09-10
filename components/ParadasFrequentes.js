import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, FlatList, Text, View } from "react-native";
import styled from "styled-components";
import { Button, Card } from 'react-native-paper';
import Padrao from '../style/Padrao';
import { storageGetMaquina, storageSetMaquina } from "../storage/localstorage";

const Texto = styled.Text`
    font-size: 18px;
  `;


const Div = styled.View`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 15px;
  justify-content: space-evenly;
`;

const Div2 = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Div_Card = styled.View`
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: space-evenly;
`;

export default (props) => {    
    let [isLoading, setLoading] = useState(true);
    let [id_posto, setId_posto] = useState(props.id_posto);
    let [dados_posto, setDados_posto] = useState([]);
    let finalizado = props.finalizado;
    let paradasFrequentes = props.paradasFrequentes; 
    let url = props.url;
    useEffect(() => {
      fetch(url+"/postos/" + id_posto)
            .then((response) => response.json())
            .then((json) => setDados_posto(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
      <>
        <Div_Card>
          <Card>
            <Card.Content>
              <Div2>
                <Texto>Posto: {dados_posto.nome}</Texto>
                <Texto>Operador: {props.operador_desc}</Texto>
              </Div2>
              <Div>
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <FlatList
                    style={Padrao.FlatList}
                    numColumns={3}
                    data={paradasFrequentes}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                      <Div>
                        <Button
                          contentStyle={{ height: 90, width: 180 }}
                          title="Paradas"
                          color="#ffc107"
                          title="Paradas"
                          mode="contained"
                          disabled={item.habilitado}
                          onPress={() => {
                            props.funcao_parar(
                              item.rotulo,
                              item.descricao,
                              item.id
                            );
                            // atualizar_paradas_frequentes(item.id);
                          }}
                        >
                          <Texto>{item.rotulo} </Texto>
                        </Button>
                      </Div>
                    )}
                  />
                )}
              </Div>
            </Card.Content>
          </Card>
        </Div_Card>
      </>
    );
};
