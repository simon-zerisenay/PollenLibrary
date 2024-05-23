"use client";
import { title } from "@/components/primitives";
import Link from "next/link";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useFormContext } from "@/context/context"


//const urlPath = 'http://localhost:3008'
const urlPath = process.env.NEXT_PUBLIC_url;


export default function SignUpPage() {
  const router = useRouter();

  const [registerMessage, setRegisterMessage] = useState <string> ('')
  interface FormErrors {
    name?: string;
    email?: string;
    
    password?: string;
    confirmPassword?: string;
    phone_num?: string;
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
    digits,
    setDigits,
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
  if (formData.name.trim() === "") {
    newErrors.name = "Name is required";
    isValid = false;
  }

  if (formData.email.trim() === "") {
    newErrors.email = "Email is required";
    isValid = false;
  }

  if (formData.password.trim() === "") {
    newErrors.password = "Password is required";
    isValid = false;
  }
  
  // if (mode === FormMode.SIGNUP) {
  if (
    formData.confirmPassword &&
    formData.confirmPassword.trim() !== formData.password.trim()
  ) {
    console.log("hello");
    newErrors.confirmPassword = "Passwords do not match";
    isValid = false;
  }
  
  if (formData.phone_num && formData.phone_num.trim() === "") {
    newErrors.phone_num = "Phone number is required";
    isValid = false;
  }
  // }

  setErrors(newErrors);
  return isValid;
};



const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  //console.log(formData)
  if (validateForm()) {
    setIsLoading(true);
    // Simulating form submission

    
    try {
      await handleRegister();
    } catch (error) {
      console.error('Error registering user:', error);
      setIsLoading(false);
    }
}
else{
  console.log("error");
  setIsLoading(false);
}
}

const handleRegister = async () =>{
  try {
    const response = await fetch(`${urlPath}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      const data = await response.json();
      console.log('User registered successfully:', data);

      localStorage.setItem('token', data.user);
      setRegisterMessage("registered successfully");
      //console.log(data.user);
      console.log('user registration successful');
      router.push('/Dashboard')// Redirect to homepage after successful registration
    } else {
      const errorData = await response.json();
      console.error('Error registering user:', errorData);
      // Handle error response (e.g., display error message to the user)
    }
  } catch (error) {
    console.error('Error registering user:', error);
    // Handle network errors or other exceptions
  }

}

const handleGoogleLogin = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`${urlPath}/auth/oAuthRegister`, {
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
              Create an account
            </h1>
			<div 
      onClick={handleGoogleLogin}
        className=" text-gray-700  flex justify-center items-center gap-3 rounded-md  px-5 py-2.5 my-3 cursor-pointer  bg-gray-50 border border-gray-300 dark:text-gray-300 sm:text-sm focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600">
        
        <Image src='/google.svg' alt='logo' height={30} width={30} />
        <p className="text-sm md:text-lg">Sign Up with Google</p>
        
        </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full name</label>
                <input 
                type="email" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                 {errors.name && (
              <p className="text-red-500 mt-1 text-sm font-sans font-light">
                {errors.name}
              </p>
            )}
              </div>
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
              <div className="flex flex-col items-start" >
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input 
                type="password" 
                name="confirmPassword" 
                id="confirm-password" 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  {errors.confirmPassword && (
              <p className="text-red-500 mt-1 text-sm font-sans font-light">
                {errors.confirmPassword}
              </p>
            )}
              </div>
              <div className="flex flex-col items-start" >
                <label htmlFor="phone_num" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input 
                type="password" 
                name="phone_num" 
                id="confirm-password" 
                placeholder="••••••••" 
                value={formData.phone_num} 
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  {errors.phone_num && (
              <p className="text-red-500 mt-1 text-sm font-sans font-light">
                {errors.phone_num}
              </p>
            )}
              </div>
              
              <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-600 hover:bg-yellow-400 dark:focus:ring-primary-800">Create an account</button>
              {registerMessage && (
              <p className="text-green-500 mt-1 text-sm font-sans font-light">
                {registerMessage}
              </p>)}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link href="/login"><span className="font-medium text-yellow-700 hover:underline ">Login here</span></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
		</div>
	);
}
