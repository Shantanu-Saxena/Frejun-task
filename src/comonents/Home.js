import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../store/store";

function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const user = useSelector((state) => state.user.user);

  async function fetchData() {
    try {
      const res = await fetch(`https://dummyjson.com/posts/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
    }
  }

  const createAlert = (title, message) =>
    Alert.alert(title, message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  async function addPostHandler() {
    if (postTitle === "" || postBody === "")
      createAlert("Failed", "title or body can not be empty");
    else {
      try {
        const response = await fetch("https://dummyjson.com/posts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: postTitle,
            body: postBody,
            userId: user.id,
          }),
        });
        const jsonRes = await response.json();
        setPosts((prev) => [...prev, jsonRes]);
        createAlert("Done", "Your post is added successfully!");
      } catch (error) {
        console.log(error);
      }
      setModalVisible(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {posts?.map((res) => (
          <TouchableOpacity
            key={res.id}
            onPress={() => navigation.navigate("Details", { res })}
            style={styles.postBox}
          >
            <Text style={{ fontSize: 25, marginBottom: 10 }}>{res.title}</Text>
            <Text style={{ color: "gray" }}>{res.body}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.titleInputBox}
                  onChangeText={(value) => setPostTitle(value)}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                }}
              >
                <Text style={styles.label}>Body</Text>
                <TextInput
                  multiline
                  style={styles.inputBox}
                  onChangeText={(val) => setPostBody(val)}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                  width: "50%",
                  alignSelf: "center",
                  minWidth: 100,
                }}
              >
                <Button onPress={addPostHandler} title="Done" />
              </View>

              <View
                style={{
                  marginTop: 10,
                  width: "50%",
                  alignSelf: "center",
                  minWidth: 100,
                }}
              >
                <Button
                  onPress={() => setModalVisible(false)}
                  title="Cancel"
                  color="#e84a3f"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    padding: 5,
    backgroundColor: "lightgray",
    borderRadius: 5,
    width: "60%",
    minWidth: 150,
    height: 100,
    marginLeft: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 600,
    minWidth: 20,
  },
  titleInputBox: {
    backgroundColor: "lightgray",
    padding: 5,
    margin: 5,
    marginLeft: 20,
    borderRadius: 5,
    width: "60%",
    minWidth: 150,
  },
  addButton: {
    backgroundColor: "#6689fa",
    width: 60,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 15,
    textAlign: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
    textAlignVertical: "center",
  },
  postBox: {
    margin: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
});

export default Home;
