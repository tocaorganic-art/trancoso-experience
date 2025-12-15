import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { CreditCard, QrCode, Loader2, CheckCircle2, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutModal({ isOpen, onClose, evento, selection }) {
  const [step, setStep] = useState(1); // 1: Dados, 2: Pagamento, 3: Confirmação
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isProcessing, setIsProcessing] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  const handleSubmitDados = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefone) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Gerar código único da reserva
      const codigo = `RES${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Criar reservas para cada tipo de ingresso
      const reservations = await Promise.all(
        selection.tickets.map(async (item) => {
          return await base44.entities.Reservation.create({
            evento_id: evento.id,
            ticket_id: item.ticket.id,
            user_email: formData.email,
            user_nome: formData.nome,
            user_telefone: formData.telefone,
            quantidade: item.quantidade,
            valor_total: item.subtotal,
            status: paymentMethod === "pix" ? "pendente" : "confirmado",
            codigo_reserva: codigo,
            payment_method: paymentMethod,
            expira_em: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutos
          });
        })
      );

      // Atualizar quantidade vendida dos tickets
      await Promise.all(
        selection.tickets.map(async (item) => {
          const novaQtdVendida = (item.ticket.quantidade_vendida || 0) + item.quantidade;
          return await base44.entities.Ticket.update(item.ticket.id, {
            quantidade_vendida: novaQtdVendida
          });
        })
      );

      setReservationCode(codigo);
      setStep(3);
      
      toast.success("Reserva criada com sucesso!");
      
      // Enviar email de confirmação (se tiver integração)
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            nome: formData.nome,
            codigo,
            evento: evento.nome,
            total: selection.total
          })
        });
      } catch (err) {
        console.log("Email não enviado:", err);
      }
      
    } catch (error) {
      console.error("Erro ao processar reserva:", error);
      toast.error("Erro ao processar reserva. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ nome: "", email: "", telefone: "", cpf: "" });
    setReservationCode("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 1 && "Seus Dados"}
            {step === 2 && "Pagamento"}
            {step === 3 && "Confirmação"}
          </DialogTitle>
        </DialogHeader>

        {/* Resumo do Pedido - Sempre visível */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <h4 className="font-bold mb-2">{evento.nome}</h4>
            <div className="space-y-1 text-sm text-gray-400">
              {selection.tickets.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.quantidade}x {item.ticket.nome}</span>
                  <span>R$ {item.subtotal.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-white/10">
                <span>Total</span>
                <span>R$ {selection.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Dados */}
        {step === 1 && (
          <form onSubmit={handleSubmitDados} className="space-y-4">
            <div>
              <Label className="text-gray-300">Nome Completo *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="bg-white/5 border-white/20 text-white pl-10"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">E-mail *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/5 border-white/20 text-white pl-10"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Telefone/WhatsApp *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="bg-white/5 border-white/20 text-white pl-10"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">CPF (opcional)</Label>
              <Input
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                className="bg-white/5 border-white/20 text-white"
                placeholder="000.000.000-00"
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Continuar
            </Button>
          </form>
        )}

        {/* Step 2: Pagamento */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label className="text-gray-300 mb-3 block">Método de Pagamento</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <Card className="bg-white/5 border-white/20 mb-3 cursor-pointer hover:bg-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                        <QrCode className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="font-semibold">PIX</p>
                          <p className="text-xs text-gray-400">Pagamento instantâneo</p>
                        </div>
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20 cursor-pointer hover:bg-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cartao" id="cartao" />
                      <Label htmlFor="cartao" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="font-semibold">Cartão de Crédito</p>
                          <p className="text-xs text-gray-400">Aprovação imediata</p>
                        </div>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Voltar
              </Button>
              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>Confirmar Reserva</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmação */}
        {step === 3 && (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Reserva Confirmada!</h3>
            <p className="text-gray-400 mb-6">Seus ingressos foram reservados com sucesso</p>

            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 mb-6">
              <CardContent className="p-6">
                <p className="text-sm text-gray-300 mb-2">Código da Reserva</p>
                <p className="text-3xl font-bold text-white tracking-wider">{reservationCode}</p>
              </CardContent>
            </Card>

            <div className="text-left bg-white/5 rounded-lg p-4 mb-6">
              <h4 className="font-bold mb-3">Próximos Passos:</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Você receberá um e-mail com os detalhes da reserva em <strong className="text-white">{formData.email}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Guarde o código da reserva para consultas futuras</span>
                </li>
                {paymentMethod === "pix" && (
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Complete o pagamento via PIX em até 30 minutos</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Apresente seu QR Code na entrada do evento</span>
                </li>
              </ul>
            </div>

            <Button onClick={handleClose} className="w-full bg-purple-600 hover:bg-purple-700">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}