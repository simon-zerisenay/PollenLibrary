'use client'
import {useState, useContext, createContext, SetStateAction, useEffect} from 'react';

const urlPath = process.env.NEXT_PUBLIC_url;

// Define the interface for the form data
interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    phone_num?: any;
    subscription_type?: string; 
  }
  interface Row {
    timestamp: string;
    speed: string;
    acceleration: string;
    distance: string;
    latitude: string;
    longitude: string;
    category: string;
    status: string;
    event: string;
}

interface FileData {
    fileName: string;
    rows: Row[]; // Array of Row objects
}
  
  // Define the interface for form errors
  interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone_num?: string;
    code?: string;
    
  }

  // Define the interface for the form data
interface FormContextProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    errors: FormErrors;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    formSubmitted: boolean;
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    digits: string;
    setDigits: React.Dispatch<React.SetStateAction<string>>;
    //   inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    csvList: string[]; // For an array of strings
    setCsvList: React.Dispatch<React.SetStateAction<string[]>>;
    selectFile:string[]; //
    setSelectFile: React.Dispatch<React.SetStateAction<string[]>>;
    chartData:FileData[]; // For an array of strings
    setChartData: React.Dispatch<React.SetStateAction<FileData[]>>;
    languages:string;
    setLanguage:React.Dispatch<React.SetStateAction<string>>;
    
    
  
  }



  // Create the context
const FormContext = createContext<FormContextProps | undefined>(undefined);

// check if the user is authenticated



// Custom hook to consume the context
export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
  }
  
  // Provider component to wrap your application and manage the context
  export function FormProvider({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone_num: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [digits, setDigits] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [csvList, setCsvList] = useState<string[]>([]);
    const [selectFile, setSelectFile] = useState<string[]>([]);
    const [chartData, setChartData] = useState<FileData[]>([]);
    //   const [digits, setDigits] = useState<string[]>(["", "", "", "", ""]);
    //   const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));
    const [languages,setLanguage] = useState <string>('ar');
    
  
    // Value to be provided by the context
    const contextValue: FormContextProps = {
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
      searchInput,
      setSearchInput,
      csvList,
      setCsvList,
      selectFile,
      setSelectFile,
      chartData,
      setChartData,
      
      languages,
      setLanguage,
    };
  
    // Provide the context value to the children
    return (
      <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
    );
  }