import { useEffect } from "react";

/**
 * DynamicOpenGraph - Atualiza meta tags Open Graph dinamicamente
 * Para uso em páginas individuais de eventos
 */
export default function DynamicOpenGraph({ 
  title, 
  description, 
  image, 
  url,
  type = "article" 
}) {
  useEffect(() => {
    if (!title) return;

    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: url || window.location.href },
      { property: "og:type", content: type },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image }
    ];

    metaTags.forEach(tag => {
      const attr = tag.property ? 'property' : 'name';
      const value = tag.property || tag.name;
      let metaTag = document.querySelector(`meta[${attr}="${value}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attr, value);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Update document title
    if (title) {
      document.title = title;
    }

    // Cleanup function to prevent memory leaks
    return () => {
      // Meta tags can stay as they'll be updated on next navigation
    };
  }, [title, description, image, url, type]);

  return null; // This component doesn't render anything
}