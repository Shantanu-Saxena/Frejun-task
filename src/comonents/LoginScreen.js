import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducer/userReducer";

function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState("kminchelle");
  const [userPassword, setUserPassword] = useState("0lelplR");
  const dispatch = useDispatch();

  async function loginUser() {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: userPassword,
        }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      dispatch(setUser(data));
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Text style={styles.label}>User Name</Text>
        <TextInput
          value={userName}
          style={styles.inputBox}
          onChangeText={(value) => setUserName(value)}
          placeholder="Type here..."
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={userPassword}
          secureTextEntry={true}
          style={styles.inputBox}
          onChangeText={(val) => setUserPassword(val)}
          placeholder="Type here..."
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Submit" onPress={loginUser} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "lightgray",
    padding: 5,
    margin: 5,
    marginLeft: 20,
    borderRadius: 5,
    minWidth: 200,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
    color: "gray",
  },
});

export default LoginScreen;
