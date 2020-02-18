import React, { useRef, useState, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import { Text, View, StyleSheet, Platform, Alert, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import { observer, inject } from "mobx-react";
import { AppLoading } from "expo";

import { UN_LIKE, LIKE, GET_ROOM, NEW_ROOM } from "../../../queries";
import Card from "./Card";
import OverlayLabel from "./OverlayLabel";
import IconButton from "./IconBtn";

function HuntPage(props) {
  console.log("HUNTPAGE RENDERED!!!");
  const { recommendUser, navigation, myId, refreshRoomList, addLikeRoomId, subMsgs } = props;

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

  // useQuery - getRoom : login.js/matchPageList에서는 에러발생
  console.log("myId in huntPage.js : ", myId);
  const [getRoomMethod, { data: initRoomData }] = useMutation(GET_ROOM, {
    variables: { id: myId },
  });

  const { data, loading } = useSubscription(NEW_ROOM, {
    variables: { id: myId },
    fetchPolicy: "no-cache",
  });

  // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewRoom = () => {
    console.log("handle newroom invoked!");
    console.log("data in handle newroom : ", loading, data);
    if (!loading) {
      console.log("loading passed!");
      if (data.newRoom !== null) {
        // const { newRoom } = data;
        console.log("newRoom in huntPage : ", data.newRoom);
        Alert.alert("Match!!!");
        subMsgs(data.newRoom);
      } else {
        console.log("roomData in matchPageList.js is undefined!");
      }
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨 - subscription
  useEffect(() => {
    handleNewRoom();
    console.log("useEffect invoked!");
  }, [data]);

  useEffect(() => {
    getRoomMethod();
  }, []);

  // 왜 useEffect 안으로 들어가면 채팅방이 보이지 않는가???
  if (initRoomData !== undefined) {
    // console.log("roomData in huntPage.js : ", initRoomData);
    refreshRoomList(initRoomData.getRoom);
  } // mobx roomlist에 저장

  // Func = unLike & Like
  const likedFunc = item => {
    console.log("RIGHT", recommendUser[item].id);
    likeYou({
      variables: {
        selectedId: recommendUser[item].id,
      },
    })
      .then(res => {
        console.log("HUNTPAGE_LIKE_RES", res);
        // 생성된 roomId를 매치스토어에 저장
        if (
          res.data.likeUser &&
          res.data.likeUser !== "The request has been successfully processed."
        ) {
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
      style={{ width: "100%", height: "100%" }}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default inject(({ huntStore, myProfileStore, matchStore }) => ({
  recommendUser: huntStore.recommendUser,
  myId: myProfileStore.id,
  refreshRoomList: matchStore.refreshRoomList,
  addLikeRoomId: matchStore.addLikeRoomId,
  subMsgs: matchStore.subMsgs,
}))(observer(HuntPage));
