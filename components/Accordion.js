import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";


export default (props) => {
    return (
      <>
        <View>
          <Collapse>
            <CollapseHeader style={{ height: 60 }}>
              <Separator bordered>
                <Text>FORWARD</Text>
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
                <Text>FORWARD</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem style={{ height: 60 }}>
                <Text>Aaron Bennet</Text>
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
