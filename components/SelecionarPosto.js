import React, { Component, useState } from "react";
import styled from "styled-components";
import { Alert, Picker } from "react-native";
import { Button, Card, Title } from 'react-native-paper';

const Div_Card = styled.View`
    margin-left: 150px;
    margin-right: 150px;
    padding-top: 400px;
`;

const Div_input = styled.View`
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 45px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-evenly;
`;

const Div_Button = styled.View`
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


export default (props) => {
   const [selectedValue, setSelectedValue] = useState("");

    return (
      <Div_Card>
        <Card>
          <Card.Content>
            <Title>Selecionar Posto </Title>
            <Div_input>
               <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50,width: 3000 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Furadeira 1" value="01" />
                    <Picker.Item label="Furadeira 2" value="02" />
                </Picker>
            </Div_input>
          </Card.Content>
          <Div_Button>
            <Button
              onPress={() => Alert.alert(login)}
              contentStyle={{ height: 60, width: 300}}
              color="#007bff"
              title="Login"
              mode="contained"
            >
              Entrar
            </Button>
          </Div_Button>
        </Card>
      </Div_Card>
    );
};
