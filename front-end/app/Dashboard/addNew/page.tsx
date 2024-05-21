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

const AddNew: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    location: '',
    family: '',
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <Card className="flex items-center  w-full py-10 px-4 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl p-6 bg-transparent ">
        <h2 className="text-2xl font-bold mb-6 text-start">Enter the Details Here</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full">
            <label htmlFor="englishName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">English Name</label>
            <input
              type="text"
              id="englishName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="arabicName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Arabic Name</label>
            <input
              type="text"
              id="arabicName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
              required
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
              required
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
              required
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
            required
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Upload</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-5">Submit</button>
      </form>
    </Card>
  );
};

export default AddNew;
