import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Padrao from './estilo/Padrao.js';

export default function App() {
  return (
    <View style={Padrao.container}>
      <Text>Controle de Produção</Text>
      <StatusBar style="auto" />
    </View>
  );
}
