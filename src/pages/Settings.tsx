import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, Database, Palette, Globe } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground mt-2">
          Configurez votre tableau de bord et vos préférences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Paramètres généraux */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-white shadow-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-coral/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-coral" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Compte</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom d'utilisateur</Label>
                  <Input id="name" defaultValue="Admin Pulse-IA" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@pulse-ia.com" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="company">Entreprise</Label>
                <Input id="company" defaultValue="Pulse-IA Analytics" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-pulse-blue/10 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-pulse-blue" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les rapports quotidiens</p>
                </div>
                <Switch id="email-notif" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notif">Notifications push</Label>
                  <p className="text-sm text-muted-foreground">Alertes en temps réel</p>
                </div>
                <Switch id="push-notif" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-report">Rapport hebdomadaire</Label>
                  <p className="text-sm text-muted-foreground">Résumé des performances</p>
                </div>
                <Switch id="weekly-report" defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-coral/10 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-coral" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Intégrations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    FB
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Facebook</p>
                    <p className="text-sm text-muted-foreground">Connecté</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configurer</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    IG
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Instagram</p>
                    <p className="text-sm text-muted-foreground">Non connecté</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connecter</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Paramètres rapides */}
        <div className="space-y-6">
          <Card className="p-6 bg-white shadow-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-pulse-blue/10 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-pulse-blue" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Apparence</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Thème</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button variant="outline" size="sm" className="bg-coral text-white border-coral">
                    Clair
                  </Button>
                  <Button variant="outline" size="sm">
                    Sombre
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-coral/10 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-coral" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Langue</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="language">Langue de l'interface</Label>
                <select 
                  id="language" 
                  className="w-full mt-2 p-2 border border-border rounded-md bg-background"
                  defaultValue="fr"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="mg">Malagasy</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-card">
            <h3 className="font-semibold text-foreground mb-2">Actions rapides</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Exporter les données
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                Sauvegarder les paramètres
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-white" size="sm">
                Réinitialiser
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}