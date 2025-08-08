
import { Badge } from "@/components/ui/badge";
import { Phone, Clock } from "lucide-react";

const callsData = [
  {
    id: "CALL-001",
    customer: "Acme Corp",
    agent: "Ansley",
    duration: "5:32",
    time: "2 minutes ago",
    tags: ["negotiate", "successful"],
    quality: 9.1,
    status: "completed"
  },
  {
    id: "CALL-002",
    customer: "TechStart Inc",
    agent: "Kenya",
    duration: "3:45",
    time: "8 minutes ago",
    tags: ["could be better", "follow-up needed", "extraction"],
    quality: 7.5,
    status: "completed"
  },
  {
    id: "CALL-003",
    customer: "Global Solutions",
    agent: "Mason",
    duration: "7:12",
    time: "15 minutes ago",
    tags: ["missed opportunity", "price objection", "smile reconstruction"],
    quality: 6.8,
    status: "completed"
  },
  {
    id: "CALL-004",
    customer: "Innovate LLC",
    agent: "Neil",
    duration: "4:18",
    time: "22 minutes ago",
    tags: ["successful", "upsell"],
    quality: 8.9,
    status: "completed"
  },
  {
    id: "CALL-005",
    customer: "Future Systems",
    agent: "MS",
    duration: "6:05",
    time: "28 minutes ago",
    tags: ["negotiate", "technical questions"],
    quality: 8.3,
    status: "completed"
  }
];

const getTagColor = (tag: string) => {
  const colors = {
    "successful": "bg-green-100 text-green-800",
    "negotiate": "bg-blue-100 text-blue-800",
    "could be better": "bg-yellow-100 text-yellow-800",
    "missed opportunity": "bg-red-100 text-red-800",
    "follow-up needed": "bg-purple-100 text-purple-800",
    "upsell": "bg-indigo-100 text-indigo-800",
    "price objection": "bg-orange-100 text-orange-800",
    "technical questions": "bg-gray-100 text-gray-800"
  };
  return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const RecentCalls = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Calls</h3>
        <p className="text-sm text-gray-600">Latest call activities with AI insights</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Call</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Agent</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Tags</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Quality</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody>
            {callsData.map((call) => (
              <tr key={call.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">{call.id}</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-gray-900">{call.customer}</td>
                <td className="py-4 px-4 text-gray-600">{call.agent}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{call.duration}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    {call.tags.map((tag) => (
                      <Badge key={tag} className={getTagColor(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`font-semibold ${
                    call.quality >= 8.5 ? 'text-green-600' : 
                    call.quality >= 7.5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {call.quality}/10
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">{call.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
