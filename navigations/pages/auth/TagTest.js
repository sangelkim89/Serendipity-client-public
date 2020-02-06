import React from "react";
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

const DATA = [
  {
    id: "태그1",
    title: "태그1",
  },
  {
    id: "태그2",
    title: "태그2",
  },
  {
    id: "태그3",
    title: "태그3",
  },
  {
    id: "태그4",
    title: "태그4",
  },
  {
    id: "태그5",
    title: "태그5",
  },
  {
    id: "태그6",
    title: "태그6",
  },
  {
    id: "태그7",
    title: "태그7",
  },
  {
    id: "태그8",
    title: "태그8",
  },
];

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[styles.item, { backgroundColor: selected ? "red" : "pink" }]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function TagTest() {
  const [selected, setSelected] = React.useState(new Map());
  //selected 가 state로 들어가야해요
  // state는 다시 모벡스의 state로 들어가야해요
  // setSelected를 스토어의 메소드(@action)알고리즘으로 바꾼다.
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
    console.log(selected),
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: "pink",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 10,
  },
});
