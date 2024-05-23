'use client'
import { Card } from '@nextui-org/card';
import { useState } from 'react';

interface FormData {
  name: string;
  description: string;
  location: string;
  family: string;
  image: File | null;
}

import { useDashboardContext } from '@/context/DashboardContext';
const urlPath = process.env.NEXT_PUBLIC_url;

const AddNew = () => {
  const {formData, setFormData} = useDashboardContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const uploadImage = async () => {
    const file = formData.image;
    console.log('check image',file);
    if (file) {
      // Step 1: Get presigned URL from the back-end
    const response = await fetch(`${urlPath}/content/generatePresigndeUlr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: file.name }),
    });

    const { presignedUrl, imageUrl } = await response.json();

    // Step 2: Upload the image directly to Azure Blob Storage using the presigned URL
    const uploadtoAzure = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type,
      },
      body: file,
    });
    if (!uploadtoAzure.ok) {
      throw new Error('Failed to upload image');
    }

    console.log('Image uploaded successfully:', imageUrl);

     formData.image = imageUrl;
    }
  }

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
    // Step 3: Collect form data and add the image URL
    const formSubmission = { ...formData };
    console.log("form submission:", formSubmission);

    // Step 4: Send the form data to your form acceptance API
    await fetch(`${urlPath}/content/addNew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formSubmission),
    });
    console.log(formSubmission);

    alert('Form submitted successfully!');
  };
  

  return (
    <Card className="flex items-center  w-full py-10 px-4 min-h-screen rounded-none">
      <form  className="w-full max-w-2xl p-6 bg-transparent " onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-start">Enter the Details Here</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label htmlFor="englishName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">English Name</label>
            <input
              type="text"
              id="englishName"
              name="common_name"
              value={formData.common_name}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="arabicName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Arabic Name</label>
            <input
              type="text"
              id="arabicName"
              name="arabic_name"
              value={formData.arabic_name}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="flex flex-col w-full">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="family" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Family</label>
            <input
              type="text"
              id="family"
              name="family"
              value={formData.family}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="flex flex-col w-full">
            <label htmlFor="botanical_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Botanical Name</label>
            <input
              type="text"
              id="botanical_name"
              name="botanical_name"
              value={formData.botanical_name}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="habitas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Habitas</label>
            <input
              type="text"
              id="habitas"
              name="habitas"
              value={formData.family}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              
            />
          </div>
        </div>
        
        <div className="flex flex-col mt-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded"
            
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Upload</label>
          <div className=' flex justify-between items-center'>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
            required
          />
          <div onClick={uploadImage} className="bg-green-500 text-white p-2 rounded px-4 mt-5">Upload </div>
        
          </div>
          </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-5">Submit</button>
      </form>
      
    </Card>
  );
};

export default AddNew;
