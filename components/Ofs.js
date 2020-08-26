import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";
import styled from "styled-components";


export default (props) => {
  let [isLoading, setLoading] = useState(true);
  let [cod_item, setCod_item] = useState(props.cod_item);
  let [cod_plano, setCod_plano] = useState(props.cod_plano);
  let [ofs, setOfs] = useState(props.ofs);
  //let [ofs, setOfs] = useState(null);
  
  // useEffect(() => {
  //   let URL = "http://controleproducao.tuboarte.com/itens/" + cod_item + "/" + cod_plano;
  //   fetch(
  //     URL
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setOfs(json);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
      <>
        <View>
        <FlatList
          LisHeaderComponent={<></>}
          // style={Padrao.FlatList}
          data={ofs}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Collapse>
              <CollapseHeader style={{ height: 60 }}>
                <Separator bordered>
                  <Text>{item.cod_item}</Text>
                </Separator>
              </CollapseHeader>
              <CollapseBody>
                <ListItem style={{ height: 60 }}>
                  <Text>Claire Barclay</Text>
                </ListItem>
              </CollapseBody>
            </Collapse>
          )}
          ListFooterComponent={<></>}
        />
          
        </View>
      </>
    );
}
