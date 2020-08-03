import React, { Component, useState }  from "react";
import styled from "styled-components";
import { View, Text, Platform, TextInput  } from "react-native";
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
                            value={value_senha}
                        />
                    </Div_input>
                </Card.Content>
                <Card.Actions>
                    <Div_Button>
                        <Button color="#dc3545" title='Paradas' mode="contained">Entrar</Button>
                    </Div_Button>
                </Card.Actions>
            </Card>
        </Div_Card>
    );
};
