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
  let [ofs2, setOfs2] = useState(props.ofs);
  //let [ofs, setOfs] = useState(null);
  

  useEffect(() => {
    //console.warn('Efeito');
    ofs.forEach(item => {
      item.tabela = tabela = {
        tableHead: ["NUM OF", "Head2", "Head3", "Head4"],
        tableData: [
          ["1", "2", "3", "4"],
          ["a", "b", "c", "d"],
          ["a", "b", "c", "d"],
        ],
      };
    });
    setOfs(ofs);
  
   
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
                      data={item.tabela.tableHead}
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
