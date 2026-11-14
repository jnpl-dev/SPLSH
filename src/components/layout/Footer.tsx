export default function Footer() {
  return (
    <footer className="border-t border-navy-700/10 py-10 mt-8">
      <div className="container flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
        <p className="font-bungee text-label uppercase tracking-[0.04em] text-navy-600">
          © 2026 SPLSH · Brand portfolio
        </p>
        <p className="font-bungee text-label uppercase tracking-[0.04em] text-navy-600">
          Boracay Island, Malay, Aklan ·{" "}
          <a
            href="mailto:SPLSH@gmail.com"
            className="underline underline-offset-2 hover:text-orange-500"
          >
            SPLSH@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
