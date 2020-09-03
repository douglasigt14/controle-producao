import React, { useState, useEffect} from "react";
import { Alert, View, Text, StyleSheet, Modal, FlatList, ScrollView } from "react-native";
import styled from "styled-components";
import { Button, Card } from 'react-native-paper';
import Padrao from "../style/Padrao";
import { Table, Row, Rows } from "react-native-table-component";

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

const ViewModal = styled.View`
      max-height: 520px;
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
    margin-bottom: 10px;
  `;

   const Div_Fechar2 = styled.View`
     display: flex;
     flex-direction: row;
     align-items: flex-end;
     justify-content: flex-end;
     margin-top: 0px;
     margin-bottom: 10px;
   `;

const TextoModal = styled.Text`
    font-size: 25px;
  `;

export default (props) => {
  let [modalVisibleParadas, setModalVisibleParadas] = useState(false);
  let [modalVisibleOperacoes, setModalVisibleOperacoes] = useState(false);
  let [modalVisibleTipos, setModalVisibleTipos] = useState(false);
  let [modalVisibleOfsSelecionadas, setModalVisibleOfsSelecionadas] = useState(false);
  let [isLoading, setLoading] = useState(true);
  let [paradasDiarias, setParadasDiarias] = useState([]);
  let [operacoesDiarias, setOperacoesDiarias] = useState([]);
  let operador_id = props.operador_id;
  let finalizado = props.finalizado;
  let [id_posto, setId_posto] = useState(props.id_posto);
  let [paradas, setParadas] = useState([]);
  let [tabela, setTabela] = useState([]);
  let [ofs_selecionadas, setOfsSelecionadas]  = useState([]);
  let [componentFinalizar, setComponentFinalizar] = useState(null);

  console.warn(ofs_selecionadas.length);
  console.warn(ofs_selecionadas);
 
  

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
      fetch(
        "http://controleproducao.tuboarte.com/paradas/codigos_restrito/" +
          id_posto
      )
        .then((response) => response.json())
        .then((json) => {
          setParadas(json);
          var tabelaTemp = []
          json.forEach(item => {
            tabelaTemp.push([item.rotulo,item.descricao]);
          });

          var tabelaFinal = {
            tableHead: ["ROTULO", "DESCRICÃO"],
            tableData: tabelaTemp
          };
          setTabela(tabelaFinal);
          
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

        
        if (ofs_selecionadas.length > 0) {
          setComponentFinalizar(<Div>
            <Button contentStyle={{ height: 90 }} color="#6c757d" title='Finalizar' mode="contained" onPress={() => {
              setModalVisibleOfsSelecionadas(true);
            }}>
              <Texto>Finalizar</Texto>
            </Button>
          </Div>);
        }
        else if (finalizado == false) {
          setComponentFinalizar(<Div>
            <Button contentStyle={{ height: 90 }} color="#6c757d" title='Finalizar' mode="contained" onPress={() => {
              props.funcao_finalizar(props.id_posto)
            }}>
              <Texto>Finalizar</Texto>
            </Button>
          </Div>);
        }
        else {
          setComponentFinalizar(<Div>
            <Button contentStyle={{ height: 90 }} color="#6c757d" title='Finalizar' mode="contained" disabled='true' onPress={() => console.log('Pressed')}>
              <Texto>Finalizar</Texto>
            </Button>
          </Div>);
        }

  }, []); //No Inicio 


  useEffect(() => {
    fetch("http://controleproducao.tuboarte.com/paradas-diarias/" + operador_id)
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
  }, [finalizado]); // Com Dependencias



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
                  onPress={() => {
                    setModalVisibleParadas(true);
                  }}
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
                  onPress={() => {
                    setModalVisibleOperacoes(true);
                  }}
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
                  onPress={() => {
                    setModalVisibleTipos(true);
                  }}
                >
                  <Texto>T. de Paradas</Texto>
                </Button>
              </Div>
              {componentFinalizar}
            </Div>
          </Card.Content>
        </Card>
      </Div_Card>

      {/* Modal Paradas */}
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
          <ViewModal style={Padrao.modalView}>
            <Div_Fechar>
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 15,
                  marginBottom: 15,
                  marginRight: 400,
                }}
              >
                Paradas Diarias
              </Text>
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
                    <Text style={{ color: "#F00", marginRight: 30 }}>
                      {item.rotulo}: {item.inicio} à {item.fim}{" "}
                    </Text>
                  </Div>
                )}
              />
            </ScrollView>
          </ViewModal>
        </View>
      </Modal>

      {/* Modal Operações */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleOperacoes}
        onRequestClose={() => {
          setModalVisibleOperacoes(false);
        }}
        hardwareAccelerated={true}
      >
        <View style={Padrao.topView}>
          <ViewModal style={Padrao.modalView}>
            <Div_Fechar>
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 15,
                  marginBottom: 15,
                  marginRight: 400,
                }}
              >
                Operações Diarias
              </Text>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalVisibleOperacoes(!modalVisibleOperacoes);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar>
            <ScrollView>
              <FlatList
                numColumns={3}
                data={operacoesDiarias}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <Div>
                    <Text style={{ color: "green", marginRight: 30 }}>
                      {item.cod_item} - {item.inicio} à {item.fim}{" "}
                    </Text>
                  </Div>
                )}
              />
            </ScrollView>
          </ViewModal>
        </View>
      </Modal>

      {/* Modal Tipos */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleTipos}
        onRequestClose={() => {
          setModalVisibleTipos(false);
        }}
        hardwareAccelerated={true}
      >
        <View style={Padrao.topView}>
          <ViewModal style={Padrao.modalView}>
            <Div_Fechar2>
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 15,
                  marginBottom: 15,
                  marginRight: 400,
                }}
              >
                Tipos de Paradas
              </Text>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalVisibleTipos(!modalVisibleTipos);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar2>
            <ScrollView>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#bebebe",
                  backgroundColor: "#fff",
                }}
              >
                <Row
                  data={tabela.tableHead}
                  style={{ height: 40, backgroundColor: "#d3d3d3" }}
                  textStyle={styles.text}
                />
                <Rows data={tabela.tableData} textStyle={styles.text} />
              </Table>
            </ScrollView>
          </ViewModal>
        </View>
      </Modal>




      {/* Modal OFS Selecionadas */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleOfsSelecionadas}
        onRequestClose={() => {
          setModalVisibleOfsSelecionadas(false);
        }}
        hardwareAccelerated={true}
      >
        <View style={Padrao.topView}>
          <ViewModal style={Padrao.modalView}>
            <Div_Fechar2>
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 15,
                  marginBottom: 15,
                  marginRight: 400,
                }}
              >
                Tipos de Paradas
              </Text>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalVisibleOfsSelecionadas(!modalVisibleOfsSelecionadas);
                }}
              >
                <TextoModal style={Padrao.textStyle}>X</TextoModal>
              </TouchModal>
            </Div_Fechar2>
            <ScrollView>
              <Text>Douglas</Text>
            </ScrollView>
          </ViewModal>
        </View>
      </Modal>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  head: { height: 40, backgroundColor: "#d3d3d3" },
  text: { margin: 6 },
});