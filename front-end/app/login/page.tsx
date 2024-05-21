"use client";

import Link from "next/link";
import { Image } from "@nextui-org/image";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useFormContext } from "@/context/context"

//const urlPath = 'http://localhost:3008'
const urlPath = process.env.NEXT_PUBLIC_url;
//const urlPath ='https://pollen-identification-2.onrender.com'
export default function DocsPage() {
console.log(urlPath);
  interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    company_name?: string;
    phone_num?: string;
    code?: string;
    
    
  }

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    formSubmitted,
    setFormSubmitted,
    isLoading,
    setIsLoading,
    // inputRefs,
  } = useFormContext();
  const [pin, setPin] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
   
    setErrors({
      ...errors,
      [name]: "",
    });
  };
// input validation
const validateForm = (): boolean => {
  let isValid = true;
  const newErrors: FormErrors = {};
  if (formData.email.trim() === "") {
    newErrors.email = "Email is required";
    isValid = false;
  }

  if (formData.password.trim() === "") {
    newErrors.password = "Password is required";
    isValid = false;
  }
  
  setErrors(newErrors);
  return isValid;
};

const handleLogin = async () => {
  try {
    setIsLoading(true);
    const newErrors: FormErrors = {};
    const response = await fetch(`${urlPath}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await response.json(); // Properly parse JSON response

    //console.log('Response Data:', data); // Log the response data

    if (data.user) {
      localStorage.setItem('token', data.user);
      window.location.href = '/Dashboard';
    } else if (data.error === 'Invalid email') {
      newErrors.email = 'Invalid email';
      setErrors(newErrors); // Set errors state to trigger error message display
    } else if (data.error === 'Invalid password') {
      newErrors.password = 'Invalid password';
      setErrors(newErrors); // Set errors state to trigger error message display
    } else {
      
      setErrors(newErrors); // Set errors state to trigger error message display
    }
  } catch (error) {
    console.error("Error logging in:", error);
    setIsLoading(false);
    const newErrors: FormErrors = {};
    
    setErrors(newErrors); // Set errors state to trigger error message display
  }
};


// handle form submission
const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  console.log(formData)
  if (validateForm()) {
    setIsLoading(true);
    // Simulating form submission

    setIsLoading(false);
    handleLogin()
};
}

const handleGoogleLogin = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`${urlPath}/oAuthRegister`, {
      method: "POST",
    });
    const { url } = await response.json();
    window.location.href = url; // Redirect to Google OAuth consent screen
  } catch (error) {
    console.error("Error logging in with Google:", error);
    setIsLoading(false);
  }
};

	return (
		<div>
		<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       
        <div className=" w-full md:w-screen  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-950 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log In
            </h1>
			<div 
      onClick={handleGoogleLogin}
        className=" text-gray-700  flex justify-center items-center gap-3 rounded-md  px-5 py-2.5 my-3 cursor-pointer  bg-gray-50 border border-gray-300 dark:text-gray-300 sm:text-sm focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600">
        
        <Image src='/google.svg' alt='logo' height={30} width={30} />
        <p className="text-sm md:text-lg">Log In with Google</p>
        
        </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                {errors.email && (
              <p className="text-red-500 mt-1 text-sm font-sans font-light">
                {errors.email}
              </p>
            )}
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {errors.password && (
              <p className="text-red-500 mt-1 text-sm font-sans font-light">
                {errors.password}
              </p>
            )}
              </div>
              <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-600 hover:bg-yellow-400 dark:focus:ring-primary-800">Log In</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t  have an account? <Link href="/signup"><span className="font-medium text-yellow-700 hover:underline ">Create account here</span></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
		</div>
	);
}
