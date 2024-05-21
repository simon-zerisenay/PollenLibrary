'use client'
import { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { userInfo } from "os";
import { jwtDecode } from "jwt-decode";


interface UserInfo {
	name: string;
	email: string;
	// Add other fields as needed
  }
//const urlPath = 'http://localhost:3008'
const urlPath = process.env.NEXT_PUBLIC_url;
//const urlPath ='https://pollen-identification-2.onrender.com'
export default function DashboardPage() {
	const [userInfomation, setUserInfomation] = useState<UserInfo | null>(null);

	useEffect(() => {
		// Function to get token from URL query parameters
		const getTokenFromURL = () => {
		  const urlParams = new URLSearchParams(window.location.search);
		  return urlParams.get('token');
		};
	
		// Get token from URL
		const tokenFromURL = getTokenFromURL();
		console.log('tokenFromURL', tokenFromURL);
		// Store token in localStorage
		if (tokenFromURL) {
		  localStorage.setItem('token', tokenFromURL);
		  
		}
	
	  }, []);

	  useEffect(() => {
		// Fetch user information when the component mounts
		fetchUserInfo();
	  }, []);
	
	  const fetchUserInfo = async () => {
		try {
		  // Get the authentication token from local storage
		  const token = await localStorage.getItem("token");
		  console.log('Fetching user info', token)
	
		  if (token) {
			// Decode the token to extract the email
			const decodedToken: any = jwtDecode(token);
			const email = decodedToken.email;
			
			console.log(email)
			// Make a request to the backend to fetch user information using the email
			const response = await fetch(`${urlPath}/getUserinfo`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`, // Send the token in the Authorization header
			  },
			  body: JSON.stringify({ email }), // Include the email in the request body
			});
	
			if (response.ok) {
			  const data = await response.json();
			   
	
			  console.log('sayed', data)
			  // Set the user information received from the backend to the state
			  setUserInfomation(data);
			  
			} else {
			  // Handle errors if any
			  console.error("Error fetching user information:", response.statusText);
			}
		  } else {
			console.error("Error fetching user information:", "No token found");
		  }
		} catch (error) {
		  console.error("Error fetching user information:", error);
		}
	  };


	return (
		<div className="bg-gray-600 ">
			
			
		</div>
	);
}
