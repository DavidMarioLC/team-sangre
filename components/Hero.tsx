export default function Hero() {
  return (
    <div className="relative pt-6 pb-10  md:pb-20 md:pt-40 text-center">
      {/* Title */}
      <h1 className="text-white leading-tight mb-4 text-3xl md:text-4xl lg:text-6xl">
        <span
          className="font-bold"
          style={{ fontFamily: "var(--font-philly)" }}
        >
          T{" "}
        </span>
        <span className="font-normal">odo es mejor</span>
        <br />
        <span className="font-normal">cuando la sangre </span>
        <span className="font-bold">circula</span>
        <br />
        <span className="font-bold">al lugar </span>
        <span
          className="font-bold"
          style={{ fontFamily: "var(--font-philly)" }}
        >
          C
        </span>
        <span className="font-bold">orrecto.</span>
      </h1>

      {/* Decorative elements — absolutely anchored to viewport sides */}
      <div className="absolute bottom-0 left-0 right-0 w-full  pointer-events-none ">
        <div className="max-w-[1200px] px-4 mx-auto w-full h-full flex justify-between items-center">
          <div className=" flex items-center gap-1" aria-hidden="true">
            <Dot />
            <Dot />
            <Dash />
            <Dot />
            <Dot />
            <Dot />
          </div>
          <div className="flex items-center gap-1" aria-hidden="true">
            <Dot />
            <Dot />
            <Dot />
            <Dot />
            <Dash />
            <Dot />
          </div>
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span className="w-2 md:w-3 h-2 md:h-3 rounded-full border border-white/50 inline-block" />
  );
}

function Dash() {
  return (
    <span className="w-10 h-2 md:h-3 rounded-3xl border-white/50 border inline-block" />
  );
}
