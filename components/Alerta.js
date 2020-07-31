import { Alert } from "react-native";

export default (props) => {
    return (
        Alert.alert("Simple "+props.msg)
    );
}
