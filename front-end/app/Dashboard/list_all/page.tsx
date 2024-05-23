'use client'

import React from 'react'

interface Category {
  name: string;
}

 
  


const fetchCategories = async (): Promise<Category[]> => {
  // Mock data - replace with actual data fetching
  return [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Cherry' },
    { name: 'Date' },
    { name: 'Elderberry' },
    { name: 'Fig' },
    { name: 'Grape' },
  ];
};

const ListAll: React.FC = () => {

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [groupedCategories, setGroupedCategories] = React.useState<{ [key: string]: Category[] }>({});
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();
      setCategories(data);
      const grouped = data.reduce((acc, category) => {
        const firstLetter = category.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(category);
        return acc;
      }, {} as { [key: string]: Category[] });
      setGroupedCategories(grouped);
    };

    fetchData();
  }, []);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">See All Pollen catagories</h1>
      <div className="flex justify-center mb-4">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`mx-1 px-2 py-1 border rounded ${selectedLetter === letter ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="space-y-6 flex flex-col justify-center items-start px-10">
        {Object.keys(groupedCategories)
          .sort()
          .filter((letter) => selectedLetter === null || selectedLetter === letter)
          .map((letter) => (
            <div key={letter}>
              <h2 className="text-xl font-semibold mb-2">{letter}</h2>
              <ul className="list-disc list-inside pl-4">
                {groupedCategories[letter].map((category) => (
                  <li key={category.name}>{category.name}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};


export default ListAll;

