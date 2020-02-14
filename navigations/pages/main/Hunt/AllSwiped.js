import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer, inject } from "mobx-react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { GET_LIST } from "../../../queries";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const AllSwiped = props => {
  const { navigation, getCardList } = props;

  // useMutate - getHuntList
  const [getMutateHuntList, { getCardData }] = useMutation(GET_LIST);

  // 새로운 카드 불러오기
  const reLoadCard = async () => {
    console.log("새로운카드주세요");
    const getCard = await getMutateHuntList();
    getCardList(getCard);
    navigation.navigate("HuntPage");
  };

  return (
    <SafeAreaView style={styles.container} activeOpacity={1}>
      <Text>AllSwiped</Text>
      <TouchableOpacity onPress={reLoadCard}>
        <Text style={styles.btnText}>Reload</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 30,
  },
});

export default inject(({ huntStore }) => ({
  getCardList: huntStore.getCardList,
}))(observer(AllSwiped));
