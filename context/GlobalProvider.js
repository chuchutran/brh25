// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getCurrentUser } from "../lib/appwrite";

// const GlobalContext = createContext(null);

// export const useGlobalContext = () => useContext(GlobalContext);

// const GlobalProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const res = await getCurrentUser();
//         if (res) {
//           setIsLoggedIn(true);
//           setUser(res);
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.log("Error fetching current user:", error);
//         setIsLoggedIn(false);
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   return (
//     <GlobalContext.Provider
//       value={{
//         isLoggedIn,
//         setIsLoggedIn,
//         user,
//         setUser,
//         isLoading,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalProvider;
