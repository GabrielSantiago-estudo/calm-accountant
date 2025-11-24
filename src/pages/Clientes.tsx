import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, X } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const clients = [
  { id: 1, name: "Maria Silva", type: "Individual", value: "R$ 200", status: "paid", date: "10/10/2024" },
  { id: 2, name: "João Santos", type: "Individual", value: "R$ 200", status: "pending", date: "12/10/2024" },
  { id: 3, name: "Ana Costa", type: "Casal", value: "R$ 350", status: "paid", date: "15/10/2024" },
  { id: 4, name: "Carlos Mendes", type: "Individual", value: "R$ 200", status: "paid", date: "16/10/2024" },
  { id: 5, name: "Beatriz Alves", type: "Família", value: "R$ 400", status: "pending", date: "18/10/2024" },
  { id: 6, name: "Fernanda Lima", type: "Casal", value: "R$ 350", status: "paid", date: "05/10/2024" },
  { id: 7, name: "Roberto Souza", type: "Individual", value: "R$ 200", status: "pending", date: "08/10/2024" },
];

const statusConfig = {
  paid: { label: "Pago", class: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pendente", class: "bg-warning/10 text-warning border-warning/20" },
};

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || client.status === filterStatus;
      const matchesType = filterType === "all" || client.type === filterType;
      const matchesDate = !filterDate || client.date.includes(filterDate);
      
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [searchTerm, filterStatus, filterType, filterDate]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterStatus !== "all") count++;
    if (filterType !== "all") count++;
    if (filterDate) count++;
    return count;
  }, [filterStatus, filterType, filterDate]);

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterType("all");
    setFilterDate("");
  };

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
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 relative">
                  <Filter className="h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 px-2 py-0 h-5 min-w-5 bg-primary text-primary-foreground">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Filtros</h4>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-8 px-2 text-xs"
                      >
                        Limpar
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Status de Pagamento</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="paid">Pago</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Sessão</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Casal">Casal</SelectItem>
                        <SelectItem value="Família">Família</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      placeholder="Filtrar por data"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filterStatus !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Status: {statusConfig[filterStatus as keyof typeof statusConfig]?.label}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setFilterStatus("all")}
                  />
                </Badge>
              )}
              {filterType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Tipo: {filterType}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setFilterType("all")}
                  />
                </Badge>
              )}
              {filterDate && (
                <Badge variant="secondary" className="gap-1">
                  Data: {new Date(filterDate).toLocaleDateString('pt-BR')}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setFilterDate("")}
                  />
                </Badge>
              )}
            </div>
          )}
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
