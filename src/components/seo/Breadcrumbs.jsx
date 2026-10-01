import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Home } from "lucide-react";

/**
 * Breadcrumbs Component - Melhora UX e SEO
 * Exibe navegação hierárquica da página atual
 */
export default function Breadcrumbs({ items, dark = false }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Você está em" className="py-4">
      <ol className={"flex items-center gap-2 text-sm " + (dark ? "text-[#E4D5BE]" : "text-gray-600")} itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link 
            to={createPageUrl("Home")} 
            className={"flex items-center gap-1 transition-colors " + (dark ? "hover:text-white" : "hover:text-gray-900")}
            itemProp="item"
          >
            <Home className="w-4 h-4" />
            <span itemProp="name">Início</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;
          // Aceita { page } (nome de página) ou { href } (caminho completo). Sem destino, não vira link.
          const target = item.href || (item.page ? createPageUrl(item.page) : null);
          
          return (
            <React.Fragment key={index}>
              <li 
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
                className={"flex items-center gap-2 " + (isLast ? (dark ? "text-white font-medium" : "text-gray-900 font-medium") : "")}
              >
                <ChevronRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
                {isLast ? (
                  <>
                    <span itemProp="name">{item.label}</span>
                    <meta itemProp="position" content={position.toString()} />
                  </>
                ) : target ? (
                  <Link 
                    to={target} 
                    className={dark ? "hover:text-white transition-colors underline-offset-4 hover:underline" : "hover:text-gray-900 transition-colors"}
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span itemProp="name">{item.label}</span>
                )}
                <meta itemProp="position" content={position.toString()} />
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}