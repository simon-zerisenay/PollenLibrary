import React from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { cn } from '../utils/cn';
import Link from 'next/link';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  index: number;
}

export const PricingCard = ({
  plan,
  price,
  features,
  index,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-gray-900 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        'w-full h-full min-w-80 min-h-96 p-10 border rounded-3xl shadow-md relative'
      )}
    >
      <h2 className='text-xl font-medium mb-4'>{plan}</h2>
      <div className='flex items-center mb-4'>
  { index!==2&&     <span className='text-3xl font-bold mr-2'>$</span>}
        <span className='text-3xl font-bold'>{price}</span>
  {  index!==2&&    <span className='text-sm ml-1'>/ month</span>}
      </div>
      <ul className='list-none space-y-2'>
        {features.map((feature) => (
          <li key={feature} className='flex items-center'>
            <IoCheckmark className='h-5 w-5 mr-2 text-green-500' />

            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className='absolute bottom-4 left-0  w-full flex justify-center'>
        {
          plan && plan!='Premium'?
          <Link href={`/signup?plan=${plan}`}>
          <button
            className={
              index === 1
                ?
                
                'inline-flex text-white bg-yellow-500 border-0 py-4 px-8 focus:outline-none hover:bg-yellow-600 rounded-full text-lg'
             :index===2?
                              'inline-flex text-gray-500 border-gray-500 border  py-4 px-8 focus:outline-none rounded-full text-lg'
 
                : index===2?'inline-flex text-green dark:text-gray-500  border border-slate-900 dark:border-gray-500 py-4 px-8 focus:outline-none hover:text-white hover:bg-yellow-600 rounded-full text-lg':
                'inline-flex text-black dark:text-white  border border-slate-900 dark:border-white py-4 px-8 focus:outline-none hover:text-white hover:bg-yellow-600 rounded-full text-lg'
            }
            onClick={() => {}}
          >
            Buy Plan
          </button>
        </Link>
          :
          
                    <button
                      className={
                        index === 1
                          ?
                
                
             
                
                'inline-flex text-white bg-yellow-500 border-0 py-4 px-8 focus:outline-none hover:bg-yellow-600 rounded-full text-lg'
             :index===2?
                              'inline-flex text-gray-500 border-gray-500 border  py-4 px-8 focus:outline-none rounded-full text-lg'
 
                : index===2?'inline-flex text-green dark:text-gray-500  border border-slate-900 dark:border-gray-500 py-4 px-8 focus:outline-none hover:text-white hover:bg-yellow-600 rounded-full text-lg':
                'inline-flex text-black dark:text-white  border border-slate-900 dark:border-white py-4 px-8 focus:outline-none hover:text-white hover:bg-yellow-600 rounded-full text-lg'
            }
       
          >
            Buy Plan
          </button>
   
        }
        
      </div>
    </div>
  );
};
