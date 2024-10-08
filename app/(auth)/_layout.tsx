import { Redirect, Stack } from "expo-router";
import React from "react";
// import { StatusBar } from "expo-status-bar";
import { GlobalProvider } from '@/context/GlobalProvider'; // Import the provider

const AuthLayout = () => {
  //const { loading, isLogged } = useGlobalContext();
  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <GlobalProvider>
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerShown: false,
            }}
          />
        </Stack>

        {/* <Loader isLoading={loading} /> */}
        {/* <StatusBar backgroundColor="#161622" style="light" /> */}
      </GlobalProvider>



    </>
  );
};

export default AuthLayout;