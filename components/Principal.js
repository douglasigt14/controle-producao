import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, Platform } from "react-native";
import Bola from "./Bola";
import GrupoButoes from "./GrupoButoes";




export default (props) => {
    return (
        <View>
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
