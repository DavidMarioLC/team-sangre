import Image from "next/image";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Stepper from "@/components/Stepper";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Image
        alt="globulo rojo"
        src="/images/globulo01.png"
        width={30}
        height={30}
        className="w-100 absolute left-[22%] top-[5%] blur-sm"
      />
      <Image
        alt="globulo rojo"
        src="/images/globulo02.png"
        width={30}
        height={30}
        className="w-100 absolute right-[15%] top-[30%] blur-sm"
      />

      <Image
        alt="globulo rojo"
        src="/images/globulo03.png"
        width={30}
        height={30}
        className="w-150 absolute left-[0%] bottom-0 blur-sm"
      />
      {/* Background with parallax */}
      <div
        className="fixed inset-0 -z-10 bg-black/30"
        style={{
          backgroundImage: "url('/images/bg.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* UI layer */}
      <div className="relative z-10 h-full flex flex-col ">
        <Navbar />

        <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {/* Always-visible hero title + decoratives */}
          <Hero />

          {/* Changing content area managed by Stepper */}
          <div className="flex-1 flex flex-col min-h-[320px] md:min-h-[700px] items-center justify-center">
            <Stepper />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
