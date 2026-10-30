import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ECOSYSTEM_LINKS } from "@shared/ui/EcosystemHub";
import {
  Calendar,
  CalendarCheck,
  ChevronDown,
  Compass,
  ConciergeBell,
  Disc3,
  Menu,
  Music,
  Newspaper,
} from "lucide-react";

const NAV_LINKS = [
  { label: "ETHOS", page: "Ethos", Icon: Compass },
  { label: "EVENTOS", page: "Eventos", Icon: Calendar },
  { label: "CURADORIA", page: "Curadoria", Icon: Newspaper },
  { label: "COTAÇÃO", page: "Cotacao", Icon: CalendarCheck },
  { label: "DISCOS", page: "Discografia", Icon: Disc3 },
  { label: "LOCAÇÃO DE SOM", page: "LocacaoSom", Icon: Music },
  { label: "CONCIERGE", page: "Concierge", Icon: ConciergeBell },
];

const LINK_CLASS =
  "min-h-[44px] whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium tracking-wide text-[#F2DEC4] transition-all duration-200 hover:bg-white/10 hover:text-white";

/**
 * Navegação principal. Em telas largas mostra os links; quando logo + links + CTA
 * não cabem, recolhe tudo no menu lateral. Nunca comprime logo nem fonte.
 */
export default function MainNav() {
  const [aberto, setAberto] = useState(false);
  const ecossistema = ECOSYSTEM_LINKS.filter((item) => !item.current);

  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-0.5 xl:flex">
        {NAV_LINKS.map(({ label, page }) => (
          <Button key={page} asChild variant="ghost" size="sm" className={LINK_CLASS}>
            <Link to={createPageUrl(page)}>{label}</Link>
          </Button>
        ))}
        {ecossistema.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className={"inline-flex items-center gap-1 " + LINK_CLASS}>
                ECOSSISTEMA
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {ecossistema.map((item) => (
                <DropdownMenuItem key={item.id} asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>

      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-label="Abrir menu de navegação"
        aria-haspopup="dialog"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#F2DEC4] transition-colors hover:bg-white/10 hover:text-white xl:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <Sheet open={aberto} onOpenChange={setAberto}>
        <SheetContent
          side="right"
          className="z-[10000] w-[86vw] max-w-sm overflow-y-auto border-white/10 p-0 text-[#F2DEC4]"
          style={{ backgroundColor: "var(--toca-obsidiana)" }}
        >
          <SheetHeader className="border-b border-white/10 px-5 py-4 text-left">
            <SheetTitle className="text-sm font-bold tracking-[0.2em] text-[#F2DEC4]">
              MENU
            </SheetTitle>
          </SheetHeader>
          <nav aria-label="Principal (menu)" className="flex flex-col px-2 py-3">
            {NAV_LINKS.map(({ label, page, Icon }) => (
              <Link
                key={page}
                to={createPageUrl(page)}
                onClick={() => setAberto(false)}
                className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 text-sm font-semibold tracking-wide text-[#F2DEC4] hover:bg-white/10"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          {ecossistema.length > 0 && (
            <div className="border-t border-white/10 px-2 py-3">
              <p className="px-3 pb-2 text-[11px] font-bold tracking-[0.2em] text-[#F2DEC4]/60">
                ECOSSISTEMA
              </p>
              <div className="flex flex-col">
                {ecossistema.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setAberto(false)}
                    aria-label={`${item.name} (abre em nova aba)`}
                    className="flex min-h-[48px] items-center rounded-xl px-3 text-sm font-semibold text-[#F2DEC4] hover:bg-white/10"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/10 px-5 py-4">
            <Link
              to={createPageUrl("Cotacao")}
              onClick={() => setAberto(false)}
              className="flex min-h-[48px] items-center justify-center rounded-full px-4 text-sm font-bold"
              style={{ backgroundColor: "var(--ds-color-action)", color: "var(--ds-color-on-action)" }}
            >
              Solicitar proposta
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}