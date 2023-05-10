import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Public from "./components/Public"
import Login from "./features/auth/Login"
import Welcome from "./features/auth/Welcome"
import UserLayout from "./components/UserLayout"
import UserList from "./features/users/UserList"
// import MunrosBaggedList from "./features/munrosBagged/MunrosBaggedList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public viewing */}
        <Route index element={<Public/>}/>

        <Route path="login" element={<Login/>}/>

        {/* logged in viewing */}
        <Route path="user" element={<UserLayout/>}>

          <Route index element={<Welcome/>}/>

          {/* <Route path="munrosBagged">
            <Route index element={<MunrosBaggedList/>}/>
          </Route> */}

          <Route path="users">
            <Route index element={<UserList/>}/>
          </Route>

        </Route>

      </Route>
    </Routes>
  );
}

export default App;
