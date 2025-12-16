import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import BlogEditor from "@/components/blog/BlogEditor";
import ThemeSuggestions from "@/components/blog/ThemeSuggestions";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AdminBlog() {
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['allBlogPosts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.BlogPost.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allBlogPosts'] });
      toast.success('Post excluído com sucesso');
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, published }) => base44.entities.BlogPost.update(id, { published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allBlogPosts'] });
      toast.success('Status atualizado');
    },
  });

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleNew = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleClose = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  if (showEditor) {
    return <BlogEditor post={editingPost} onClose={handleClose} />;
  }

  if (showSuggestions) {
    return <ThemeSuggestions onClose={() => setShowSuggestions(false)} onCreate={handleNew} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to={createPageUrl("Curadoria")}>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Curadoria
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Gerenciar Blog</h1>
            <p className="text-gray-600 mt-2">Crie e gerencie posts da Curadoria Toca</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowSuggestions(true)}
              variant="outline"
              className="bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Sugestões de Temas
            </Button>
            <Button onClick={handleNew} className="bg-gradient-to-r from-[#FFD700] to-[#40E0D0]">
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              <p className="text-gray-600 text-sm">Total de Posts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-green-600">{posts.filter(p => p.published).length}</p>
              <p className="text-gray-600 text-sm">Publicados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-orange-600">{posts.filter(p => !p.published).length}</p>
              <p className="text-gray-600 text-sm">Rascunhos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-purple-600">{posts.filter(p => p.featured).length}</p>
              <p className="text-gray-600 text-sm">Em Destaque</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      {post.featured && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                          Destaque
                        </Badge>
                      )}
                      <Badge variant="outline" className={post.published ? 'bg-green-50 text-green-700 border-green-300' : 'bg-gray-50 text-gray-700 border-gray-300'}>
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                    <div className="flex gap-2 flex-wrap">
                      {post.keywords?.slice(0, 5).map((keyword, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePublishMutation.mutate({ id: post.id, published: !post.published })}
                    >
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => {
                        if (confirm('Tem certeza que deseja excluir este post?')) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <p className="text-gray-500 mb-4">Nenhum post criado ainda</p>
              <Button onClick={handleNew}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}