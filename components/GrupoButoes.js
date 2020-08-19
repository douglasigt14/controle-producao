import React, { useState, useEffect} from "react";
import { Alert, View, Text, StyleSheet, Modal, FlatList, ScrollView } from "react-native";
import styled from "styled-components";
import { Button, Card } from 'react-native-paper';
import Padrao from "../style/Padrao";

const Texto = styled.Text`
    font-size: 18px;
  `;

const Div = styled.View`
    display: flex;    
    flex-direction: row;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    justify-content: space-around;
`;

const Div_Card = styled.View`
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    justify-content: space-around;
`;

const ViewModalParadas = styled.View`
      max-height: 280px;
      display: flex;
  `;

const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
  `;

   const Div_Fechar = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 0px;
  `;

const TextoModal = styled.Text`
    font-size: 25px;
  `;

export default (props) => {
  let [modalVisibleParadas, setModalVisibleParadas] = useState(false);
  let [isLoading, setLoading] = useState(true);
  let [paradasDiarias, setParadasDiarias] = useState([]);
  let [operacoesDiarias, setOperacoesDiarias] = useState([]);
  let operador_id = props.operador_id;

  useEffect(() => {
    fetch("http://controleproducao.tuboarte.com/paradas-diarias/"+operador_id)
      .then((response) => response.json())
      .then((json) => {
          setParadasDiarias(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    fetch("http://controleproducao.tuboarte.com/operacoes-diarias/" + operador_id)
      .then((response) => response.json())
      .then((json) => {
        setOperacoesDiarias(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [finalizado]);

   let finalizado = props.finalizado;
  return (
    <>
    
      <Div_Card>
      <Card>
        <Card.Content>
            <Div>
              <Div>
                <Button contentStyle={{ height: 90 }} title='Paradas' color="#dc3545" title='Paradas' mode="contained" 
                onPress={() => {
                  setModalVisibleParadas(true);
                }}>
                  <Texto>Paradas</Texto>
                </Button>
              </Div>
              <Div>
                <Button contentStyle={{ height: 90 }} color="#28a745" title='Operações' mode="contained" onPress={() => console.log('Pressed')}>
                  <Texto>Operações </Texto>
                </Button>
              </Div>
              <Div>
                <Button contentStyle={{ height: 90 }} color="#007bff" title='C. Diarios' mode="contained" onPress={() => console.log('Pressed')}>
                  <Texto>C. Diarios </Texto>
                </Button>
              </Div>
              <Div>
                <Button contentStyle={{ height: 90 }} color="#ffc107" title='T. de Paradas' mode="contained" onPress={() => console.log('Pressed')}>
                  <Texto>T. de Paradas</Texto>
                </Button>
              </Div>
              {finalizado == false ? (
                <Div>
                  <Button contentStyle={{ height: 90 }} color="#6c757d" title='Finalizar' mode="contained" onPress={() => {
                    props.funcao_finalizar(props.id_posto)
                  }}>
                    <Texto>Finalizar</Texto>
                  </Button>
                </Div>
              ) : (
                  <Div>
                    <Button contentStyle={{ height: 90 }} color="#6c757d" title='Finalizar' mode="contained" disabled='true' onPress={() => console.log('Pressed')}>
                      <Texto>Finalizar</Texto>
                    </Button>
                  </Div>
                )}
            </Div>
        </Card.Content>
        
      </Card>
      </Div_Card>



      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleParadas}
        onRequestClose={() => {
          setModalVisibleParadas(false);
        }}
        hardwareAccelerated={true}
      >
        <View style={Padrao.topView}>
              
          <ViewModalParadas style={Padrao.modalView}>
            <Div_Fechar>

              <Text style={{ fontSize: 30, marginTop: 15, marginBottom: 15, marginRight: 400 }}>Paradas Diarias</Text>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalVisibleParadas(!modalVisibleParadas);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar>
            <ScrollView>
            <FlatList
              numColumns={3}
              data={paradasDiarias}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Div>
                  <Text style={{ color: '#F00',marginRight: 30 }}>{item.rotulo}: {item.inicio} à {item.fim}   </Text>
                </Div>
              )}
            />
              </ScrollView>
          </ViewModalParadas>
        </View>
      </Modal>
    </>
  );
};
