export interface Service {
  id: string;
  /** Емодзі поруч із заголовком у списку послуг. */
  icon: string;
  title: string;
  items: string[];
  slug?: string;
}

export interface WorkExample {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Дата виконання / публікації, YYYY-MM-DD (ISO). */
  date: string;
  /** Ключові слова для пошуку (марка, вузол, тип роботи). */
  tags: string[];
  /**
   * Галерея з `public/`, порядок як на сайті. Якщо порожньо — використовується `image`.
   */
  images?: string[];
  /** Один файл (зручно для старих записів); якщо є `images`, воно головне. */
  image?: string;
}

export interface SiteConfig {
  siteName: string;
  /** Файл у `public/`, наприклад `/logo.png` — шапка та метадані. */
  logoSrc: string;
  tagline: string;
  phone: string;
  telegram: string;
  address?: string;
  /** Google Maps place URL — for directions, reviews, and leaving a review */
  googleMapsUrl?: string;
}
