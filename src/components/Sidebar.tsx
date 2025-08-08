
import { Home, Phone, Users, BarChart3, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "calls", label: "Calls", icon: Phone },
  // { id: "team", label: "Team Performance", icon: Users },
  // { id: "analytics", label: "Analytics", icon: BarChart3 },
  // { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AaraDen</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left transition-all duration-200",
                collapsed ? "justify-center" : "justify-start space-x-3",
                activeView === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
