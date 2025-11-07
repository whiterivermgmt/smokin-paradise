import { cn } from '@/lib/utils';
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from '@radix-ui/react-tooltip';
import { Heart, Facebook, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
}

const socialLink = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/Smokinparadise1/",
    icon: <Facebook className="w-5 h-5" />
  },
  {
    title: "Google Reviews",
    href: "https://www.google.com/search?q=smokin+paradise",
    icon: <Star className="w-5 h-5" />
  },
  {
    title: "Yelp",
    href: "https://www.yelp.com/biz/smokin-paradise-bedford",
    icon: <Heart className="w-5 h-5" />
  },
];

const Socialmedia = ({ className }: Props) => {
  return (
    <TooltipProvider delayDuration={100}>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
                className={cn(
                  "p-2 border rounded-full border-white text-white transition-all duration-300 hover:scale-110 hover:text-orange-500 hover:border-orange-500"
                )}
              >
                {item.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-black border border-lightBg text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-md transition-all duration-200 scale-95"
              )}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Socialmedia;
