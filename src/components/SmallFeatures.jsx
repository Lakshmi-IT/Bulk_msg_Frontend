import React from "react";
import {
  Users,
  Megaphone,
  Inbox,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "75,000+ registered users",
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: "Send marketing broadcasts",
  },
  {
    icon: <Inbox className="w-8 h-8" />,
    title: "Intuitive team inbox",
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "Advanced automations & chatbots",
  },
];

export default function SmallFeatures() {
  return (
    <div className="bg-green-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            <div className="text-black">{feature.icon}</div>
            <p className="text-sm font-medium text-gray-900">{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
