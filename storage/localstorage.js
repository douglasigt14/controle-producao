import SyncStorage from "sync-storage";
// Chaves do localStorage
const maquina = "maquina";

// Funções de remoção
export const storageRemoveMaquina = () => localStorage.removeItem(maquina);

// Funções de obtenção
export const storageGetMaquina = () => SyncStorage.get(maquina);

// Funções de definição
export const storageSetMaquina = (vMaquina) => SyncStorage.set(maquina, vMaquina);

//console.log('Teste');//localStorage.setItem(maquina, vMaquina);
