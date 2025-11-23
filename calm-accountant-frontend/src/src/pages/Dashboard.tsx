import { StatCard } from "@/components/StatCard";
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../api/api";
import { endpoints } from "../api/endpoints";


const revenueData = [
  { month: "Jan", receita: 4200, despesas: 2400 },
  { month: "Fev", receita: 5100, despesas: 2800 },
  { month: "Mar", receita: 4800, despesas: 2600 },
  { month: "Abr", receita: 6200, despesas: 3100 },
  { month: "Mai", receita: 5800, despesas: 2900 },
  { month: "Jun", receita: 7400, despesas: 3400 },
];

const sessionsData = [
  { dia: "Seg", sessoes: 4 },
  { dia: "Ter", sessoes: 6 },
  { dia: "Qua", sessoes: 5 },
  { dia: "Qui", sessoes: 7 },
  { dia: "Sex", sessoes: 5 },
];

const recentClients = [
  { name: "Maria Silva", type: "Individual", status: "paid", date: "Hoje, 14:00" },
  { name: "João Santos", type: "Individual", status: "pending", date: "Amanhã, 10:00" },
  { name: "Ana Costa", type: "Casal", status: "paid", date: "15/10, 16:00" },
  { name: "Carlos Mendes", type: "Individual", status: "cancelled", date: "16/10, 11:00" },
];

const statusConfig = {
  paid: { label: "Pago", class: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pendente", class: "bg-warning/10 text-warning border-warning/20" },
  cancelled: { label: "Cancelado", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Receita do Mês"
          value="R$ 7.400"
          change="+12% em relação ao mês anterior"
          changeType="positive"
          icon={DollarSign}
          variant="primary"
        />
        <StatCard
          title="Saldo Atual"
          value="R$ 4.000"
          change="+8% em relação ao mês anterior"
          changeType="positive"
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Sessões no Mês"
          value="27"
          change="Meta: 30 sessões"
          changeType="neutral"
          icon={Calendar}
          variant="secondary"
        />
        <StatCard
          title="Clientes Ativos"
          value="18"
          change="+3 novos este mês"
          changeType="positive"
          icon={Users}
          variant="default"
        />
      </div>

      {/* Motivational Card */}
      <Card className="border-2 border-primary/20 bg-gradient-primary text-white shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90 mb-1">💡 Você está quase lá!</p>
              <p className="text-2xl font-bold">Você atingiu 90% da sua meta mensal</p>
              <p className="text-sm opacity-90 mt-2">Apenas 3 sessões para completar sua meta. Continue assim!</p>
            </div>
            <div className="hidden lg:block">
              <div className="text-6xl font-bold opacity-20">90%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="shadow-md hover-glow">
          <CardHeader>
            <CardTitle>Receitas vs Despesas</CardTitle>
            <p className="text-sm text-muted-foreground">Evolução mensal em 2024</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="Receita"
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="despesas"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={3}
                  name="Despesas"
                  dot={{ fill: "hsl(var(--destructive))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sessions Chart */}
        <Card className="shadow-md hover-glow">
          <CardHeader>
            <CardTitle>Sessões da Semana</CardTitle>
            <p className="text-sm text-muted-foreground">Distribuição semanal</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="dia" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar 
                  dataKey="sessoes" 
                  fill="hsl(var(--secondary))" 
                  radius={[8, 8, 0, 0]}
                  name="Sessões"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Próximas Sessões</CardTitle>
          <p className="text-sm text-muted-foreground">Agendamentos recentes e próximos</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold shadow-md">
                    {client.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">{client.date}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[client.status as keyof typeof statusConfig].class}`}>
                    {statusConfig[client.status as keyof typeof statusConfig].label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
