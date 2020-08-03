import React, { useState } from "react";
import styled from "styled-components";
import { View } from "react-native";
import Bola from "./Bola";
import GrupoButoes from "./GrupoButoes";
import { Appbar } from "react-native-paper";
import Padrao from '../style/Padrao';



export default (props) => {
    return (
        <View>
            <Appbar.Header style={Padrao.barra}>
                <Appbar.Content title="Controle de Produção" />
                <Appbar.Action
                    icon="dots-vertical"
                    onPress={() => Alert.alert("Opções")}
                />
            </Appbar.Header>
            <GrupoButoes></GrupoButoes>
            <Bola 
                cor={props.cor}
                cor_texto={props.cor_texto} 
                status_texto={props.status_texto} 
            >
            </Bola>
        </View>
    );
};
