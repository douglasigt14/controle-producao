import AsyncStorage from "@react-native-community/async-storage";
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
    const jsonValue = await AsyncStorage.getItem("@maquina");
    console.warn(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log("Done.");
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
