import React, {useState} from 'react';
import { Text, Button,View, StyleSheet } from "react-native";
import Padrao from '../style/Padrao';
import styled from "styled-components";

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
    const [relogio, setRelogio] = useState('00:00:00');
    setInterval(function () {

        let novaHora = new Date();
        // getHours trará a hora
        // geMinutes trará os minutos
        // getSeconds trará os segundos
        let hora = novaHora.getHours();
        let minuto = novaHora.getMinutes();
        let segundo = novaHora.getSeconds();
        // Chamamos a função zero para que ela retorne a concatenação
        // com os minutos e segundos
        hora = zero(hora);
        minuto = zero(minuto);
        segundo = zero(segundo);
        // Com o textContent, iremos inserir as horas, minutos e segundos
        // no nosso elemento HTML
        setRelogio(hora + ':' + minuto + ':' + segundo);
        //document.getElementById('hora').textContent = hora + ':' + minuto + ':' + segundo;
    }, 1000)   

    function zero(x) {
        if (x < 10) {
            x = '0' + x;
        } return x;
    }

    return (
        <Div>
            <Texto>{relogio}</Texto>
        </Div>
    );
}
