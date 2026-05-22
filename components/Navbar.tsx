import Image from "next/image";

export default function Navbar() {
  return (
    <nav>
      <div className="max-w-[1200px] px-4 py-5 mx-auto grid grid-cols-3 items-center w-full">
        <h1 className="text-xs tracking-widest text-white uppercase">
          Soyteamsangre
        </h1>

        <div className="flex justify-center">
          <Image
            src="/images/team-sangre-isotipo.png"
            alt="Team Sangre"
            width={50}
            height={50}
            className="w-[50px] h-[50px]"
          />
        </div>

        <span className="text-xs tracking-widest text-white text-right">2026</span>
      </div>
    </nav>
  );
}
