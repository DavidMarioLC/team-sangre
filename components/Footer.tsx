import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 flex flex-col md:flex-row md:justify-center py-10 md:gap-5 md:py-10 items-center  gap-1 bg-black">
      {/* Team Sangre stacked logo */}
      <Image
        src="/images/team-sangre-logo.png"
        alt="Team Sangre"
        width={120}
        height={120}
        className="w-[120px]  aspect-auto"
      />
      <p className="text-white/80 text-[10px]">
        Copyright © 2026 | Todos los derechos reservados ®
      </p>
    </footer>
  );
}
