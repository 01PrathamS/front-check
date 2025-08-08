import React, { useEffect, useState } from "react";
import { KPICard } from "./KPICard";
import { CallChart } from "./CallChart";
import { RecentCalls } from "./RecentCalls";
import { TeamMetrics } from "./TeamMetrics";
import { Phone, TrendingUp, Users, Clock } from "lucide-react";

interface DashboardOverviewProps {
  selectedDate: Date; 
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ selectedDate }) =>{
  const [kpiData, setKpiData] = useState([
    {
      title: "Total Calls Today",
      value: "0",
      change: "+0%",
      trend: "up" as const,
      icon: Phone,
      color: "blue" as const,
    },
    // {
    //   title: "Avg Call Quality",
    //   value: "10/10",
    //   change: "+0.5",
    //   trend: "up" as const,
    //   icon: TrendingUp,
    //   color: "green" as const,
    // },
    // {
    //   title: "Active Agents",
    //   value: "5",
    //   change: "2 online",
    //   trend: "neutral" as const,
    //   icon: Users,
    //   color: "purple" as const,
    // },
    // {
    //   title: "Avg Call Duration",
    //   value: "0s",
    //   change: "0s",
    //   trend: "neutral" as const,
    //   icon: Clock,
    //   color: "orange" as const,
    // },
  ]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      // const day = selectedDate.getDate(); // 

      const dateStr = selectedDate.toISOString().split("T")[0];
      console.log("Fetching data for date: ", dateStr);

      // Fetch total calls
      //const callsRes = await fetch(`http://127.0.0.1:5000/api/calls-by-day?day=${day}`);
      const callsRes = await fetch(`http://127.0.0.1:5000/api/calls-by-day?date=${dateStr}`);      
      const callsData = await callsRes.json();
      
      console.log("calls data: ", callsData);
      const totalCalls = callsData[0]?.["COUNT(*)"] || 0;

      // Fetch avg duration
      const durationRes = await fetch(`http://127.0.0.1:5000/api/avg-duration?date=${dateStr}`);
      const durationData = await durationRes.json();
      const avgDurationSec = parseFloat(durationData?.average_duration) || 0;
      console.log("durationData", durationData);

      const minutes = Math.floor(avgDurationSec / 60);
      const seconds = Math.floor(avgDurationSec % 60);
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      // Update KPI cards
      setKpiData((prev) =>
        prev.map((kpi) => {
          if (kpi.title === "Total Calls Today") {
            return { ...kpi, value: totalCalls.toString() };
          }
          if (kpi.title === "Avg Call Duration") {
            return {
              ...kpi,
              value: formattedDuration,
              change: `~${avgDurationSec.toFixed(0)}s`,
            };
          }
          return kpi;
        })
      );
    } catch (err) {
      console.error("Error fetching KPI data:", err);
    }
  };

  fetchData();
}, [selectedDate]); // ✅ Trigger effect on date change


  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts and Tables */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CallChart />
        <TeamMetrics selectedDate={selectedDate} />
      </div> */}

      {/* Recent Calls */}
      {/* <RecentCalls /> */}
    </div>
  );
};