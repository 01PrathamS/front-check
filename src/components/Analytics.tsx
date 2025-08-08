
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Clock, Phone, Star } from "lucide-react";

const monthlyData = [
  { month: 'Jan', calls: 1245, revenue: 125000, quality: 8.2, conversion: 78 },
  { month: 'Feb', calls: 1356, revenue: 142000, quality: 8.4, conversion: 82 },
  { month: 'Mar', calls: 1189, revenue: 118000, quality: 8.1, conversion: 75 },
  { month: 'Apr', calls: 1478, revenue: 156000, quality: 8.6, conversion: 85 },
  { month: 'May', calls: 1523, revenue: 168000, quality: 8.5, conversion: 87 },
  { month: 'Jun', calls: 1634, revenue: 178000, quality: 8.7, conversion: 89 }
];

const hourlyData = [
  { hour: '9 AM', calls: 45, quality: 8.2, conversion: 76 },
  { hour: '10 AM', calls: 67, quality: 8.5, conversion: 82 },
  { hour: '11 AM', calls: 89, quality: 8.1, conversion: 78 },
  { hour: '12 PM', calls: 52, quality: 7.9, conversion: 74 },
  { hour: '1 PM', calls: 34, quality: 8.3, conversion: 80 },
  { hour: '2 PM', calls: 78, quality: 8.7, conversion: 88 },
  { hour: '3 PM', calls: 92, quality: 8.4, conversion: 84 },
  { hour: '4 PM', calls: 86, quality: 8.6, conversion: 86 },
  { hour: '5 PM', calls: 45, quality: 8.2, conversion: 79 }
];

const tagTrends = [
  { week: 'Week 1', successful: 45, negotiate: 32, "could be better": 18, "missed opportunity": 12 },
  { week: 'Week 2', successful: 52, negotiate: 28, "could be better": 15, "missed opportunity": 9 },
  { week: 'Week 3', successful: 48, negotiate: 35, "could be better": 22, "missed opportunity": 14 },
  { week: 'Week 4', successful: 58, negotiate: 30, "could be better": 16, "missed opportunity": 8 }
];

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [chartType, setChartType] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
            <p className="text-gray-600">Deep insights into call performance and trends</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="trends">Trends</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$168,000</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Call Duration</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4:52</div>
            <p className="text-xs text-red-600 flex items-center">
              <TrendingDown className="w-3 h-3 mr-1" />
              -0:18 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,634</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +7.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="calls" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="conversion" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Call Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="calls" fill="url(#purpleGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tag Trends */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Tag Trends Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tagTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="successful" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="negotiate" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="could be better" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="missed opportunity" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Successful</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Negotiate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Could be Better</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Missed Opportunity</span>
          </div>
        </div>
      </div>
    </div>
  );
};
