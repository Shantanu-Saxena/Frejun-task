import { View, Image, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user.user);

  return (
    <View style={styles.container}>
      <View style={{ borderRadius: 50, margin: 10, height: 300 }}>
        <Image source={{ uri: user.image }} style={{ height: "80%" }} />
      </View>
      <Text style={styles.label}>User name: {user.username ?? "NA"}</Text>

      <Text style={styles.labelSecondary}>
        {user.firstName ?? ""} {user.lastName ?? ""}
      </Text>
      <Text style={styles.labelSecondary}>{user.gender ?? ""}</Text>
      <Text style={styles.labelSecondary}>{user.email ?? "NA"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 30,
  },
  labelSecondary: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 20,
    color: "gray",
  },
});
export default Profile;
