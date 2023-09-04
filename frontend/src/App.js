import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/auth/Login";
import Register from "./pages/Home/auth/Register";
import Forgot from "./pages/Home/auth/Forgot";
import Reset from "./pages/Home/auth/Reset";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/Home/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


axios.defaults.withCredentials = true;


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgot" element={<Forgot />}/>
        <Route path="/resetpassword/:resetToken" element={<Reset/>}/>
      <Route path="/dashboard" element={
        <Sidebar>
          <Layout>
            <Dashboard/>
          </Layout>
        </Sidebar>
      }/>
      
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
