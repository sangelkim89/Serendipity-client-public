import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-deck-swiper";

import Card from "./Card";
import OverlayLabel from "./OverlayLabel";
import IconButton from "./IconBtn";
import datas from "./mockup";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function HuntPage() {
  // SWIPTE METHODS
  const useSwiper = useRef(null).current;
  const handleOnSwipedLeft = async () => {
    console.log("왼쪽버튼");
  };
  const handleOnSwipedTop = () => {
    console.log("위쪽버튼");
  };
  const handleOnSwipedRight = () => {
    console.log("오른쪽버튼");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        useViewOverflow={Platform.OS === "ios"}
        ref={useSwiper}
        animateCardOpacity
        containerStyle={styles.container}
        cards={datas}
        renderCard={datas => <Card datas={datas} />}
        cardIndex={0}
        backgroundColor="black"
        stackSize={2}
        onSwipedLeft={item => {
          // 동작할때 그래프큐엘문 전송
          console.log("LEFT", datas[item]);
        }}
        onSwipedRight={item => {
          // 동작할때 그래프큐엘문 전송
          console.log("RIGHT", datas[item]);
        }}
        onTapCard={item => {
          console.log("TAP", item);
        }}
        verticalSwipe={false}
        infinite
        showSecondCard
        animateOverlayLabelsOpacity
        overlayLabels={{
          left: {
            title: "NOPE",
            element: <OverlayLabel label="NOPE" color="red" />,
            style: {
              wrapper: {
                ...styles.overlayWrapper,
                alignItems: "flex-start",
                marginLeft: 160,
                padding: 30,
              },
            },
          },
          right: {
            title: "LIKE",
            element: <OverlayLabel label="LIKE" color="#44bd32" />,
            style: {
              wrapper: {
                ...styles.overlayWrapper,
                alignItems: "flex-start",
                marginLeft: 10,
                padding: 30,
              },
            },
          },
        }}
      />
      <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="star"
          onPress={handleOnSwipedTop}
          color="white"
          backgroundColor="#3CA3FF"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7d794",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 530,
  },
});

export default HuntPage;
