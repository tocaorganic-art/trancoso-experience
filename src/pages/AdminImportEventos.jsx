import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, FileJson, FileSpreadsheet, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

function AdminImportEventosContent() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setPreview(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        let eventos = [];
        const content = event.target.result;

        if (uploadedFile.name.endsWith('.json')) {
          eventos = JSON.parse(content);
        } else if (uploadedFile.name.endsWith('.csv')) {
          // Parse CSV simples
          const lines = content.split('\n').filter(l => l.trim());
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          
          eventos = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const obj = {};
            headers.forEach((h, i) => obj[h] = values[i] || '');
            return obj;
          });
        }

        // Preview via backend
        const response = await base44.functions.invoke('importEventosCSV', {
          eventos,
          mode: 'preview'
        });

        setPreview(response.data);
        toast.success(`Preview: ${response.data.total} eventos válidos`);
      } catch (error) {
        toast.error('Erro ao processar arquivo: ' + error.message);
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleImport = async () => {
    if (!preview) return;

    setImporting(true);
    try {
      const response = await base44.functions.invoke('importEventosCSV', {
        eventos: preview.eventos.map(ev => ({
          EventName: ev.nome,
          Date: ev.data,
          Venue: ev.local,
          Description: ev.detalhes,
          PhotoURL: ev.imagem,
          Tags: ev.tags?.join(',')
        })),
        mode: 'import'
      });

      setResult(response.data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Erro na importação: ' + error.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <Link to={createPageUrl("AdminDashboard")}>
          <Button variant="ghost" className="text-white/70 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
          </Button>
        </Link>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Importar Eventos (CSV/JSON)
            </CardTitle>
            <p className="text-gray-400 text-sm mt-2">
              Faça upload do arquivo gerado pelo script Python/Playwright (events.csv ou events.json)
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Upload */}
            <div>
              <label className="block mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileJson className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm">Selecionar Arquivo</span>
                </div>
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-600 file:text-white
                    hover:file:bg-purple-700 cursor-pointer"
                />
              </label>
            </div>

            {/* Preview */}
            {preview && (
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    Preview: {preview.total} eventos
                  </h3>
                  <Button
                    onClick={handleImport}
                    disabled={importing}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {importing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirmar Importação
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {preview.eventos.slice(0, 10).map((ev, idx) => (
                    <div key={idx} className="bg-gray-800 rounded p-3 text-sm">
                      <p className="text-white font-medium">{ev.nome}</p>
                      <p className="text-gray-400 text-xs">
                        {ev.data} • {ev.local} • {ev.localidade}
                      </p>
                    </div>
                  ))}
                  {preview.eventos.length > 10 && (
                    <p className="text-gray-500 text-xs text-center">
                      ... e mais {preview.eventos.length - 10} eventos
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Importação Concluída
                </h3>
                <div className="text-white text-sm space-y-1">
                  <p>✅ Importados: {result.imported}</p>
                  <p>⏭️ Já existentes: {result.skipped}</p>
                  {result.errors && result.errors.length > 0 && (
                    <details className="mt-2">
                      <summary className="text-red-400 cursor-pointer">
                        ⚠️ {result.errors.length} erros
                      </summary>
                      <pre className="text-xs mt-2 bg-gray-900 p-2 rounded overflow-auto max-h-40">
                        {JSON.stringify(result.errors, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">📚 Instruções</h3>
              <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                <li>Execute o script Python: <code className="bg-gray-900 px-2 py-1 rounded">python extract_toca_events.py</code></li>
                <li>Faça upload do arquivo gerado (<code>events.csv</code> ou <code>events.json</code>)</li>
                <li>Revise o preview e clique em "Confirmar Importação"</li>
                <li>Eventos duplicados (mesmo nome + data) serão ignorados automaticamente</li>
              </ol>
            </div>

            {/* Script Download */}
            <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Script Python/Playwright
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Baixe o script fornecido e execute localmente para coletar eventos automaticamente.
              </p>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-600/10"
                onClick={() => {
                  const script = `# Ver mensagem anterior do desenvolvedor para script completo
# extract_toca_events.py com Playwright`;
                  const blob = new Blob([script], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'extract_toca_events.py';
                  a.click();
                }}
              >
                📥 Download Script Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminImportEventos() {
  return (
    <ProtectedRoute>
      <AdminImportEventosContent />
    </ProtectedRoute>
  );
}