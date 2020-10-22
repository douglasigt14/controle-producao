import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Alert, FlatList, Text, Picker } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import {
  storageSet,
  consulta_storage
} from "../storage/localstorage";
// import { Picker } from "@react-native-community/picker";

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
   let [selectedLink, setSelectedLink] = useState(""); 

   let [isLoading, setLoading] = useState(true);
  
   let [links, setLinks] = useState([]);

   useEffect(() => {
    setLinks([
        {id: 1, descricao: "Teste"}
       ,{id: 2, descricao: "Produção"}
    ]);
   }, []);

   

    return (
      <Div_Card>
        <Card>
          <Card.Content>
            <Title>Selecionar Modo</Title>
            <Div_input>
            

              <Picker
                selectedValue={selectedLink}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedLink(itemValue);
                  }
                }
              >
                {links.map((link, i) => {
                  return (
                    <Picker.Item
                      value={link.id }
                      label={link.descricao}
                      key={link.id}
                    />
                  );
                })}
              </Picker>
            </Div_input>
          </Card.Content>
          <Div_Button>
            <Button
              onPress={() => {
                props.funcao_selecionar(selectedLink);
              }}
              contentStyle={{ height: 60, width: 300 }}
              color="#ffc107"
              title="Login"
              mode="contained"
            >
              Selecionar
            </Button>
          </Div_Button>
        </Card>
      </Div_Card>
    );
};
