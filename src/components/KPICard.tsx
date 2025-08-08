
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<any>;
  color: "blue" | "green" | "purple" | "orange";
}

export const KPICard = ({ title, value, change, trend, icon: Icon, color }: KPICardProps) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600"
  };

  const trendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
  };

  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600"
  };

  const TrendIcon = trendIcon[trend];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={cn("flex items-center space-x-1", trendColor[trend])}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
