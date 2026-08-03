export default function StickyCall({ phone }: { phone: string }) {
  const tel = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <a
      href={tel}
      aria-label={`Call ${phone}`}
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#c9a96e] text-[#1a1a1a] shadow-2xl transition hover:bg-white md:h-auto md:w-auto md:gap-2 md:border-[#c9a96e] md:px-6 md:py-3"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
      </svg>
      <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] md:inline">Call {phone}</span>
    </a>
  );
}
