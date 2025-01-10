import React, { useState, useEffect } from "react";
import { PublicClientApplication,InteractionStatus } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { msalConfig } from "./authconfig";
import { loginRequest } from "./authconfig";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SecretSanta from './components/SecretSanta';
import SecretSantaLogin from "./components/SecretSantaLogin";

// Moved MSAL initialization into the App component, ensuring it's done properly
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <MainPage />
    </MsalProvider>
  );
}

function MainPage() {
  const { instance, accounts , inProgress} = useMsal(); // Getting the instance and accounts from useMsal
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  // useEffect(() => {
  //   const checkAccount = () => {
  //     const initializeMsal = async () => {
  //       await msalInstance.initialize(); // Initialize MSAL instance
  //       //setInitialized(true);
  //     };
  
  //     initializeMsal();
  //     if (accounts.length > 0) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   checkAccount();

  //   // Handle redirect after component mounts
  //   instance.handleRedirectPromise().then((response) => {
  //     if (response) {
  //       setIsAuthenticated(true);
  //       console.log("Logged in successfully:", response);
  //     }
  //   }).catch(error => {
  //     console.error("Error in handleRedirectPromise:", error);
  //   });

  // }, [accounts, instance]); // Depend on both accounts and instance 

  const login = async () => {
    if (inProgress !== InteractionStatus.None) return;
    await msalInstance.initialize();
        instance.loginPopup().then((response) => {
          if(response.account.username.includes("geduservices")){
            if (response) {
              setIsAuthenticated(true);
              localStorage.setItem('msalResponse', JSON.stringify(response.account));
              console.log("Logged in successfully:", response.account);
            }
          }else{
            alert("Please login via geduservices account");
          }
        }).catch(error => {
          console.error("Error in handleRedirectPromise:", error);
        });
  };

  // useEffect(() => {
  //   if(loginInProgress == false){
      
  //     const initialized = async () => {
  //       setLoginInProgress(true);
  //       await msalInstance.initialize();
  //       instance.loginPopup().then((response) => {
  //         if (response) {
  //           setIsAuthenticated(true);
  //           console.log("Logged in successfully:", response);
  //         }
  //       }).catch(error => {
  //         console.error("Error in handleRedirectPromise:", error);
  //       });
  //     }

  //     initialized();
  //   }
  // }, [isAuthenticated])

  const logout = async () => {
    try {
      await instance.logoutPopup();
      console.log("Logged out successfully");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // if (!isAuthenticated) {
  //   // Show login screen if not authenticated
  //   return (
  //     <div>
  //       <Router>
  //       <Routes>
  //         <Route path='/' element={<SecretSantaLogin login={login} />} />
  //         {/* Add more routes here if needed */}
  //       </Routes>
  //     </Router>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SecretSantaLogin />} />
          <Route path='/secretsanta' element={<SecretSanta />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
