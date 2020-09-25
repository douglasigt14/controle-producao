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
   const [selectedPosto, setSelectedPosto] = useState(""); 
   const [selectedCentro, setSelectedCentro] = useState(""); 
   const [isLoading, setLoading] = useState(true);
   const [postos, setPostos] = useState([]);
   let url = props.url;

   useEffect(() => {
     fetch(url+"/postos")
       .then((response) => response.json())
       .then((json) => setPostos(json))
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
   }, []);

   

    return (
      <Div_Card>
        <Card>
          <Card.Content>
            <Title>Selecionar Posto</Title>
            <Div_input>
              <Picker
                selectedValue={selectedPosto}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedPosto(itemValue);
                  }
                }
              >
                {postos.map((posto, i) => {
                  return (
                    <Picker.Item
                      value={posto.id + "-" + posto.cod_centro}
                      label={posto.nome}
                      key={posto.id + "-" + posto.cod_centro}
                    />
                  );
                })}
              </Picker>
            </Div_input>
          </Card.Content>
          <Div_Button>
            <Button
              onPress={() => {
                props.funcao_selecionar(selectedPosto);
              }}
              contentStyle={{ height: 60, width: 300 }}
              color="#007bff"
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
