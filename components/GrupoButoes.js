import React from "react";
import { Button, Alert, View } from "react-native";
import Padrao from "../style/Padrao";

export default () => {
  return (
    <View style={Padrao.grupobutoes}>
      <View style={Padrao.viewButton}>
        <Button 
          onPress={() => Alert.alert("Simple Button pressed")}
          title="Paradas"
          accessibilityLabel="Learn more about this purple button"
          color="#dc3545"
        />
      </View>
      <View style={Padrao.viewButton}>
        <Button style={Padrao.view}
          onPress={() => Alert.alert("Simple Button pressed")}
          title="Operações"
          accessibilityLabel="Learn more about this purple button"
          color="#28a745"
        />
      </View>
    </View>
  );
};
