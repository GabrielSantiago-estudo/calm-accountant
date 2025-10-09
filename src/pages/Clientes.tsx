import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const clients = [
  { id: 1, name: "Maria Silva", type: "Individual", value: "R$ 200", status: "paid", date: "10/10/2024" },
  { id: 2, name: "João Santos", type: "Individual", value: "R$ 200", status: "pending", date: "12/10/2024" },
  { id: 3, name: "Ana Costa", type: "Casal", value: "R$ 350", status: "paid", date: "15/10/2024" },
  { id: 4, name: "Carlos Mendes", type: "Individual", value: "R$ 200", status: "paid", date: "16/10/2024" },
  { id: 5, name: "Beatriz Alves", type: "Família", value: "R$ 400", status: "pending", date: "18/10/2024" },
];

const statusConfig = {
  paid: { label: "Pago", class: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pendente", class: "bg-warning/10 text-warning border-warning/20" },
};

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">Gerencie seus clientes e sessões</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-md hover:shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha as informações do cliente abaixo
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Nome completo</Label>
                <Input id="client-name" placeholder="Maria Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input id="client-email" type="email" placeholder="maria@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Telefone</Label>
                <Input id="client-phone" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-type">Tipo de sessão</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="casal">Casal</SelectItem>
                    <SelectItem value="familia">Família</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-value">Valor da sessão</Label>
                <Input id="session-value" placeholder="R$ 200,00" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-gradient-primary">
                  Adicionar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo de Sessão</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold shadow-md text-sm">
                        {client.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell>{client.type}</TableCell>
                  <TableCell className="font-medium">{client.value}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[client.status as keyof typeof statusConfig].class}`}>
                      {statusConfig[client.status as keyof typeof statusConfig].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{client.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
