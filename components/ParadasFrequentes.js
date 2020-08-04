import React, { useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import { Button, Card } from 'react-native-paper';
import paradas_frequentes from '../api/paradas_frequentes';

const Texto = styled.Text`
    font-size: 18px;
  `;

const Div = styled.View`
    display: flex;    
    flex-direction: row;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    justify-content: space-around;
`;

const Div_Card = styled.View`
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    justify-content: space-around;
`;

export default () => {
    const [msg, setMsg] = useState('Douglas');
    let finalizado = false;
    return (
        <>

            <Div_Card>
                <Card>
                   
                    <Card.Content>
                        <Div>
                            <Div>
                                <Button contentStyle={{ height: 90, width: 180}} title='Paradas' color="#ffc107" title='Paradas' mode="contained" onPress={() => Alert.alert("Paradas")}>
                                    <Texto>P-18 </Texto>
                                </Button>
                            </Div>
                            <Div>
                                <Button contentStyle={{ height: 90, width: 180}} color="#ffc107" title='Operações' mode="contained" onPress={() => console.log('Pressed')}>
                                    <Texto> P-19 </Texto>
                                </Button>
                            </Div>
                            <Div>
                                <Button contentStyle={{ height: 90, width: 180}} color="#ffc107" title='C. Diarios' mode="contained" onPress={() => console.log('Pressed')}>
                                    <Texto> P-01 </Texto>
                                </Button>
                            </Div>
                            
                        </Div>
                    </Card.Content>

                    <Card.Content>
                        <Div>
                            <Div>
                                <Button contentStyle={{ height: 90, width: 180}} title='Paradas' color="#ffc107" title='Paradas' mode="contained" onPress={() => Alert.alert("Paradas")}>
                                    <Texto>P-18 </Texto>
                                </Button>
                            </Div>
                            <Div>
                                <Button contentStyle={{ height: 90, width: 180}} color="#ffc107" title='Operações' mode="contained" onPress={() => console.log('Pressed')}>
                                    <Texto> P-19 </Texto>
                                </Button>
                            </Div>
                            <Div>
                                <Button contentStyle={{ height: 90, width: 180}} color="#ffc107" title='C. Diarios' mode="contained" onPress={() => console.log('Pressed')}>
                                    <Texto> P-01 </Texto>
                                </Button>
                            </Div>

                        </Div>
                    </Card.Content>

                </Card>
            </Div_Card>
        </>
    );
};
