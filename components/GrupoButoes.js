import React, { useState, useEffect} from "react";
import { Alert, View, Text, StyleSheet, Modal, FlatList, ScrollView, TextInput } from "react-native";
import styled from "styled-components";
import { Button, Card } from 'react-native-paper';
import Padrao from "../style/Padrao";
import { Table, Row, Rows } from "react-native-table-component";
import AsyncStorage from "@react-native-community/async-storage";
import { consulta_storage } from "../storage/localstorage";
import AwesomeAlert from 'react-native-awesome-alerts';

const Texto = styled.Text`
    font-size: 17px;
  `;

const Div = styled.View`
    display: flex;    
    flex-direction: row;
    padding-left: 5px;
    padding-right: 5px;
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

const ViewModalMaior = styled.View`
      max-height: 920px;
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

const ViewModalFinalizarInputs = styled.View`
     display: flex;
     flex-direction: row;
     margin: 5px;
     justify-content: space-around;
`;

const ViewModalFinalizarButton = styled.View`
     display: flex;
     margin-top: 5px;
     margin-bottom: 10px;
`;


export default (props) => {
  let [modalVisibleParadas, setModalVisibleParadas] = useState(false);
  let [modalVisibleOperacoes, setModalVisibleOperacoes] = useState(false);
  let [modalVisibleTipos, setModalVisibleTipos] = useState(false);
  let [modalVisibleOfsSelecionadas, setModalVisibleOfsSelecionadas] = useState(
    false
  );
  let [modalVisibleControles, setModalVisibleControles] = useState(false);

  let [modalVisibleSimNao, setModalVisibleSimNao] = useState(false);

  let [isLoading, setLoading] = useState(true);
  let [paradasDiarias, setParadasDiarias] = useState([]);
  let [operacoesDiarias, setOperacoesDiarias] = useState([]);
  let [controlesDiarios, setControlesDiarios] = useState([]);
  let operador_id = props.operador_id;

  let [id_posto, setId_posto] = useState(props.id_posto);
  let [paradas, setParadas] = useState([]);

  let [tabela, setTabela] = useState([]);
  let [tabelaOfs, setTabelaOfs] = useState([]);
  let [tabelaParadas, setTabelaParadas] = useState([]);
  let [tabelaOperacoes, setTabelaOperacoes] = useState([]);
  let [tabelaControles, setTabelaControles] = useState([]);

  let [ofs_enviar, setOfs_enviar] = useState([]);
  let [componentFinalizar, setComponentFinalizar] = useState(null);

  let [qtde, setQtde] = useState("0");
  let [retrabalho, setRetrabalho] = useState("0");

  let [focus_qtde, setFocus_qtde] = useState(false);
  let [focus_retrabalho, setFocus_retrabalho] = useState(false);

  let finalizado = props.finalizado;
  let ofs_selecionadas = props.ofs_selecionadas;
  let descricao = props.descricao;
  let parada_id = props.parada_id;
  let url = props.url;
  let [estadoInput, setestadoInput] = useState("0");
  let [texto, setTexto] = useState("0");

  let [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // consulta_storage();;

    fetch(url + "/paradas-diarias/" + operador_id)
      .then((response) => response.json())
      .then((json) => {
        setParadasDiarias(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    fetch(url + "/operacoes-diarias/" + operador_id)
      .then((response) => response.json())
      .then((json) => {
        setOperacoesDiarias(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    fetch(url + "/controles-diarios/" + id_posto + "/" + operador_id)
      .then((response) => response.json())
      .then((json) => {
        setControlesDiarios(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    fetch(url + "/paradas/codigos_restrito/" + id_posto)
      .then((response) => response.json())
      .then((json) => {
        setParadas(json);
        var tabelaTemp = [];
        json.forEach((item) => {
          tabelaTemp.push([item.rotulo, item.descricao]);
        });

        var tabelaFinal = {
          tableHead: ["ROTULO", "DESCRICÃO"],
          tableData: tabelaTemp,
        };
        setTabela(tabelaFinal);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []); //No Inicio

  useEffect(() => {
      fetch(url + "/paradas-diarias/" + operador_id)
        .then((response) => response.json())
        .then((json) => {
          setParadasDiarias(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

      fetch(url + "/operacoes-diarias/" + operador_id)
        .then((response) => response.json())
        .then((json) => {
          setOperacoesDiarias(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

      fetch(url + "/controles-diarios/" + id_posto + "/" + operador_id)
        .then((response) => response.json())
        .then((json) => {
          setControlesDiarios(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    
      if (ofs_selecionadas.length > 2) {
        setComponentFinalizar(
          <Div>
            <Button
              contentStyle={{ height: 90 }}
              color="#6c757d"
              title="Finalizar"
              mode="contained"
              onPress={() => {
                setModalVisibleOfsSelecionadas(true);
              }}
            >
              <Texto>Finalizar</Texto>
            </Button>
          </Div>
        );
      } else if (finalizado == false) {
        setComponentFinalizar(
          <Div>
            <Button
              contentStyle={{ height: 90 }}
              color="#6c757d"
              title="Finalizar"
              mode="contained"
              onPress={() => {
                props.funcao_finalizar();
              }}
            >
              <Texto>Finalizar</Texto>
            </Button>
          </Div>
        );
      } else {
        setComponentFinalizar(
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
        );
      }
      let paradas_temp = paradasDiarias;
      let tabelaTemp_paradas = [];
      paradas_temp.forEach((item) => {
        tabelaTemp_paradas.push([item.rotulo, item.inicio, item.fim]);
      });

      var tabelaFinal = {
        tableHead: ["TIPO", "INICIO", "FIM"],
        tableData: tabelaTemp_paradas,
      };
      setTabelaParadas(tabelaFinal);

      let operacoes_temp = operacoesDiarias;
      let tabelaTemp_operacoes = [];
      operacoes_temp.forEach((item) => {
        tabelaTemp_operacoes.push([item.cod_item, item.inicio, item.fim]);
      });

      var tabelaFinal = {
        tableHead: ["TIPO", "INICIO", "FIM"],
        tableData: tabelaTemp_operacoes,
      };
      setTabelaOperacoes(tabelaFinal);

      let controles_temp = controlesDiarios;
      let tabelaTemp_controles = [];
      controles_temp.forEach((item) => {
        tabelaTemp_controles.push([
          item.cod_item,
          "-",
          item.volume_produzido,
          item.retrabalho,
        ]);
      });

      var tabelaFinal = {
        tableHead: ["COD ITEM", "ER", "QTDE PRODUZIDA", "RETRABALHO"],
        tableData: tabelaTemp_controles,
      };
      setTabelaControles(tabelaFinal);

    atualizar(ofs_selecionadas);
  }, [parada_id, finalizado, ofs_selecionadas]); // Com Dependencias

  const atualizar = (ofs) => {

    if (ofs.length > 2) {
      let ofs_selecionadas_temp = JSON.parse(ofs);

      var tabelaTemp = [];
      let qtde = 0;
      ofs_selecionadas_temp.forEach((item) => {
        // console.warn(item.qtde_prod);

        item.input =
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 20,
              padding: 10,
            }}
            value={item.qtde_prod}
            keyboardType={"phone-pad"}
            onChangeText={(text) => {
              mudar_qtde_prod(item.num_ordem, text, JSON.stringify(ofs_selecionadas_temp ));
            }}
          />;
          item.button =
            <Button
              contentStyle={{ height: 90 }}
              color="#6c757d"
              mode="contained"
              onPress={() => {
                mudar_qtde_prod(
                  item.num_ordem,
                  item.qtde_pend,
                  JSON.stringify(ofs_selecionadas_temp)
                );
              }}
            >
              <Texto>{item.qtde_pend}</Texto>
            </Button>;

        tabelaTemp.push([
          item.num_ordem,
          item.dt_inicial,
          item.cod_item + " - " + item.item,
          item.button,
          item.input,
        ]);
        qtde += parseInt(item.qtde_prod);
      });

      setOfs_enviar(ofs_selecionadas_temp);
      setQtde(String(qtde));
      setRetrabalho("0");

      var tabelaFinal = {
        tableHead: ["NUM_OF", "DATA", "ITEM", "QTDE OF", "QTDE PROD"],
        tableData: tabelaTemp,
      };
      setTabelaOfs(tabelaFinal);
    }

    
  } 

  const mudar_qtde_prod = (num_ordem, text, ofs) => {
    let of_temp = JSON.parse(ofs);

    var tabelaTemp = [];
    let qtde = 0;
    
    of_temp.forEach((item) => {
      if (item.num_ordem == num_ordem) {
        item.qtde_prod = text != '' && parseInt(text) <= parseInt(item.qtde_pend) ? text : 0;
      }

      item.input =
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 20,
              padding: 10,
            }}
            value={item.qtde_prod}
            keyboardType={"phone-pad"}
            onChangeText={(text) => {
              mudar_qtde_prod(item.num_ordem, text);
            }}
          />;
        tabelaTemp.push([
          item.num_ordem,
          item.dt_inicial,
          item.cod_item + " - " + item.item,
          item.qtde_pend,
          item.input,
        ]);
        qtde += parseInt(item.qtde_prod);
      setQtde(String(qtde));
      setRetrabalho("0");

      var tabelaFinal = {
        tableHead: ["NUM_OF", "DATA", "ITEM", "QTDE OF", "QTDE PROD"],
        tableData: tabelaTemp,
      };
      setTabelaOfs(tabelaFinal);
    });
    atualizar(JSON.stringify(of_temp));
  };

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
                  onPress={() => setModalVisibleControles()}
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
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#bebebe",
                  backgroundColor: "#fff",
                }}
              >
                <Row
                  data={tabelaParadas.tableHead}
                  style={{ height: 40, backgroundColor: "#dc3545" }}
                  textStyle={styles.text}
                />
                <Rows data={tabelaParadas.tableData} textStyle={styles.text} />
              </Table>
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
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#bebebe",
                  backgroundColor: "#fff",
                }}
              >
                <Row
                  data={tabelaOperacoes.tableHead}
                  style={{ height: 40, backgroundColor: "#28a745" }}
                  textStyle={styles.text}
                />
                <Rows
                  data={tabelaOperacoes.tableData}
                  textStyle={styles.text}
                />
              </Table>
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
                  style={{ height: 40, backgroundColor: "#ffc107" }}
                  textStyle={styles.text}
                />
                <Rows data={tabela.tableData} textStyle={styles.text} />
              </Table>
            </ScrollView>
          </ViewModal>
        </View>
      </Modal>

      {/* Modal Controles Diarios */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleControles}
        onRequestClose={() => {
          setModalVisibleControles(false);
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
                Controles Diarios
              </Text>
              <TouchModal
                style={{ ...Padrao.closeButton }}
                onPress={() => {
                  setModalVisibleControles(false);
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
                  data={tabelaControles.tableHead}
                  style={{ height: 40, backgroundColor: "#007bff" }}
                  textStyle={styles.text}
                />
                <Rows
                  data={tabelaControles.tableData}
                  textStyle={styles.text}
                />
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
          <ViewModalMaior style={Padrao.modalView}>
            <Div_Fechar2>
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 15,
                  marginBottom: 15,
                  marginRight: 400,
                }}
              >
                Resumo dos Itens
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
            <ViewModalFinalizarInputs>
              <View>
                <Texto>QTDE TOTAL</Texto>
                <TextInput
                  style={[Padrao.inputModal, { width: 250 }]}
                  value={qtde}
                  editable={false}
                  onChangeText={(text) => {
                    setQtde(text);
                    setFocus_qtde(true);
                    setFocus_retrabalho(false);
                  }}
                  keyboardType={"phone-pad"}
                  autoFocus={focus_qtde}
                />
              </View>

              <View>
                <Texto>RETRABALHO</Texto>
                <TextInput
                  style={[Padrao.inputModal, { width: 250 }]}
                  value={retrabalho}
                  onChangeText={(text) => {
                    setRetrabalho(text);
                    setFocus_qtde(false);
                    setFocus_retrabalho(true);
                  }}
                  keyboardType={"phone-pad"}
                  autoFocus={focus_retrabalho}
                />
              </View>
            </ViewModalFinalizarInputs>
            <ViewModalFinalizarButton>
              <TouchModal
                style={{ ...Padrao.openButton, backgroundColor: "#007bff" }}
                onPress={() => {
                  setModalVisibleSimNao(true);
                }}
              >
                <TextoModal style={Padrao.textStyle}>Finalizar Item</TextoModal>
              </TouchModal>
            </ViewModalFinalizarButton>

            <ScrollView>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "#bebebe",
                  backgroundColor: "#fff",
                }}
              >
                <Row
                  data={tabelaOfs.tableHead}
                  style={{ height: 40, backgroundColor: "#d3d3d3" }}
                  textStyle={styles.text}
                />
                <Rows data={tabelaOfs.tableData} textStyle={styles.text} />
              </Table>
            </ScrollView>
          </ViewModalMaior>
        </View>
      </Modal>

      {/* Modal SIM ou Não */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleSimNao}
        onRequestClose={() => {
          setModalVisibleSimNao(false);
        }}
        hardwareAccelerated={true}
      >
        <View style={Padrao.centeredView}>
          <ViewModal style={Padrao.modalView}>
            <Div_Fechar>
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >Tem Certeza que deseja Finalizar ?</Text>
            </Div_Fechar>
            <View>
              <TouchModal
                style={{ ...Padrao.openButton, backgroundColor: "#28a745" }}
                onPress={() => {
                  props.funcao_finalizar();
                  props.funcao_fechar_controle_diario(
                    qtde,
                    retrabalho,
                    ofs_enviar
                  );
                  setModalVisibleOfsSelecionadas(false);
                  setModalVisibleSimNao(false);
                }}
              >
                <TextoModal style={Padrao.textStyle}>SIM</TextoModal>
              </TouchModal>
              <TouchModal
                style={{ ...Padrao.openButton, backgroundColor: "#dc3545" }}
                onPress={() => {
                  setModalVisibleSimNao(false);
                }}
              >
                <TextoModal style={Padrao.textStyle}>NÃO</TextoModal>
              </TouchModal>
            </View>
          </ViewModal>
        </View>
      </Modal>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Tem certeza que deseja finalizar?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Não"
        confirmText="Sim"
        cancelButtonColor="#dc3545"
        confirmButtonColor="#28a745"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          props.funcao_finalizar();
          props.funcao_fechar_controle_diario(qtde, retrabalho, ofs_enviar);
          setModalVisibleOfsSelecionadas(false);
          setShowAlert(false);
        }}
        contentStyle={{ width: 500, height: 200 }}
        titleStyle={{ fontSize: 25, textAlign: "center" }}
        cancelButtonTextStyle={{ fontSize: 35, textAlign: "center" }}
        confirmButtonTextStyle={{ fontSize: 35, textAlign: "center" }}
        cancelButtonStyle={{ width: 250 }}
        confirmButtonStyle={{ width: 250 }}
      />
    </>
  );
};;

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