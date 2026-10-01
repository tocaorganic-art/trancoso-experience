import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "../icons";

const isExternal = (href) => /^https?:\/\//i.test(href);

function Card({ item }) {
  const { Icon, title, description, href, featured } = item;
  const inner = (
    <>
      <span
        className="inline-flex h-12 w-12 items-center justify-center"
        style={{
          backgroundColor: "var(--ds-color-action)",
          color: "var(--ds-color-on-action)",
          borderRadius: "var(--ds-radius-md)",
        }}
      >
        {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
      </span>
      <h3
        className={"mt-5 font-medium " + (featured ? "text-3xl" : "text-2xl")}
        style={{ fontFamily: "var(--ds-font-editorial)", color: "var(--ds-color-text)" }}
      >
        {title}
      </h3>
      <p className="mt-2 flex-1 leading-relaxed" style={{ color: "var(--ds-color-text-muted)" }}>
        {description}
      </p>
      <span
        className="mt-6 inline-flex items-center gap-1 text-sm font-bold"
        style={{ color: "var(--ds-color-link)" }}
      >
        Conhecer
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </>
  );
  const classes =
    "group relative flex h-full flex-col border p-6 transition duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg " +
    (featured ? "sm:p-8 lg:col-span-2 " : "");
  const style = {
    backgroundColor: "var(--ds-color-surface)",
    borderColor: "var(--ds-color-border)",
    borderRadius: "var(--ds-radius-lg)",
  };
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${title} (abre em nova aba)`} className={classes} style={style}>
      {inner}
    </a>
  ) : (
    <Link to={href} className={classes} style={style}>
      {inner}
    </Link>
  );
}

/** Grade de serviços (bento): primeiro cartão pode ser destaque (`featured`) e ocupar 2 colunas. */
export default function ServiceGrid({ id, eyebrow, title, intro, items }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="py-20 sm:py-24"
      style={{ backgroundColor: "var(--ds-color-bg)" }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {eyebrow && (
          <p className="text-center text-xs font-bold tracking-[0.3em] md:text-left" style={{ color: "var(--ds-color-link)" }}>
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-titulo`}
          className="mt-3 text-center font-medium md:text-left"
          style={{ fontFamily: "var(--ds-font-editorial)", fontSize: "var(--ds-text-3xl)", color: "var(--ds-color-text)" }}
        >
          {title}
        </h2>
        {intro && (
          <p className="mx-auto mt-4 max-w-2xl text-center md:mx-0 md:text-left" style={{ color: "var(--ds-color-text-muted)" }}>
            {intro}
          </p>
        )}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className={item.featured ? "sm:col-span-2 lg:col-span-2" : ""}>
              <Card item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
