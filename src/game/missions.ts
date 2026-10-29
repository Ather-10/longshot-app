export type MoveSpec = { axis: "x" | "z"; amp: number; speed: number; phase: number };

export type TargetSpec = {
  x: number;
  y: number;
  z: number;
  color: number;
  move?: MoveSpec;
  peek?: boolean;
};

export type Mission = {
  id: string;
  index: number;
  name: string;
  place: string;
  brief: string;
  sky: number;
  fog: number;
  ground: number;
  hill: number;
  sun: [number, number, number];
  sunColor: number;
  hemi: number;
  wind: number;
  ammo: number;
  need: number;
  time: number;
  cam: [number, number, number];
  lookZ: number;
  targets: TargetSpec[];
};

const olive = 0x4d6244;
const sand = 0x8d7048;

export const MISSIONS: Mission[] = [
  {
    id: "boot",
    index: 1,
    name: "Zero the Rifle",
    place: "Camp Kestrel",
    brief: "Five static silhouettes on the known-distance lane. Calm air. Learn the hold.",
    sky: 0x9bb7c9,
    fog: 0xb7c6c4,
    ground: 0x6d7a52,
    hill: 0x5c6848,
    sun: [40, 60, 20],
    sunColor: 0xfff1d6,
    hemi: 0xc5d4e0,
    wind: 1.2,
    ammo: 8,
    need: 5,
    time: 0,
    cam: [0, 6.2, 14],
    lookZ: -70,
    targets: [
      { x: -6, y: 0, z: -42, color: olive },
      { x: 4, y: 0, z: -58, color: 0x5a4632 },
      { x: -2, y: 0, z: -74, color: olive },
      { x: 7, y: 0, z: -92, color: 0x3e4a38 },
      { x: -8, y: 0, z: -110, color: sand },
    ],
  },
  {
    id: "gallery",
    index: 2,
    name: "Moving Gallery",
    place: "Rail Range",
    brief: "Walkers on lateral rails. Lead them. Wind is picking up from the left.",
    sky: 0x87a8c4,
    fog: 0xa9b8b4,
    ground: 0x7a6a48,
    hill: 0x6a5c40,
    sun: [30, 50, -10],
    sunColor: 0xffe2b0,
    hemi: 0xd8c8a8,
    wind: 4.5,
    ammo: 10,
    need: 6,
    time: 90,
    cam: [0, 7.4, 16],
    lookZ: -80,
    targets: [
      { x: 0, y: 0, z: -48, color: olive, move: { axis: "x", amp: 6, speed: 0.7, phase: 0 } },
      { x: 0, y: 0, z: -68, color: 0x6b3a2a, move: { axis: "x", amp: 8, speed: 0.95, phase: 1.2 } },
      { x: 0, y: 0, z: -88, color: olive, move: { axis: "x", amp: 7, speed: 0.55, phase: 2 } },
      { x: -4, y: 0, z: -108, color: sand, move: { axis: "x", amp: 5, speed: 1.15, phase: 0.4 } },
      { x: 3, y: 0, z: -128, color: 0x3d4c3a, move: { axis: "x", amp: 9, speed: 0.62, phase: 2.4 } },
      { x: 0, y: 0, z: -150, color: olive, move: { axis: "x", amp: 6, speed: 0.8, phase: 1 } },
    ],
  },
  {
    id: "roofs",
    index: 3,
    name: "Roofline",
    place: "Old Port",
    brief: "Spotters on the roofs. They duck. Wait for the window, then commit.",
    sky: 0xc4896a,
    fog: 0xd8b59a,
    ground: 0x8a7a68,
    hill: 0x6e6258,
    sun: [-20, 28, 30],
    sunColor: 0xffc48a,
    hemi: 0xf0c8a8,
    wind: -3.2,
    ammo: 9,
    need: 5,
    time: 80,
    cam: [2, 18, 22],
    lookZ: -70,
    targets: [
      { x: -10, y: 6, z: -40, color: 0x4a4038, peek: true },
      { x: 8, y: 9, z: -55, color: olive, peek: true },
      { x: -4, y: 4, z: -72, color: 0x5c4636, peek: true },
      { x: 12, y: 7, z: -90, color: sand, peek: true },
      { x: -14, y: 5, z: -108, color: olive, peek: true },
    ],
  },
  {
    id: "canyon",
    index: 4,
    name: "Long Hold",
    place: "Red Canyon",
    brief: "Past two hundred meters the round falls. Dial the mils. Wind is ugly.",
    sky: 0xe0a878,
    fog: 0xd8b090,
    ground: 0xb07a52,
    hill: 0xa07048,
    sun: [50, 40, 10],
    sunColor: 0xffd0a0,
    hemi: 0xf0c8a0,
    wind: 7.5,
    ammo: 8,
    need: 4,
    time: 70,
    cam: [0, 11, 18],
    lookZ: -160,
    targets: [
      { x: -8, y: 0, z: -140, color: 0x6a4030 },
      { x: 6, y: 2, z: -175, color: olive, move: { axis: "x", amp: 4, speed: 0.45, phase: 0.5 } },
      { x: -3, y: 0, z: -210, color: sand },
      { x: 10, y: 1, z: -250, color: 0x5a3828, move: { axis: "x", amp: 5, speed: 0.35, phase: 1.6 } },
    ],
  },
  {
    id: "night",
    index: 5,
    name: "Last Light",
    place: "Ridge 9",
    brief: "Dusk. Muzzle flash gives you away only if you miss. Five contacts. No extras.",
    sky: 0x1a2740,
    fog: 0x243044,
    ground: 0x2a332c,
    hill: 0x222a28,
    sun: [-30, 12, -20],
    sunColor: 0xffb07a,
    hemi: 0x33445c,
    wind: -5.5,
    ammo: 7,
    need: 5,
    time: 75,
    cam: [-2, 8.5, 12],
    lookZ: -90,
    targets: [
      { x: 4, y: 0, z: -50, color: 0x2e3a32, move: { axis: "x", amp: 3, speed: 0.5, phase: 0 } },
      { x: -7, y: 0, z: -72, color: 0x3a2e28, peek: true },
      { x: 2, y: 0, z: -96, color: 0x243028, move: { axis: "x", amp: 5, speed: 0.85, phase: 1 } },
      { x: -3, y: 3, z: -120, color: 0x332820, peek: true },
      { x: 8, y: 0, z: -148, color: 0x2a3328, move: { axis: "x", amp: 4, speed: 0.4, phase: 2 } },
    ],
  },
];

