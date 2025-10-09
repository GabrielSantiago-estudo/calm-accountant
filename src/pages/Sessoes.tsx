import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sessions = [
  {
    id: 1,
    client: "Maria Silva",
    date: "Segunda, 14 Out",
    time: "14:00",
    type: "Individual",
    status: "confirmed",
  },
  {
    id: 2,
    client: "João Santos",
    date: "Terça, 15 Out",
    time: "10:00",
    type: "Individual",
    status: "pending",
  },
  {
    id: 3,
    client: "Ana Costa",
    date: "Quarta, 16 Out",
    time: "16:00",
    type: "Casal",
    status: "confirmed",
  },
  {
    id: 4,
    client: "Carlos Mendes",
    date: "Quinta, 17 Out",
    time: "11:00",
    type: "Individual",
    status: "cancelled",
  },
  {
    id: 5,
    client: "Beatriz Alves",
    date: "Sexta, 18 Out",
    time: "15:00",
    type: "Família",
    status: "confirmed",
  },
];

const statusConfig = {
  confirmed: {
    label: "Confirmado",
    class: "bg-success/10 text-success border-success/20",
    dot: "bg-success",
  },
  pending: {
    label: "Pendente",
    class: "bg-warning/10 text-warning border-warning/20",
    dot: "bg-warning",
  },
  cancelled: {
    label: "Cancelado",
    class: "bg-destructive/10 text-destructive border-destructive/20",
    dot: "bg-destructive",
  },
};

export default function Sessoes() {
  const [filter, setFilter] = useState("all");

  const filteredSessions = filter === "all"
    ? sessions
    : sessions.filter(s => s.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sessões</h2>
          <p className="text-muted-foreground">Gerencie seus agendamentos</p>
        </div>
        <div className="flex gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="confirmed">Confirmados</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-primary shadow-md hover:shadow-lg">
            Nova Sessão
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-2 border-success/20 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Confirmadas
                </p>
                <p className="text-3xl font-bold text-success">3</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-warning/20 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Pendentes
                </p>
                <p className="text-3xl font-bold text-warning">1</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Canceladas
                </p>
                <p className="text-3xl font-bold text-destructive">1</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <User className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <div className="grid gap-4">
        {filteredSessions.map((session) => (
          <Card
            key={session.id}
            className="shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover-glow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Status Indicator */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        statusConfig[session.status as keyof typeof statusConfig].dot
                      }`}
                    />
                  </div>

                  {/* Client Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold shadow-md">
                    {session.client.split(" ").map(n => n[0]).join("")}
                  </div>

                  {/* Session Info */}
                  <div>
                    <h3 className="font-semibold text-lg">{session.client}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.time}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {session.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
                      statusConfig[session.status as keyof typeof statusConfig].class
                    }`}
                  >
                    {statusConfig[session.status as keyof typeof statusConfig].label}
                  </span>
                  <Button variant="ghost" size="sm">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
