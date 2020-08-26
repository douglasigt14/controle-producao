import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";


export default (props) => {
  let [isLoading, setLoading] = useState(true);

  let [cod_item, setCod_item] = useState(props.cod_item);
  let [cod_plano, setCod_plano] = useState(props.cod_plano);
    let [ofs, setOfs] = useState(props.ofs);
  //let [ofs, setOfs] = useState(null);
  console.warn(ofs);

  return (
      <>
        <View>
          <Collapse>
            <CollapseHeader style={{ height: 60 }}>
              <Separator bordered>
              <Text>{cod_item}</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem style={{ height: 60 }}>
                <Text>Aaron Bennet</Text>
              </ListItem>
              <ListItem style={{ height: 60 }}>
                <Text>Claire Barclay</Text>
              </ListItem>
              <ListItem last style={{ height: 60 }}>
                <Text>Kelso Brittany</Text>
              </ListItem>
            </CollapseBody>
          </Collapse>


          <Collapse>
            <CollapseHeader style={{ height: 60 }}>
              <Separator bordered>
                <Text>28/08/2020</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem style={{ height: 60 }}>
                <Text>Aaron Bennet</Text>
              </ListItem>
              <ListItem style={{ height: 60 }}>
                <Text>Claire Barclay</Text>
              </ListItem>
              <ListItem last style={{ height: 60 }}>
                <Text>Kelso Brittany</Text>
              </ListItem>
            </CollapseBody>
          </Collapse>
        </View>
      </>
    );
}
