'use client'
import {useState, useContext, createContext, SetStateAction, useEffect} from 'react';
import { jwtDecode } from "jwt-decode";

const urlPath = process.env.NEXT_PUBLIC_url;


interface FormData {
  common_name: string;
  arabic_name: string;
  description: string;
  emarates: string;
  family: string;
  botanical_name: string;
  habitas: string;
  catagories: string;
  synonyms: string;
  kind: string;
  reference: string;
  area_of_collection: string;
  image: File | null;
}




  
  

  // Define the interface for the Dashboard data
interface DashboardContextProps {
    isAuthenticated:boolean;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
    userRole:string;
    setUserRole:React.Dispatch<React.SetStateAction<string>>;
    handleLogout: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
   
  }



  // Create the context
const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

// check if the user is authenticated



// Custom hook to consume the context
export function useDashboardContext() {
    const context = useContext(DashboardContext);
    if (!context) {
      throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
  }
  
  // Provider component to wrap your application and manage the context
  export function DashBordProvider({ children }: { children: React.ReactNode }) {
    
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>("");
    const [formData, setFormData] = useState<FormData>({
      common_name: "",
      arabic_name: "",
      description: "",
      emarates: "",
      family: "",
      botanical_name: "",
      habitas: "",
      catagories: "",
      synonyms: "",
      kind: "",
      reference: "",
      area_of_collection: "",
      image: null,
    });
   
    // check user authentication
    useEffect(() => {
      const getTokenFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('token');
      };
    
      // Get token from URL
      const tokenFromURL = getTokenFromURL();
      //console.log('tokenFromURL', tokenFromURL);
      // Store token in localStorage
      if (tokenFromURL) {
        localStorage.setItem('token', tokenFromURL);
        
      }
      
      // Retrieve token from localStorage
    const localStorageToken = localStorage.getItem('token');
  
    // Use token from localStorage if it exists, otherwise use token from URL
    const token = localStorageToken || tokenFromURL;

    console.log(`token: ${token}`);
      const checkAuth = async () => {
        const reqdata = {
          token: token
        }
          try {
            if (!token) {
              console.error('Token is undefined or null');
              return;
          }
              const response = await fetch(`${urlPath}/auth/checkAuth`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(reqdata)
              });

              if (response.ok) {
                  const result = await response.json();
                  // Handle the result, e.g., update state or navigate
                  console.log('Auth successful:', result);
                  setIsAuthenticated(true);
              } else {
                  // Handle non-2xx status codes
                  //console.error('Auth failed:', response.status);

                  setIsAuthenticated(false);
                  localStorage.removeItem('token');
                //   window.location.href= '/';
              }
          } catch (error) {
              // Handle network or other errors
              console.error('Error during auth check:', error);
          }
      };

      checkAuth();
  }, [isAuthenticated]);
  
  
  
  const handleLogout = () => {
   
    
		// Perform logout actions, e.g., clear localStorage, etc.
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		// Redirect the user to the homepage or login page if necessary
		window.location.href = '/';
	  
}
  
    // Value to be provided by the context
    const contextValue: DashboardContextProps = {
        isAuthenticated,
        setIsAuthenticated, 
        handleLogout,
        formData,
        setFormData,
        userRole,
        setUserRole,
    };
  
    // Provide the context value to the children
    return (
      <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>
    );
  }