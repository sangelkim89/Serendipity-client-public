import React from "react";
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from "react-native";

import data from "./mockup";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class HuntSwipe extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
    };
  }

  //LifeCycle

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {},
    });
  }

  // mapping 해주는 메소드
  renderData = () => {
    return data.map((item, i) => {
      if (i < this.state.currentIndex) {
      }

      return (
        <Animated.View
          {...this.PanResponder.panHandlers}
          key={item.id}
          style={[
            {
              transform: this.position.getTranslateTransform(),
            },
            {
              height: SCREEN_HEIGHT - 250,
              width: SCREEN_WIDTH,
              padding: 10,
              position: "absolute",
              marginLeft: -205,
            },
          ]}
        >
          <Image
            style={{ flex: 1, height: null, width: null, resizeMode: "cover", borderRadius: 20 }}
            source={item.uri}
          />
        </Animated.View>
      );
    });
  };

  render() {
    return (
      <View style={{ backgroundColor: "#2ecc71", flex: 1 }}>
        <View style={{ height: 60 }}></View>
        <View style={{ flex: 1 }}>{this.renderData()}</View>
        <View style={{ height: 60 }}></View>
      </View>
    );
  }
}

export default HuntSwipe;
