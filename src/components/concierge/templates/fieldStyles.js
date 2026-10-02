// Estilos compartilhados dos formulários de templates e propostas (modos claro e escuro).
// Classes sempre como literais para o Tailwind preservá-las no build.
export const INPUT_LIGHT_CLASS = "h-9 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40";
export const TEXTAREA_LIGHT_CLASS = "min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40";
export const INPUT_DARK_CLASS = "h-9 w-full rounded-md border border-[#4D4030] bg-[#24201B] px-3 py-2 text-sm text-[#F2DEC4] placeholder:text-[#F2DEC4]/40 focus:outline-none focus:ring-2 focus:ring-[#D6B680]/40";
export const TEXTAREA_DARK_CLASS = "min-h-[80px] w-full rounded-md border border-[#4D4030] bg-[#24201B] px-3 py-2 text-sm text-[#F2DEC4] placeholder:text-[#F2DEC4]/40 focus:outline-none focus:ring-2 focus:ring-[#D6B680]/40";
export const DARK_CARD_STYLE = { backgroundColor: "#24201B", borderColor: "#4D4030", color: "#F2DEC4" };