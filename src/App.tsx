import React from 'react';
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Timeline from "./components/Timeline";
import User from "./components/User";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  let Username = sessionStorage.getItem('accountName')
  let Userpoint = sessionStorage.getItem('Userpoint')
  


  useEffect(() => {
      const fetchUserpoint = async () => {
      const params:any = {name: Username};
      const query = new URLSearchParams(params);
      const data = await fetch(`https://hackathon-4y7j2tipqq-uc.a.run.app/user/userpoint?${query}`);
      const json = await data.json();
      sessionStorage.setItem('Userpoint', json.point);
    }
     fetchUserpoint()
      .catch(console.error);
  }, [Username])

 


  const [len, setLen] = useState(0);
  const [Data, setData] = useState([{"id": "", "sender_name": "", "receiver_name": ""}]);
  useEffect(() => {
    const fetchData2 = async () => {
      const data = await fetch('https://hackathon-4y7j2tipqq-uc.a.run.app/user/timeline');
      const json = await data.json();
      setLen(json.length);
      setData(json);
    }
     fetchData2()
      .catch(console.error);;
  }, [])



  const [memberlen, setMemberlen] = useState(0);
  const [Member, setMember] = useState([{"name": "", "point": 0}]);
  useEffect(() => {
    const fetchData3 = async () => {
      const data = await fetch('https://hackathon-4y7j2tipqq-uc.a.run.app/user/userinfo');
      const json = await data.json();
      setMemberlen(json.length);
      setMember(json);
    }
     fetchData3()
      .catch(console.error);;
  }, [])


   return (
    <div>
    <div className="background"></div>
    <div className="App">
      <div className="header">
      </div>
      <BrowserRouter>
        <Routes>
          <Route path={`/login/`} element={<LoginForm/>}/>
          <Route path={`/home/`} element={<Home/>}/>
          <Route path={`/timeline/`} element={<Timeline len = {len} Data={Data} Username = {Username}/>} />
          <Route path={`/member/`} element={<User len = {memberlen} Data = {Member} Username = {Username} Userpoint = {Userpoint}/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
export default App;