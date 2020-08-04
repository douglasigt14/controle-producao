import React, { Component, useState }  from "react";
import styled from "styled-components";
import { Alert ,TextInput  } from "react-native";
import {Button, Card, Title} from 'react-native-paper';


const Div_Card = styled.View`
    margin-left: 150px;
    margin-right: 150px;
    padding-top: 400px;
`;

const Div_input = styled.View`
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 45px;
    margin-bottom: 15px;
`;

const Div_Button = styled.View`
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


export default (props) => {
    const [value_login, onChangeText_login] = useState('');
    const [value_senha, onChangeText_senha] = useState('');

    return (
        <Div_Card>
           < Card>
                <Card.Content>
                    <Title>Login  {value_login}</Title>
                    <Div_input>
                        
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10}}
                            onChangeText={text => onChangeText_login(text)}
                            value={value_login}
                            autoCorrect={false}
                        />
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
                            onChangeText={text => onChangeText_senha(text)}
                            secureTextEntry={true}
                            visible-password={true}  
                            value={value_senha}
                            autoCorrect={false}
                        />
                    </Div_input>
                </Card.Content>
                <Div_Button>
                    <Button 
                        onPress={() => Alert.alert("Login")} 
                        contentStyle={{ height: 60 , width: 300 }} 
                        color="#dc3545" 
                        title='Login' 
                        mode="contained">
                            Entrar
                    </Button>
                </Div_Button>
            </Card>
        </Div_Card>
    );
};
