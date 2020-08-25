import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";


export default (props) => {
  let [ofs, setOfs] = useState([]);
  let [isLoading, setLoading] = useState(true);


  // useEffect(() => {
  //   fetch("http://controleproducao.tuboarte.com/postos/" + id_posto)
  //     .then((response) => response.json())
  //     .then((json) => setOfs(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
      <>
        <View>
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
