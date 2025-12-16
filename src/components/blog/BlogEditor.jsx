import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Eye, Upload, X, Plus, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CATEGORIES = [
  { value: "afro_house", label: "Afro House" },
  { value: "organic_house", label: "Organic House" },
  { value: "casamentos", label: "Casamentos" },
  { value: "equipamentos", label: "Equipamentos" },
  { value: "eventos", label: "Eventos" },
  { value: "guias", label: "Guias" }
];

export default function BlogEditor({ post, onClose }) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    cover_image: post?.cover_image || "",
    category: post?.category || "afro_house",
    keywords: post?.keywords || [],
    meta_description: post?.meta_description || "",
    published: post?.published ?? false,
    featured: post?.featured ?? false,
    read_time: post?.read_time || 5
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const queryClient = useQueryClient();

  // Auto-generate slug
  useEffect(() => {
    if (formData.title && !post) {
      const slug = formData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, post]);

  // Calculate read time based on content
  useEffect(() => {
    const wordCount = formData.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    setFormData(prev => ({ ...prev, read_time: readTime }));
  }, [formData.content]);

  const saveMutation = useMutation({
    mutationFn: (data) => {
      if (post) {
        return base44.entities.BlogPost.update(post.id, data);
      }
      return base44.entities.BlogPost.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success(post ? 'Post atualizado!' : 'Post criado!');
      onClose();
    },
  });

  const handleSave = (publish = false) => {
    if (!formData.title || !formData.content) {
      toast.error('Preencha título e conteúdo');
      return;
    }

    saveMutation.mutate({ ...formData, published: publish });
  };

  const handleAddKeyword = () => {
    if (keywordInput && !formData.keywords.includes(keywordInput)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput]
      }));
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData(prev => ({ ...prev, cover_image: file_url }));
      toast.success('Imagem enviada!');
    } catch (error) {
      toast.error('Erro ao enviar imagem');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const generateSEO = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Preencha título e conteúdo primeiro');
      return;
    }

    setIsGeneratingSEO(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Com base neste post de blog sobre DJs e eventos de luxo em Trancoso:

Título: ${formData.title}
Categoria: ${formData.category}
Conteúdo: ${formData.content.substring(0, 500)}...

Gere:
1. Meta description otimizada (máximo 155 caracteres)
2. 8 palavras-chave relevantes para SEO (relacionadas a: DJs, Trancoso, ${formData.category}, eventos de luxo, Afro House, Organic House)
3. Excerpt atrativo (máximo 200 caracteres)

Foque em termos de busca long-tail e palavras-chave locais.`,
        response_json_schema: {
          type: "object",
          properties: {
            meta_description: { type: "string" },
            keywords: { type: "array", items: { type: "string" } },
            excerpt: { type: "string" }
          }
        }
      });

      setFormData(prev => ({
        ...prev,
        meta_description: result.meta_description,
        keywords: result.keywords,
        excerpt: result.excerpt
      }));

      toast.success('SEO gerado com IA!');
    } catch (error) {
      toast.error('Erro ao gerar SEO');
    } finally {
      setIsGeneratingSEO(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={saveMutation.isPending}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={saveMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo do Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Top 10 DJs de Afro House em Trancoso"
                    className="text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="top-10-djs-afro-house-trancoso"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /blog/{formData.slug}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Imagem de Capa</label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.cover_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                      placeholder="URL da imagem"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button variant="outline" disabled={isUploadingImage} asChild>
                        <span>
                          {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        </span>
                      </Button>
                    </label>
                  </div>
                  {formData.cover_image && (
                    <img src={formData.cover_image} alt="Preview" className="mt-2 w-full h-48 object-cover rounded" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Conteúdo *</label>
                  <div className="bg-white rounded border">
                    <ReactQuill
                      value={formData.content}
                      onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                      modules={modules}
                      theme="snow"
                      placeholder="Escreva seu conteúdo aqui..."
                      className="min-h-[400px]"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Tempo de leitura: ~{formData.read_time} min
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <label className="text-sm">Post em Destaque</label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">SEO</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={generateSEO}
                  disabled={isGeneratingSEO}
                  className="text-purple-600 border-purple-300"
                >
                  {isGeneratingSEO ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Breve resumo do post"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <Textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                    placeholder="Descrição para motores de busca"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.meta_description.length}/155 caracteres
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Palavras-chave</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Adicionar palavra-chave"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                    />
                    <Button size="sm" onClick={handleAddKeyword}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                        {keyword}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleRemoveKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}