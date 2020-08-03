
import React, { useState } from "react";
import styled from "styled-components";
import { View , Text, Platform } from "react-native";





export default (props) => {
  
  const Corpo = styled.View`
    width: 500px;
    height: 500px;
    margin: 40px auto;
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
  
  return (
    <View>
      <Corpo>
          <Texto>{props.status_texto}</Texto>
      </Corpo>
    </View>
  );
};
