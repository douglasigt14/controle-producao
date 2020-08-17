import AsyncStorage from "@react-native-community/async-storage";
import React, { useState, useEffect } from "react";
// Chaves do localStorage
// const maquina = "maquina";



// Funções de definição
export const storageSetMaquina = async (value) => {
  try {
    await AsyncStorage.setItem("@maquina", value);
  } catch (e) {
    // saving error
  }
};
// Funções de obtenção
export const storageGetMaquina = async () => {
         try {
           let value = await AsyncStorage.getItem("@maquina");
           value != null ? setId_posto(value) : setId_posto(null);
         } catch (e) {
           // read error
         }
       };


export const consulta_storage = () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.warn({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });
}

export const teste = () => {
    return 'Douglas';
}
