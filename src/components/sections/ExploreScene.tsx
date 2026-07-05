import Link from "next/link";
import InteractiveScene from "@/components/solutions/InteractiveScene";
import { smartMeetingRoomScene } from "@/components/solutions/scenes/smartMeetingRoom";
import { SOLUTIONS_NAV } from "@/lib/constants";

export default function ExploreScene() {
  return (
    <section className="border-t border-slate-100 bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Interactive solution explorer</p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl" style={{ fontFamily: "Manrope, sans-serif", letterSpacing: "-0.03em" }}>
          See exactly where every device goes
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Every solution page includes an interactive room — click the pulse points to see the
          equipment we install, then watch the signal flow. Try it here with a smart meeting room.
        </p>
        <div className="mt-8">
          <InteractiveScene config={smartMeetingRoomScene} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {SOLUTIONS_NAV.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-600">
              {s.label}
            </Link>
          ))}
          <Link href="/solution-finder" className="rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-600">
            Not sure? Try the solution finder →
          </Link>
        </div>
      </div>
    </section>
  );
}
