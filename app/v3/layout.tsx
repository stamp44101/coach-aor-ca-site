// /v3 + /v3/th use the root layout for <html>/fonts. The `.site` wrapper and
// rebuild.css now live in SiteDesktop, so this segment layout is a pass-through.
export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
