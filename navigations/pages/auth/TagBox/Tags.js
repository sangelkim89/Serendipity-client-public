import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Tags = ({ name, onPut }) => {
  //name과 onPut을 보낸다.
  return (
    <Text style={styles.name} onPress={name => onPut(name)}>
      {/* onPut에 (name)을 담는다. */}
      {name}
      {/* {name}에 name으로 지정된 것을 담는다 ex)태그1 */}
    </Text>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
  },
});

export default Tags;
