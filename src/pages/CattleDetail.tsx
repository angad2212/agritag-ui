import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Mail, MapPin, Thermometer, Tag, Clock, Video } from "lucide-react";

const CattleDetail = () => {
  const { id } = useParams();

  // Mock cattle data - replace with Firebase fetch by ID
  const cattleData = {
    id: id || "C001",
    name: "Bella",
    temperature: 38.5,
    location: { lat: 40.7128, lng: -74.0060 },
    rfidTag: "RF001234",
    status: "normal",
    lastUpdate: "2 mins ago",
    breed: "Holstein",
    age: "3 years",
    weight: "650 kg",
    healthHistory: [
      { date: "2024-01-15", note: "Routine checkup - healthy" },
      { date: "2024-01-10", note: "Vaccination completed" },
      { date: "2024-01-05", note: "Temperature spike - monitored" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-status-normal text-white";
      case "warning": return "bg-status-warning text-white";
      case "critical": return "bg-status-critical text-white";
      default: return "bg-muted";
    }
  };

  const handleVetCall = () => {
    const vetPhone = "+1-555-VET-HELP";
    const subject = `Attention needed: Cattle ${cattleData.name} (${cattleData.id})`;
    const body = `Dear Veterinarian,\n\nCattle ${cattleData.name} with ID ${cattleData.id} may need attention.\n\nCurrent Status: ${cattleData.status}\nTemperature: ${cattleData.temperature}°C\nLocation: ${cattleData.location.lat}, ${cattleData.location.lng}\nRFID: ${cattleData.rfidTag}\n\nPlease contact us when convenient.\n\nThank you,\nAgriTag Team`;
    
    window.open(`mailto:vet@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    alert(`Veterinarian contacted!\nPhone: ${vetPhone}\nEmail sent with cattle details.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">AgriTag</h1>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Video className="h-4 w-4" />
              Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{cattleData.name}</h2>
              <p className="text-muted-foreground">Cattle ID: {cattleData.id}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={getStatusColor(cattleData.status)}>
                {cattleData.status}
              </Badge>
              <Button onClick={handleVetCall} className="gap-2">
                <Phone className="h-4 w-4" />
                Contact Vet
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status Card */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Current Status
                </CardTitle>
                <CardDescription>Real-time monitoring data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{cattleData.temperature}°C</div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                    {cattleData.temperature > 39.5 && (
                      <div className="text-xs text-alert mt-1">Above normal</div>
                    )}
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-lg font-semibold text-primary">
                      {cattleData.location.lat.toFixed(4)}, {cattleData.location.lng.toFixed(4)}
                    </div>
                    <div className="text-sm text-muted-foreground">GPS Location</div>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-lg font-semibold text-primary">{cattleData.rfidTag}</div>
                    <div className="text-sm text-muted-foreground">RFID Tag</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
                <CardDescription>Cattle position on farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center border-2 border-dashed border-accent">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive map view</p>
                    <p className="text-sm text-muted-foreground">
                      Lat: {cattleData.location.lat}, Lng: {cattleData.location.lng}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health History */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Health History
                </CardTitle>
                <CardDescription>Recent health events and checkups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cattleData.healthHistory.map((event, index) => (
                    <div key={index} className="flex gap-4 p-3 bg-accent/10 rounded-lg">
                      <div className="text-sm font-medium text-primary min-w-[80px]">
                        {event.date}
                      </div>
                      <div className="text-sm text-card-foreground">{event.note}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Breed</span>
                  <span className="text-card-foreground font-medium">{cattleData.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age</span>
                  <span className="text-card-foreground font-medium">{cattleData.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="text-card-foreground font-medium">{cattleData.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update</span>
                  <span className="text-card-foreground font-medium">{cattleData.lastUpdate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Veterinarian Contact Card */}
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>24/7 veterinary support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">Dr. Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Licensed Veterinarian</div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full gap-2" onClick={handleVetCall}>
                    <Phone className="h-4 w-4" />
                    Call: +1-555-VET-HELP
                  </Button>
                  <Button variant="outline" className="w-full gap-2" onClick={handleVetCall}>
                    <Mail className="h-4 w-4" />
                    Send Email Alert
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Emergency calls include cattle location and health data
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CattleDetail;