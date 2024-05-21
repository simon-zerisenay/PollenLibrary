'use client';
import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { PricingCard } from './PricingCard';
import { cn } from '../utils/cn';

const PricingPlan = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const plans = [
    {
      plan: 'Basic',
      price: '10',
      features: ['5 Users free','$5 per additional user', ' ⁠Attendance'],
    },
    {
      plan: 'Standard',
      price: '20',
      features: [' ⁠15 Users free','$10 per additional user', '  ⁠Attendance', '⁠Activitiy Reporting'],
    }
  ];

  return (
    <div
      className={cn(
        ' flex md:flex-row flex-col gap-10 py-10 items-center'
      )}
    >
      {plans.map((plan, cardIndex) => (
        <div
          key={cardIndex}
          className='relative group  block p-2 h-full w-full'
          onMouseEnter={() => setHoveredIndex(cardIndex)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === cardIndex && (
              <motion.span
                className='absolute inset-0 h-full w-full bg-neutral-200 dark:bg-gray-900/[0.8] block  rounded-3xl'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <PricingCard {...plan} index={cardIndex} />
        </div>
      ))}
    </div>
  );
};

export default PricingPlan;
