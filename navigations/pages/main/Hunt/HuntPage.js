import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-deck-swiper";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { observer, inject } from "mobx-react";
import { AppLoading } from "expo";

import { UN_LIKE, LIKE } from "../../../queries";
import Card from "./Card";
import OverlayLabel from "./OverlayLabel";
import IconButton from "./IconBtn";
import AllSwiped from "./AllSwiped";

function HuntPage(props) {
  const { recommendUser } = props;

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

  // useMutate - unLike & like
  const [unLikeYou, { unlikeData }] = useMutation(UN_LIKE);
  const [likeYou, { likeData }] = useMutation(LIKE);

  const likedFunc = item => {
    // 동작할때 그래프큐엘문 전송
    console.log("RIGHT", recommendUser[item].id);
    likeYou({
      variables: {
        selectedId: recommendUser[item].id,
      },
    })
      .then(res => {
        console.log("HUNTPAGE_LIKE_RES", res);
      })
      .catch(err => {
        console.log("HUTNPAGE_UNLIKE_ERR", err);
      });
  };

  const unlikedFunc = item => {
    // 동작할때 그래프큐엘문 전송
    console.log("LEFT", recommendUser[item].id);
    unLikeYou({
      variables: {
        selectedId: recommendUser[item].id,
      },
    })
      .then(res => {
        console.log("HUNTPAGE_RES", res);
      })
      .catch(err => {
        console.log("HUTNPAGE_UNLIKE", err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {recommendUser.length !== 0 ? (
        <Swiper
          useViewOverflow={Platform.OS === "ios"}
          ref={useSwiper}
          animateCardOpacity
          containerStyle={styles.container}
          cards={recommendUser}
          renderCard={data => <Card recommendUser={data} />}
          cardIndex={0}
          backgroundColor="black"
          stackSize={2}
          onSwipedAll={() => {
            console.log("다재껴졌다~");
            return <AllSwiped />;
          }}
          onSwipedLeft={item => {
            unlikedFunc(item);
          }}
          onSwipedRight={item => {
            likedFunc(item);
          }}
          onTapCard={item => {
            console.log("TAP", recommendUser[item].id);
          }}
          verticalSwipe={false}
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
      ) : (
        <AppLoading />
      )}

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

export default inject(({ huntStore }) => ({
  recommendUser: huntStore.recommendUser,
}))(observer(HuntPage));
