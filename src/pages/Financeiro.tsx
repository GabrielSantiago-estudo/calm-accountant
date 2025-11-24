import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../api/api";
import { endpoints } from "../api/endpoints";


const transactions = [
  { id: 1, type: "income", description: "Sessão - Maria Silva", value: "R$ 200,00", date: "14/10/2024", status: "completed" },
  { id: 2, type: "income", description: "Sessão - João Santos", value: "R$ 200,00", date: "15/10/2024", status: "pending" },
  { id: 3, type: "expense", description: "Aluguel consultório", value: "R$ 800,00", date: "10/10/2024", status: "completed" },
  { id: 4, type: "income", description: "Sessão - Ana Costa", value: "R$ 350,00", date: "16/10/2024", status: "completed" },
  { id: 5, type: "expense", description: "Material de escritório", value: "R$ 150,00", date: "12/10/2024", status: "completed" },
];

const monthlyGoal = 10000;
const currentRevenue = 7400;
const progressPercentage = (currentRevenue / monthlyGoal) * 100;

export default function Financeiro() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
          <p className="text-muted-foreground">Controle suas receitas e despesas</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Exportar CSV</Button>
          <Button className="bg-gradient-primary shadow-md hover:shadow-lg">
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-2 border-primary/20 bg-primary-light shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Receita Total
                </p>
                <p className="text-3xl font-bold text-primary">R$ 7.400</p>
                <p className="text-sm text-muted-foreground mt-1">Este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-destructive/20 bg-destructive/5 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Despesas
                </p>
                <p className="text-3xl font-bold text-destructive">R$ 3.400</p>
                <p className="text-sm text-muted-foreground mt-1">Este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20 bg-success/5 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Saldo Líquido
                </p>
                <p className="text-3xl font-bold text-success">R$ 4.000</p>
                <p className="text-sm text-muted-foreground mt-1">Este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal Progress */}
      <Card className="border-2 border-primary/20 bg-gradient-soft shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meta Mensal</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Objetivo: R$ {monthlyGoal.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{progressPercentage.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground">
                R$ {currentRevenue.toLocaleString("pt-BR")} alcançados
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>R$ 0</span>
            <span>R$ {(monthlyGoal / 2).toLocaleString("pt-BR")}</span>
            <span>R$ {monthlyGoal.toLocaleString("pt-BR")}</span>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Transações</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Últimas movimentações financeiras
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <PieChart className="h-4 w-4 mr-2" />
              Ver análise
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      transaction.type === "income" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} {transaction.value}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        transaction.status === "completed"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }`}
                    >
                      {transaction.status === "completed" ? "Concluído" : "Pendente"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
