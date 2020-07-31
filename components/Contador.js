import React, {useState} from 'react';
import { Text, Button,View } from "react-native";
import Padrao from '../style/Padrao';

export default (props) => {
    const [numero, setNumero] = useState(props.inicial);

    const inc = () => {
        setNumero(numero+1)
    }    
    const dec = () => {
        setNumero(numero - 1)
    }   

    return (
        <View>
            <Text>{numero}</Text>
            <Button title='+' onPress={inc}> </Button>
            <Button title='-' onPress={dec}></Button>
        </View>
    );
}
