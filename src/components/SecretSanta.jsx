import React, { useState } from "react";
import { useEffect } from "react";
import videofile from "../Videos/SecretSantaVideo720.mp4";
import "./SecretSanta.css";
import * as XLSX from "xlsx";
import axios from "axios";
import emailjs from '@emailjs/browser';


const SecretSanta = () => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [buddyName, setBuddyName] = useState("");
  const [buddyEmail, setBuddyEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [isAlreadyGot, setIsAlreadyGot] = useState(false);

  const loadUsersFromXlsx = () => {
    // Ensure the file path is correct
    const file = "/secretsantadata/SecretSantaData.xlsx"; // Make sure this is the correct path
    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the Excel file");
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        console.log(workbook, "workbook");

        const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
        if (!sheet) {
          throw new Error("No sheets found in the Excel file");
        }

        const usersData = XLSX.utils.sheet_to_json(sheet);
        console.log(usersData, "usersData");

        // Assuming the sheet has columns 'Email' and 'Name'
        const usersInfo = usersData.map((row) => ({
          email: row.Email, // Adjust the column name accordingly
          name: row.Name,
          buddyName: row.BuddyName,
          buddyEmail: row.BuddyEmail,
          isGotSecretSanta: row.IsGotSecretSanta, // Adjust the column name accordingly
        }));

        console.log(usersInfo);
        setUsers(usersInfo);
      })
      .catch((error) => {
        console.error("Error reading XLSX file:", error);
      });
  };

  useEffect(() => {
    // Check if there's a stored response in localStorage
    const storedResponse = localStorage.getItem("msalResponse");
    const jSONresponse = JSON.parse(storedResponse);
    if (jSONresponse) {
      setUserEmail(jSONresponse.username);
      setUserName(jSONresponse.name);
    }
    //loadUsersFromXlsx();
  }, []);

  const handleButtonClick = async () => {
    setLoading(true);
    debugger;
    try {
      const response = await axios.get(
        // `https://apisecretsanta.gedu.global/Users/SetBuddyName?email=`+userEmail+`&name=`+userName,
        `http://localhost:8888/Users/SetBuddyName?email=adeep@geduservices.com&name=Abhinav Deep`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        console.log(response);
        if (response.data.isAlreadyGot == true ){
          setIsAlreadyGot(true);
          setBuddyName(response.data.buddyName); 
          setBuddyEmail(response.data.buddyEmail);
        }else{
          setIsAlreadyGot(false);
          setBuddyName(response.data.buddyName);
          setBuddyEmail(response.data.buddyEmail);
        }
      } else {
        console.log(response);
      }
    }
    catch (e) {
      console.error(e);
    }
    //setBuddyName(randomuser.name);

    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 7000);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="secret-santa-page">
      <video autoPlay loop  className="background-video">
        <source src={videofile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Hello Abhinav Deep,<br/> Welcome to Secret Santa!</h1>
        <button onClick={handleButtonClick} className="cta-button">
          Find your Buddy
        </button>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="loading">
          <p>
            Hold my child, I am finding the best buddy for you... hahahahahaha
            <div className="spinner"></div>
          </p>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {isAlreadyGot&& (
              <h2>You already got buddy</h2>
            )
            }
            <h2>Your Buddy is:</h2>
            <p>{buddyName} ({buddyEmail})</p>
            <button onClick={closePopup} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
      {/* <p className="createdfooter">Created By GBS-UK Team</p> */}
      <p style={{ position: 'absolute', bottom: 5, left: 10, margin: 0, padding: 5, color:"white" , background: "rgb(0 0 0 / 50%)" , }}>     Created By GBS-UK (India) Team.      </p>
    </div>
  );
};

export default SecretSanta;
