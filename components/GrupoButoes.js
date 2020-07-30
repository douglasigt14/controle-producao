import React from "react";
import { Button, Alert, View } from "react-native";
import Padrao from "../style/Padrao";
import Botao from "./Botao";

export default () => {
  return (
    <View style={Padrao.grupobutoes}>
      <Botao texto="Paradas" cor="#dc3545" />
      <Botao texto="Operações" cor="#28a745" />
    </View>
  );
};
