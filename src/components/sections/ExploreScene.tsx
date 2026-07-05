import Link from "next/link";
import InteractiveScene from "@/components/solutions/InteractiveScene";
import { smartMeetingRoomScene } from "@/components/solutions/scenes/smartMeetingRoom";
import { SOLUTIONS_NAV } from "@/lib/constants";
import WaveReveal from "@/components/ui/WaveReveal";
import Equalizer from "@/components/ui/Equalizer";
import SignalDot from "@/components/ui/SignalDot";

export default function ExploreScene() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:py-20" style={{ background: "#0D1220" }}>
      <svg aria-hidden="true" className="absolute inset-x-0 top-8 h-16 w-full opacity-[0.06]" preserveAspectRatio="none" viewBox="0 0 600 60">
        <path d="M0,30 Q15,8 30,30 T60,30 T90,30 Q100,50 110,30 T140,30 Q150,4 160,30 T190,30 T220,30 Q232,54 244,30 T274,30 Q285,10 296,30 T326,30 T356,30 Q368,50 380,30 T410,30 Q420,6 430,30 T460,30 T490,30 Q502,52 514,30 T544,30 Q555,12 566,30 T600,30" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      </svg>
      <div className="relative mx-auto max-w-6xl">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-blue-400">
          <Equalizer color="#60A5FA" height={14} /> Interactive solution explorer
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.03em" }}>
          <WaveReveal text="See exactly where every device goes" />
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Every solution page includes an interactive room — click the pulse points to see the
          equipment we install, then watch the signal flow. Try it here with a smart meeting room.
        </p>
        <div className="mt-8">
          <InteractiveScene config={smartMeetingRoomScene} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {SOLUTIONS_NAV.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-full border border-slate-700 px-4 py-1.5 text-sm font-medium text-slate-200 transition hover:border-blue-400 hover:text-blue-300">
              {s.label}
            </Link>
          ))}
          <Link href="/solution-finder" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-600">
            <SignalDot color="#A7F3D0" size={7} /> Not sure? Try the solution finder →
          </Link>
        </div>
      </div>
    </section>
  );
}
