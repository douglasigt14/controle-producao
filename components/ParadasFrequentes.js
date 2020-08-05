import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, FlatList, Text, View } from "react-native";
import styled from "styled-components";
import { Button, Card } from 'react-native-paper';
import Padrao from '../style/Padrao';
// import paradas_frequentes from '../api/paradas_frequentes';

const Texto = styled.Text`
    font-size: 18px;
  `;

const Div = styled.View`
    display: flex;    
    flex-direction: row;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 15px;
    justify-content: space-around;
`;

const Div_Card = styled.View`
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: space-around;
`;

const Fl = styled.FlatList`
    display: flex;    
    flex-direction: row;
`;
export default (props) => {    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    

    useEffect(() => {
        fetch('http://controleproducao.tuboarte.com/paradas-frequencia/'+props.id_posto)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    return (
        <>
            <Div_Card>
                <Card>
                    <Card.Content>
                        
                        <Div>
                            {isLoading ? <ActivityIndicator /> : (
                                <FlatList style={Padrao.FlatList} numColumns={3}
                                    data={data}
                                    keyExtractor={({ id }, index) => id}
                                    renderItem={({ item }) => (
                                        <Div>
                                            <Button contentStyle={{ height: 90, width: 180 }} title='Paradas' color="#ffc107" title='Paradas' mode="contained" onPress={() => Alert.alert("Paradas")}>
                                                <Texto>{item.rotulo} </Texto>
                                            </Button>
                                        </Div>
                                    )}
                                />
                            )}
                            
                        </Div>
                    </Card.Content>

                </Card>
            </Div_Card>
        </>
    );
};
