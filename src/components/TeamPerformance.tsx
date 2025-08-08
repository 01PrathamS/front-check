
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Award, TrendingUp, Clock } from "lucide-react";

const teamPerformanceData = [
  {
    name: "Ansley",
    callsToday: 32,
    avgQuality: 9.2,
    totalCalls: 156,
    successRate: 87,
    avgDuration: "4:45",
    tags: { successful: 28, negotiate: 12, "could be better": 4 }
  },
  {
    name: "Kenya",
    callsToday: 28,
    avgQuality: 8.7,
    totalCalls: 142,
    successRate: 82,
    avgDuration: "5:12",
    tags: { successful: 22, negotiate: 18, "could be better": 8 }
  },
  {
    name: "Mason",
    callsToday: 24,
    avgQuality: 8.9,
    totalCalls: 134,
    successRate: 85,
    avgDuration: "4:32",
    tags: { successful: 20, negotiate: 15, "could be better": 6 }
  },
  {
    name: "Neil",
    callsToday: 21,
    avgQuality: 8.1,
    totalCalls: 128,
    successRate: 78,
    avgDuration: "5:45",
    tags: { successful: 16, negotiate: 12, "could be better": 9 }
  },
  {
    name: "MS",
    callsToday: 19,
    avgQuality: 8.5,
    totalCalls: 98,
    successRate: 83,
    avgDuration: "4:18",
    tags: { successful: 15, negotiate: 10, "could be better": 5 }
  }
];

const weeklyData = [
  { day: 'Mon', calls: 145, quality: 8.3 },
  { day: 'Tue', calls: 132, quality: 8.5 },
  { day: 'Wed', calls: 158, quality: 8.1 },
  { day: 'Thu', calls: 167, quality: 8.7 },
  { day: 'Fri', calls: 124, quality: 8.4 },
  { day: 'Sat', calls: 89, quality: 8.2 },
  { day: 'Sun', calls: 67, quality: 8.6 }
];

const tagDistribution = [
  { name: 'Successful', value: 101, color: '#10B981' },
  { name: 'Negotiate', value: 67, color: '#3B82F6' },
  { name: 'Could be Better', value: 32, color: '#F59E0B' },
  { name: 'Missed Opportunity', value: 18, color: '#EF4444' }
];

export const TeamPerformance = () => {
  const [timeRange, setTimeRange] = useState("today");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Performance</h2>
            <p className="text-gray-600">Detailed analytics and insights for your team</p>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Call Volume & Quality</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Tag Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tagDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tagDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Team Members Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Individual Performance</h3>
        
        <div className="space-y-6">
          {teamPerformanceData.map((member, index) => (
            <div key={member.name} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">Sales Agent</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {index === 0 && <Badge className="bg-yellow-100 text-yellow-800"><Award className="w-3 h-3 mr-1" />Top Performer</Badge>}
                  {member.successRate >= 85 && <Badge className="bg-green-100 text-green-800">High Success Rate</Badge>}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{member.callsToday}</div>
                  <div className="text-sm text-gray-600">Calls Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{member.avgQuality}/10</div>
                  <div className="text-sm text-gray-600">Avg Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{member.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{member.avgDuration}</div>
                  <div className="text-sm text-gray-600">Avg Duration</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800">
                  Successful: {member.tags.successful}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">
                  Negotiate: {member.tags.negotiate}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Could be Better: {member.tags["could be better"]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
