import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Play, Download, Filter } from "lucide-react";



export const CallsList = ({ selectedDate }: { selectedDate: Date }) => {
  const [callsData, setCallsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);
  const [selectedAudioPath, setSelectedAudioPath] = useState<string | null>(null);
  const [selectedMoreInfo, setSelectedMoreInfo] = useState<any | null>(null);
  const [observation, setObservation] = useState("");
  const [remark, setRemark] = useState("");




  useEffect(() => {
    const fetchCalls = async () => {
      try {
        // const day = selectedDate.getDate();
        // const response = await fetch(`http://127.0.0.1:5000/api/recordings-for-day?day=${day}&limit=100`);
        
        const dateStr = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
        const response = await fetch(`http://127.0.0.1:5000/api/recordings-for-day?date=${dateStr}&limit=100`);
        const data = await response.json();
        // console.log("Raw API response:", data);
        const transformedData = data.map((call) => ({
        id: call.recording_id,
        // customer: call.from_name || "Unknown Caller",
        phone: call.other_party_number || "number not available",
        agent: call.speakers || ["not identified"],
        duration: `${Math.floor(call.duration / 60)}:${(call.duration % 60).toString().padStart(2, "0")}`,
        time: "Just now",
        date: "2024-01-25",
        tags: Array.isArray(call.tags)
          ? call.tags
          : typeof call.tags === "string"
          ? call.tags.split(",").map(tag => tag.trim())
          : ["successful"],
        quality: 10,
        status: "completed",
        recording: true,
        transcription: call.transcript || "No transcription available",
        file_path: call.file_path || "No file path available",
        observation: call.observation || "", 
        remark_on_observation: call.remark_on_observation || "",

        hasObservation: !!(call.observation && call.remark_on_observation),
      }));


        setCallsData(transformedData);
      } catch (error) {
        console.error("Failed to fetch calls:", error);
      }
    };

    fetchCalls();
  }, [selectedDate]);

  const getTagColor = (tag: string) => {
    const colors = {
      successful: "bg-green-100 text-green-800",
      negotiate: "bg-blue-100 text-blue-800",
      "could be better": "bg-yellow-100 text-yellow-800",
      "missed opportunity": "bg-red-100 text-red-800",
      "follow-up needed": "bg-purple-100 text-purple-800",
      upsell: "bg-indigo-100 text-indigo-800",
      "price objection": "bg-orange-100 text-orange-800",
      "technical questions": "bg-gray-100 text-gray-800",
      cleaning: "bg-indigo-100 text-indigo-800",
    };
    return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredCalls = callsData.filter((call) => {
    const matchesSearch =
      // call.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.agent.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterTag === "all" || call.tags.includes(filterTag);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* Header and Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Calls</h2>
            <p className="text-gray-600">Comprehensive call history and analysis</p>
          </div>

          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />

            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="successful">Successful</SelectItem>
                <SelectItem value="negotiate">Negotiate</SelectItem>
                <SelectItem value="could be better">Could be Better</SelectItem>
                <SelectItem value="missed opportunity">Missed Opportunity</SelectItem>
                <SelectItem value="follow-up needed">Follow-up Needed</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {/* <th className="text-left py-3 px-4 font-medium text-gray-600">Call ID</th> */}
                {/* <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th> */}
                <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Agent</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                {/* <th className="text-left py-3 px-4 font-medium text-gray-600">Quality Score</th> */}
                <th className="text-left py-3 px-4 font-medium text-gray-600">Tags</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">More</th>

              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <tr key={call.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {/* <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">{call.id}</span>
                    </div>
                  </td> */}
                  {/* <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{call.customer}</div>
                      <div className="text-sm text-gray-500">{call.time}</div>
                    </div>
                  </td> */}
                  <td className="py-4 px-4 text-gray-600 font-mono text-sm">{call.phone}</td>
                  <td className="py-4 px-4 text-gray-900">{call.agent}</td>
                  <td className="py-4 px-4 font-mono text-gray-600">{call.duration}</td>
                  {/* <td className="py-4 px-4">
                    <span
                      className={`font-semibold ${
                        call.quality >= 8.5
                          ? "text-green-600"
                          : call.quality >= 7.5
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {call.quality}/10
                    </span>
                  </td> */}
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {call.tags.map((tag: string) => (
                        <Badge key={tag} className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => {
                        //   const audio = new Audio(`http://127.0.0.1:5000/recording?path=${encodeURIComponent(call.file_path)}`);
                        //   audio.play();
                        // }}
                        onClick={() => {
                              setSelectedAudioPath(call.file_path);
                            }}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTranscript(call.transcription)}
                      >
                        View Details
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMoreInfo(call)}
                    >
                      More
                    </Button>
                    {call.hasObservation && (
                      <Badge className="bg-blue-100 text-blue-700" variant="outline">
                        Observed
                      </Badge>
                    )}
                  </div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results Message */}
        {filteredCalls.length === 0 && (
          <div className="text-center py-12">
            <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No calls found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Transcript Dialog */}
      <Dialog open={!!selectedTranscript} onOpenChange={() => setSelectedTranscript(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Transcript</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap text-gray-700 text-sm max-h-[400px] overflow-y-auto">
            {selectedTranscript}
          </div>
        </DialogContent>
      </Dialog>
      {selectedAudioPath && (
        <AudioPlayerDialog
          filePath={selectedAudioPath}
          onClose={() => setSelectedAudioPath(null)}
        />
      )}
      <Dialog open={!!selectedMoreInfo} onOpenChange={() => setSelectedMoreInfo(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>More Call Info</DialogTitle>
        </DialogHeader>
       {selectedMoreInfo && (
  <div className="text-gray-700 text-sm space-y-4">
    <div>
      <p><strong>Call ID:</strong> {selectedMoreInfo.id}</p>
      {/* <p><strong>Customer:</strong> {selectedMoreInfo.customer}</p> */}
      <p><strong>Transcript:</strong> {selectedMoreInfo.transcription}</p>
      <p><strong>Observation:</strong> {selectedMoreInfo.observation}</p>
      <p><strong>Remark on observation:</strong> {selectedMoreInfo.remark_on_observation}</p>
    </div>

    <div className="space-y-2">
      <label className="block font-medium text-gray-800">Observation</label>    
      <Input
        placeholder="e.g. Upset customer, unclear product info..."
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
      />
    </div>

    <div className="space-y-2">
      <label className="block font-medium text-gray-800">Remark</label>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={3}
        placeholder="Why do you think this happened?"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />
    </div>

    <div className="text-right">
      <Button
        onClick={async () => {
          const response = await fetch("http://127.0.0.1:5000/api/save-observation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              call_id: selectedMoreInfo.id,
              observation,
              remark,
            }),
          });
          if (response.ok) {
            alert("Observation saved!");
            setSelectedMoreInfo(null);  // close dialog
            setObservation("");
            setRemark("");
          } else {
            alert("Failed to save. Please try again.");
          }
        }}
      >
        Submit
      </Button>
    </div>
  </div>
)}

      </DialogContent>
    </Dialog>

    </div>
  );
};



const AudioPlayerDialog = ({ filePath, onClose }: { filePath: string; onClose: () => void }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioUrl = `http://127.0.0.1:5000/recording?path=${encodeURIComponent(filePath)}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = playbackRate;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Audio Playback</DialogTitle>
    </DialogHeader>

    <audio ref={audioRef} src={audioUrl} preload="metadata" />

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>
        <span className="text-sm text-gray-600">{formatTime(duration)}</span>
      </div>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="w-full"
      />

      <div className="flex justify-center">
        <Button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</Button>
      </div>

      <div className="flex justify-center space-x-2">
        {[1, 1.5, 2, 3].map((rate) => (
          <Button
            key={rate}
            variant={playbackRate === rate ? "default" : "outline"}
            onClick={() => {
              setPlaybackRate(rate);
              if (audioRef.current) {
                audioRef.current.playbackRate = rate;
              }
            }}
          >
            {rate}x
          </Button>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};