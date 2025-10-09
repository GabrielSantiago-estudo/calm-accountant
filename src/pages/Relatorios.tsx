import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthlyData = [
  { month: "Jan", receita: 4200, sessoes: 21 },
  { month: "Fev", receita: 5100, sessoes: 25 },
  { month: "Mar", receita: 4800, sessoes: 24 },
  { month: "Abr", receita: 6200, sessoes: 31 },
  { month: "Mai", receita: 5800, sessoes: 29 },
  { month: "Jun", receita: 7400, sessoes: 37 },
];

const sessionTypeData = [
  { name: "Individual", value: 65, color: "hsl(var(--primary))" },
  { name: "Casal", value: 25, color: "hsl(var(--secondary))" },
  { name: "Família", value: 10, color: "hsl(var(--accent))" },
];

const clientRetention = [
  { month: "Jan", novos: 3, retidos: 15 },
  { month: "Fev", novos: 5, retidos: 18 },
  { month: "Mar", novos: 2, retidos: 19 },
  { month: "Abr", novos: 6, retidos: 21 },
  { month: "Mai", novos: 4, retidos: 22 },
  { month: "Jun", novos: 5, retidos: 25 },
];

export default function Relatorios() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <p className="text-muted-foreground">Análise detalhada do seu desempenho</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[140px]">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-2 border-primary/20 bg-primary-light">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Média Mensal
            </p>
            <p className="text-4xl font-bold text-primary">R$ 5.583</p>
            <p className="text-xs text-muted-foreground mt-2">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/20 bg-secondary-light">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Total de Sessões
            </p>
            <p className="text-4xl font-bold text-secondary">167</p>
            <p className="text-xs text-muted-foreground mt-2">Em 2024</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20 bg-success/5">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Taxa de Retenção
            </p>
            <p className="text-4xl font-bold text-success">89%</p>
            <p className="text-xs text-muted-foreground mt-2">Clientes ativos</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20 bg-accent/5">
          <CardContent className="p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Ticket Médio
            </p>
            <p className="text-4xl font-bold text-accent">R$ 225</p>
            <p className="text-xs text-muted-foreground mt-2">Por sessão</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue & Sessions Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Receita e Sessões</CardTitle>
            <p className="text-sm text-muted-foreground">Evolução mensal em 2024</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
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
                  name="Receita (R$)"
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="sessoes"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  name="Sessões"
                  dot={{ fill: "hsl(var(--secondary))", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Session Types Pie Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Distribuição de Sessões</CardTitle>
            <p className="text-sm text-muted-foreground">Por tipo de atendimento</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sessionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Retention Chart */}
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Novos Clientes vs Retenção</CardTitle>
            <p className="text-sm text-muted-foreground">Acompanhamento mensal</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientRetention}>
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
                <Bar 
                  dataKey="novos" 
                  fill="hsl(var(--primary))" 
                  radius={[8, 8, 0, 0]}
                  name="Novos Clientes"
                />
                <Bar 
                  dataKey="retidos" 
                  fill="hsl(var(--secondary))" 
                  radius={[8, 8, 0, 0]}
                  name="Clientes Retidos"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights Card */}
      <Card className="border-2 border-success/20 bg-gradient-soft shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💡 Insights Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-primary-light border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">📈 Crescimento Consistente</h4>
              <p className="text-sm text-muted-foreground">
                Sua receita cresceu 76% em relação a janeiro. Continue assim!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary-light border border-secondary/20">
              <h4 className="font-semibold text-secondary mb-2">🎯 Meta Próxima</h4>
              <p className="text-sm text-muted-foreground">
                Você está a apenas 3 sessões da sua meta mensal. Ótimo trabalho!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <h4 className="font-semibold text-success mb-2">⭐ Alta Retenção</h4>
              <p className="text-sm text-muted-foreground">
                89% dos seus clientes continuam ativos. Isso é excelente!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <h4 className="font-semibold text-warning mb-2">💰 Oportunidade</h4>
              <p className="text-sm text-muted-foreground">
                Considere aumentar sessões em casal - ticket 75% maior.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
