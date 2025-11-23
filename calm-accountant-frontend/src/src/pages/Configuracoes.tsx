import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Lock, Palette, Globe, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { apiRequest } from "../api/api";
import { endpoints } from "../api/endpoints";



export default function Configuracoes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("psifinance_auth");
    toast.success("Você saiu com sucesso!");
    navigate("/auth");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie suas preferências e conta</p>
      </div>

      {/* Profile Settings */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Perfil</CardTitle>
          </div>
          <CardDescription>Atualize suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=psychologist" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">Alterar foto</Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG ou GIF. Máximo 2MB.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" defaultValue="Dra. Rosa Santos" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="rosa.santos@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crp">CRP</Label>
              <Input id="crp" defaultValue="06/123456" />
            </div>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button className="bg-gradient-primary">Salvar alterações</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notificações</CardTitle>
          </div>
          <CardDescription>Configure como você deseja ser notificada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações por email</Label>
              <p className="text-sm text-muted-foreground">
                Receba atualizações sobre pagamentos e sessões
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lembretes de sessões</Label>
              <p className="text-sm text-muted-foreground">
                Lembrete 1 hora antes de cada sessão
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações de pagamento</Label>
              <p className="text-sm text-muted-foreground">
                Alerta quando receber um pagamento
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Resumo semanal</Label>
              <p className="text-sm text-muted-foreground">
                Receba um resumo toda segunda-feira
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Segurança</CardTitle>
          </div>
          <CardDescription>Gerencie a segurança da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha atual</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar nova senha</Label>
            <Input id="confirm-password" type="password" />
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button className="bg-gradient-primary">Alterar senha</Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle>Aparência</CardTitle>
          </div>
          <CardDescription>Personalize a interface do aplicativo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modo escuro automático</Label>
              <p className="text-sm text-muted-foreground">
                Ativa automaticamente com base no horário
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Idioma e Região</CardTitle>
          </div>
          <CardDescription>Configure idioma e formato de moeda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Input id="language" defaultValue="Português (Brasil)" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Moeda</Label>
            <Input id="currency" defaultValue="Real (R$)" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Logout Section */}
      <Card className="shadow-md border-destructive/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-destructive" />
            <CardTitle>Sair da conta</CardTitle>
          </div>
          <CardDescription>Desconecte-se do aplicativo</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="w-full md:w-auto"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
