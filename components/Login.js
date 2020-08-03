import React, { Component, useState }  from "react";
import styled from "styled-components";
import { View, Text, Platform, Alert ,TextInput  } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


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
    const [value_login, onChangeText_login] = React.useState('');
    const [value_senha, onChangeText_senha] = React.useState('');

    return (
        <Div_Card>
           < Card>
                <Card.Content>
                    <Title>Login</Title>
                    <Div_input>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10}}
                            onChangeText={text => onChangeText_login(text)}
                            value={value_login}
                        />
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
                            onChangeText={text => onChangeText_senha(text)}
                            secureTextEntry={true}
                            visible-password={true}  
                            value={value_senha}
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
