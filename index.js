import { AppRegistry, Platform } from "react-native";
import App from "./App";

AppRegistry.registerComponent("serendipity_client", () => App);

if (Platform.OS === "web") {
  const rootTag = document.getElementById("root") || document.getElementById("main");
  AppRegistry.runApplication("serendipity_client", { rootTag });
}
