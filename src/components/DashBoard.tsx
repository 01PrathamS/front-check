// this file is created as a parent of DashboardOverview and TopBar to reflect calendar date and reflect dashboard data based on the selected date 
// but later we need other files also to be created as children of this file -> where we can make more generalize name for this file 


// Dashboard.tsx
import React, { useState } from "react";
import { TopBar } from "./TopBar";
import { DashboardOverview } from "./DashboardOverview";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <TopBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <DashboardOverview selectedDate={selectedDate} />
    </div>
  );
};

export default Dashboard;

