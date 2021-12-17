import React, { useEffect } from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "./store/reducers/session";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Content from "./screens/content";
import Login from "./screens/login";
import Register from "./screens/register";
import Wit from "./screens/wit";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const Tab = createBottomTabNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(restoreUser());
  }, []);

  if (user === "loading") {
    return <Text>loading..</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Witter">
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={headerOptions}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={headerOptions}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Witter"
              component={Content}
              options={headerOptions}
            />
            <Stack.Screen name="Wit" component={Wit} options={headerOptions} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const headerOptions = {
  headerStyle: {
    backgroundColor: "#15212a",
  },
  // headerTintColor: "#15212a",
  headerTitleStyle: {
    fontWeight: "bold",
    color: "white",
  },
};
