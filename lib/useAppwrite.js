// // useAppwrite.js
// import { useEffect, useState } from 'react';
// import { Alert } from 'react-native';

// const useAppwrite = (fetchFunction) => {
//   const [data, setData] = useState(null); // Initialize data as null
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const result = await fetchFunction();
//       setData(result);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Alert.alert('Error', error.message || 'An error occurred while fetching data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     fetchData();
//   };

//   return { data, loading, refetch };
// };

// export default useAppwrite;
