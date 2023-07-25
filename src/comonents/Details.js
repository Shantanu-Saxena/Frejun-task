import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

function Details({ route, navigation }) {
  const { res } = route.params;
  const [comments, setComments] = useState([]);
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  async function fetchComments() {
    const response = await fetch(
      `https://dummyjson.com/posts/${res.id}/comments`
    );
    const data = await response.json();
    setComments(data.comments);
  }

  const createAlert = (title, message) =>
    Alert.alert(title, message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  async function addCommentHandler() {
    if (newComment === "")
      createAlert("Failed", "Oops, Comment can not be empty");
    else {
      try {
        const response = await fetch("https://dummyjson.com/comments/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: newComment,
            postId: res.id,
            userId: 5,
          }),
        });
        const data = await response.json();
        setComments((prev) => [...prev, data]);
        createAlert("Done", "Your comment is added successfully!");
        setDisplayCommentInput(false);
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Title</Text>
        <Text>{res.title}</Text>
        <Text style={styles.label}>Reactions: {res.reactions}</Text>
        <Text style={styles.label}>Comments</Text>
        {comments?.map((res) => (
          <Text key={res.id} style={{ margin: 5 }}>
            {res.body}
          </Text>
        ))}
        {displayCommentInput ? (
          <View style={{ marginTop: 50 }}>
            <TextInput
              value={newComment}
              style={styles.inputBox}
              placeholder="comment here..."
              onChangeText={(val) => setNewComment(val)}
            />
            <Button onPress={addCommentHandler} title="done" />
          </View>
        ) : (
          <View style={{ marginTop: 50, maxWidth: 200, alignSelf: "center" }}>
            <Button
              onPress={() => setDisplayCommentInput(true)}
              title="Add comment"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 30,
  },
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  inputBox: {
    padding: 5,
    backgroundColor: "lightgray",
    fontSize: 16,
    borderRadius: 5,
    // width: "60%",
    // height: 100,
    marginVertical: 20,
  },
});

export default Details;
