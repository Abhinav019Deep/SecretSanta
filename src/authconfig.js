// authConfig.js
export const msalConfig = {
    auth: {
      clientId: "892f96e1-2004-4d1e-bf79-d3ad0ec4b20f", 
      authority: "https://login.microsoftonline.com/7b137d3d-85e1-4661-adcb-1508632797fb", // tenant id
      redirectUri: "hhttp://localhost:3001/", // The URL where you want to handle the authentication response
    },
    cache: {
      cacheLocation: "sessionStorage", // Can be 'localStorage' or 'sessionStorage'
      storeAuthStateInCookie: false,  // Set to true for IE 11 or older browsers
    }
  };
  
  export const loginRequest = {
    scopes: ["User.Read"]  // Scopes you want to request (this can vary depending on your needs)
  };
  