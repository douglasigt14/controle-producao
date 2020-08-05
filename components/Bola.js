
import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, Alert, TouchableWithoutFeedback } from "react-native";





export default (props) => {
  
  const Bola = styled.View`
    width: 500px;
    height: 500px;
    margin: 20px auto;
    border-radius: 500px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${props.cor};
  `;

  const Texto = styled.Text`
    font-size: 40px;
    color: ${props.cor_texto};
  `;

  const Descricao = styled.Text`
    font-size: 23px;
  `;

  const Div_Descricao = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  `;

  
  return (
    <View>
      <Div_Descricao>
        <Descricao>{props.descricao}</Descricao>
      </Div_Descricao>
      <TouchableWithoutFeedback onPress={() => Alert.alert("Bola")}>
        <Bola>
          <Texto>{props.status_texto}</Texto>
        </Bola>
      </TouchableWithoutFeedback>
    </View>
  );
};
