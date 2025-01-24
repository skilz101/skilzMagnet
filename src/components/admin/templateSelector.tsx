"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Template } from "@prisma/client";

interface TemplateType {
  templateName: Template;
  templateImage: string;
  id: string;
}

const templateItems: TemplateType[] = [
  {
    templateName: "Template1",
    templateImage: "/Template-1.png",
    id: "1",
  },
  {
    templateName: "Template2",
    templateImage: "/Template-2.png",
    id: "2",
  },
  {
    templateName: "Template3",
    templateImage: "/Template-3.png",
    id: "3",
  },
  {
    templateName: "Template4",
    templateImage: "/Template-4.png",
    id: "4",
  },
];

interface TemplateProps {
  template: Template | undefined;
  onTemplateChange: (selectedTemplate: Template) => void;
}

export default function TemplateSelector({
  template,
  onTemplateChange,
}: TemplateProps) {
  const [active, setActive] = useState<Template | undefined>(template);

  useEffect(() => {
    setActive(template);
  }, [template]);

  const handleTemplateChange = (selectedTemplate: Template) => {
    setActive(selectedTemplate);
    onTemplateChange(selectedTemplate);
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full m-0 max-w-2xl"
    >
      <h3 className="text-xl">Select Template</h3>
      <CarouselContent>
        {templateItems.map((item) => (
          <CarouselItem
            key={item.id}
            onClick={() => handleTemplateChange(item.templateName)}
            className="md:basis-1/2 lg:basis-1/3 cursor-pointer"
          >
            <div className="p-1">
              <Card
                className={`border-0 text-white shadow-none hover:border-2 hover:border-black ${
                  active === item.templateName && "border-2 border-black"
                }`}
                style={{
                  background: `url(${item.templateImage})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#4A86D4",
                  backgroundBlendMode: "multiply",
                }}
              >
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-xl">{item.templateName}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {templateItems.length > 3 && <CarouselPrevious className="-left-5" />}
      {templateItems.length > 3 && <CarouselNext className="-right-5" />}
    </Carousel>
  );
}
