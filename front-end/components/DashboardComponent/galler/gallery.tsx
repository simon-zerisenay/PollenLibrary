import React from 'react';
import { pollenImages } from '@/config/imges';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function Galleries() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {pollenImages.map((image) => (
        <Card key={image.id} className="h-auto max-w-full rounded-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">{image.name}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt={image.name}
              className="object-cover rounded-xl"
              src={image.src}
              width={270}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
