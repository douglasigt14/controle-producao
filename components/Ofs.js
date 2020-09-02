import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import {Collapse,CollapseHeader,CollapseBody} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator, CheckBox  } from "native-base";
import styled from "styled-components";
import { Table, Row, Rows } from "react-native-table-component";
import Padrao from "../style/Padrao";
// import CheckBox from "@react-native-community/checkbox";


export default (props) => {
  const TouchModal = styled.TouchableHighlight`
    margin-top: 10px;
    width: 45%;
    margin-bottom: 15px;
  `;

  const TextoModal = styled.Text`
    font-size: 25px;
  `;
  const TextoAccordeonHeader = styled.Text`
    font-size: 25px;
  `;

 

  const ViewBotoesOfs = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;

  const ViewAccordeonHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;


  let [isLoading, setLoading] = useState(true);
  let [cod_item, setCod_item] = useState(props.cod_item);
  let [cod_plano, setCod_plano] = useState(props.cod_plano);
  let [ofs, setOfs] = useState(props.ofs);
  let [dt_lotes, setDt_lotes] = useState(props.dt_lotes || []);
  let [toggleCheckBox, setToggleCheckBox] = useState(true);
  

    function unique(array) {
      return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
      });
    }
  const marcar_desmarcar = (num_ordem) => {
    let ofsTemp = ofs;
    ofsTemp.forEach(item => {
       if(item.num_ordem == num_ordem){
         item.marcado = !item.marcado;
         item.check = <CheckBox onPress={() => {
           marcar_desmarcar(item.num_ordem);
         }} checked={item.marcado} />;
       }
     });

    setOfs(ofsTemp);

    atualizar_lote();
  }; 


  const marcar_desmarcar_geral = (dt) => {
    console.warn(dt);
    let ofsTemp = ofs;
    ofsTemp.forEach(item => {
      if (item.dt_inicial == dt) {
        item.marcado = !item.marcado;
        item.check = <CheckBox onPress={() => {
          marcar_desmarcar(item.num_ordem);
        }} checked={item.marcado} />;
      }
    });
    // dt_lotes.forEach(item => {
    //   if (item.dt == dt) {
    //     item.marcado = !item.marcado;
    //     console.warn(item);
    //   }
    // });
    // setDt_lotes(dt_lotes);
  }; 

  const confirmar_of = () => {
    ofs.forEach(item => {
      if(item.marcado == true){
        console.warn(item);
      }
    });
  }  

  useEffect(() => {
    
    atualizar_lote();
  }, [ofs]); //


  const atualizar_lote = () => {
    let dt_lotes_temp = [];
    console.warn('Efeito OF')
    ofs.forEach((item) => {
      dt_lotes_temp.push(item.dt_inicial + "|" + item.cor);
      item.marcado = JSON.parse(item.marcado);
    });
    dt_lotes_temp = unique(dt_lotes_temp);
    let dt_lotes_temp2 = [];

    dt_lotes_temp.forEach((dt) => {
      var res = dt.split("|");
      var tabela_temp = [];

      ofs.forEach((item) => {
        if (item.dt_inicial === res[0]) {
          item.check = <CheckBox onPress={() => {
            marcar_desmarcar(item.num_ordem);
          }} checked={item.marcado} />;
          tabela_temp.push([
            item.num_ordem,
            item.item,
            item.qtde_of,
            item.check
          ]);
        }
      });
      var tabelaFinal = {
        tableHead: ["OF", "ITEM", "QTD", "CHECK"],
        tableData: tabela_temp,
      };

      dt_lotes_temp2.push({
        dt: res[0],
        marcado: true,
        cor: { backgroundColor: res[1] },
        tabela: tabelaFinal,
      });
    });
    setDt_lotes(dt_lotes_temp2);
  }  





   useEffect(() => {
      dt_lotes.forEach((item) => {
        item.marcado = JSON.parse(item.marcado);
      });
   }, [dt_lotes]);
  return (
    <>
      <View>
        <ViewBotoesOfs>
          <TouchModal
            style={{ ...Padrao.openButton, backgroundColor: "#ffc107" }}
            onPress={() => {
              props.funcao_limparOf();
            }}
          >
            <TextoModal style={Padrao.textStyle}>Corrigir</TextoModal>
          </TouchModal>

          <TouchModal
            style={{ ...Padrao.openButton, backgroundColor: "#28a745" }}
            onPress={() => {
              confirmar_of();
            }}
          >
            <TextoModal style={Padrao.textStyle}>Confirmar</TextoModal>
          </TouchModal>
        </ViewBotoesOfs>
        <FlatList
          LisHeaderComponent={<></>}
          // style={Padrao.FlatList}
          data={dt_lotes}
          keyExtractor={(index) => dt_lotes.dt}
          renderItem={({ item }) => (
            <View style={{ fontSize: 40 }}>
              <Collapse style={{ backgroundColor: "#fff" }}>
                <CollapseHeader style={{ height: 80, backgroundColor: "#000" }}>
                  <Separator bordered style={item.cor}>
                    <ViewAccordeonHeader>
                      <TextoAccordeonHeader>{item.dt}</TextoAccordeonHeader>
                      <CheckBox onPress={() => {
                        marcar_desmarcar_geral(item.dt);
                      }} checked={item.marcado} />
                      {/* <CheckBox
                        disabled={false}
                        value={item.marcado}
                        tintColors={{ true: "black", false: "black" }}
                        onValueChange={(newValue) => {
                          marcar_desmarcar_geral(item.dt);
                        }}
                      /> */}
                    </ViewAccordeonHeader>
                  </Separator>
                </CollapseHeader>
                <CollapseBody>
                  <ScrollView style={{ maxHeight: 150 }}>
                    <Table
                      borderStyle={{
                        borderWidth: 2,
                        borderColor: "#bebebe",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Row
                        data={item.tabela.tableHead}
                        style={{ height: 40, backgroundColor: "#d3d3d3" }}
                        textStyle={styles.text}
                      />
                      <Rows
                        data={item.tabela.tableData}
                        textStyle={styles.text}
                      />
                    </Table>
                  </ScrollView>
                </CollapseBody>
              </Collapse>
            </View>
          )}
          ListFooterComponent={<></>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff",borderColor: '#000' },
  head: { height: 40, backgroundColor: "#d3d3d3" },
  text: { margin: 6 },
});
