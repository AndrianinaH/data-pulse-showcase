import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Globe, MapPin } from "lucide-react";

const audienceData = [
  {
    id: 1,
    name: "Followers actifs",
    count: "12.5K",
    change: "+5.2%",
    color: "coral"
  },
  {
    id: 2,
    name: "Nouveaux followers",
    count: "234",
    change: "+12.1%",
    color: "pulse-blue"
  },
  {
    id: 3,
    name: "Taux de rétention",
    count: "87.3%",
    change: "+2.4%",
    color: "coral"
  },
  {
    id: 4,
    name: "Engagement moyen",
    count: "8.9%",
    change: "+1.8%",
    color: "pulse-blue"
  }
];

const topFollowers = [
  { name: "Marie Rabe", username: "@marie_rabe", engagement: "High" },
  { name: "John Doe", username: "@john_doe", engagement: "Medium" },
  { name: "Sarah Tech", username: "@sarah_tech", engagement: "High" },
  { name: "David Mada", username: "@david_mada", engagement: "Low" },
];

export default function Audience() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audience</h1>
        <p className="text-muted-foreground mt-2">
          Analysez votre audience et découvrez qui interagit avec votre contenu
        </p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {audienceData.map((metric) => (
          <Card key={metric.id} className="p-6 bg-gradient-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{metric.name}</p>
                <p className={`text-3xl font-bold mt-2 text-${metric.color}`}>{metric.count}</p>
                <p className={`text-sm mt-1 text-${metric.color === 'coral' ? 'pulse-blue' : 'coral'}`}>
                  {metric.change} ce mois
                </p>
              </div>
              <div className={`w-12 h-12 bg-${metric.color}/10 rounded-xl flex items-center justify-center`}>
                {metric.color === 'coral' ? (
                  <Users className={`w-6 h-6 text-${metric.color}`} />
                ) : (
                  <UserPlus className={`w-6 h-6 text-${metric.color}`} />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Followers */}
        <Card className="p-6 bg-white shadow-card">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Top Followers</h2>
          <div className="space-y-4">
            {topFollowers.map((follower, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {follower.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{follower.name}</p>
                    <p className="text-sm text-muted-foreground">{follower.username}</p>
                  </div>
                </div>
                <Badge 
                  variant={follower.engagement === 'High' ? 'default' : 
                           follower.engagement === 'Medium' ? 'secondary' : 'outline'}
                  className={follower.engagement === 'High' ? 'bg-coral text-white' : ''}
                >
                  {follower.engagement}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Démographie */}
        <Card className="p-6 bg-white shadow-card">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Démographie</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-4 h-4 text-pulse-blue" />
                <h3 className="font-medium text-foreground">Localisation</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Madagascar</span>
                  <span className="text-sm font-medium text-coral">65%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">France</span>
                  <span className="text-sm font-medium text-pulse-blue">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Autres</span>
                  <span className="text-sm font-medium text-muted-foreground">15%</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-4 h-4 text-coral" />
                <h3 className="font-medium text-foreground">Villes principales</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Antananarivo</span>
                  <span className="text-sm font-medium text-coral">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Antsirabe</span>
                  <span className="text-sm font-medium text-pulse-blue">12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Toamasina</span>
                  <span className="text-sm font-medium text-muted-foreground">8%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}