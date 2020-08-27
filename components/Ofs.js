import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import {Collapse,CollapseHeader,CollapseBody} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";
import styled from "styled-components";
import { Table, Row, Rows } from "react-native-table-component";
import Padrao from "../style/Padrao";

export default (props) => {
  const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
    width: 45%;
    margin-bottom: 15px;
  `;

  const TextoModal = styled.Text`
    font-size: 30px;
  `;
  const ViewBotoesOfs = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;


  let [isLoading, setLoading] = useState(true);
  let [cod_item, setCod_item] = useState(props.cod_item);
  let [cod_plano, setCod_plano] = useState(props.cod_plano);
  let [ofs, setOfs] = useState(props.ofs);
   let [dt_lotes, setDt_lotes] = useState(props.dt_lotes || []);

   let tabela = {
     tableHead: ["OF", "ITEM", "COR", "QTD"],
     tableData: [
                  ["1", "2", "3", "4"],
                  ["5", "6", "7", "8"],
                  ["1", "2", "3", "4"],
                  ["5", "6", "7", "8"],
                  ["1", "2", "3", "4"],
                  ["5", "6", "7", "8"],
                  ["1", "2", "3", "4"],
                  ["5", "6", "7", "8"],
                  ["1", "2", "3", "4"],
                  ["5", "6", "7", "8"],
                  ["1", "2", "3", "4"],
                  ["5", "6", "7", "8"],
                  ["1", "2", "3", "4"],
                  ["5", "6", "7", "8"],
     ],
   };

    function unique(array) {
      return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
      });
    }

  useEffect(() => {
     let dt_lotes_temp = [];
     ofs.forEach((item) => {
       item.tabela = tabela;
       dt_lotes_temp.push(item.dt_inicial + "|" + item.cor);
     });
     dt_lotes_temp = unique(dt_lotes_temp);
     let dt_lotes_temp2 = [];
     dt_lotes_temp.forEach((dt) => {
       var res = dt.split("|");
       dt_lotes_temp2.push({ dt: res[0], marcado: true, cor: res[1] });
     });
     setDt_lotes(dt_lotes_temp2);

  }, []);


  return (
    <>
      <View>
        <ViewBotoesOfs>
          <TouchModal
            style={{ ...Padrao.openButton, backgroundColor: "#ffc107" }}
            onPress={() => {
              props.funcao_limparOf();
            }}
          >
            <TextoModal style={Padrao.textStyle}>Limpar</TextoModal>
          </TouchModal>

          <TouchModal
            style={{ ...Padrao.openButton, backgroundColor: "#28a745" }}
            onPress={() => {}}
          >
            <TextoModal style={Padrao.textStyle}>Confirmar</TextoModal>
          </TouchModal>
        </ViewBotoesOfs>
        <FlatList
          LisHeaderComponent={<></>}
          // style={Padrao.FlatList}
          data={dt_lotes}
          keyExtractor={({ num_ordem }, index) => num_ordem}
          renderItem={({ item }) => (
            <View style={{ fontSize: 40 }}>
              <Collapse style={{ backgroundColor: "#fff" }}>
                <CollapseHeader style={{ height: 80, backgroundColor: "#000" }}>
                  <Separator bordered>
                    <Text>{item.dt}</Text>
                  </Separator>
                </CollapseHeader>
                <CollapseBody>
                  <ScrollView style={{ height: 100 }}>
                    <Table
                      borderStyle={{
                        borderWidth: 2,
                        borderColor: "#bebebe",
                      }}
                    >
                      <Row
                        data={tabela.tableHead}
                        style={styles.head}
                        textStyle={styles.text}
                      />
                      <Rows data={tabela.tableData} textStyle={styles.text} />
                    </Table>
                  </ScrollView>
                </CollapseBody>
              </Collapse>
            </View>
          )}
          ListFooterComponent={<></>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff",borderColor: '#000' },
  head: { height: 40, backgroundColor: "#d3d3d3" },
  text: { margin: 6 },
});
