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

    useEffect(() => {
        fetch("http://controleproducao.tuboarte.com/postos/" + id_posto)
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
              <Div>
                <Div>
                  <Button
                    contentStyle={{ height: 90 }}
                    title="Paradas"
                    color="#dc3545"
                    title="Paradas"
                    mode="contained"
                    onPress={() => Alert.alert("Paradas")}
                  >
                    <Texto>Paradas</Texto>
                  </Button>
                </Div>
                <Div>
                  <Button
                    contentStyle={{ height: 90 }}
                    color="#28a745"
                    title="Operações"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                  >
                    <Texto>Operações </Texto>
                  </Button>
                </Div>
                <Div>
                  <Button
                    contentStyle={{ height: 90 }}
                    color="#007bff"
                    title="C. Diarios"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                  >
                    <Texto>C. Diarios </Texto>
                  </Button>
                </Div>
                <Div>
                  <Button
                    contentStyle={{ height: 90 }}
                    color="#ffc107"
                    title="T. de Paradas"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                  >
                    <Texto>T. de Paradas</Texto>
                  </Button>
                </Div>
                {finalizado == false ? (
                  <Div>
                    <Button
                      contentStyle={{ height: 90 }}
                      color="#6c757d"
                      title="Finalizar"
                      mode="contained"
                      onPress={() => {
                        props.funcao_finalizar(props.id_posto);
                      }}
                    >
                      <Texto>Finalizar</Texto>
                    </Button>
                  </Div>
                ) : (
                  <Div>
                    <Button
                      contentStyle={{ height: 90 }}
                      color="#6c757d"
                      title="Finalizar"
                      mode="contained"
                      disabled="true"
                      onPress={() => console.log("Pressed")}
                    >
                      <Texto>Finalizar</Texto>
                    </Button>
                  </Div>
                )}
              </Div>
            </Card.Content>
          </Card>
        </Div_Card>



        <Div_Card>
          <Card>
            <Card.Content>
              <Div>
                <Texto>Posto: {dados_posto.nome}</Texto>
                <Texto>Operador: {props.operador_desc}</Texto>
              </Div>
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
