import { BarChart3, Users, TrendingUp, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Avancées</h1>
        <p className="text-muted-foreground mt-2">
          Analysez vos performances en détail avec des métriques avancées
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Taux d'engagement</p>
              <p className="text-3xl font-bold mt-2 text-coral">12.5%</p>
              <p className="text-sm text-pulse-blue mt-1">+2.1% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-coral" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Portée moyenne</p>
              <p className="text-3xl font-bold mt-2 text-pulse-blue">28.7K</p>
              <p className="text-sm text-coral mt-1">+5.3% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-pulse-blue/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-pulse-blue" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">CTR moyen</p>
              <p className="text-3xl font-bold mt-2 text-coral">3.2%</p>
              <p className="text-sm text-pulse-blue mt-1">+0.8% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-coral" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Score de performance</p>
              <p className="text-3xl font-bold mt-2 text-pulse-blue">8.7/10</p>
              <p className="text-sm text-coral mt-1">+0.3 ce mois</p>
            </div>
            <div className="w-12 h-12 bg-pulse-blue/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-pulse-blue" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-card">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Graphiques détaillés</h2>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
          Graphiques d'analytics à implémenter
        </div>
      </Card>
    </div>
  );
}