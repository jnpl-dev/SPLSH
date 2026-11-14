// Easing + duration tokens (docs/05) — never invent new values elsewhere.
export const ease = {
  liquid: "power3.out",
  swell: "power2.inOut",
  splash: "back.out(1.7)",
  drift: "sine.inOut",
} as const;

export const duration = {
  micro: 0.25,
  reveal: 0.9,
  section: 1.4,
  idle: 7.5,
} as const;
