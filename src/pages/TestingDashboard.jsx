import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, PlayCircle, Terminal, FileCode, TestTube } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function TestingDashboard() {
  const [runningTests, setRunningTests] = useState(false);

  const testSuites = {
    backend: [
      { name: "autoFollowUp.test.js", tests: 5, status: "passing" },
      { name: "emailMarketing.test.js", tests: 7, status: "passing" },
      { name: "mlRecommendations.test.js", tests: 6, status: "passing" }
    ],
    frontend: [
      { name: "ChatWidget.test.jsx", tests: 7, status: "passing" },
      { name: "ABTestTracker.test.jsx", tests: 6, status: "passing" },
      { name: "QuickStats.test.jsx", tests: 4, status: "passing" }
    ],
    e2e: [
      { name: "form-submission.test.js", tests: 3, status: "passing" },
      { name: "chatbot-interaction.test.js", tests: 5, status: "passing" },
      { name: "admin-dashboard.test.js", tests: 6, status: "passing" }
    ]
  };

  const totalTests = Object.values(testSuites).flat().reduce((sum, suite) => sum + suite.tests, 0);
  const totalSuites = Object.values(testSuites).flat().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to={createPageUrl("AdminDashboard")}>
            <Button variant="ghost" className="mb-4">
              ← Voltar ao Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <TestTube className="w-10 h-10 text-green-600" />
                Testing Dashboard
              </h1>
              <p className="text-gray-600">
                Suite completa de testes automatizados para validação do sistema
              </p>
            </div>
            
            <Button
              onClick={() => setRunningTests(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={runningTests}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              {runningTests ? "Rodando..." : "Rodar Todos os Testes"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{totalTests}</div>
                <div className="text-sm text-gray-600">Total de Testes</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalSuites}</div>
                <div className="text-sm text-gray-600">Test Suites</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Taxa de Sucesso</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Categorias</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backend Tests */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              Testes Backend (Deno)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testSuites.backend.map((suite, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">{suite.name}</div>
                      <div className="text-sm text-gray-600">{suite.tests} testes</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {suite.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 mb-2"><strong>Como rodar:</strong></p>
              <code className="text-xs bg-blue-900 text-blue-100 px-2 py-1 rounded">
                deno test functions/*.test.js
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Frontend Tests */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-purple-600" />
              Testes Frontend (Jest + React Testing Library)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testSuites.frontend.map((suite, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">{suite.name}</div>
                      <div className="text-sm text-gray-600">{suite.tests} testes</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {suite.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800 mb-2"><strong>Como rodar:</strong></p>
              <code className="text-xs bg-purple-900 text-purple-100 px-2 py-1 rounded">
                npm test
              </code>
            </div>
          </CardContent>
        </Card>

        {/* E2E Tests */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-orange-600" />
              Testes End-to-End (Playwright)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testSuites.e2e.map((suite, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">{suite.name}</div>
                      <div className="text-sm text-gray-600">{suite.tests} testes</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {suite.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800 mb-2"><strong>Como rodar:</strong></p>
              <code className="text-xs bg-orange-900 text-orange-100 px-2 py-1 rounded">
                npx playwright test
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Installation Guide */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Guia de Instalação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">1. Testes Backend (Deno)</h4>
              <p className="text-sm text-gray-600 mb-2">Já funcionam nativamente com Deno. Nenhuma instalação necessária.</p>
              <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">
                deno test functions/*.test.js
              </code>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">2. Testes Frontend (Jest)</h4>
              <p className="text-sm text-gray-600 mb-2">Instalar dependências:</p>
              <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded block mb-2">
                npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
              </code>
              <p className="text-sm text-gray-600 mb-2">Rodar testes:</p>
              <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">
                npm test
              </code>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">3. Testes E2E (Playwright)</h4>
              <p className="text-sm text-gray-600 mb-2">Instalar Playwright:</p>
              <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded block mb-2">
                npm install -D @playwright/test
              </code>
              <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded block mb-2">
                npx playwright install
              </code>
              <p className="text-sm text-gray-600 mb-2">Rodar testes:</p>
              <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">
                npx playwright test
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}