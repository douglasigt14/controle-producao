import { StyleSheet} from 'react-native';

export default StyleSheet.create({
  barra: {
    backgroundColor: "#708090",
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
  },
  topView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    paddingTop: 5,
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
    height: 90,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: "black",
    borderRadius: 50,
    height: 50,
    width: 50,
    padding: 5,
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
  inputModal: {
    height: 80,
    fontSize: 30,
    borderColor: "gray",
    borderWidth: 2,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  viewNotificacao: {
    alignItems: "center",
    backgroundColor: "#F8D7D9",
    borderColor: "#f5c6cb"
  }

  //Modal
});
