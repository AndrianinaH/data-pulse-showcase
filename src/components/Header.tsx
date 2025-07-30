import { TrendingUp, BarChart3, Users } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-gradient-primary text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Pulse-IA</h1>
          </div>
          
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
            Tableau de bord 100% SaaS, autonome et prêt à l'usage pour analyser vos performances sur les réseaux sociaux
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Analytics Avancées</h3>
              <p className="text-sm opacity-80 mt-2">Métriques détaillées en temps réel</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Engagement Social</h3>
              <p className="text-sm opacity-80 mt-2">Suivi des interactions et de l'audience</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">IA Prédictive</h3>
              <p className="text-sm opacity-80 mt-2">Insights intelligents et recommandations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};