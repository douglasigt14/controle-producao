import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Alert } from "react-native";
import {Collapse,CollapseHeader,CollapseBody} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator, CheckBox  } from "native-base";
import styled from "styled-components";
import { Table, Row, Rows } from "react-native-table-component";
import Padrao from "../style/Padrao";
import { storageSet, consulta_storage } from "../storage/localstorage";
import AwesomeAlert from 'react-native-awesome-alerts';
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
  let [dt_lotes, setDt_lotes] = useState([]);
  let [toggleCheckBox, setToggleCheckBox] = useState(true);
  let [descricao_alert, setDescricao_alert] = useState("");
  let [mostrar_alert, setMostrar_alert] = useState(false);
  

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

    // dt_lotes.forEach(item => {
    //   console.warn(dt_lotes);
    // });

    setOfs(ofsTemp);

    atualizar_lote();
  }; 


  const marcar_desmarcar_geral = (dt, marcado_p) => {
    let ofsTemp = ofs;
    ofsTemp.forEach(item => {
      if (item.dt_inicial == dt) {
        item.marcado = marcado_p;
        item.check = <CheckBox onPress={() => {
          marcar_desmarcar(item.num_ordem);
        }} checked={marcado_p} />;
      }
    });
    setOfs(ofsTemp);
    atualizar_lote(marcado_p, dt);
  }; 

  const confirmar_of = () => {
    let ofs_marcadas = [];
    ofs.forEach(item => {
      if(item.marcado == true){
        ofs_marcadas.push(item);
      }
    });
    if(ofs_marcadas.length > 0 ){
      storageSet("@ofs_selecionadas", JSON.stringify(ofs_marcadas));
      props.funcao_sumir_modalItem(JSON.stringify(ofs_marcadas));
      props.funcao_limparOf();
    }
    else{
      setDescricao_alert("Marque pelo Menos uma OF");
      setMostrar_alert(true);
      setTimeout(function () { setMostrar_alert(false); }, 1000);
    }
  }  

  const contarRepeticoes = (array, valor) => {

    let contador = 0;

    if (array != null) {
  
      array.forEach(element => {
        if (element != null) {
          if (element.dt_inicial == valor) {
            contador++;
          }
        }
      });
    }
    return contador;
  }

  const atualizar_lote = (marcado_p = true, dt_p = null) => {
  
    let dt_lotes_temp = [];
    ofs.forEach((item) => {
      dt_lotes_temp.push(item.dt_inicial + "|" + item.cor);
      item.marcado = JSON.parse(item.marcado);
    });
    dt_lotes_temp = unique(dt_lotes_temp);
    let dt_lotes_temp2 = [];



    dt_lotes_temp.forEach((dt) => {
      
      let res = dt.split("|");
      let tabela_temp = [];

      let cont = contarRepeticoes(ofs,res[0]);
      let cont_of = 0;
     

    
      
      ofs.forEach((item) => {
        
        if (item.dt_inicial === res[0]) {
          if (item.marcado) {
            cont_of++;
          }
          item.check = <CheckBox style={{ width: 40, height: 40 }} color='black' onPress={() => {
            marcar_desmarcar(item.num_ordem);
          }} checked={item.marcado} />;
          tabela_temp.push([
            item.num_ordem,
            item.cod_item+' - '+item.item,
            item.mascara,
            item.qtde_pend,
            item.check
          ]);
        }
      });

      // console.warn('Dt '+res[0]+': '+cont+' - '+cont_of);
      let marcado_temp = cont == cont_of ? true : false;

      let tabelaFinal = {
        tableHead: ["OF", "ITEM", "COR", "QTD", "CHECK"],
        tableData: tabela_temp,
      };

      dt_lotes_temp2.push({
        dt: res[0],
        marcado: marcado_temp,
        cor: { backgroundColor: res[1] },
        tabela: tabelaFinal,
        check: <CheckBox style={{ width: 50, height: 50}} color='black' onPress={() => {
          marcar_desmarcar_geral(res[0], !marcado_temp);
        }} checked={marcado_temp} />
      });
    });
    setDt_lotes(dt_lotes_temp2);
    
  }  





   useEffect(() => {
     atualizar_lote();
   }, [ofs]);
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
                      {item.check}
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


      <AwesomeAlert
        show={mostrar_alert}
        showProgress={false}
        title={descricao_alert}
        message=""
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        cancelText="No, cancel"
        contentStyle={{ width: 400, height: 200 }}
        titleStyle={{ fontSize: 25, textAlign: "center" }}
        messageStyle={{ fontSize: 15 }}
      />

    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff",borderColor: '#000' },
  head: { height: 40, backgroundColor: "#d3d3d3" },
  text: { margin: 6 },
});
