import AsyncStorage from "@react-native-community/async-storage";
import React, { useState, useEffect } from "react";

// Funções de definição
export const storageSet = async (key, value) => {
         try {
           await AsyncStorage.setItem(key, value);
         } catch (e) {
           // saving error
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
