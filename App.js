import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { ScreenState } from "./src/context/screen/ScreenState";
import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TotoState";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsRaady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log("error", err)}
        onFinish={() => setIsRaady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
