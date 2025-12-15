import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Ticket } from "lucide-react";
import TicketSelector from "./TicketSelector";
import CheckoutModal from "./CheckoutModal";

export default function TicketButton({ evento, variant = "default", className = "" }) {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  const handleSelectTickets = (ticketSelection) => {
    setSelection(ticketSelection);
    setSelectorOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      <Button 
        onClick={() => setSelectorOpen(true)}
        variant={variant}
        className={className}
      >
        <Ticket className="w-4 h-4 mr-2" />
        Comprar Ingresso
      </Button>

      {/* Modal de Seleção */}
      <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
        <DialogContent className="bg-gray-900 border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <TicketSelector 
            eventoId={evento.id} 
            onSelect={handleSelectTickets}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de Checkout */}
      {selection && (
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => {
            setCheckoutOpen(false);
            setSelection(null);
          }}
          evento={evento}
          selection={selection}
        />
      )}
    </>
  );
}