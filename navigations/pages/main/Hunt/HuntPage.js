import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HuntSwipe from "./HuntSwipe";

function HuntPage() {
  return (
    <SafeAreaView style={styles.container}>
      <HuntSwipe />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HuntPage;

/**
 * 카드더미를 가지고 있는데 카드리스트 구성요소가 된다.
 * 왼쪽으로 스와이프, 오른쪽으로 스와이프
 * 카드를 스와이프하면 카드 묶음이 자동으로 올라간다.
 * 컨텐츠를 삽입할 수 있는 재사용 가능한 컴포넌트를 만드려고 한다.
 * 스와이프 컴포넌트를 보유한 상위 컴포넌트의 컨텐츠 렌더링을 처리한다.
 */
