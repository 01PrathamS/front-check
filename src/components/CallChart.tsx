
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { hour: '9 AM', calls: 15, quality: 8.2 },
  { hour: '10 AM', calls: 22, quality: 8.5 },
  { hour: '11 AM', calls: 28, quality: 8.1 },
  { hour: '12 PM', calls: 18, quality: 7.9 },
  { hour: '1 PM', calls: 12, quality: 8.3 },
  { hour: '2 PM', calls: 25, quality: 8.7 },
  { hour: '3 PM', calls: 32, quality: 8.4 },
  { hour: '4 PM', calls: 29, quality: 8.6 },
];

export const CallChart = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Calls by Hour</h3>
        <p className="text-sm text-gray-600">Today's call volume and quality trends</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="hour" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="calls" 
              fill="url(#blueGradient)" 
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
