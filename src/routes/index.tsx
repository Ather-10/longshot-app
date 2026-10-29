import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Crosshair, Wind, Timer, Target } from "lucide-react";
import { MISSIONS, type Mission } from "@/game/missions";
import { SniperGame, type Hud, type Result } from "@/game/engine";

export const Route = createFileRoute("/")({ component: Home });

const SAVE_KEY = "longshot-best-v1";

type Best = Record<string, { stars: number; score: number }>;

function loadBest(): Best {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") as Best;
  } catch {
    return {};
  }
}

function Home() {
  const [best, setBest] = useState<Best>({});
  const [picked, setPicked] = useState<Mission>(MISSIONS[0]!);
  const [phase, setPhase] = useState<"menu" | "play">("menu");
  const [run, setRun] = useState(0);

  useEffect(() => {
    setBest(loadBest());
  }, []);

  const start = (m: Mission) => {
    setPicked(m);
    setRun((n) => n + 1);
    setPhase("play");
  };

  const save = (m: Mission, r: Result) => {
    if (!r.win) return;
    setBest((prev) => {
      const cur = prev[m.id];
      const next = {
        ...prev,
        [m.id]: {
          stars: Math.max(cur?.stars ?? 0, r.stars),
          score: Math.max(cur?.score ?? 0, r.score),
        },
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      {phase === "menu" ? (
        <Briefing best={best} picked={picked} onPick={setPicked} onDeploy={() => start(picked)} />
      ) : (
        <Range
          key={run}
          mission={picked}
          onExit={() => setPhase("menu")}
          onDone={(r) => save(picked, r)}
          onRetry={() => start(picked)}
          onNext={() => {
            const i = MISSIONS.findIndex((m) => m.id === picked.id);
            const nxt = MISSIONS[Math.min(MISSIONS.length - 1, i + 1)]!;
            start(nxt);
          }}
        />
      )}
    </main>
  );
}

function Briefing({
  best,
  picked,
  onPick,
  onDeploy,
}: {
  best: Best;
  picked: Mission;
  onPick: (m: Mission) => void;
  onDeploy: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <section className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3 md:px-8 md:py-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-xs tracking-[0.32em] text-brass">DOPE CARD · 7.62</p>
            <h1 className="font-display text-4xl leading-none font-semibold tracking-wide text-fg sm:text-5xl">LONGSHOT</h1>
          </div>
          <p className="hidden text-right text-xs tracking-widest text-muted sm:block">
            MUZZLE 820 m/s
            <br />
            ZERO 100 m
          </p>
        </div>
        <div className="dope max-w-xl p-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {MISSIONS.map((m) => {
              const b = best[m.id];
              const on = m.id === picked.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onPick(m)}
                  className={`shrink-0 border px-3 py-2 text-left ${on ? "border-brass bg-bg text-fg" : "border-line bg-bg/40 text-muted"}`}
                >
                  <span className="font-display block text-xs tracking-[0.2em]">LANE 0{m.index}</span>
                  <span className="font-display block text-lg leading-none">{m.name}</span>
                  <span className="text-xs text-brass">{b ? `QUAL ${b.stars}/3` : m.place}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-2 border-t border-line pt-2">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl tracking-wide">{picked.name}</h2>
              <span className="text-xs tracking-[0.2em] text-brass">{picked.place.toUpperCase()}</span>
            </div>
            <p className="mt-1 text-sm leading-snug text-muted">{picked.brief}</p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <Stat k="Rounds" v={String(picked.ammo)} />
              <Stat k="Contacts" v={String(picked.need)} />
              <Stat k="Wind" v={`${Math.abs(picked.wind).toFixed(1)}`} />
            </dl>
            <p className="mt-2 text-xs tracking-wide text-brass-dim">
              {picked.wind >= 0 ? "WIND FROM LEFT — HOLD RIGHT" : "WIND FROM RIGHT — HOLD LEFT"} · DROP GROWS PAST 150 m
            </p>
            <button
              type="button"
              onClick={onDeploy}
              className="mt-3 h-12 w-full bg-brass font-display text-xl tracking-[0.22em] text-bg"
            >
              CHAMBER & DEPLOY
            </button>
            <p className="mt-2 text-xs leading-snug text-muted">
              Aim: click or drag. Fire: left click. Scope: right click. Steady: hold Shift.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-line px-2 py-2">
      <dt className="text-xs tracking-wide text-muted uppercase">{k}</dt>
      <dd className="font-display text-2xl leading-none">{v}</dd>
    </div>
  );
}

const EMPTY: Hud = {
  ammo: 0,
  ammoMax: 0,
  kills: 0,
  need: 0,
  wind: 0,
  breath: 1,
  scoped: false,
  holding: false,
  distance: null,
  timeLeft: null,
  reloading: false,
  hit: null,
  score: 0,
  banner: "",
};

function Range({
  mission,
  onExit,
  onDone,
  onRetry,
  onNext,
}: {
  mission: Mission;
  onExit: () => void;
  onDone: (r: Result) => void;
  onRetry: () => void;
  onNext: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<SniperGame | null>(null);
  const [hud, setHud] = useState<Hud>({ ...EMPTY, ammo: mission.ammo, ammoMax: mission.ammo, need: mission.need, wind: mission.wind, timeLeft: mission.time || null });
  const [result, setResult] = useState<Result | null>(null);

  const onHud = useCallback((h: Hud) => setHud(h), []);
  const handleEnd = useCallback(
    (r: Result) => {
      setResult(r);
      onDone(r);
    },
    [onDone],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new SniperGame(canvas, mission, { onHud, onEnd: handleEnd });
    gameRef.current = game;
    game.start();
    return () => {
      game.dispose();
      gameRef.current = null;
    };
  }, [mission, onHud, handleEnd]);

  const windDir = hud.wind >= 0 ? "FROM LEFT" : "FROM RIGHT";

  return (
    <div className="relative h-full w-full touch-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {!hud.scoped && !result && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-1/2 left-0 h-px w-full bg-fg/80" />
          <div className="absolute top-0 left-1/2 h-full w-px bg-fg/80" />
        </div>
      )}

      {hud.scoped && !result && <Scope holding={hud.holding} />}

      {hud.hit && !result && (
        <div
          className={`pointer-events-none absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 border-2 ${hud.hit === "miss" ? "border-muted" : "border-brass"}`}
        />
      )}

      {hud.banner && !result && (
        <p className="pointer-events-none absolute top-[18%] left-1/2 -translate-x-1/2 font-display text-4xl tracking-[0.2em] text-brass">
          {hud.banner}
        </p>
      )}

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2 md:p-4">
        <div className="glass-hud px-3 py-2">
          <p className="font-display text-[10px] tracking-[0.28em] text-brass">RANGE · {mission.place.toUpperCase()}</p>
          <p className="font-display text-xl leading-none">{mission.name}</p>
        </div>
        <div className="flex gap-1">
          <Chip icon={<Target className="size-3.5" />} label={`${hud.kills}/${hud.need}`} />
          <Chip icon={<Crosshair className="size-3.5" />} label={String(hud.score)} />
          {hud.timeLeft != null && <Chip icon={<Timer className="size-3.5" />} label={`${Math.ceil(hud.timeLeft)}`} />}
        </div>
      </header>

      <div className="pointer-events-none absolute bottom-24 left-2 flex flex-col gap-1 md:bottom-4">
        <div className="glass-hud px-3 py-2 text-sm">
          <p className="flex items-center gap-2 font-display text-[10px] tracking-[0.22em] text-brass">
            <Wind className="size-3.5" /> {windDir}
          </p>
          <p className="font-display text-2xl leading-none">{Math.abs(hud.wind).toFixed(1)}<span className="ml-1 text-sm text-muted">m/s</span></p>
          <p className="text-[11px] text-muted">{hud.wind >= 0 ? "Hold right" : "Hold left"} · mils under center for drop</p>
        </div>
        <div className="glass-hud flex items-center gap-3 px-3 py-2">
          <div>
            <p className="font-display text-[10px] tracking-[0.22em] text-brass">LUNG</p>
            <div className="mt-1 h-1.5 w-24 bg-line">
              <div className="h-full bg-olive" style={{ width: `${Math.round(hud.breath * 100)}%` }} />
            </div>
          </div>
          <p className="font-display text-lg leading-none">
            {hud.distance != null ? `${hud.distance}m` : "NO RNG"}
            <span className="mt-0.5 block text-xs tracking-widest text-brass">{hud.reloading ? "CYCLING BOLT" : `${hud.ammo} IN MAG`}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onExit}
        className="absolute top-3 left-1/2 hidden -translate-x-1/2 bg-bg/70 px-3 py-2 text-xs tracking-widest text-muted md:block"
      >
        ABORT
      </button>

      <div className="absolute right-3 bottom-4 flex flex-col gap-2 md:hidden">
        <Touch label="SCOPE" onDown={() => gameRef.current?.toggleScope()} />
        <Touch label="STEADY" onDown={() => gameRef.current?.setBreath(true)} onUp={() => gameRef.current?.setBreath(false)} />
        <Touch label="FIRE" onDown={() => gameRef.current?.fireFromUi()} primary />
      </div>
      <button type="button" onClick={onExit} className="absolute bottom-4 left-3 bg-bg/80 px-4 py-3 text-xs tracking-widest md:hidden">
        ABORT
      </button>

      {result && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg/80 p-4">
          <div className="dope w-full max-w-md p-5">
            <p className="font-display text-xs tracking-[0.28em] text-brass">{result.win ? "RANGE CLEAR" : "INCOMPLETE"}</p>
            <h2 className="font-display mt-1 text-4xl">{result.win ? `QUALIFICATION ${result.stars} / 3` : "NO QUAL"}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Score" v={String(result.score)} />
              <Stat k="Drops" v={`${result.kills}/${mission.need}`} />
              <Stat k="Shots" v={String(result.shots)} />
              <Stat k="Heads" v={String(result.heads)} />
            </dl>
            <div className="mt-5 flex flex-col gap-2">
              <button type="button" onClick={onRetry} className="h-12 bg-brass font-display text-xl tracking-widest text-bg">
                RUN IT BACK
              </button>
              {result.win && mission.index < MISSIONS.length && (
                <button type="button" onClick={onNext} className="h-12 border border-brass font-display text-xl tracking-widest text-brass">
                  NEXT RANGE
                </button>
              )}
              <button type="button" onClick={onExit} className="h-11 text-sm tracking-widest text-muted">
                BACK TO BRIEFING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="glass-hud flex items-center gap-2 px-2 py-1.5 font-display text-lg">
      <span className="text-brass">{icon}</span>
      {label}
    </div>
  );
}

function Touch({
  label,
  onDown,
  onUp,
  primary,
}: {
  label: string;
  onDown: () => void;
  onUp?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.stopPropagation();
        onDown();
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        onUp?.();
      }}
      onPointerLeave={() => onUp?.()}
      className={`h-14 w-28 font-display text-lg tracking-widest ${primary ? "bg-brass text-bg" : "border border-brass bg-bg/80 text-fg"}`}
    >
      {label}
    </button>
  );
}

function Scope({ holding }: { holding: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,#070907_46%)]" />
      <svg viewBox="0 0 200 200" className="relative h-[min(78vh,78vw)] w-[min(78vh,78vw)]">
        <circle cx="100" cy="100" r="92" fill="none" stroke="#c6a15a" strokeWidth="1.2" opacity="0.85" />
        <circle cx="100" cy="100" r="2" fill="#efe6d4" />
        <line x1="100" y1="8" x2="100" y2="192" stroke="#efe6d4" strokeWidth="0.6" opacity="0.8" />
        <line x1="8" y1="100" x2="192" y2="100" stroke="#efe6d4" strokeWidth="0.6" opacity="0.8" />
        {[18, 36, 54].map((d, i) => (
          <g key={d}>
            <line x1={100 - 8} y1={100 + d} x2={100 + 8} y2={100 + d} stroke="#e7c56a" strokeWidth="0.7" />
            <text x={112} y={100 + d + 2} fill="#e7c56a" fontSize="6" fontFamily="sans-serif">{i + 1}</text>
          </g>
        ))}
      </svg>
      <p className={`absolute bottom-[12%] font-display text-xs tracking-[0.35em] ${holding ? "text-olive" : "text-fg/80"}`}>
        {holding ? "BREATH HELD" : "HOLD SHIFT TO STEADY"}
      </p>
    </div>
  );
}
