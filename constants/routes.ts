export const ROUTES = {
  HOME: "/",
  CONTACT: "/contact",
  WORKS: "/works",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS: { href: RoutePath; label: string }[] = [
  { href: ROUTES.HOME, label: "Головна" },
  { href: ROUTES.WORKS, label: "Приклади робіт" },
  { href: ROUTES.CONTACT, label: "Контакти" },
];
