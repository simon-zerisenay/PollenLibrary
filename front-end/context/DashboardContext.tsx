'use client'
import {useState, useContext, createContext, SetStateAction, useEffect} from 'react';

const urlPath = process.env.NEXT_PUBLIC_url;




  
  

  // Define the interface for the Dashboard data
interface DashboardContextProps {
    isAuthenticated:boolean;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout:React.Dispatch<React.SetStateAction<void>>;
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

    useEffect(() => {
      const token = localStorage.getItem('token');

      const checkAuth = async () => {
          try {
              const response = await fetch(`${urlPath}/checkAuth`, {
                  method: 'POST',
                  body: JSON.stringify({ token: token })
              });

              if (response.ok) {
                  const result = await response.json();
                  // Handle the result, e.g., update state or navigate
                  console.log('Auth successful:', result);
                  setIsAuthenticated(true);
              } else {
                  // Handle non-2xx status codes
                  console.error('Auth failed:', response.status);

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
  }, [isAuthenticated]); //
  const handleLogout = () => {
   
    const handleLogout = () => {
		// Perform logout actions, e.g., clear localStorage, etc.
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		// Redirect the user to the homepage or login page if necessary
		window.location.href = '/';
	  };
}
  
    // Value to be provided by the context
    const contextValue: DashboardContextProps = {
        isAuthenticated,
        setIsAuthenticated, 
        handleLogout,
    };
  
    // Provide the context value to the children
    return (
      <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>
    );
  }