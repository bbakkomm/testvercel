import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { HomeLayout, Error, Landing, Login, Profile, List } from './pages';
// import LoginSuccess from "./pages/LoginSuccess";
import Header from "./components/common/header/CommonHeader"
import Nav from "./components/common/navigation/CommonNav"

import { 
  Home, HomeLayout, Splash, Error, 
  Login, Join, JoinSetting, JoinSuccess, 
  Id, IdSuccess, 
  Pw, PwReset, PwSuccess, 
  Study, Creation, Detail, DetailEdit, 
  Profile, ProfileEdit, 
} from "./pages";

// import { loader as currentLoader } from './pages/HomeLayout';
import { loader as loginLoader } from './pages/register/Login';
import { loader as profileLoader } from './pages/profile/Profile';
import { loader as profileEditLoader } from './pages/profile/ProfileEdit';
// import { loader as studyLoader } from './pages/List';
import { loader as studyLoader2 } from './pages/Study';
import { loader as homeLoader } from './pages/Home';
import { loader as detailLoader } from './pages/list/Detail';
import { loader as detailEditLoader } from './pages/list/DetailEdit';

import { action as loginAction } from './pages/register/Login';
import { action as registerAction } from './pages/register/Join';
import { action as idSearch } from './pages/register/Id';
import { action as pwSearch } from './pages/register/Pw';
import { action as pwReset } from './pages/register/PwReset';
import { action as creation } from './pages/list/Creation';
import { action as detailEditAction } from './pages/list/DetailEdit';
import { action as profileEditAction } from './pages/profile/ProfileEdit';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    // loader: currentLoader,
    children: [
      {
        index: true,
        path: "/",
        element: [
          <>
            <Home />
            <Nav />
          </>,
        ],
        loader: homeLoader
      },
      {
        path: "/splash",
        element: <Splash />,
      },
      {
        path: "/profile",
        element: [
          <>
            <Header pagetype="profile" title={"마이페이지"} />
            <Profile />
            <Nav />
          </>,
        ],
        loader: profileLoader
      },
      {
        path: "/profile/profileedit",
        element: [
          <>
            <Header pagetype="profileEdit" title={"내 프로필"} />
            <ProfileEdit />
            <Nav />
          </>,
        ],
        loader: profileEditLoader,
        action: profileEditAction
      },
      {
        path: "/study",
        element: [
          <>
            <Header pagetype="study" title={"스터디"} />
            <Study />
            <Nav />
          </>,
        ],
        loader: studyLoader2
      },
      {
        path: "/studycreation",
        element: [
          <>
            <Header pagetype="creation" title={"스터디 생성"} />
            <Creation study/>
            <Nav />
          </>,
        ],
        action: creation
      },
      {
        path: "/study/studydetail",
        element: [
          <>
            <Header pagetype="detail" title={"스터디 상세"} rightBtn />
            <Detail />
            <Nav />
          </>,
        ],
        loader: detailLoader
      },
      {
        path: "/study/detailedit",
        element: [
          <>
            <Header pagetype="detailedit" title={"스터디 수정"} rightBtn />
            <DetailEdit />
            <Nav />
          </>,
        ],
        loader: detailEditLoader,
        action: detailEditAction
      },
      {
        path: "/login",
        element: [
          <>
            <Header pagetype="login" title={"로그인"} />
            <Login />
          </>,
        ],
        loader: loginLoader,
        action: loginAction
      },
      {
        path: "/join",
        element: [
          <>
            <Header pagetype="join" title={"회원가입"} rightBtn />
            <Join />
          </>,
        ],
        action: registerAction,
      },
      {
        path: "/joinsetting",
        element: [
          <>
            <Header pagetype="joinsetting" title={"회원가입"} rightBtn />
            <JoinSetting />
          </>,
        ],
      },
      {
        path: "/joinsuccess",
        element: [
          <>
            <Header pagetype="joinsuccess" title={"회원가입 완료"} />
            <JoinSuccess />
          </>,
        ],
      },
      {
        path: "/id",
        element: [
          <>
            <Header pagetype="id" title={"아이디 찾기"} rightBtn />
            <Id />
          </>,
        ],
        action: idSearch,
      },
      {
        path: "/idsuccess",
        element: [
          <>
            <Header pagetype="idsuccess" title={"아이디 찾기 완료"} />
            <IdSuccess />
          </>,
        ],
      },
      {
        path: "/pw",
        element: [
          <>
            <Header pagetype="pw" title={"비밀번호 찾기"} rightBtn />
            <Pw />
          </>,
        ],
        action: pwSearch
      },
      {
        path: "/pwreset",
        element: [
          <>
            <Header pagetype="pwreset" title={"비밀번호 재설정"} rightBtn />
            <PwReset />
          </>,
        ],
        action: pwReset
      },
      {
        path: "/pwsuccess",
        element: [
          <>
            <Header pagetype="pwsuccess" title={"비밀번호 찾기 완료"} />
            <PwSuccess />
          </>,
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
export default App;