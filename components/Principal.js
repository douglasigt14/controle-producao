import React, { useState } from "react";
import styled from "styled-components";
import { View ,Alert} from "react-native";
import Bola from "./Bola";
import GrupoButoes from "./GrupoButoes";
import ParadasFrequentes from "./ParadasFrequentes";
import { Appbar ,Button } from "react-native-paper";
import Padrao from '../style/Padrao';



export default (props) => {
   
    const [cor, setCor] = useState('#d3d3d3');
    const [status_texto, setStatus_texto] = useState('INICIAR');
    const [descricao, setDescricao] = useState(''); //P - 01 MANUTENÇÃO MECANICA
    const [cor_texto, setCor_texto] = useState('black');
    const [finalizado, setFinalizado] = useState(false);
    const [id_posto, setId_posto] = useState(2);

    const parar = (rotulo, descricao) =>{
        setCor('red');
        setStatus_texto('PARADO');
        setCor_texto('white');
        setDescricao(rotulo+' '+descricao);
    } 
    
    const operar = (descricao) => {
        setCor('green');
        setStatus_texto('OPERANDO');
        setCor_texto('white');
        setDescricao('ITEM DESC');
    } 
    
    const inatividade = () => {
        setCor('#d3d3d3');
        setStatus_texto('INICIAR');
        setCor_texto('black');
        setDescricao('');
    }

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
            <ParadasFrequentes 
                    id_posto={id_posto} 
                    funcao_parar={parar}>
            </ParadasFrequentes>
            <Bola 
                cor={cor}
                cor_texto={cor_texto} 
                status_texto={status_texto} 
                descricao={descricao} 
                
            >
            </Bola>
            <View style={{ flexDirection: "row", justifyContent: "space-around"}}>
                <View style={{ justifyContent: "center", alignItems: "flex-start", paddingRight: 40 }}>
                    <Button contentStyle={{ height: 90, width: 180 }} title='Paradas' color="green" title='Paradas' mode="contained" onPress={operar}>
                        Operar
                    </Button>
                </View>
                <View style={{justifyContent: "center", alignItems: "flex-end", paddingRight: 40}}>
                    <Button contentStyle={{ height: 90, width: 180 }} title='Paradas' color="#d3d3d3" title='Paradas' mode="contained" onPress={inatividade}>
                            Zerar
                    </Button>
                </View>
            </View>
        </View>
    );
};
