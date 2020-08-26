import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";
import styled from "styled-components";
import { Table, Row, Rows } from "react-native-table-component";


export default (props) => {
  let [isLoading, setLoading] = useState(true);
  let [cod_item, setCod_item] = useState(props.cod_item);
  let [cod_plano, setCod_plano] = useState(props.cod_plano);
  let [ofs, setOfs] = useState(props.ofs);
   let [dt_lotes, setDt_lotes] = useState(props.dt_lotes || []);
  let [ofs2, setOfs2] = useState(props.ofs);

   let tabela = {
     tableHead: ["OF", "ITEM", "COR", "QTD"],
     tableData: [["1", "2", "3", "4"]],
   };



  useEffect(() => {
    // console.warn(dt_lotes);
    //  let dt_lotes_temp = [];
    //  json.forEach((item) => {
    //    item.tabela = tabela;
    //    dt_lotes_temp.push(item.dt_inicial + "|" + item.cor);
    //  });
    //  dt_lotes_temp = unique(dt_lotes_temp);
    //  let dt_lotes_temp2 = [];
    //  dt_lotes_temp.forEach((dt) => {
    //    var res = dt.split("|");
    //    dt_lotes_temp2.push({ dt: res[0], marcado: true, cor: res[1] });
    //  });
    //  setDt_lotes(dt_lotes_temp2);
  }, []);


  return (
    <>
      <View>
        <FlatList
          LisHeaderComponent={<></>}
          // style={Padrao.FlatList}
          data={ofs}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={{ fontSize: 40 }}>
              <Collapse>
                <CollapseHeader style={{ height: 80 }}>
                  <Separator bordered>
                    <Text>{item.dt_inicial}</Text>
                  </Separator>
                </CollapseHeader>
                <CollapseBody>
                  <Table
                    borderStyle={{
                      borderWidth: 2,
                      borderColor: "#c8e1ff",
                    }}
                  >
                    <Row
                      data={tabela.tableHead}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                    <Rows data={tabela.tableData} textStyle={styles.text} />
                  </Table>
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
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});
