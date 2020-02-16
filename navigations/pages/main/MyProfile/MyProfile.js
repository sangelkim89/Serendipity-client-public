import { createStackNavigator } from "react-navigation-stack";
import MyProfilePage from "./MyProfilePage";
import EditPage from "./EditPage";
import SettingPage from "./SettingPage";
import EditCamera from "./EditCamera";

const MyProfilePageStack = createStackNavigator(
  {
    MyProfilePage: {
      screen: MyProfilePage,
    },
    EditPage: {
      screen: EditPage,
    },
    SettingPage: {
      screen: SettingPage,
    },
    EditCamera: {
      screen: EditCamera,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default MyProfilePageStack;
