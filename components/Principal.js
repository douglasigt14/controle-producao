import React, { useState } from "react";
import styled from "styled-components";
import { View } from "react-native";
import Bola from "./Bola";
import GrupoButoes from "./GrupoButoes";
import ParadasFrequentes from "./ParadasFrequentes";
import { Appbar } from "react-native-paper";
import Padrao from '../style/Padrao';



export default (props) => {
   
    const [cor, setCor] = useState('#d3d3d3');
    const [status_texto, setStatus_texto] = useState('INICIAR');
    const [descricao, setDescricao] = useState(''); //P - 01 MANUTENÇÃO MECANICA
    const [cor_texto, setCor_texto] = useState('black');
    const [finalizado, setFinalizado] = useState(false);
    const [id_posto, setId_posto] = useState(2);
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
