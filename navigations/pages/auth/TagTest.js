import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react"; // 불러오기

export default inject(({ signupStore }) => ({}))(observer(Login));

const DATA = [
  //DATA를 ARRAY로 선언을 합니다.
  "태그1",
  "태그2",
  "태그3",
  "태그4",
  "태그5",
];

export default function TagTest() {
  return (
    <View>
      <Text> 여기는 테스트 </Text>
      {/* <TouchableOpacity>
        <TouchableOpacity onPress={this._doBefore.bind(this)}>
        <Text style={{ fontSize: 30, backgroundColor: "green" }}>이전페이지</Text>
      </TouchableOpacity> */}
      {DATA.map(tag => {
        console.log("Data.map tag: ", tag);
        return <Tagitem tag={tag} key={tag} />;
        //Tagitem 을 뷰로 리턴한다.
      })}
    </View>
  );
}

function Tagitem(props) {
  console.log("Tagitem에 들어오는 pros :", props);
  //  function 이름 ( )
  return (
    <View>
      <TouchableOpacity /*onPress={이름}*/>
        <Text>{props.tag}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

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

// export default function TagTest() {
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
