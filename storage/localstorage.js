import AsyncStorage from "@react-native-community/async-storage";
// Chaves do localStorage
// const maquina = "maquina";

// Funções de remoção
export const storageRemoveMaquina = () => localStorage.removeItem(maquina);

// Funções de obtenção
export const storageSetMaquina = async (value) => {
  try {
    await AsyncStorage.setItem("maquina", value);
  } catch (e) {
    // saving error
  }
};
// Funções de definição
export const storageGetMaquina = async () => {
         try {
           const value = await AsyncStorage.getItem("maquina");
           if (value !== null) {
             // value previously stored
           }
         } catch (e) {
           // error reading value
         }
       };

//console.log('Teste');//localStorage.setItem(maquina, vMaquina);
