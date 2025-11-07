import React from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const footerData = [
  {
    title: 'Visit Us',
    subtitle: '3078 John Williams Blvd, Bedford, IN 47421',
    icon: <MapPin className="h-6 w-6 text-orange-500" />,
    link: 'https://www.google.com/maps?q=3078+John+Williams+Blvd,+Bedford,+IN+47421',
    targetBlank: true
  },
  {
    title: 'Our Hours',
    subtitle: 'Mon: 11am - 10pm | Tue - Thu: 11am - 10pm | Fri - Sat: 10am - 10pm | Sun: 12pm - 8pm',
    icon: <Clock className="h-6 w-6 text-orange-500" />,
  },
  {
    title: 'Call Us',
    subtitle: '(412) 551-6026',
    icon: <Phone className="h-6 w-6 text-orange-500" />,
    link: 'tel:4125516026',
  },
  {
    title: 'Email Us',
    subtitle: 'smokinparadise1@gmail.com',
    icon: <Mail className="h-6 w-6 text-orange-500" />,
    link: 'mailto:smokinparadise1@gmail.com',
  }
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-700 py-6">
      {footerData.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded transition-colors hover:bg-white/10"
        >
          <div className="shrink-0">{item.icon}</div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-white">{item.title}</span>
            {item.link ? (
              <a
                href={item.link}
                target={item.targetBlank ? '_blank' : '_self'}
                rel={item.targetBlank ? 'noopener noreferrer' : undefined}
                className="text-gray-300 hover:text-orange-500 transition-colors wrap-break-word"
              >
                {item.subtitle}
              </a>
            ) : (
              <span className="text-gray-300">{item.subtitle}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
