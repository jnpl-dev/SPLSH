const items = [
  { n: "01", label: "Concept", href: "#concept" },
  { n: "02", label: "Offer", href: "#offer" },
  { n: "03", label: "Logo", href: "#logo" },
  { n: "04", label: "Post", href: "#post" },
  { n: "05", label: "Poster", href: "#poster" },
  { n: "06", label: "Contact", href: "#contact" },
] as const;

export default function SectionIndex() {
  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {items.map((item) => (
          <li key={item.href} className="group relative">
            <a
              href={item.href}
              className="flex items-center gap-2 text-navy-900"
              aria-label={`${item.n} ${item.label}`}
            >
              <span className="font-bungee text-[10px] tracking-[0.04em] text-navy-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                {item.label}
              </span>
              <span className="font-bungee text-[10px] tracking-[0.04em] text-navy-600">
                {item.n}
              </span>
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full border border-navy-700 bg-transparent transition-all duration-200 group-hover:scale-125 group-hover:bg-cyan-500"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
