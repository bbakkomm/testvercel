import { Outlet } from 'react-router-dom';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';

// api
import customFetch from "../utils/customFetch.js";

// export const loader = async ({ req }) => {
//   try {
//     const res = await customFetch.get('/users/current-user', req);
//     return res;
//   } catch (error) {
//     console.log(error);
//     return redirect('/login');
//   }
// }

const HomeLayout = () => {
  // const loadData = useLoaderData();
  // console.log(loadData);
  
  return (
    <>
      <Outlet />
    </>
  );
};
export default HomeLayout;