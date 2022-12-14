import React from "react";
import { useState } from "react";
import axios from "axios";
import "../Timeline.css";
import Icon from "../images/dog.png";
import Sidebar from "./Sidebar";

type Props = {
  len: number
  Data: {"id":string; "sender_name": string; "receiver_name": string}[]
  Username: string | null
}

function Timeline(props:Props) {
    const [showModal, setShowModal] = useState(false); 
    const [showModal2, setShowModal2] = useState(false);
    const [Data3, setData3] = useState({"sender_name": "", "receiver_name": "", "point": 0, "message": ""});
    const [Point, setPoint] = useState(0);
    const [Message, setMessage] = useState("");
    const [Id, setId] = useState("");
    const [ReceiverName, setReceiverName] = useState("");
    
    
    
    const submit = (id:string) => {
        setShowModal(true);
        const params = {id : id};
        const query = new URLSearchParams(params);
        console.log(id);

        const fetchData3 = async () => {
            const data = await fetch(`https://hackathon-4y7j2tipqq-uc.a.run.app/user/detailcontribution?${query}`);
            const json = await data.json();
            setData3(json);
          }
      
           fetchData3()
            .catch(console.error);;
    }


    const edit = (id:string, receiver_name:string) => {
      setShowModal2(true);
      setId(id);
      setReceiverName(receiver_name);
  }
  
  const onSubmit = (id:string, receivername:string, point:number, message:string) => {
    axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/edit", {
      id: id,
      receivername: receivername,
      point: point,
      message: message
    }).then(response => {
        console.log('body:', response.data);
  });
  }

  const onSubmitDelete = (id:string, receivername:string) => {
    closeModal()
    axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/delete", {
      id: id,
      receivername: receivername
    }).then(response => {
        console.log('body:', response.data);
  });
  }


  const submit2 = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    onSubmit(Id, ReceiverName, Point, Message);
    setPoint(0)
    setMessage("")
  }

  const submitDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    onSubmitDelete(Id, ReceiverName)
  }

  const closeModal = () => {
        setShowModal(false);
        setShowModal2(false);
        setPoint(0);
        setMessage("");
      };

  let pointnumber = true;
  if (Point > 0 && Point <= 10) {
    pointnumber = false;
  }

  let messagelen = true;
  if (Message.length <= 70) {
    messagelen = false;
  }
      
    return(
      <div>
    <Sidebar/>
    <div className="timeline">
    <div className="assist">
    </div>
       <div>
       <ul>
            {props.Data.slice(0).reverse().map((value, key) => {
              if (props.Username == value.sender_name) {
                return (
                  <li key={key} >
                    <img className = "icon" src={Icon}/>{value.sender_name + " ??? " }<img className = "icon" src={Icon}/>{value.receiver_name}<br></br>
                    <button className="detailButton" onClick = {() => submit(value.id)}>??????</button>
                    <button className="detailButton" onClick = {() => edit(value.id, value.receiver_name)}>??????</button>
                  </li>
                      )
              } else {
                return (
                  <li key={key} >
                    <img className = "icon" src={Icon}/>{value.sender_name + " ??? " }<img className = "icon" src={Icon}/>{value.receiver_name}<br></br>
                    <button className="detailButton" onClick = {() => submit(value.id)}>??????</button>
                  </li>
                )

              }
                
            })}

        </ul>
       </div>

      {showModal ? ( // showFlag???true????????????Modal???????????????
        <div className="detail">
          <div className="container">
            <div className="content">
            <p>{"?????????: " + Data3.sender_name}</p>
            <p>{"?????????: " + Data3.receiver_name}</p>
            <p>{"????????????: " + Data3.point}</p>
            <p>{"???????????????:"}</p>
            <div className="textSpace">
              <p>{Data3.message}</p>
            </div>
            <button className="close" onClick = {closeModal}>?????????</button>
            </div>
          </div>
        </div>
    ) : (
      <></>// showFlag???false????????????Modal??????????????????
    )}

{showModal2 ? ( // showFlag???true????????????Modal???????????????
    <div className="contributionForm">
      <div className="contributionContainer">
        <div className="contributionContent">
          <p id="editHeader">???????????????</p>
          <button className="contributionDelete" onClick = {(e) => submitDelete(e)}>?????????????????????</button>
        <form style={{ display: "flex", flexDirection: "column" }}>
      <label>????????????: </label>
      <input className="pointForm"
        type={"number"}
        min={0}
        max={10}
        value={Point}
        onChange={(e) => setPoint(Number(e.target.value))}
      ></input>
      <label>???????????????: </label>
      <textarea className="messageForm"
      value={Message}
      style={{ marginBottom: 20 }}
      onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button className="contributionPost" disabled={!Message || messagelen || pointnumber} onClick = {(e) => submit2(e)}> ??????</button>
    </form>
    <button className="closeForm"  onClick = {closeModal}>?????????</button>
    </div>
    </div>
    </div>
    ) : (
      <></>// showFlag???false????????????Modal??????????????????
    )}

  </div>
  </div>

    )};
    export default Timeline;