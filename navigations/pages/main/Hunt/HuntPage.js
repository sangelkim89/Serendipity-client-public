import React, { useRef, useState, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import { Text, View, StyleSheet, Platform, Alert, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import { observer, inject } from "mobx-react";
import { AppLoading } from "expo";

import { UN_LIKE, LIKE, GET_ROOM, NEW_ROOM, NEW_MESSAGE } from "../../../queries";
import Card from "./Card";
import OverlayLabel from "./OverlayLabel";
import IconButton from "./IconBtn";

function HuntPage(props) {
  console.log("HUNTPAGE RENDERED!!!");
  const {
    recommendUser,
    navigation,
    myId,
    refreshRoomList,
    addLikeRoomId,
    subMsgs,
    subChats,
  } = props;

  // SWIPTE METHODS
  const useSwiper = useRef(null).current;

  // useMutate - unLike & like
  const [unLikeYou, { unlikeData }] = useMutation(UN_LIKE);
  const [likeYou, { likeData }] = useMutation(LIKE);

  const { data, loading } = useSubscription(NEW_ROOM, {
    variables: { id: myId },
  });

  // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewRoom = () => {
    console.log("핸들뉴룸 인보크드!!!");
    // console.log("handle newroom invoked!");
    // console.log("data in handle newroom : ", loading, data);
    if (!loading) {
      console.log("loading passed!");
      if (data.newRoom !== null) {
        // const { newRoom } = data;
        console.log("섭스크립션 내용있다!");
        // Alert.alert("Match!!!");
        subMsgs(data.newRoom);
      } else {
        console.log("섭스크립션 내용없다!");
      }
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨 - subscription
  useEffect(() => {
    handleNewRoom();
    console.log("useEffect for handleNewRoom");
  }, [data]);

  // Func = unLike & Like
  const likedFunc = item => {
    console.log("likefunc실행!");
    likeYou({
      variables: {
        selectedId: recommendUser[item].id,
      },
    })
      .then(res => {
        console.log("likefunc 회신옴");
        // 생성된 roomId를 매치스토어에 저장
        if (
          res.data.likeUser &&
          res.data.likeUser !== "The request has been successfully processed." &&
          res.data.likeUser !== "you already like each other!"
        ) {
          console.log("likefunc 회신오고 두 명 좋아요 했을때");
          // 라이크로 신규 생성된 채팅방 아이디 추가 메소드
          addLikeRoomId(res.data.likeUser);
        }
      })
      .catch(err => {
        console.log("HUTNPAGE_UNLIKE_ERR", err);
      });
  };

  const unlikedFunc = item => {
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
    <ImageBackground
      source={require("../../../../assets/gradient2.jpg")}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    >
      <SafeAreaView style={styles.container}>
        {recommendUser.length !== 0 ? (
          <>
            <Swiper
              useViewOverflow={Platform.OS === "ios"}
              ref={useSwiper}
              animateCardOpacity
              containerStyle={styles.container}
              cards={recommendUser}
              renderCard={data => <Card recommendUser={data} />}
              cardIndex={0}
              stackSize={2}
              onSwipedAll={() => {
                console.log("다재껴졌다~");
                navigation.navigate("AllSwiped");
              }}
              onSwipedLeft={item => {
                unlikedFunc(item);
              }}
              onSwipedRight={item => {
                console.log("오른쪽SWIPE", item);
                likedFunc(item);
              }}
              // onTapCard={item => {
              //   console.log("TAP", recommendUser[item]);
              // }}
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
            ></Swiper>
          </>
        ) : (
          <AppLoading />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  buttonsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 530,
  },
});

export default inject(({ huntStore, myProfileStore, matchStore }) => ({
  recommendUser: huntStore.recommendUser,
  myId: myProfileStore.id,
  refreshRoomList: matchStore.refreshRoomList,
  addLikeRoomId: matchStore.addLikeRoomId,
  subMsgs: matchStore.subMsgs,
  subChats: matchStore.subChats,
}))(observer(HuntPage));
