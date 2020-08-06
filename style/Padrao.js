import { StyleSheet} from 'react-native';

export default StyleSheet.create({
  barra: {
    backgroundColor: "black",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
  },
  viewButton: {
    padding: 3,
  },
  grupobutoes: {
    padding: 10,
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "center",
  },
  FlatList: {
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#000",
    borderRadius: 5,
    height: 70,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  //Modal
});
