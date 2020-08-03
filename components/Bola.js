
import React, { useState } from "react";
import styled from "styled-components";
import { View , Text } from "react-native";





export default () => {
  const Bola = styled.View`
    width: 500px;
    height: 500px;
    margin: 40px auto;
    border-radius: 500px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #d3d3d3;
  `;

  const Texto = styled.Text`
    font-size: 40px;
    color: black;
  `;
  
  return (
    <View>
      <Bola>
        <Texto>PARADO</Texto>
      </Bola>
    </View>
  );
};
