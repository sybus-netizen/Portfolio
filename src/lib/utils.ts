import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  let prefix = "";
  if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/Portfolio")) {
      prefix = "/Portfolio";
    }
  } else if (process.env.NODE_ENV === "production" || process.env.GITHUB_ACTIONS) {
    prefix = "/Portfolio";
  }

  if (prefix && cleanPath.startsWith(prefix)) {
    return cleanPath;
  }

  return `${prefix}${cleanPath}`;
}
