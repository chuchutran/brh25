import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// used to check if current session is the first session of using the app, is useful
// for first time page with instructions at the beginning

export function useFirstTimeOpen() {
  const [isFirstTime, setIsFirstTime] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // AsyncStorage.removeItem('hasOpened');
    // console.log('hasOpened key cleared on app open');

    async function checkFirstTimeOpen() {
      try {
        const hasOpened = await AsyncStorage.getItem("hasOpened");
        if (hasOpened === null) {
          //first time
          setIsFirstTime(true);
        } else {
          setIsFirstTime(false)
        }
      } catch (e) {
        console.error("error getting local first time", e)
      } finally {
        setIsLoading(false)
      }
    }
    checkFirstTimeOpen();
  }, [])
  return { isFirstTime, isLoading };
}