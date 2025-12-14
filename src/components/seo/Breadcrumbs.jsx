import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Home } from "lucide-react";

/**
 * Breadcrumbs Component - Melhora UX e SEO
 * Exibe navegação hierárquica da página atual
 */
export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link 
            to={createPageUrl("Home")} 
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
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
          
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li 
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
                className={isLast ? "text-gray-900 font-medium" : ""}
              >
                {isLast ? (
                  <>
                    <span itemProp="name">{item.label}</span>
                    <meta itemProp="position" content={position.toString()} />
                  </>
                ) : (
                  <Link 
                    to={createPageUrl(item.page)} 
                    className="hover:text-gray-900 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
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