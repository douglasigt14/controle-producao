import React from "react";
import { Button, Text , View } from "react-native";


function Teste() {
  return (
    <View>
      <Text>Hello CodeSandbox</Text>
      <Text>Start editing to see some magic happen!</Text>
      <Button
        onPress={() => Alert.alert("Paradas")}
        title="Paradas"
        accessibilityLabel="Learn more about this purple button"
        color="#dc3545"
      />
    </View>
  );
}

export default Teste;
