import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { observer, inject } from "mobx-react";

function SignupTag(props) {
  const { Tag, tagDATA, changeColor } = props;

  //Tag, tagDATA를 props로 사용합니다.
  _doNextPage = () => {
    props.navigation.navigate("SignupPic");
    console.log("tag에서 pic로 이동합니다.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>TagBox</Text>
      </View>
      <View>
        <View>
          {tagDATA.map((tag, f) => {
            console.log("map이후 tag", tag);

            //     <TouchableOpacity
            //       onPress={() => Clickanyname(idanyname)}
            //       style={[styles.itemanyname, { backgroundColor: selectanyname ? "red" : "pink" }]}
            //     >
            //       <Text style={styles.title}>{idanyname}</Text>
            //     </TouchableOpacity>

            return (
              <TouchableOpacity
                key={f}
                tag={tag}
                onPress={() => {
                  Tag(f);
                }}
                style={[styles.tagColor, { backgroundColor: changeColor ? "red" : "pink" }]}
              >
                <Text>{tag}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={_doNextPage}>
          <Text style={styles.buttonTitle}>next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
  },
  titleArea: {
    width: "100%",
    padding: wp("10%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("10%"),
  },
  buttonArea: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: hp("5%"),
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
  },
  tagColor: {
    backgroundColor: "pink",
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 100,
  },
});

export default inject(({ signupStore }) => ({
  Tag: signupStore.addtagState,
  tagDATA: signupStore.tagDATA,
  selectedTag: signupStore.selectedArray,
}))(observer(SignupTag));

// function Itemanyname({ idanyname, selectanyname, Clickanyname }) {
//   //ITEM 이라는 함수에 {idanyname, selected, Clickanyname}를 넣어서 실행하면
//   return (
//     <TouchableOpacity
//       onPress={() => Clickanyname(idanyname)}
//       style={[styles.itemanyname, { backgroundColor: selectanyname ? "red" : "pink" }]}
//     >
//       <Text style={styles.title}>{idanyname}</Text>
//     </TouchableOpacity>
//   );
//   //<TouchableOpacity>안에 담겨져 있는 것을 리턴합니다.
//   //누르면 Clickanyname(idanyname)가 실행이 되고,
//   //style은 style.item 스타일을 따르는데, 선택 되면 색이 바뀝니다.
//   //Text 스타일은 styles.title을 따르고 title을 넣어줍니다.
//   //</TouchableOpacity>를 닫아줍니다.
// }

// //할일 :
// //selectanyname 가 state로 들어가야해요
// // state는 다시 모벡스의 state로 들어가야해요
// // setSelected를 스토어의 메소드(@action)알고리즘으로 바꾼다.

// export default function SignupTag() {
//   const [selectanyname, setSelected] = useState([]); //셀렉트에니네임은 빈 어레이가 되어있다.

//   const Clickanyname = useCallback(
//     idanyname => {
//       const newSelected = selectanyname;
//       newSelected.set(idanyname, !selectanyname.push(idanyname));

//       setSelected(newSelected);
//     },
//     [selectanyname],
//   );

//   //여기는 class 여도 안바꿔도 됨
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATAanyname}
//         // data는 메소드
//         renderItem={({ item }) => (
//           <Itemanyname
//             idanyname={item.idanyname}
//             selectanyname={selectanyname.push(item.idanyname)}
//             Clickanyname={Clickanyname}
//           />
//         )}
//         keyExtractor={item => item.idanyname}
//         extraData={selectanyname}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   itemanyname: {
//     backgroundColor: "pink",
//     padding: 5,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 10,
//   },
// });
