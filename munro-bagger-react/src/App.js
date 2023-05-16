import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Public from "./components/Public"
import Login from "./features/auth/Login"
import Welcome from "./features/auth/Welcome"
import UserLayout from "./components/UserLayout"
import UserList from "./features/users/UserList"
import BagList from "./features/bags/BagList"
import EditUser from "./features/users/EditUser"
import NewUserForm from "./features/users/NewUserForm"
import EditBag from "./features/bags/EditBag"
import NewBag from "./features/bags/NewBag"

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
          <Route path="users">
            <Route index element={<UserList/>}/>
            <Route path="new" element={<NewUserForm/>}/>
            <Route path=":id" element={<EditUser/>}/>
          </Route>
        </Route>

        <Route path="munrosbagged">
          <Route index element={<BagList/>}/>
          <Route path=":id" element={<EditBag/>}/>
          <Route path="new" element={<NewBag/>}/>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
