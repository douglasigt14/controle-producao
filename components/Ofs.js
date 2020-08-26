import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
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
  //let [ofs, setOfs] = useState(null);
  tabela = {
    tableHead: ["Head", "Head2", "Head3", "Head4"],
    tableData: [
      ["1", "2", "3", "4"],
      ["a", "b", "c", "d"],
      ["1", "2", "3", "456\n789"],
      ["a", "b", "c", "d"],
    ],
  };

  useEffect(() => {
    console.warn('Efeito');
    ofs.forEach(item => {
      console.warn(item);
    });

  
   
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
            <View style={{fontSize: 40}}>
              <Collapse>
                <CollapseHeader style={{ height: 80}}>
                  <Separator bordered>
                    <Text>{item.cod_item}</Text>
                  </Separator>
                </CollapseHeader>
                <CollapseBody>
                  <FlatList
                    LisHeaderComponent={<></>}
                    // style={Padrao.FlatList}
                    data={ofs}
                    keyExtractor={({ id2 }, index2) => id2}
                    renderItem={({ item2 }) => (
                            <ListItem style={{ height: 60 }}>
                              <Text>Claire Barclay</Text>
                            </ListItem>
                    )}
                    ListFooterComponent={<></>}
                  />
                  <ListItem style={{ height: 60 }}>
                    <Text>Claire Barclay</Text>
                  </ListItem>
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
