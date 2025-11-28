import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, User, Phone, MapPin, Thermometer, Tag } from "lucide-react";
import { useCattleDeviceData } from "@/hooks/useCattleDeviceData";
import { openDemoVideo } from "@/constants/demo";

// Mock cattle data - replace with Firebase data
/*
Firebase integration:
useEffect(() => {
  const fetchCattleData = () => {
    const cattleRef = ref(database, 'cattle');
    onValue(cattleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCattleData(Object.values(data));
      }
    });
  };
  
  fetchCattleData();
  // Set up real-time updates every 30 seconds
  const interval = setInterval(fetchCattleData, 30000);
  return () => clearInterval(interval);
}, []);
*/

const mockCattleData = [
  {
    id: "C001",
    name: "Bella",
    temperature: 31.5,
    location: { lat: 30.3327, lng: 76.3707 },
    rfidTag: "RF001234",
    status: "normal",
    lastUpdate: "2 mins ago"
  },
  {
    id: "C002", 
    name: "Duke",
    temperature: 39.8,
    location: { lat: 40.7580, lng: -73.9855 },
    rfidTag: "RF001235",
    status: "warning",
    lastUpdate: "5 mins ago"
  },
  {
    id: "C003",
    name: "Luna",
    temperature: 41.2,
    location: { lat: 40.7505, lng: -73.9934 },
    rfidTag: "RF001236", 
    status: "critical",
    lastUpdate: "1 min ago"
  },
  {
    id: "C004",
    name: "Max",
    temperature: 38.3,
    location: { lat: 40.7282, lng: -74.0776 },
    rfidTag: "RF001237",
    status: "normal",
    lastUpdate: "3 mins ago"
  },
  {
    id: "C005",
    name: "Daisy",
    temperature: 39.1,
    location: { lat: 40.7614, lng: -73.9776 },
    rfidTag: "RF001238",
    status: "normal",
    lastUpdate: "4 mins ago"
  },
  {
    id: "C006",
    name: "Rocky",
    temperature: 40.1,
    location: { lat: 40.7489, lng: -73.9680 },
    rfidTag: "RF001239",
    status: "warning",
    lastUpdate: "6 mins ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "normal": return "bg-status-normal text-white";
    case "warning": return "bg-status-warning text-white";
    case "critical": return "bg-status-critical text-white";
    default: return "bg-muted";
  }
};

const getCardBorderColor = (status: string) => {
  switch (status) {
    case "normal": return "border-l-status-normal";
    case "warning": return "border-l-status-warning";
    case "critical": return "border-l-status-critical";
    default: return "border-l-muted";
  }
};

const getHindiName = (name: string): string => {
  const hindiNames: Record<string, string> = {
    "Bella": "बेला",
    "Duke": "ड्यूक",
    "Luna": "लूना",
    "Max": "मैक्स",
    "Daisy": "डेज़ी",
    "Rocky": "रॉकी"
  };
  return hindiNames[name] || "";
};

const Dashboard = () => {
  const { data: deviceData, loading: deviceLoading } = useCattleDeviceData();

  const handleVetCall = (cattleId: string, cattleName: string) => {
    // Mock veterinarian contact
    const vetPhone = "+1-555-VET-HELP";
    const subject = `Urgent: Cattle ${cattleName} (${cattleId}) needs attention`;
    const body = `Dear Veterinarian,\n\nCattle ${cattleName} with ID ${cattleId} requires urgent medical attention.\n\nPlease contact us at your earliest convenience.\n\nThank you,\nAgriTag Team`;
    
    window.open(`mailto:vet@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    alert(`Veterinarian contacted!\nPhone: ${vetPhone}\nEmail sent with cattle details.`);
  };

  // Update Bella's data with API data if available
  const getCattleDisplayData = (cattle: typeof mockCattleData[0]) => {
    if (cattle.id === "C001" && deviceData) {
      return {
        ...cattle,
        temperature: deviceData.temperature,
        location: { lat: deviceData.latitude, lng: deviceData.longitude },
        rfidTag: deviceData.rfid_uid || cattle.rfidTag,
      };
    }
    return cattle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">AgriTag</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={openDemoVideo}
                type="button"
              >
                <Video className="h-4 w-4" />
                Demo
              </Button>
              <Link to="/account">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Cattle Dashboard</h2>
          <p className="text-muted-foreground">Monitor your herd's health and location in real-time</p>
        </div>

        {/* Cattle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCattleData.map((cattle) => {
            const displayData = getCattleDisplayData(cattle);
            const isBella = cattle.id === "C001";
            const isLoading = isBella && deviceLoading;
            
            return (
              <Card key={cattle.id} className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 ${getCardBorderColor(cattle.status)} bg-card/80 backdrop-blur-sm`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-card-foreground">
                      {cattle.name}
                      {getHindiName(cattle.name) && (
                        <span className="ml-2 text-base font-normal">({getHindiName(cattle.name)})</span>
                      )}
                    </CardTitle>
                    <Badge className={getStatusColor(cattle.status)}>
                      {cattle.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">ID: {cattle.id}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-card-foreground">
                      {isLoading 
                        ? 'Loading...' 
                        : isBella && deviceData?.temperature
                          ? `${deviceData.temperature.toFixed(1)}°C`
                          : `${displayData.temperature}°C`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-card-foreground">
                      {isLoading 
                        ? 'Loading...' 
                        : isBella && deviceData?.latitude && deviceData?.longitude
                          ? `${deviceData.latitude.toFixed(4)}, ${deviceData.longitude.toFixed(4)}`
                          : `${displayData.location.lat.toFixed(4)}, ${displayData.location.lng.toFixed(4)}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-card-foreground">
                      {isLoading 
                        ? 'Loading...' 
                        : isBella && deviceData?.rfid_uid
                          ? deviceData.rfid_uid
                          : displayData.rfidTag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Updated {cattle.lastUpdate}</p>
                
                <div className="flex gap-2 pt-2">
                  <Link to={`/cattle/${cattle.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {cattle.status === "critical" && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleVetCall(cattle.id, cattle.name)}
                    >
                      <Phone className="h-3 w-3" />
                      Vet
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;