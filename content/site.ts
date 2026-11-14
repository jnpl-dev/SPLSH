// Typed on-page copy — source: content/content.md (DECK = from team's PPTX,
// CONFIRM = AI-draft placeholder pending team approval, GAP = team must supply).
// PLACEHOLDER=true → [CONFIRM]/[GAP] items render with a visible placeholder treatment.
import { owners } from "./owners";

export const PLACEHOLDER: boolean = false;
export { owners };

export const brand = {
  name: "SPLSH",
  tagline: "For those who like it wet.",
  hook: "How wet? How fun?",
  campaign: "WET & WILD",
  location: "Boracay Island, Malay, Aklan, Philippines",
  site: "www.SPLSH.com",
  email: "SPLSH@gmail.com",
  handle: "@SPLSH",
  meta: {
    title: "SPLSH — For those who like it wet | Boracay Water Adventures",
    description:
      "SPLSH is a Boracay water-adventure brand for every interest and skill level. Explore our brand story, logo, first post and WET & WILD campaign.",
  },
} as const;

export const nav = {
  links: [
    { label: "Concept", href: "#concept" },
    { label: "Offer", href: "#offer" },
    { label: "Logo", href: "#logo" },
    { label: "Post", href: "#post" },
    { label: "Poster", href: "#poster" },
  ],
  cta: { label: "Book a ride", href: "mailto:SPLSH@gmail.com" },
} as const;

export const hero = {
  eyebrow: "Boracay · Philippines",
  // [REMOVED per pre-P2 polish] headline "How wet? How Fun?" removed from hero
  headline: "",
  sub: "For those who like it wet.",
  scrollCue: "Dive in",
  chips: [
    { label: "Concept", href: "#concept" },
    { label: "Logo", href: "#logo" },
    { label: "Post", href: "#post" },
    { label: "Poster", href: "#poster" },
  ],
  logo: {
    src: "/brand/logo/logo-primary.png",
    alt: "SPLSH logo — wave-lettered wordmark with a surfer on top",
    w: 789,
    h: 299,
  },
} as const;

export const marqueeText =
  "SPLSH ✦ For those who like it wet";

/* ── 03 CONCEPT [PT#1] ─────────────────────────────────────── */
export const concept = {
  tag: "01 — Business Concept · PT#1",
  title: "What is SPLSH?",
  lede: "A water-adventure brand in Boracay offering water activities for different interests, personalities, and experience levels.",
  story: {
    quote: "How wet? How fun?",
    paragraphs: [
      "Born in Boracay Island, Malay, Aklan, from the idea that the best memories leave people smiling, laughing, and wanting more.",
      "A beach trip can become just another day by the shore — so SPLSH makes every visit more exciting, bringing together the thrill of water sports, the freedom of the open sea, and the playful energy of friends and family.",
    ],
    image: {
      src: "/media/s3-banana-aerial.jpg",
      alt: "Aerial view of a speedboat towing a banana boat across turquoise water",
      w: 1920,
      h: 1079,
    },
    snorkel: {
      src: "/brand/story/snorkel-blob.png",
      alt: "Snorkeler underwater in clear Boracay water",
      w: 732,
      h: 962,
    },
  },
  // [CONFIRM] AI draft derived from deck — team must approve/replace
  mission:
    "To turn ordinary beach days into exciting, shared adventures by offering a wide range of water activities that are fun, accessible, and safe for every kind of traveler in Boracay.",
  vision:
    "To become a recognizable water-adventure brand that makes exciting, accessible, and memorable recreation for everyone.",
  values: [
    "Adventure",
    "Inclusivity",
    "Convenience",
    "Enjoyment",
    "Connection",
    "Memorable Experience",
  ],
  whoWeServe: {
    lede: "From accessible recreation to high-adrenaline sports and advanced water experiences — there's a SPLSH for every skill level.",
    primary: [
      "Young adults & students",
      "Young professionals",
      "Friends & adventure seekers",
    ],
    secondary: [
      "Families & couples",
      "Domestic & international tourists",
      "Recreational groups",
    ],
    image: {
      src: "/media/s1-beach-aerial.jpg",
      alt: "Aerial view of a tropical beach cove with white sand and turquoise water",
      w: 1920,
      h: 1080,
    },
  },
  whyChoose: [
    {
      n: "01",
      title: "A fun-filled experience",
      body: "A youthful, energetic brand that turns ordinary beach days into exciting adventures and unforgettable shared experiences.",
      image: {
        src: "/brand/products/banana-boat.png",
        alt: "Four friends riding a banana boat in Boracay",
        w: 728,
        h: 671,
      },
    },
    {
      n: "02",
      title: "A distinct market identity",
      body: "Diverse water activities, accessibility, and a playful personality that stand out in Boracay's tourism market.",
      image: {
        src: "/brand/products/jet-ski.png",
        alt: "Riders on a jet ski cutting through the water in Boracay",
        w: 863,
        h: 849,
      },
    },
  ],
  ownersTitle: "Meet the owners",
} as const;

/* ── 04 WHAT WE OFFER [PT#1] ───────────────────────────────── */
export type Activity = {
  name: string;
  img: string;
  alt: string;
  w: number;
  h: number;
};
export type Tier = { n: string; name: string; activities: Activity[] };

export const offer = {
  tag: "02 — Products & Services · PT#1",
  title: "What do we offer?",
  lede: "Three levels, ten ways to get wet — pick your pace.",
  tiers: [
    {
      n: "01",
      name: "Recreational",
      activities: [
        {
          name: "Banana Boat",
          img: "/brand/products/banana-boat.png",
          alt: "Banana boat ride in Boracay",
          w: 728,
          h: 671,
        },
        {
          name: "UFO Ride",
          img: "/brand/products/ufo-ride.png",
          alt: "UFO inflatable ride in Boracay",
          w: 947,
          h: 412,
        },
        {
          name: "Paddleboarding",
          img: "/brand/products/kayaking.png",
          alt: "Paddleboarding in Boracay",
          w: 683,
          h: 426,
        },
        {
          name: "Kayaking",
          img: "/brand/products/paddleboarding.png",
          alt: "Kayaking in Boracay",
          w: 393,
          h: 650,
        },
      ],
    },
    {
      n: "02",
      name: "Adrenaline",
      activities: [
        {
          name: "Jet Ski",
          img: "/brand/products/jet-ski.png",
          alt: "Jet skiing in Boracay",
          w: 863,
          h: 849,
        },
        {
          name: "Parasailing",
          img: "/brand/products/parasailing.png",
          alt: "Parasailing in Boracay",
          w: 672,
          h: 478,
        },
        {
          name: "Windsurfing",
          img: "/brand/products/windsurfing.png",
          alt: "Windsurfing in Boracay",
          w: 639,
          h: 638,
        },
        {
          name: "Kitesurfing",
          img: "/brand/products/kitesurfing.png",
          alt: "Kitesurfing in Boracay",
          w: 830,
          h: 1008,
        },
      ],
    },
    {
      n: "03",
      name: "Advanced",
      activities: [
        {
          name: "E-Foil",
          img: "/brand/products/e-foil.png",
          alt: "E-foiling in Boracay",
          w: 1035,
          h: 1029,
        },
        {
          name: "Wingfoiling",
          img: "/brand/products/windsurfing.png",
          alt: "Wingfoiling in Boracay",
          w: 564,
          h: 879,
        },
      ],
    },
  ] satisfies Tier[],
  introBg: {
    src: "/media/s2-friends-sunset.jpg",
    alt: "",
    w: 1920,
    h: 1280,
  },
  promo: {
    text: "Jet Ski experience — two for ₱600",
    cta: "See the poster",
    href: "#poster",
  },
} as const;

/* ── 05 LOGO DESIGN [CT#1] ─────────────────────────────────── */
export type PaletteEntry = { name: string; hex: string };

export const logo = {
  tag: "03 — Logo Design · CT#1",
  title: "Logo design",
  lede: "Hand-drawn first, refined into a mark built for the water.",
  chapters: ["The Sketch", "Primary Logo", "Secondary Logo", "Color Palette", "Typography"],
  sketch: {
    src: "/brand/sketch/logo-sketch.jpg",
    alt: "Hand-drawn pencil sketch of the SPLSH wordmark with waves and a surfer",
    w: 799,
    h: 654,
    callouts: [
      {
        title: "Wave-inspired typography",
        body: "Fluid letters that reflect the movement of the ocean.",
      },
      {
        title: "Surfer integration",
        body: "A surfer riding the wave to symbolize adventure and excitement.",
      },
    ],
  },
  primary: {
    src: "/brand/logo/logo-primary.png",
    alt: "SPLSH primary logo — horizontal wordmark with a surfer on top of the L",
    w: 789,
    h: 299,
    callout: "Navy conveys depth and strength; cyan represents refreshing waters, energy and movement.",
  },
  secondary: {
    src: "/brand/logo/logo-secondary.png",
    alt: "SPLSH secondary logo — stacked SPL over SH arrangement",
    w: 800,
    h: 800,
    callout: "SPL over SH: stacked letters create a compact, recognizable mark.",
  },
  palette: [
    { name: "Deep Navy", hex: "#103098" },
    { name: "Cyan / Aqua", hex: "#00C8E0" },
    { name: "White", hex: "#FFFFFF" },
  ] satisfies PaletteEntry[],
  typographyNote:
    "The wordmark is custom hand-lettered — an image, not a font. It's supported by:",
  fonts: [
    { name: "Luckiest Guy", role: "Display / impact" },
    { name: "Knewave", role: "Brush accent" },
    { name: "Bungee", role: "Label / block" },
    { name: "Poppins", role: "UI / body" },
  ],
} as const;

/* ── 06 FIRST BRAND POST [CT#2] ────────────────────────────── */
export const post = {
  tag: "04 — First-Ever Brand Post · CT#2",
  title: "Our first hello",
  // [GAP] caption — AI draft, team must confirm (content.md §06)
  caption:
    "💦 READY TO GET SOAKED?\n\nSPLSH GOT YOU. 🌊\n\nSay hello to SPLSH — Boracay’s newest go-to for unforgettable water sports adventures! 🏝️\n\nWhether you're chasing an adrenaline rush or just here to make waves, we've got your ocean shenanigans covered. 😎💦\n\n📍 Boracay Island, Malay, Aklan\n\nAt SPLSH, we cater to those who like it wet. 💦",
  hashtags: "#SPLSH #ForThoseWhoLikeItWet #BoracayAdventures #GoodVibesBiggerWaves",
  image: {
    src: "/brand/post/first-brand-post.jpg",
    alt: "SPLSH first-ever brand post — banana boat riders with the SPLSH logo and tagline",
    w: 878,
    h: 878,
  },
  annotations: [
    { n: "01", label: "Brand introduction" },
    { n: "02", label: "Energetic visuals" },
    { n: "03", label: "Playful personality" },
    { n: "04", label: "Local identity" },
    { n: "05", label: "Social presence" },
  ],
  // [CONFIRM] measured from the image; deck states no separate post palette
  palette: [
    { name: "Deep Navy", hex: "#103098" },
    { name: "Cyan", hex: "#00C8E0" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Sun-Yellow", hex: "#E5BE39" },
    { name: "Orange", hex: "#F27209" },
  ] satisfies PaletteEntry[],
  // [CONFIRM] deck doesn't state post typography exactly
  typography: [
    { name: "Knewave", role: "Handwritten notes & tagline" },
    { name: "Better Faster", role: "Tagline (self-host — not on Google Fonts)" },
    { name: "Custom wordmark", role: "SPLSH logo lettering" },
  ],
} as const;

/* ── 07 PROMO POSTER [CT#3] — NO explanation text ──────────── */
export const poster = {
  tag: "05 — Promotional Event Poster · CT#3",
  title: "Wet & Wild",
  image: {
    src: "/brand/poster/wet-and-wild-poster.jpg",
    alt: "WET & WILD promotional poster: jet ski, two for 600 pesos",
    w: 864,
    h: 1080,
  },
  palette: [
    { name: "Navy Blue", hex: "#043A84" },
    { name: "Golden Yellow", hex: "#F0B308" },
    { name: "Orange", hex: "#F27209" },
  ] satisfies PaletteEntry[],
  typography: [
    { name: "Luckiest Guy", role: "Headline impact" },
    { name: "Knewave", role: "Supporting brush text" },
  ],
} as const;

/* ── 08 CLOSING [DECK] ─────────────────────────────────────── */
export const closing = {
  tag: "06 — Let's Get Wet",
  line: "For those who like it wet, TRY",
  cta: { label: "Book a ride", href: "mailto:SPLSH@gmail.com" },
  contact: [
    { label: brand.site, href: "https://www.SPLSH.com" },
    { label: brand.email, href: "mailto:SPLSH@gmail.com" },
    { label: brand.handle, href: "https://www.instagram.com/SPLSH" },
  ],
  location: "Boracay Island, Malay, Aklan",
  logo: {
    src: "/brand/logo/logo-secondary.png",
    alt: "SPLSH logo — stacked SPL over SH with a surfer",
    w: 800,
    h: 800,
  },
  mascot: {
    src: "/brand/mascot/mascot.png",
    alt: "SPLSH mascot — a small navy diver",
    w: 520,
    h: 523,
  },
  sunset: {
    src: "/brand/story/sunset-beach.jpg",
    alt: "",
    w: 1600,
    h: 1064,
  },
  // [GAP] team names / section — team must supply
  credit: "Team & section coming soon",
} as const;
