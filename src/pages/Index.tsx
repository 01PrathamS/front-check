import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { DashboardOverview } from "@/components/DashboardOverview";
import { CallsList } from "@/components/CallsList";
import { TeamPerformance } from "@/components/TeamPerformance";
import { Analytics } from "@/components/Analytics";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date()); // ✅ Add this

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview selectedDate={selectedDate} />; // ✅ Pass date
      case "calls":
        return <CallsList selectedDate={selectedDate} />;
      // case "team":
      //   return <TeamPerformance />;
      // case "analytics":
      //   return <Analytics />;
      default:
        return <DashboardOverview selectedDate={selectedDate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <TopBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> {/* ✅ Fix this */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
