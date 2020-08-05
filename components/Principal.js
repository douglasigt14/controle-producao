import React, { useState } from "react";
import styled from "styled-components";
import { View } from "react-native";
import Bola from "./Bola";
import GrupoButoes from "./GrupoButoes";
import ParadasFrequentes from "./ParadasFrequentes";
import { Appbar } from "react-native-paper";
import Padrao from '../style/Padrao';



export default (props) => {
   
    let cor = '#d3d3d3';
    let status_texto = 'INICIAR';
    let descricao = '';//P - 01 MANUTENÇÃO MECANICA
    let cor_texto = 'black';
    let finalizado = false;
    let id_posto = 3;
    return (
        <View>
            <Appbar.Header style={Padrao.barra}>
                <Appbar.Content title="Controle de Produção" />
                <Appbar.Action
                    icon="dots-vertical"
                    onPress={() => Alert.alert("Opções")}
                />
            </Appbar.Header>
            <GrupoButoes finalizado={finalizado}></GrupoButoes>
            <ParadasFrequentes id_posto={id_posto}></ParadasFrequentes>
            <Bola 
                cor={cor}
                cor_texto={cor_texto} 
                status_texto={status_texto} 
                descricao={descricao} 
            >
            </Bola>
        </View>
    );
};
