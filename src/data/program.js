// 645 Dumbbell Tracker — full 13-week program data.
// Transcribed from official Beachbody 645 dumbbell tracker PDFs (Stages 1–4).
//
// Schema per exercise:
//   id:     stable slug used as the log key. Auto-derived from name unless
//           overridden in opts (used to merge alias spellings — see below).
//   name:   display name. Safe to edit; the id is what keys the logs.
//   target: rep/time target (e.g. "15 reps", "30 sec", "15/15 reps")
//   sets:   number of tracked sets. 0 means render a single row only.
//   bw:     true if bodyweight (reps-only, no weight input)
//
// Only Mon/Tue/Thu/Fri have tracker PDFs. Wed (Mobility & Stability) and
// Sat (Cardio 45) follow the BODi video without per-exercise tracking.

export const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const withId = (ex) => ({ id: ex.id || slugify(ex.name), ...ex });
const f = (name, target, opts = {}) => withId({ name, target, sets: 0, ...opts });          // filler/iso
const t = (name, target, sets, opts = {}) => withId({ name, target, sets, ...opts });        // tracked
const bw = (name, target, sets = 0, opts = {}) => withId({ name, target, sets, bw: true, ...opts }); // bodyweight

export const PROGRAM = {
  // ─────────────────────────────────────────────────────────────────
  // STAGE 1 (Weeks 1–4)
  // ─────────────────────────────────────────────────────────────────
  1: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Banded Squats', '15 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          bw('Low Plank Tap', '30 sec'),
          t('Deadlift', '15 reps', 3),
          t('DB Pullover', '15 reps', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('See Saw Lunge', '30 reps', 3),
          t('Single Arm Row', '15/15 reps', 3),
          t('Half Kneel Chop', '15/15 reps', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Tall Kneel Press', '15 reps', 3),
          bw('Spider Plank', '30 sec'),
          t('DB Press', '15 reps', 3),
        ]},
        { label: 'Block 2', exercises: [
          t('1/4 Turkish Get Up', '30/30 sec', 3),
          bw('Lateral Bound', '30 reps'),
          t('Banded Bridge Press', '15 reps', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('DB Swing', '15 reps', 4),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Hang High Pull', '15 reps', 3),
          bw('RKC Plank', '30 sec'),
          t('Bent Over Row', '15 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Bicep Curl', '15 reps', 4, { id: 'db-bicep-curl' }),
        ]},
        { label: 'Block 3', exercises: [
          t('DB Thrust', '15 reps', 3),
          t('Reverse Fly', '15 reps', 3),
          bw('Clamshell', '15/15 reps', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Iso DB Scaption Raises', '30 reps', 3, { id: 'iso-scaption-raises' }),
          f('Prone WY Raises', '15 reps'),
        ]},
        { label: 'Block 2', exercises: [
          bw('Beast/Plank', '30 sec'),
          bw('Low Plank Pike', '15 reps'),
        ]},
        { label: 'Block 3', exercises: [
          t('Half Kneel Press', '15/15 reps', 3),
          bw('Deadbug', '30 sec'),
          t('Farmer March', '30 sec', 3),
        ]},
      ],
    },
  },

  2: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Counter Balance Squat', '15 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          bw('Plank Reach/Side Reach', '35 sec'),
          t('Deadlift', '15 reps', 3),
          bw('Deadbug Variation', '35 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Split Squat', '15/15 reps', 3),
          t('Stability Row', '15/15 reps', 3),
          t('DB Drag', '35 sec', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('DB Push Press', '15 reps', 3),
          bw('Plank Downward Dog', '35 sec'),
          t('Alt DB Press', '30 reps', 3),
        ]},
        { label: 'Block 2', exercises: [
          t('DB Swing/SA High Pull', '15/15 reps', 3),
          bw('Side Plank', '35 sec'),
          bw('SL Hip March', '35 sec'),
        ]},
        { label: 'Block 3', exercises: [
          bw('Lateral Bound', '35 sec', 4),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Upright Pull', '15 reps', 3),
          bw('Shoulder Taps', '35 sec'),
          t('Rev Lunge & Row', '15 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Lateral Raise', '15 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('See Saw Row', '30 reps', 3),
          t('DB Pullover Deadbug', '30 reps', 3),
          bw('Walkout', '35 sec'),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Squeeze Press', '15 reps', 3),
          f('T-Raises', '15 reps'),
        ]},
        { label: 'Block 2', exercises: [
          bw('Eccentric Push-Up', '35 sec'),
          bw('Beast Underswitch', '35 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('SA Torque Press', '15/15 reps', 3),
          bw('Hollow Hold', '35 sec'),
          t('Off Set Carry', '35 sec', 3, { id: 'offset-carry' }),
        ]},
      ],
    },
  },

  3: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Banded Goblet Squats', '10 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          bw('Low Plank Reach', '40 sec'),
          t('Deadlift', '10 reps', 3),
          t('DB Pullover', '10 reps', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('See Saw Lunge', '20 reps', 3),
          t('Single Arm Row', '10/10 reps', 3),
          t('Inline Chop', '10/10 reps', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Tall Kneel Press', '10 reps', 3),
          bw('Spider Plank', '40 sec'),
          t('DB Press', '10 reps', 3),
        ]},
        { label: 'Block 2', exercises: [
          t('DB Lateral Bound', '40 sec', 3),
          t('1/4 Turkish Get Up', '20/20 sec', 3),
          t('Banded Bridge Press', '10 reps', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('DB Swing', '10 reps', 4),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Hang High Pull', '10 reps', 3),
          bw('RKC Plank', '40 sec'),
          t('Bent Over Row', '10 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Bicep Curl', '10 reps', 4, { id: 'db-bicep-curl' }),
        ]},
        { label: 'Block 3', exercises: [
          t('Bridge Press', '10 reps', 3),
          t('Reverse Fly', '10 reps', 3),
          bw('Clamshell', '10/10 reps', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Iso Scaption Raises', '20 reps', 3),
          f('Prone WY Raises', '10 reps'),
        ]},
        { label: 'Block 2', exercises: [
          bw('Beast/Plank', '40 sec', 3),
          bw('Low Plank Pike', '10 reps'),
        ]},
        { label: 'Block 3', exercises: [
          t('Half Kneel Press', '10/10 reps', 3),
          t('DB Deadbug', '40 sec', 3),
          t('OH Farmer March', '40 sec', 3),
        ]},
      ],
    },
  },

  4: { // DELOAD — 2 sets typical
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Counter Balance Squat', '10 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          bw('Plank Reach', '35 sec'),
          t('Deadlift', '10 reps', 2),
          bw('Deadbug Variation', '35/35 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Split Squat', '10/10 reps', 2),
          t('Stability Row', '10/10 reps', 2),
          t('DB Drag Plank', '35 sec', 2),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('DB Push Press', '10 reps', 2),
          bw('Plank Downward Dog', '35 sec'),
          t('Alt DB Press', '20 reps', 2),
        ]},
        { label: 'Block 2', exercises: [
          t('DB Swing/SA High Pull', '10/10 reps', 2),
          bw('Side Plank', '35/35 sec'),
          bw('SL Hip March', '35 sec'),
        ]},
        { label: 'Block 3', exercises: [
          bw('Lateral Bound', '35 sec', 4),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Upright Pull', '10 reps', 2),
          bw('Shoulder Taps', '35 sec'),
          t('Rev Lunge & Row', '5/5 reps', 2),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Lateral Raise', '10 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('See Saw Row', '20 reps', 2),
          t('DB Pullover Deadbug', '10 reps', 2),
          bw('Walkout', '35 sec'),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Squeeze Press', '10 reps', 2),
          t('T-Raises', '10 reps', 2),
        ]},
        { label: 'Block 2', exercises: [
          bw('Elevated Push-Up', '10 reps', 2),
          bw('Beast Underswitch', '35 sec', 2),
        ]},
        { label: 'Block 3', exercises: [
          t('SA Torque Press', '10/10 reps', 2),
          bw('Hollow Hold', '35 sec'),
          t('Farmer Carry', '35/35 sec', 2),
        ]},
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // STAGE 2 (Weeks 5–8)
  // ─────────────────────────────────────────────────────────────────
  5: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Deadlift', '15 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Drop Goblet Squat', '8/8 reps', 3),
          t('Plank Row', '30 reps', 3),
          bw('Adductor Plank', '20/20 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Side Lunge Rack', '15/15 reps', 3),
          t('DB Rotation Pull', '15/15 reps', 3),
          t('Half Kneel Warrior Chop', '20/20 sec', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Curl + Press', '15 reps', 3),
          bw('Elevated Push-Up', '15 reps'),
          bw('Knee Tucks', '15 reps'),
        ]},
        { label: 'Block 2', exercises: [
          t('American Swings', '40 sec', 3),
          bw('Icky Lateral Bound', '40 sec'),
          bw('Plank Walkout', '15 reps'),
        ]},
        { label: 'Block 3', exercises: [
          bw('Depth Drop', '40 sec'),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Hang Clean', '40 sec', 3),
          bw('Low Plank', '40 sec'),
          t('X Bent Over Row', '15 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Tricep Kickbacks', '15 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('Around the World', '15 reps', 3),
          t('DB Pull Over', '15 reps', 3, { id: 'db-pullover' }),
          bw('Beast Ab Drag', '40 sec', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Pause Press', '15 reps', 3),
          f('Scarecrow', '15 reps'),
        ]},
        { label: 'Block 2', exercises: [
          t('Bridge March Press', '30 reps', 3),
          bw('Underswitch Crab Reach', '40 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Goblet Squat', '15 reps', 3),
          bw('Swimmer', '15 reps'),
          t('Single Arm Carry', '20/20 sec', 3),
        ]},
      ],
    },
  },

  6: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Front Rack Squat', '15 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Single Leg Deadlift', '15/15 reps', 3),
          bw('Adductor Plank', '22.5/22.5 sec'),
          t('Alt Dead Pull Row', '15/15 reps', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('Transverse Lunge', '15/15 reps', 3),
          t('DB Rotation Plank', '45 sec', 3),
          t('DB Banded Hip Thrust', '15 reps', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Carry Push Press', '15/15 reps', 3),
          t('Weighted Russian Twist', '45 sec', 3),
          bw('Drop Push-Ups', '45 sec'),
        ]},
        { label: 'Block 2', exercises: [
          t('Snatch', '15/15 reps', 3),
          t('Warrior Chop', '45 sec', 3),
          f('1/4 Get Up Lift', '22.5/22.5 sec'),
        ]},
        { label: 'Block 3', exercises: [
          bw('Depth Jump Squat', '45 sec'),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Squat + Pull', '15 reps', 3),
          t('Side Plank DB Rotation', '15/15 reps', 3),
          t('Bent Over Row + Alt Row', '15 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Lateral Raise & Bicep Curl', '15 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('Reverse Lunge Chop', '15/15 reps', 3),
          bw('Butterfly Sit-Up', '15 reps'),
          t('Plank DB Drag/Row', '45 sec', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('SL Bridge Press', '15/15 reps', 3),
          bw('Unload Beast', '45 sec'),
        ]},
        { label: 'Block 2', exercises: [
          t('Split Squat', '22.5/22.5 sec', 3),
          bw('Beast Side Kick Throughs', '45 sec', 0, { id: 'beast-side-kick-through' }),
        ]},
        { label: 'Block 3', exercises: [
          t('DB Sumo Squat', '15 reps', 3),
          t('Get Up Leg Circles', '22.5/22.5 sec', 3),
          t('Half Kneel Windmill', '22.5/22.5 sec', 3),
        ]},
      ],
    },
  },

  7: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Deadlift', '10 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Drop Goblet Squat', '5/5 reps', 3),
          t('Plank Row', '20 reps', 3),
          bw('Adductor Plank', '25/25 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Side Lunge Rack', '20 reps', 3),
          t('DB Rotation Pull', '10/10 reps', 3),
          t('Warrior Chops', '10/10 reps', 3, { id: 'warrior-chop' }),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Curl + Press', '10 reps', 3),
          bw('Elevated Push-Up', '5/5 reps', 3),
          bw('Knee Tucks', '50 sec'),
        ]},
        { label: 'Block 2', exercises: [
          t('American Swings', '10 reps', 3),
          bw('Icky Lateral Bound', '50 sec', 3),
          bw('Plank Walkout', '50 sec'),
        ]},
        { label: 'Block 3', exercises: [
          bw('Depth Drop', '10 reps'),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Hang Clean', '10 reps', 3),
          bw('Low Plank', '50 sec'),
          t('X Bent Over Row', '10 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Tricep Kickbacks', '10 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('Around the World', '10 reps', 3),
          t('DB Pull Over', '10 reps', 3, { id: 'db-pullover' }),
          bw('Beast Ab Drag', '50 sec', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Pause Press', '10 reps', 3),
          f('Scarecrow', '10 reps'),
        ]},
        { label: 'Block 2', exercises: [
          t('Bridge March Press', '20 reps', 3),
          bw('Underswitch Crab Reach', '50 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Goblet Squat', '10 reps', 3),
          bw('Swimmers', '10 reps', 0, { id: 'swimmer' }),
          t('Single Arm Carry', '25/25 sec', 3),
        ]},
      ],
    },
  },

  8: { // DELOAD
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Front Rack Squat', '10 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Single Leg Deadlift', '10/10 reps', 2),
          bw('Adductor Plank', '22.5/22.5 sec'),
          t('Alt Dead Pull Row', '20 reps', 2),
        ]},
        { label: 'Block 3', exercises: [
          t('Transverse Lunge', '10/10 reps', 2),
          t('DB Rotation Plank', '20 reps', 2),
          t('DB Banded Hip Thrust', '10 reps', 2),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Carry Push Press', '10/10 reps', 2),
          t('Weighted Russian Twist', '45 sec', 2),
          bw('Drop Push-Ups', '10 reps'),
        ]},
        { label: 'Block 2', exercises: [
          t('Snatch', '10/10 reps', 2),
          t('Warrior Chop', '10/10 reps', 2),
          t('1/4 Get Up Lift', '22.5/22.5 sec', 2),
        ]},
        { label: 'Block 3', exercises: [
          bw('Depth Jump Squat', '10 reps'),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Squat + Pull', '10 reps', 2),
          t('Side Plank DB Rotation', '22.5/22.5 sec', 2),
          t('Bent Over Row + Alt Row', '10 reps', 2),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Lateral Raise & Bicep Curl', '10 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('Reverse Lunge Chop', '10/10 reps', 2),
          bw('Butterfly Sit-Up', '45 sec', 2),
          t('Plank DB Drag/Row', '10/10 reps', 2),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('SL Bridge Press', '10/10 reps', 2),
          bw('Unload Beast', '45 sec'),
        ]},
        { label: 'Block 2', exercises: [
          t('Split Squat', '10/10 reps', 2),
          bw('Beast Side Kick Through', '45 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('DB Sumo Squat', '10 reps', 2),
          bw('Bridge Hip Whip', '22.5/22.5 sec'),
          t('Half Kneel Windmill', '10/10 reps', 2),
        ]},
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // STAGE 3 (Weeks 9–12)
  // ─────────────────────────────────────────────────────────────────
  9: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Deadlift + Front Rack Squat', '10 + 5 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Plank Row + Bear Row', '20 + 10 reps', 3),
          t('DB Halo Split Squat', '25/25 sec', 3),
          t('Frog DB Thrust', '15 reps', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('Front Rack Rev Lunges', '30 reps', 3),
          bw('Single Arm Sit-Up', '25/25 sec', 3),
          t('Drop Row', '15/15 reps', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Ski Swing Step', '15 reps', 3),
          bw('Elevated Push-Up', '25/25 sec', 3),
          bw('Side Lunge Adductor Drag', '30 reps'),
        ]},
        { label: 'Block 2', exercises: [
          t('Rotation Chop Press', '15/15 reps', 3),
          bw('Side Plank Knee Drive', '15/15 reps'),
          bw('Reverse Knee Drive Switch', '50 sec'),
        ]},
        { label: 'Block 3', exercises: [
          bw('2 Pogo + Drop Squat', '50 sec'),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('High Pull Step', '15 reps', 3),
          bw('Scapular Plank Knee Drive', '50 sec'),
          t('Reverse Fly', '15 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Arnold Press', '15 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('Single Leg Row', '15/15 reps', 3),
          t('Modified Side Plank Ext. Rotation', '15/15 reps', 3),
          t('Farmer Hold', '25/25 sec', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Frontal Plane Lunge Shift', '50 sec', 3),
          bw('Crab Reach Underswitch', '50 sec', 0, { id: 'underswitch-crab-reach' }),
        ]},
        { label: 'Block 2', exercises: [
          t('Rainbow Squat', '16 reps', 3),
          bw('Front Step Through', '50 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Overhead Carry', '25/25 sec', 3),
          bw('Ape Reach', '50 sec'),
          t('T-Raise/Scaption Raise', '50 sec', 3),
        ]},
      ],
    },
  },

  10: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Suitcase Squat + Jump Squats', '5 + 10 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Bent Over Row Complex', '15 reps', 3),
          t('Torque Rotation', '27.5/27.5 sec', 3),
          f('Single Leg Dynamic Hip Thrust', '15/15 reps'),
        ]},
        { label: 'Block 3', exercises: [
          t('OH Split Squat', '15/15 reps', 3),
          t('Calf Raise Shrug', '15 reps', 3),
          t('L Sit-Up Chop', '27.5/27.5 sec', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Double Hinge Swing + Swing', '5 + 10 reps', 3),
          bw('Side to Side Knee Tuck', '16 reps'),
          bw('Deceleration Lunge Hop', '55 sec'),
        ]},
        { label: 'Block 2', exercises: [
          t('Thrusters', '15 reps', 3),
          bw('Broad Jump', '55 sec'),
          t('DB Deadbug', '55 sec', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('Split Snatch', '27.5/27.5 sec', 4),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Ski Swing Arnold Press', '15 reps', 3),
          t('Renegade Row', '55 sec', 3),
          t('Bent Over Pull Back', '15 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t("Bicep 15's", '5/5/5 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('DB Jammer Press & Front Raise', '15 reps', 3),
          t('DB Pull Over Leg Raise', '15 reps', 3),
          t('DB Side Plank Hip Tap', '15/15 reps', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Iso Split Squat', '27.5/27.5 sec', 3),
          t('J Curl', '55 sec', 3),
        ]},
        { label: 'Block 2', exercises: [
          t('Lateral Step Sumo Squat', '16 reps', 3),
          bw('Underswitch Crab Reach', '55 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Offset Carry', '55 sec', 3),
          bw('Ape', '55 sec'),
          bw('Low Plank Reach', '55 sec'),
        ]},
      ],
    },
  },

  11: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Deadlift + Suitcase Squat', '5 + 5 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Plank Row + Bear Row', '10 + 10 reps', 3),
          t('DB Halo Split Squat', '10/10 reps', 3),
          t('Frog DB Thrust', '10 reps', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('Front Rack Rev Lunges', '20 reps', 3),
          bw('Single Arm Sit-Up', '10/10 reps', 3),
          t('Drop Row', '10/10 reps', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Ski Swing Step', '10 reps', 3),
          bw('Elevated Push-Up', '5/5 reps', 3),
          bw('Side Lunge Adductor Drag', '20 reps'),
        ]},
        { label: 'Block 2', exercises: [
          t('Rotation Chop Press', '10/10 reps', 3),
          bw('Side Plank Knee Drive', '30/30 sec'),
          bw('Reverse Knee Drive Switch', '20 reps'),
        ]},
        { label: 'Block 3', exercises: [
          bw('2 Pogo + Drop Squat', '30 sec'),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('High Pull Step', '10 reps', 3),
          bw('Scapular Plank Knee Drive', '60 sec'),
          t('Reverse Fly', '10 reps', 3),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Arnold Press', '10 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('Single Leg Row', '10/10 reps', 3),
          t('Modified Side Plank Ext. Rotation', '10/10 reps', 3),
          t('Farmer Hold', '30/30 sec', 3),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Frontal Plane Lunge Shift', '60 sec', 3),
          bw('Crab Reach Underswitch', '60 sec', 0, { id: 'underswitch-crab-reach' }),
        ]},
        { label: 'Block 2', exercises: [
          t('Rainbow Squat', '10 reps', 3),
          bw('Front Step Through', '60 sec'),
        ]},
        { label: 'Block 3', exercises: [
          t('Overhead Carry', '30/30 sec', 3),
          bw('Ape Reach', '60 sec'),
          t('T-Raise/Scaption Raise', '60 sec', 3),
        ]},
      ],
    },
  },

  12: { // DELOAD
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Suitcase Squat + Jump Squats', '5 + 5 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('Bent Over Row Complex', '10 reps', 2),
          t('Torque Rotation', '10/10 reps', 2),
          t('Single Leg Dynamic Hip Thrust', '10/10 reps', 2),
        ]},
        { label: 'Block 3', exercises: [
          t('OH Split Squat', '10/10 reps', 2),
          t('Calf Raise Shrug', '10 reps', 2),
          t('L Sit-Up Chop', '27.5/27.5 sec', 2),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Double Hinge Swing + Swing', '5 + 5 reps', 2),
          bw('Side to Side Knee Tuck', '55 sec'),
          bw('Deceleration Lunge Hop', '20 reps'),
        ]},
        { label: 'Block 2', exercises: [
          t('Thrusters', '10 reps', 2),
          bw('Broad Jump', '10 reps'),
          t('DB Deadbug', '55 sec', 2),
        ]},
        { label: 'Block 3', exercises: [
          t('Split Snatch', '5/5 reps', 4),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Arnold Press/Ski Swing', '10 reps', 2),
          t('Push-Up/Renegade Row', '10 reps', 2),
          t('Bent Over Pull Back', '10 reps', 2),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t("Bicep 10's", '5/5 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('DB Jammer Press & Front Raise', '10 reps', 2),
          t('DB Pull Over Leg Raise', '10 reps', 2),
          t('DB Side Plank Hip Tap', '27.5/27.5 sec', 2),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Iso Split Squat', '10/10 reps', 2),
          t('J Curl', '10 reps', 2),
        ]},
        { label: 'Block 2', exercises: [
          t('Lateral Step Sumo Squat', '55 sec', 2),
          bw('Underswitch Crab Reach', '55 sec', 2),
        ]},
        { label: 'Block 3', exercises: [
          t('Offset Carry', '27.5/27.5 sec', 2),
          bw('Ape', '55 sec'),
          bw('RKC Low Plank', '55 sec'),
        ]},
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // STAGE 4 — PERFORMANCE WEEK (Week 13)
  // ─────────────────────────────────────────────────────────────────
  13: {
    Mon: {
      blocks: [
        { label: 'Block 1 · 4 min EMOM', exercises: [
          t('Front Rack Squat', '20 reps', 4),
        ]},
        { label: 'Block 2', exercises: [
          t('SL Deadlift + Row', '10/10 reps', 3),
          bw('Fire Hydrant & Donkey Kickbacks w/Loop', '20/20 reps'),
          t('DB Side Plank', '30/30 sec', 3),
        ]},
        { label: 'Block 3', exercises: [
          t('Transverse Lunge & Snatch', '10/10 reps', 3),
          t('DB Hip Thrust w/Loop', '20 reps', 3),
          t('Sit-Up DB Twist', '10/10 reps', 3),
        ]},
      ],
    },
    Tue: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Single Arm DB Snatch', '10/10 reps', 3),
          f('Cossack Squat', '20 reps'),
          bw('Tuck Jumps', '60 sec'),
        ]},
        { label: 'Block 2', exercises: [
          t('Hollow Hold Press', '20 reps', 3),
          t('Neuro Catch Split Stance', '60 sec', 3),
          bw('Walkout Jump Squat', '20 reps'),
        ]},
        { label: 'Block 3', exercises: [
          f('DB Swing Lunge', '20 reps'),
        ]},
      ],
    },
    Thu: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('10 Push-Ups + 20 Rows', '20 reps', 4),
          t('Reverse Fly', '20 reps', 4),
          t('Plank Drag', '60 sec', 4),
        ]},
        { label: 'Block 2 · 4 min EMOM', exercises: [
          t('Wide Curl & Press', '10/10 reps', 4),
        ]},
        { label: 'Block 3', exercises: [
          t('Dead Pull', '20 reps', 4),
          t('DB Pull Apart', '20 reps', 4),
          t('Alt High Pull', '20 reps', 4),
        ]},
      ],
    },
    Fri: {
      blocks: [
        { label: 'Block 1', exercises: [
          t('Iso Split Squat', '30/30 sec', 3),
          bw('Crab Call Out', '60 sec'),
        ]},
        { label: 'Block 2', exercises: [
          t('Single Leg RDL Clean', '10/10 reps', 3),
          bw('Beast Call Out', '60 sec'),
        ]},
        { label: 'Block 3', exercises: [
          bw('Plank Pike', '20 reps'),
          bw('Traveling Ape', '60 sec'),
          t('Farmer March Variation', '60 sec', 3),
        ]},
      ],
    },
  },
};
