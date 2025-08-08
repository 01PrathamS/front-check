// TeamMetrics.tsx

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TeamMetricsProps {
  selectedDate: Date;
}

interface AgentData {
  name: string;
  calls: number;
  quality: number; // placeholder for now
  avatar: string;
}

interface SpeakerApiResponse {
  speaker_count: number;
  speakers: string;
}

export const TeamMetrics: React.FC<TeamMetricsProps> = ({ selectedDate }) => {
  const [teamData, setTeamData] = useState<AgentData[]>([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const dateStr = selectedDate.toISOString().split("T")[0];
        const res = await fetch(`http://127.0.0.1:5000/get_speaker_count_by_recording?date=${dateStr}`);
        const data: SpeakerApiResponse[] = await res.json();

        const transformed: AgentData[] = data
          // .filter((entry) => entry.speakers.toLowerCase() !== "unknown")
          .map((entry) => ({
            name: capitalize(entry.speakers),
            calls: entry.speaker_count,
            quality: parseFloat((Math.random() * 2 + 8).toFixed(1)),
            avatar: getInitials(entry.speakers),
          }));

        setTeamData(transformed);
      } catch (err) {
        console.error("Failed to fetch team metrics", err);
      }
    };

    fetchTeamData();
  }, [selectedDate]);


  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("")
      .slice(0, 2);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Performers Today</h3>
        <p className="text-sm text-gray-600">Based on call volume and quality scores</p>
      </div>

      <div className="space-y-4">
        {teamData.length === 0 ? (
          <p className="text-sm text-gray-500">No data available for this date.</p>
        ) : (
          teamData.map((agent) => (
            <div key={agent.name} className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full text-white font-medium text-sm">
                {agent.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{agent.name}</span>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">{agent.calls} calls</span>
                    <span className="font-semibold text-green-600">{agent.quality}/10</span>
                  </div>
                </div>
                <Progress value={agent.quality * 10} className="h-2" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
