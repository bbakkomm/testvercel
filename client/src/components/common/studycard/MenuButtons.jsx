import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import customFetch from "../../../utils/customFetch.js";


export const loader = async ({ req }) => {
	try {
	  const resUser = await customFetch.get('/users/current-user', req);
	  const res = await customFetch.get('/study', req);
	  return [res.data, resUser];
	} catch (error) {
	  console.log(error);
	  return redirect('/login');
	}
}

function MenuButtons({menuItems, filterItems, filterItems2, setItems}) {

  const loadData = useLoaderData();
	const { studys } = loadData[0];


  return (
    <div className="menu-box">
      <button className="menu-box__item active" onClick={()=> setItems(studys)}>전체</button>
      <button className="menu-box__item" onClick={()=> filterItems2()}>모집중</button>
      <button className="menu-box__item" onClick={()=> filterItems()}>완료</button>
    </div>
  )
}

export default MenuButtons