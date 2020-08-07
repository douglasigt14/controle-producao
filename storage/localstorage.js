import {AsyncStorage, Alert} from "react-native";
// Chaves do localStorage
const maquina = "maquina";

// Funções de remoção
export const storageRemoveMaquina = () => localStorage.removeItem(maquina);

// Funções de obtenção
export const storageGetMaquina = async () => {
         try {
           const value = await AsyncStorage.getItem(maquina);
           if (value !== null) {
             // We have data!!
             console.log(value);
           }
         } catch (error) {
           // Error retrieving data
         }
       };
// Funções de definição
export const storageSetMaquina = async (maquinaV) => {
         try {
           await AsyncStorage.setItem(maquina, maquinaV);
           Alert.alert('Key: '+ maquina +"Value: "+maquinaV);
         } catch (error) {;
           // Error saving data
         }
};

//console.log('Teste');//localStorage.setItem(maquina, vMaquina);
