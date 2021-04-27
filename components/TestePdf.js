import React, {useState} from 'react';
import { Text, Button,View, StyleSheet } from "react-native";
import Padrao from '../style/Padrao';
import styled from "styled-components";
import Pdf from "react-native-pdf";

const Texto = styled.Text`
    font-size: 40px;
  `;


const Div = styled.View`
  display: flex;
  flex-direction: row;
  padding-right: 35px;
  justify-content: flex-end;
`;

export default (props) => {
    return (
        <Div>
            <Texto>{relogio}</Texto>
        </Div>
    );
}
