import { marqueeText } from "@content/site";

/** Static tagline band — velocity marquee motion lands in P2. */
export default function Marquee() {
  return (
    <section
      id="marquee"
      data-section="marquee"
      aria-label="Tagline band"
      className="overflow-hidden border-y border-navy-700/10 bg-aqua-50 py-7"
    >
      <div className="container">
        <p className="font-luckiest text-h3 whitespace-nowrap text-navy-700 uppercase">
          {marqueeText}
        </p>
      </div>
    </section>
  );
}
