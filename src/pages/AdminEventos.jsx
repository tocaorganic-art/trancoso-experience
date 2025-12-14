import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, AlertTriangle, CheckCircle, Filter, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AdminEventos() {
  const [showDuplicates, setShowDuplicates] = useState(false);
  const queryClient = useQueryClient();

  // IDs dos eventos aprovados do Ayumar
  const APPROVED_EVENT_IDS = [
    "693ee3de467625fa81c8185f", // PACOTE
    "693ee3de467625fa81c81860", // Wesley Safadão
    "693ee3de467625fa81c81861", // Jorge & Mateus
    "693ee3de467625fa81c81862", // Bell Marques
    "693ee3de467625fa81c81863"  // Grupo Benzadeus
  ];

  const { data: eventos = [], isLoading } = useQuery({
    queryKey: ['admin-eventos'],
    queryFn: async () => {
      return await base44.entities.EventoAnoNovo.list('-created_date', 500);
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) => {
      return await base44.entities.EventoAnoNovo.update(eventId, { is_deleted: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-eventos'] });
      toast.success('Evento excluído com sucesso');
    }
  });

  const deleteAllDuplicatesMutation = useMutation({
    mutationFn: async (eventIds) => {
      const promises = eventIds.map(id => 
        base44.entities.EventoAnoNovo.update(id, { is_deleted: true })
      );
      return await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-eventos'] });
      toast.success('Eventos duplicados excluídos');
    }
  });

  // Função para detectar duplicados
  const detectDuplicates = () => {
    const duplicates = [];
    const seen = new Map();

    eventos.forEach(evento => {
      if (evento.data?.is_deleted) return;
      
      const key = `${evento.data.nome}-${evento.data.data}-${evento.data.localidade}`;
      
      if (seen.has(key)) {
        duplicates.push({
          ...evento,
          isDuplicate: true,
          duplicateOf: seen.get(key)
        });
      } else {
        seen.set(key, evento.id);
      }
    });

    return duplicates;
  };

  // Função para detectar eventos irrelevantes (não Ayumar)
  const detectIrrelevant = () => {
    return eventos.filter(evento => {
      if (evento.data?.is_deleted) return false;
      if (APPROVED_EVENT_IDS.includes(evento.id)) return false;
      
      // Se não é um dos aprovados, é considerado irrelevante
      return true;
    });
  };

  const duplicates = detectDuplicates();
  const irrelevant = detectIrrelevant();
  const activeEvents = eventos.filter(e => !e.data?.is_deleted);
  const deletedEvents = eventos.filter(e => e.data?.is_deleted);

  const handleDeleteAll = () => {
    if (window.confirm(`Deseja realmente excluir ${irrelevant.length} eventos não aprovados?`)) {
      deleteAllDuplicatesMutation.mutate(irrelevant.map(e => e.id));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-white text-center">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gerenciamento de Eventos</h1>
            <p className="text-gray-400">Gerencie eventos duplicados e irrelevantes</p>
          </div>
          <Link to={createPageUrl("Home")}>
            <Button variant="outline" className="bg-gray-800 text-white border-gray-700">
              Voltar ao Site
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Total de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{eventos.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Eventos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{activeEvents.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Duplicados Detectados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{duplicates.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Não Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{irrelevant.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        {irrelevant.length > 0 && (
          <Card className="bg-red-900/20 border-red-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Ação Necessária
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Existem {irrelevant.length} eventos não aprovados (não fazem parte do Réveillon Ayumar oficial).
              </p>
              <Button
                onClick={handleDeleteAll}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={deleteAllDuplicatesMutation.isPending}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleteAllDuplicatesMutation.isPending ? 'Excluindo...' : `Excluir Todos (${irrelevant.length})`}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Approved Events */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Eventos Aprovados (Réveillon Ayumar)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventos
                .filter(e => APPROVED_EVENT_IDS.includes(e.id) && !e.data?.is_deleted)
                .map(evento => (
                  <div key={evento.id} className="bg-gray-900/50 rounded-lg p-4 border border-green-700/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{evento.data.nome}</h3>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>📅 {new Date(evento.data.data).toLocaleDateString('pt-BR')}</div>
                          <div>📍 {evento.data.local}</div>
                        </div>
                      </div>
                      <Badge className="bg-green-700 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Aprovado
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Unapproved Events */}
        {irrelevant.length > 0 && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Eventos Não Aprovados ({irrelevant.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {irrelevant.map(evento => (
                  <div key={evento.id} className="bg-gray-900/50 rounded-lg p-4 border border-red-700/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{evento.data.nome}</h3>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>📅 {new Date(evento.data.data).toLocaleDateString('pt-BR')}</div>
                          <div>📍 {evento.data.local}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteEventMutation.mutate(evento.id)}
                        disabled={deleteEventMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deleted Events */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-gray-500" />
              Eventos Excluídos ({deletedEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deletedEvents.length === 0 ? (
              <p className="text-gray-400">Nenhum evento excluído</p>
            ) : (
              <div className="text-sm text-gray-400">
                {deletedEvents.length} eventos foram excluídos
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}