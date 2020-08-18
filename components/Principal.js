import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, Alert } from "react-native";
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
    const [finalizado, setFinalizado] = useState(true);
    
    

    const parar = (rotulo, descricao) =>{
        setCor('red');
        setStatus_texto('PARADO');
        setCor_texto('white');
        setDescricao(rotulo+' '+descricao);
        setFinalizado(false);
    } 
    
    const operar = (descricao) => {
        setCor('green');
        setStatus_texto('OPERANDO');
        setCor_texto('white');
        setDescricao(descricao);
        setFinalizado(false);
    } 

    
    const finalizar = () => {
        setCor('#d3d3d3');
        setStatus_texto('INICIAR');
        setCor_texto('black');
        setDescricao('');
        setFinalizado(true);
    }

    return (
      <View>
        <Appbar.Header style={Padrao.barra}>
          <Appbar.Content title="Controle de Produção" />
          <Appbar.Action
            icon="arrow-right"
            onPress={() => {
              props.funcao_deslogar();
            }}
          />
        </Appbar.Header>

        <GrupoButoes
          finalizado={finalizado}
          funcao_finalizar={finalizar}
        ></GrupoButoes>

        <ParadasFrequentes
          id_posto={props.id_posto}
          operador_id={props.operador_id}
          operador_desc={props.operador_desc}
          funcao_parar={parar}
        ></ParadasFrequentes>

        <Bola
          cor={cor}
          cor_texto={cor_texto}
          status_texto={status_texto}
          descricao={descricao}
          funcao_operar={operar}
          funcao_parar={parar}
          id_posto={props.id_posto}
        ></Bola>
      </View>
    );
};
