'use client'
import React from 'react';
import { pollenImages } from '@/config/imges';

interface PollenImage {
  name: string;
}

const ListAll: React.FC = () => {
  const [groupedImages, setGroupedImages] = React.useState<{ [key: string]: PollenImage[] }>({});
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Grouping pollen images by first letter of name
    const grouped = pollenImages.reduce((acc, image) => {
      const firstLetter = image.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(image);
      return acc;
    }, {} as { [key: string]: PollenImage[] });

    setGroupedImages(grouped);
  }, []);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">See All Pollen categories</h1>
      <div className="flex justify-center mb-4">
      <button
          className={`mx-1 px-2 py-1 border rounded ${selectedLetter === null ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => setSelectedLetter(null)}
        >
          All
        </button>
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
        {Object.keys(groupedImages)
          .sort()
          .filter((letter) => selectedLetter === null || selectedLetter === letter)
          .map((letter) => (
            <div key={letter}>
              <h2 className="text-xl font-semibold mb-2">{letter}</h2>
              <ul className="list-disc list-inside pl-4 flex gap-5 md:flex-row flex-col">
                {groupedImages[letter].map((image) => (
                  <li key={image.name}>{image.name}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListAll;
