import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OverlayLabel = ({ label, color }) => (
  <View style={[styles.overlayLabel, { borderColor: color }]}>
    <Text style={[styles.overlayLabelText, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlayLabel: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 5,
    borderRadius: 10,
  },
  overlayLabelText: {
    fontSize: 40,
    textAlign: "center",
  },
});

export default OverlayLabel;
