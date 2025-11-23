import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Sessões", url: "/sessoes", icon: Calendar },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">Ψ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">PsiFinance</h1>
                <p className="text-xs text-muted-foreground">Gestão Inteligente</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-sidebar-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <span className="font-medium animate-fade-in">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border animate-fade-in">
          <div className="bg-primary-light rounded-lg p-4">
            <p className="text-sm font-medium mb-1">💡 Dica do dia</p>
            <p className="text-xs text-muted-foreground">
              Você está quase atingindo sua meta mensal!
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
