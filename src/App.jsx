import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, Play } from 'lucide-react';
import { PROGRAM } from './data/program';

const WEEKS = 13;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_FULL = {
  Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday',
  Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
};

const STAGE = (w) => {
  if (w <= 3) return 'Stage 1';
  if (w === 4) return 'Stage 1 · Deload';
  if (w <= 7) return 'Stage 2';
  if (w === 8) return 'Stage 2 · Deload';
  if (w <= 11) return 'Stage 3';
  if (w === 12) return 'Stage 3 · Deload';
  return 'Performance Week';
};

const WORKOUT_645 = {
  Mon: { name: 'Lower Body Strength', color: '#E63946' },
  Tue: { name: 'Total Body Power', color: '#F4A261' },
  Wed: { name: 'Mobility & Stability', color: '#2A9D8F' },
  Thu: { name: 'Upper Body Strength', color: '#E63946' },
  Fri: { name: 'Total Body Tempo', color: '#F4A261' },
  Sat: { name: 'Cardio 45', color: '#457B9D' },
  Sun: { name: 'Rest', color: '#6B7280' }
};

const demo = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' exercise demo')}`;

const DEMOS = {
  'Burpees': demo('burpee proper form'),
  'Burpee Ladder': demo('burpee ladder workout'),
  'Squat Jumps': demo('bodyweight squat jump form'),
  'EMOM 15': demo('EMOM workout explained'),
  'Tabata': demo('tabata 20 10 protocol'),
  'Death by Burpees': demo('death by burpees workout'),
  'Bent-over Rows': demo('dumbbell bent over row'),
  'Overhead Tricep Extensions': demo('dumbbell overhead tricep extension'),
  'Romanian Deadlifts': demo('dumbbell romanian deadlift'),
  'Bulgarian Split Squats': demo('bulgarian split squat dumbbell'),
  'Pigeon Pose': demo('pigeon pose stretch'),
  'Couch Stretch (hip flexor)': demo('couch stretch hip flexor'),
  'Thoracic Opener / Child\'s Pose': demo('thoracic spine mobility child pose'),
  'Box Breathing (4-4-4-4)': demo('box breathing 4 4 4 4'),
  'Burpee + Squat Jump combo': demo('burpee squat jump combo'),
  'Deep Stretching': demo('full body deep stretch routine'),
  'Pull-ups': demo('pull-up form'),
  'Push-ups': demo('push-up form'),
};

// Anchor: Round 2 starts Mon 2026-05-11.
function defaultDate(week, day) {
  const dayIdx = DAYS.indexOf(day);
  const d = new Date(Date.UTC(2026, 4, 11));
  d.setUTCDate(d.getUTCDate() + (week - 1) * 7 + dayIdx);
  return d.toISOString().slice(0, 10);
}

// Pull a clean leading rep pattern out of a target string.
// "15 reps" → "15"; "15/15 reps" → "15/15"; "8–10 reps per leg" → "8–10";
// "30 sec" → "30"; "10→9→…" → "" (too complex to prefill).
function parseTargetReps(target) {
  if (!target) return '';
  if (target.includes('→') || target.includes('…')) return '';
  const m = target.match(/^(\d+(?:\.\d+)?(?:\s*[\/\-–+]\s*\d+(?:\.\d+)?)*)/);
  return m ? m[1].replace(/\s+/g, '') : '';
}

// Extras now split into `superset` (interleaved between main blocks, twice)
// and `finisher` (after the last block). Days without a main workout render
// both standalone.
const getExtra = (week, day) => {
  switch (day) {
    case 'Mon':
      return week % 2 === 1
        ? {
            label: 'Upper Strength · 15 min',
            superset: [
              { name: 'Pull-ups', target: '5 reps', sets: 3, bw: true },
              { name: 'DB Bicep Curls', target: '10 reps', sets: 3 }
            ],
            note: 'Superset: pull-ups + curls. Two rounds of 3 sets interleaved between strength blocks.'
          }
        : {
            label: 'Upper Strength · 15 min',
            superset: [
              { name: 'Push-ups', target: '10 reps', sets: 3, bw: true },
              { name: 'Bent-over Rows', target: '10 reps', sets: 3 }
            ],
            note: 'Superset: push-ups + rows. Two rounds of 3 sets interleaved between strength blocks.'
          };
    case 'Tue': {
      const tueRot = ((week - 1) % 4) + 1;
      if (tueRot === 1) return {
        label: 'HIIT · Burpee Ladder',
        finisher: [
          { name: 'Burpees', target: '10→9→8→…→1 reps', sets: 0, bw: true, demoKey: 'Burpee Ladder' }
        ],
        note: 'Descending ladder: 10 burpees, rest, 9 burpees, rest, down to 1. Aim to finish in 15 min.'
      };
      if (tueRot === 2) return {
        label: 'HIIT · EMOM 15',
        finisher: [
          { name: 'Squat Jumps (odd minutes)', target: '10 reps', sets: 0, bw: true, demoKey: 'Squat Jumps' },
          { name: 'Burpees (even minutes)', target: '5 reps', sets: 0, bw: true, demoKey: 'Burpees' }
        ],
        note: 'EMOM = Every Minute On the Minute. Start each minute on the clock, do the reps, rest the remainder. 15 rounds total.'
      };
      if (tueRot === 3) return {
        label: 'HIIT · Tabata × 2',
        finisher: [
          { name: 'Burpees', target: '8 rounds · 20s on / 10s off', sets: 0, bw: true, demoKey: 'Tabata' },
          { name: 'Squat Jumps', target: '8 rounds · 20s on / 10s off', sets: 0, bw: true, demoKey: 'Squat Jumps' }
        ],
        note: 'Tabata = 20 sec all-out, 10 sec rest, 8 rounds (4 min). Rest 1 min between Tabatas.'
      };
      return {
        label: 'HIIT · Death by Burpees',
        finisher: [
          { name: 'Burpees', target: 'Min 1: 1 rep, Min 2: 2 reps… until failure', sets: 0, bw: true, demoKey: 'Death by Burpees' }
        ],
        note: 'Add 1 burpee per minute. Stop when you can\'t finish the round in 60 seconds.'
      };
    }
    case 'Wed':
      return {
        label: 'Recovery · 15 min',
        finisher: [
          { name: 'Pigeon Pose', target: '2 min per side', sets: 0, bw: true },
          { name: 'Couch Stretch (hip flexor)', target: '90 sec per side', sets: 0, bw: true },
          { name: 'Thoracic Opener / Child\'s Pose', target: '2 min', sets: 0, bw: true },
          { name: 'Box Breathing (4-4-4-4)', target: '5 min (finisher)', sets: 0, bw: true }
        ],
        note: 'Deep stretching + breath work only. No load. Move slowly, breathe deeply.'
      };
    case 'Thu':
      return {
        label: 'Arm Pump + Cardio · 15 min',
        superset: [
          { name: 'DB Bicep Curls', target: '12 reps', sets: 3 },
          { name: 'Overhead Tricep Extensions', target: '12 reps', sets: 3 }
        ],
        finisher: [
          { name: 'Cardio Finisher', target: '7 min', sets: 0, bw: true }
        ],
        note: 'Superset curls + tricep extensions (two rounds between blocks). 7-min cardio at the end: jump rope, stair intervals, or banded hill walk.'
      };
    case 'Fri':
      return {
        label: 'Lower + Core · 15 min',
        superset: [
          { name: 'Romanian Deadlifts', target: '10 reps', sets: 3 },
          { name: 'Bulgarian Split Squats', target: '8–10 reps per leg', sets: 3 }
        ],
        finisher: [
          { name: 'Plank', target: '2 min accumulated', sets: 0, bw: true }
        ],
        note: 'Superset RDLs + split squats (two rounds between blocks). Finish with plank.'
      };
    case 'Sat': {
      const satRot = ((week - 1) % 3) + 1;
      if (satRot === 1) return {
        label: 'Cardio Finisher · 15 min',
        finisher: [
          { name: 'Burpees', target: '10 reps', sets: 0, bw: true },
          { name: 'Push-ups', target: '10 reps', sets: 0, bw: true }
        ],
        note: '5 rounds, rest as needed. Light pace — Cardio 45 already did the heavy lifting.'
      };
      if (satRot === 2) return {
        label: 'Cardio Finisher · 15 min',
        finisher: [
          { name: 'Squat Jumps', target: '15 reps', sets: 0, bw: true },
          { name: 'Push-ups', target: '10 reps', sets: 0, bw: true }
        ],
        note: '5 rounds, rest as needed. Or skip if you need recovery.'
      };
      return {
        label: 'Cardio Finisher · 15 min',
        finisher: [
          { name: 'Burpee + Squat Jump combo', target: '50 reps for time', sets: 0, bw: true }
        ],
        note: '1 burpee + 3 squat jumps = 1 rep. 50 reps total, fastest time wins.'
      };
    }
    case 'Sun':
      return {
        label: 'Optional Recovery',
        finisher: [
          { name: 'Deep Stretching', target: '10 min (2+ min holds)', sets: 0, bw: true },
          { name: 'Box Breathing (4-4-4-4)', target: '5 min', sets: 0, bw: true }
        ],
        note: 'Optional restorative session — pigeon, couch stretch, forward fold, breath work. Or take full rest.'
      };
    default:
      return null;
  }
};

const STORAGE_KEY = 'tracker-645-v4';

export default function Tracker645() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [view, setView] = useState({ mode: 'week', week: 1 });
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const keyFor = (w, d) => `w${w}-${d}`;
  const entry = (w, d) => data[keyFor(w, d)] || {};

  const updateEntry = (w, d, patch) => {
    const k = keyFor(w, d);
    setData((prev) => ({ ...prev, [k]: { ...(prev[k] || {}), ...patch } }));
  };

  const weekProgress = (w) => {
    let done = 0, total = 0;
    DAYS.forEach((d) => {
      if (d === 'Sun') return;
      total += 2;
      const e = entry(w, d);
      if (e.main_done) done += 1;
      if (e.extra_done) done += 1;
    });
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const overallProgress = () => {
    let d = 0, t = 0;
    for (let w = 1; w <= WEEKS; w++) {
      const p = weekProgress(w);
      d += p.done; t += p.total;
    }
    return { done: d, total: t, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  if (selectedDay) {
    return <DayView
      week={selectedDay.week}
      day={selectedDay.day}
      entry={entry(selectedDay.week, selectedDay.day)}
      onUpdate={(patch) => updateEntry(selectedDay.week, selectedDay.day, patch)}
      onBack={() => setSelectedDay(null)}
    />;
  }

  if (view.mode === 'overview') {
    return <Overview
      weekProgress={weekProgress}
      overall={overallProgress()}
      onPickWeek={(w) => setView({ mode: 'week', week: w })}
    />;
  }

  return <WeekView
    week={view.week}
    entry={entry}
    progress={weekProgress(view.week)}
    onPickDay={(d) => setSelectedDay({ week: view.week, day: d })}
    onOverview={() => setView({ mode: 'overview' })}
    onPrev={view.week > 1 ? () => setView({ mode: 'week', week: view.week - 1 }) : null}
    onNext={view.week < WEEKS ? () => setView({ mode: 'week', week: view.week + 1 }) : null}
  />;
}

function Overview({ weekProgress, overall, onPickWeek }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      <Header />
      <div className="px-5 pt-2">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Program progress</div>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-5xl font-light tabular-nums" style={{ fontFamily: 'Fraunces, serif' }}>{overall.pct}<span className="text-2xl text-neutral-500">%</span></span>
          <span className="text-sm text-neutral-500 tabular-nums">{overall.done} / {overall.total}</span>
        </div>
        <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${overall.pct}%` }} />
        </div>
      </div>
      <div className="px-5 mt-8">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">All weeks</div>
        <div className="space-y-1.5">
          {Array.from({ length: WEEKS }, (_, i) => i + 1).map((w) => {
            const p = weekProgress(w);
            return (
              <button
                key={w}
                onClick={() => onPickWeek(w)}
                className="w-full flex items-center gap-4 p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-left transition-colors"
              >
                <div className="w-10 text-2xl font-light tabular-nums" style={{ fontFamily: 'Fraunces, serif' }}>{w}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-neutral-300">{STAGE(w)}</div>
                  <div className="h-0.5 bg-neutral-800 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-indigo-500" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
                <div className="text-xs text-neutral-500 tabular-nums">{p.pct}%</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WeekView({ week, entry, progress, onPickDay, onOverview, onPrev, onNext }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      <Header />
      <div className="px-5 pt-2">
        <button
          onClick={onOverview}
          className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-300 mb-3 transition-colors"
        >
          All weeks →
        </button>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-indigo-400 mb-1">{STAGE(week)}</div>
            <h1 className="text-5xl font-light tabular-nums" style={{ fontFamily: 'Fraunces, serif' }}>Week {week}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              disabled={!onPrev}
              className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-neutral-900 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onNext}
              disabled={!onNext}
              className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-neutral-900 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} className="rotate-180" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress.pct}%` }} />
          </div>
          <div className="text-xs text-neutral-500 tabular-nums">{progress.done}/{progress.total}</div>
        </div>
      </div>
      <div className="px-5 space-y-2">
        {DAYS.map((d) => {
          const w645 = WORKOUT_645[d];
          const extra = getExtra(week, d);
          const e = entry(week, d);
          return (
            <button
              key={d}
              onClick={() => onPickDay(d)}
              className="w-full p-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-left transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 pt-1">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">{d}</div>
                  <div className="w-1 h-8 rounded-full mt-1.5" style={{ backgroundColor: w645.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-base font-medium text-neutral-100">{w645.name}</div>
                    {e.main_done && <CheckDot />}
                  </div>
                  {extra && (
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <span className="text-indigo-400/70">+</span>
                      <span>{extra.label}</span>
                      {e.extra_done && <CheckDot small />}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckDot({ small }) {
  return (
    <div className={`${small ? 'w-3.5 h-3.5' : 'w-4 h-4'} rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0`}>
      <Check size={small ? 9 : 11} strokeWidth={3} className="text-white" />
    </div>
  );
}

function DayView({ week, day, entry, onUpdate, onBack }) {
  const w645 = WORKOUT_645[day];
  const program = PROGRAM[week]?.[day];
  const extra = getExtra(week, day);
  const isRest = day === 'Sun';
  const logs = entry.logs || {};
  const dateValue = entry.date || defaultDate(week, day);

  const updateLog = (logKey, patch) => {
    onUpdate({ logs: { ...logs, [logKey]: { ...(logs[logKey] || {}), ...patch } } });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-32">
      <div className="sticky top-0 bg-neutral-950/95 backdrop-blur-sm z-10 border-b border-neutral-900">
        <div className="px-5 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Week {week}</div>
            <div className="text-base font-medium" style={{ fontFamily: 'Fraunces, serif' }}>{DAY_FULL[day]}</div>
          </div>
        </div>
      </div>

      {/* Date row */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between gap-3 bg-neutral-900 rounded-lg px-4 py-2.5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Date</div>
          <input
            type="date"
            value={dateValue}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className="bg-transparent text-sm text-neutral-100 focus:outline-none tabular-nums"
          />
        </div>
      </div>

      {/* Day overview — workout names + Completed toggles */}
      <div className="px-5 pt-6 space-y-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: w645.color }} />
            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">645 Workout</div>
          </div>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: 'Fraunces, serif' }}>{w645.name}</h2>
          {!isRest && (
            <Checkbox
              label="Completed"
              checked={!!entry.main_done}
              onChange={(v) => onUpdate({ main_done: v })}
            />
          )}
          {isRest && (
            <div className="text-neutral-500 italic text-sm" style={{ fontFamily: 'Fraunces, serif' }}>
              Full rest day. Optional gentle recovery below.
            </div>
          )}
        </div>

        {extra && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-400">{isRest ? 'Optional' : '15-min Extra'}</div>
            </div>
            <h2 className="text-3xl font-light mb-2" style={{ fontFamily: 'Fraunces, serif' }}>{extra.label}</h2>
            <p className="text-sm text-neutral-400 mb-3 leading-relaxed">{extra.note}</p>
            <Checkbox
              label="Completed"
              checked={!!entry.extra_done}
              onChange={(v) => onUpdate({ extra_done: v })}
            />
          </div>
        )}
      </div>

      {/* Interleaved sequence:
          Block 1 → Superset R1 → Block 2 → Superset R2 → Block 3 → Finisher */}
      {program && (
        <div className="px-5 pt-10 space-y-8">
          <BlockSection block={program.blocks[0]} logs={logs} onLogChange={updateLog} dayColor={w645.color} />

          {extra?.superset && (
            <SupersetRound exercises={extra.superset} round={1} logs={logs} onLogChange={updateLog} />
          )}

          {program.blocks[1] && (
            <BlockSection block={program.blocks[1]} logs={logs} onLogChange={updateLog} dayColor={w645.color} />
          )}

          {extra?.superset && (
            <SupersetRound exercises={extra.superset} round={2} logs={logs} onLogChange={updateLog} />
          )}

          {program.blocks[2] && (
            <BlockSection block={program.blocks[2]} logs={logs} onLogChange={updateLog} dayColor={w645.color} />
          )}

          {program.blocks.slice(3).map((block, i) => (
            <BlockSection key={i + 3} block={block} logs={logs} onLogChange={updateLog} dayColor={w645.color} />
          ))}

          {extra?.finisher && (
            <FinisherSection exercises={extra.finisher} logs={logs} onLogChange={updateLog} />
          )}
        </div>
      )}

      {/* No main blocks (Wed/Sat/Sun) — render extra standalone */}
      {!program && extra && (
        <div className="px-5 pt-10 space-y-8">
          {extra.superset && (
            <SupersetRound exercises={extra.superset} round={1} logs={logs} onLogChange={updateLog} />
          )}
          {extra.finisher && (
            <FinisherSection exercises={extra.finisher} logs={logs} onLogChange={updateLog} />
          )}
        </div>
      )}

      {/* Session notes */}
      {!isRest && (
        <div className="px-5 pt-10">
          <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">Session notes</div>
          <textarea
            value={entry.main_notes || ''}
            onChange={(e) => onUpdate({ main_notes: e.target.value })}
            placeholder="How it felt, form cues, anything to remember…"
            rows={3}
            className="w-full bg-neutral-900 rounded-lg p-3 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
          />
        </div>
      )}
    </div>
  );
}

function SupersetRound({ exercises, round, logs, onLogChange }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 mb-3 border-l-2 border-indigo-500/40 pl-3">
        Superset · Round {round}
      </div>
      <div className="space-y-3">
        {exercises.map((ex) => {
          const logKey = `${ex.name}::r${round}`;
          return (
            <ExerciseRow
              key={logKey}
              exercise={ex}
              log={logs[logKey] || {}}
              onLogChange={(patch) => onLogChange(logKey, patch)}
            />
          );
        })}
      </div>
    </div>
  );
}

function FinisherSection({ exercises, logs, onLogChange }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 mb-3 border-l-2 border-indigo-500/40 pl-3">
        Finisher
      </div>
      <div className="space-y-3">
        {exercises.map((ex) => (
          <ExerciseRow
            key={ex.name}
            exercise={ex}
            log={logs[ex.name] || {}}
            onLogChange={(patch) => onLogChange(ex.name, patch)}
          />
        ))}
      </div>
    </div>
  );
}

function BlockSection({ block, logs, onLogChange, dayColor }) {
  return (
    <div>
      <div
        className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 border-l-2 pl-3"
        style={{ borderColor: dayColor ? `${dayColor}66` : '#27272a' }}
      >
        {block.label}
      </div>
      <div className="space-y-3">
        {block.exercises.map((ex) => (
          <ExerciseRow
            key={ex.name}
            exercise={ex}
            log={logs[ex.name] || {}}
            onLogChange={(patch) => onLogChange(ex.name, patch)}
          />
        ))}
      </div>
    </div>
  );
}

function ExerciseRow({ exercise, log, onLogChange }) {
  const { name, target, sets = 0, bw, demoKey } = exercise;
  const setCount = Math.max(sets, 1);
  const logSets = log.sets || [];
  const targetReps = parseTargetReps(target);
  const demoUrl = DEMOS[demoKey] || DEMOS[name];

  const updateSet = (i, field, value) => {
    const next = [...logSets];
    next[i] = { ...(next[i] || {}), [field]: value };
    onLogChange({ sets: next });
  };

  return (
    <div className="bg-neutral-900 rounded-lg p-4">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="text-base font-medium text-neutral-100">{name}</div>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Play size={10} fill="currentColor" />
              demo
            </a>
          )}
        </div>
        <div className="text-xs text-neutral-500 text-right flex-shrink-0 tabular-nums">{target}</div>
      </div>

      <div className="space-y-2 mb-2">
        {Array.from({ length: setCount }).map((_, i) => {
          const savedReps = logSets[i]?.reps;
          const repsValue = savedReps !== undefined ? savedReps : targetReps;
          const isPrefilledReps = savedReps === undefined && targetReps !== '';
          const weightValue = logSets[i]?.weight ?? '';
          return (
            <SetRow
              key={i}
              setNum={setCount > 1 ? i + 1 : null}
              bw={bw}
              reps={repsValue}
              weight={weightValue}
              isPrefilledReps={isPrefilledReps}
              onRepsChange={(v) => updateSet(i, 'reps', v)}
              onWeightChange={(v) => updateSet(i, 'weight', v)}
            />
          );
        })}
      </div>

      <input
        type="text"
        value={log.note || ''}
        onChange={(e) => onLogChange({ note: e.target.value })}
        placeholder="Notes…"
        className="w-full bg-neutral-950 rounded-md px-3 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
}

function SetRow({ setNum, bw, reps, weight, isPrefilledReps, onRepsChange, onWeightChange }) {
  return (
    <div className="flex items-center gap-2">
      {setNum !== null && (
        <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 w-7 flex-shrink-0 text-center">
          {setNum}
        </div>
      )}
      <input
        type="text"
        inputMode="text"
        value={reps}
        onChange={(e) => onRepsChange(e.target.value)}
        onFocus={(e) => { if (isPrefilledReps) e.target.select(); }}
        placeholder="reps"
        className={`flex-1 min-w-0 bg-neutral-950 rounded-md px-2 py-2 text-sm placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 tabular-nums text-center ${isPrefilledReps ? 'text-neutral-500' : 'text-neutral-100'}`}
      />
      {!bw && (
        <>
          <span className="text-neutral-700 text-xs flex-shrink-0">×</span>
          <input
            type="text"
            inputMode="decimal"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder="lbs"
            className="flex-1 min-w-0 bg-neutral-950 rounded-md px-2 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 tabular-nums text-center"
          />
        </>
      )}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all ${
        checked ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-neutral-900 border border-transparent'
      }`}
    >
      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
        checked ? 'bg-indigo-500' : 'bg-neutral-800 border border-neutral-700'
      }`}>
        {checked && <Check size={14} strokeWidth={3} className="text-white" />}
      </div>
      <span className={`text-sm font-medium ${checked ? 'text-indigo-300' : 'text-neutral-300'}`}>{label}</span>
    </button>
  );
}

function Header() {
  return (
    <div className="px-5 pt-8 pb-6">
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-indigo-400">645</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600">round two</span>
      </div>
      <div className="text-xl mt-1" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>Thirteen weeks.</div>
    </div>
  );
}
