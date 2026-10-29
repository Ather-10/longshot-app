import * as THREE from "three";
import type { Mission } from "./missions";

export type Hud = {
  ammo: number;
  ammoMax: number;
  kills: number;
  need: number;
  wind: number;
  breath: number;
  scoped: boolean;
  holding: boolean;
  distance: number | null;
  timeLeft: number | null;
  reloading: boolean;
  hit: "head" | "body" | "miss" | null;
  score: number;
  banner: string;
};

export type Result = {
  win: boolean;
  score: number;
  kills: number;
  shots: number;
  heads: number;
  stars: number;
};

type Hitbox = {
  mesh: THREE.Object3D;
  zone: "head" | "body";
  radius: number;
  group: THREE.Group;
};

type Soldier = {
  group: THREE.Group;
  boxes: Hitbox[];
  alive: boolean;
  base: THREE.Vector3;
  move?: Mission["targets"][number]["move"];
  peek: boolean;
  phase: number;
  fall: number;
};

const UP = new THREE.Vector3(0, 1, 0);
const MUZZLE = 820;

function soldierColor(hex: number) {
  return new THREE.MeshStandardMaterial({ color: hex, roughness: 0.78, metalness: 0.05 });
}

function buildSoldier(color: number): { group: THREE.Group; boxes: Omit<Hitbox, "group">[] } {
  const group = new THREE.Group();
  const cloth = soldierColor(color);
  const skin = new THREE.MeshStandardMaterial({ color: 0xd7b08a, roughness: 0.7 });
  const dark = soldierColor(0x1e2420);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.62, 0.28), cloth);
  torso.position.y = 1.18;
  torso.castShadow = true;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), skin);
  head.position.y = 1.66;
  head.castShadow = true;
  const helm = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dark);
  helm.position.y = 1.7;
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.7, 0.16), cloth);
  legL.position.set(-0.12, 0.4, 0);
  const legR = legL.clone();
  legR.position.x = 0.12;
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.12), cloth);
  armL.position.set(-0.32, 1.15, 0);
  const armR = armL.clone();
  armR.position.x = 0.32;
  const rifle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.7), dark);
  rifle.position.set(0.28, 1.22, -0.28);

  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.28, 0.3), new THREE.MeshStandardMaterial({ color: 0xc4553a, roughness: 0.6 }));
  vest.position.y = 1.28;
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(1.25, 2.05),
    new THREE.MeshStandardMaterial({ color: 0xe7dcc4, roughness: 0.9 }),
  );
  board.position.set(0, 1.05, 0.22);

  group.add(board, torso, vest, head, helm, legL, legR, armL, armR, rifle);
  return {
    group,
    boxes: [
      { mesh: head, zone: "head", radius: 0.28 },
      { mesh: torso, zone: "body", radius: 0.62 },
    ],
  };
}

function buildViewmodel() {
  const gun = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x2a2e2c, roughness: 0.35, metalness: 0.7 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x6a4328, roughness: 0.7 });
  const brass = new THREE.MeshStandardMaterial({ color: 0xc6a15a, roughness: 0.4, metalness: 0.5 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.72), metal);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.55, 10), metal);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.04, -0.55);
  const stock = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.28), wood);
  stock.position.set(0, -0.02, 0.42);
  const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.22, 12), metal);
  scope.rotation.x = Math.PI / 2;
  scope.position.set(0, 0.1, -0.08);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.006, 6, 12), brass);
  ring.position.set(0, 0.1, 0.04);
  gun.add(body, barrel, stock, scope, ring);
  gun.position.set(0.34, -0.2, -0.48);
  return gun;
}

export class SniperGame {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private soldiers: Soldier[] = [];
  private raf = 0;
  private running = false;
  private yaw = 0;
  private pitch = -0.08;
  private keys = new Set<string>();
  private scoped = false;
  private holding = false;
  private breath = 1;
  private ammo: number;
  private kills = 0;
  private score = 0;
  private shots = 0;
  private heads = 0;
  private reloading = 0;
  private recoil = 0;
  private timeLeft: number | null;
  private ended = false;
  private hit: Hud["hit"] = null;
  private hitTimer = 0;
  private banner = "";
  private bannerTimer = 0;
  private t = 0;
  private last = 0;
  private dist: number | null = null;
  private ray = new THREE.Raycaster();
  private flash: THREE.PointLight;
  private muzzle: THREE.Mesh;
  private tracer: THREE.Line;
  private tracerLife = 0;
  private tmp = new THREE.Vector3();
  private right = new THREE.Vector3();
  private dir = new THREE.Vector3();
  private audio?: AudioContext;
  private onHud: (h: Hud) => void;
  private onEnd: (r: Result) => void;
  private el: HTMLCanvasElement;
  private mission: Mission;
  private lookBound: (e: MouseEvent) => void;
  private keyDown: (e: KeyboardEvent) => void;
  private keyUp: (e: KeyboardEvent) => void;
  private mouseDown: (e: MouseEvent) => void;
  private context: (e: Event) => void;
  private touchStart: (e: TouchEvent) => void;
  private touchMove: (e: TouchEvent) => void;
  private blur: () => void;
  private lastTouch: { x: number; y: number } | null = null;
  private hudAcc = 0;
  private coarse: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    mission: Mission,
    hooks: { onHud: (h: Hud) => void; onEnd: (r: Result) => void },
  ) {
    this.el = canvas;
    this.mission = mission;
    this.onHud = hooks.onHud;
    this.onEnd = hooks.onEnd;
    this.ammo = mission.ammo;
    this.timeLeft = mission.time > 0 ? mission.time : null;
    this.coarse = window.matchMedia("(pointer: coarse)").matches;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(mission.sky);

    this.camera = new THREE.PerspectiveCamera(68, 1, 0.08, 800);
    this.camera.position.set(...mission.cam);
    this.camera.rotation.order = "YXZ";
    const look = new THREE.Vector3(mission.cam[0] * 0.15, 1.35, mission.lookZ);
    this.camera.lookAt(look);
    this.yaw = this.camera.rotation.y;
    this.pitch = this.camera.rotation.x;

    this.scene.background = new THREE.Color(mission.sky);
    this.scene.fog = new THREE.Fog(mission.fog, 80, 420);

    const hemi = new THREE.HemisphereLight(mission.hemi, 0x3a3328, 0.85);
    const sun = new THREE.DirectionalLight(mission.sunColor, 1.35);
    sun.position.set(...mission.sun);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 180;
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 60;
    sun.shadow.camera.bottom = -60;
    this.scene.add(hemi, sun);

    this.buildWorld();
    this.spawnTargets();

    const gun = buildViewmodel();
    this.camera.add(gun);
    this.scene.add(this.camera);
    this.muzzle = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffe7a8 }),
    );
    this.muzzle.position.set(0.28, -0.22, -1.05);
    this.muzzle.visible = false;
    this.camera.add(this.muzzle);
    this.flash = new THREE.PointLight(0xffc56a, 0, 8);
    this.flash.position.copy(this.muzzle.position);
    this.camera.add(this.flash);

    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]);
    this.tracer = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffe2a0, transparent: true, opacity: 0.85 }));
    this.tracer.visible = false;
    this.scene.add(this.tracer);

    this.lookBound = (e) => this.onLook(e);
    this.keyDown = (e) => this.onKey(e, true);
    this.keyUp = (e) => this.onKey(e, false);
    this.mouseDown = (e) => this.onMouse(e);
    this.context = (e) => e.preventDefault();
    this.touchStart = (e) => this.onTouchStart(e);
    this.touchMove = (e) => this.onTouchMove(e);
    this.blur = () => this.keys.clear();
  }

  start() {
    this.resize();
    window.addEventListener("resize", this.resize);
    document.addEventListener("mousemove", this.lookBound);
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
    this.el.addEventListener("mousedown", this.mouseDown);
    this.el.addEventListener("contextmenu", this.context);
    this.el.addEventListener("touchstart", this.touchStart, { passive: false });
    this.el.addEventListener("touchmove", this.touchMove, { passive: false });
    this.el.addEventListener("touchend", () => {
      this.lastTouch = null;
    });
    window.addEventListener("blur", this.blur);
    this.running = true;
    this.last = performance.now();
    this.pushHud();
    this.loop();
  }

  dispose() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("mousemove", this.lookBound);
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
    this.el.removeEventListener("mousedown", this.mouseDown);
    this.el.removeEventListener("contextmenu", this.context);
    window.removeEventListener("blur", this.blur);
    if (document.pointerLockElement === this.el) document.exitPointerLock();
    this.renderer.dispose();
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
  }

  setScope(v: boolean) {
    this.scoped = v;
  }
  toggleScope() {
    this.scoped = !this.scoped;
  }
  setBreath(v: boolean) {
    this.holding = v;
  }
  fireFromUi() {
    this.shoot();
  }
  requestLock() {
    if (this.coarse) return;
    const anyEl = this.el as HTMLElement & { requestPointerLock?: (o?: { unadjustedMovement?: boolean }) => Promise<void> | void };
    try {
      const p = anyEl.requestPointerLock?.({ unadjustedMovement: true });
      if (p && typeof (p as Promise<void>).catch === "function") {
        (p as Promise<void>).catch(() => this.el.requestPointerLock());
      }
    } catch {
      this.el.requestPointerLock();
    }
  }

  private resize = () => {
    const w = this.el.clientWidth || window.innerWidth;
    const h = this.el.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
  };

  private onLook(e: MouseEvent) {
    if (this.ended) return;
    if (document.pointerLockElement !== this.el) return;
    const sens = (this.scoped ? 0.00055 : 0.0017) * (this.holding && this.breath > 0.05 ? 0.72 : 1);
    this.yaw -= e.movementX * sens;
    this.pitch -= e.movementY * sens;
    this.pitch = Math.max(-1.15, Math.min(0.7, this.pitch));
  }

  private onTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    if (!t) return;
    this.lastTouch = { x: t.clientX, y: t.clientY };
  }

  private onTouchMove(e: TouchEvent) {
    if (!this.lastTouch || this.ended) return;
    const t = e.touches[0];
    if (!t) return;
    e.preventDefault();
    const dx = t.clientX - this.lastTouch.x;
    const dy = t.clientY - this.lastTouch.y;
    this.lastTouch = { x: t.clientX, y: t.clientY };
    const sens = this.scoped ? 0.0022 : 0.0048;
    this.yaw -= dx * sens;
    this.pitch -= dy * sens;
    this.pitch = Math.max(-1.15, Math.min(0.7, this.pitch));
  }

  private onKey(e: KeyboardEvent, down: boolean) {
    if (e.repeat) return;
    if (down) this.keys.add(e.code);
    else this.keys.delete(e.code);
    if (!down || this.ended) return;
    if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "Space") {
      this.holding = true;
      e.preventDefault();
    }
    if (e.code === "KeyR" || e.code === "Mouse") return;
    if (!down) return;
    if (e.code === "KeyF" || e.code === "KeyZ") this.toggleScope();
  }

  private onMouse(e: MouseEvent) {
    if (this.ended || this.coarse) return;
    if (e.button === 2) {
      this.toggleScope();
      e.preventDefault();
      return;
    }
    if (e.button !== 0) return;
    if (!this.coarse && document.pointerLockElement !== this.el) {
      this.requestLock();
      return;
    }
    this.shoot();
  }

  private ensureAudio() {
    if (!this.audio) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audio = new AC();
    }
    if (this.audio.state === "suspended") void this.audio.resume();
    return this.audio;
  }

  private noiseBuf: AudioBuffer | null = null;

  private noise(dur: number, gain: number, freq: number, q = 0.6) {
    const ac = this.ensureAudio();
    if (!this.noiseBuf) {
      const len = ac.sampleRate;
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const data = buf.getChannelData(0);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + 0.0296 * white;
        b1 = 0.985 * b1 + 0.07 * white;
        b2 = white;
        data[i] = b0 * 0.6 + b1 * 0.3 + b2 * 0.15;
      }
      this.noiseBuf = buf;
    }
    const src = ac.createBufferSource();
    src.buffer = this.noiseBuf;
    const filter = ac.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq, ac.currentTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.35), ac.currentTime + dur);
    filter.Q.value = q;
    const g = ac.createGain();
    g.gain.setValueAtTime(gain, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(ac.destination);
    src.start();
    src.stop(ac.currentTime + dur + 0.02);
  }

  private gunshot() {
    this.noise(0.07, 0.7, 3200, 0.45);
    this.noise(0.22, 0.28, 420, 0.5);
    this.tone(78, 0.16, "sine", 0.28, -40);
    this.tone(210, 0.05, "triangle", 0.06, -120);
    window.setTimeout(() => {
      if (!this.running) return;
      this.noise(0.045, 0.22, 2400, 1.4);
      this.tone(1400, 0.03, "square", 0.015);
    }, 520);
  }

  private bodyHit() {
    this.noise(0.09, 0.35, 280, 0.8);
    this.tone(95, 0.12, "sine", 0.16, -30);
  }

  private headHit() {
    this.noise(0.05, 0.4, 2800, 1.1);
    this.tone(640, 0.07, "triangle", 0.06, 400);
    this.tone(180, 0.08, "sine", 0.08);
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain = 0.08, slide = 0) {
    const ac = this.ensureAudio();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, ac.currentTime);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), ac.currentTime + dur);
    g.gain.setValueAtTime(gain, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    o.connect(g);
    g.connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + dur + 0.02);
  }

  private shoot() {
    if (this.ended || this.reloading > 0 || this.ammo <= 0) {
      if (this.ammo <= 0) {
        this.tone(900, 0.03, "square", 0.03);
        this.noise(0.02, 0.08, 1800, 2);
      }
      return;
    }
    this.ensureAudio();
    this.ammo -= 1;
    this.shots += 1;
    this.reloading = 0.95;
    this.recoil = this.scoped ? 0.012 : 0.02;
    this.flash.intensity = 6;
    this.muzzle.visible = true;
    this.gunshot();

    this.camera.getWorldDirection(this.dir);
    this.right.crossVectors(this.dir, UP).normalize();
    const origin = this.camera.getWorldPosition(new THREE.Vector3());
    const vel = this.dir.clone().multiplyScalar(MUZZLE);
    vel.addScaledVector(this.right, this.mission.wind * 3.1);
    let p = origin.clone();
    const step = 1 / 60;
    let hitSoldier: Soldier | null = null;
    let zone: "head" | "body" | null = null;
    let hitPoint = p.clone();
    for (let t = 0; t < 1.6; t += step) {
      vel.y -= 9.8 * step;
      const next = p.clone().addScaledVector(vel, step);
      for (const s of this.soldiers) {
        if (!s.alive) continue;
        for (const b of s.boxes) {
          b.mesh.getWorldPosition(this.tmp);
          const r = b.radius * (b.zone === "head" ? 1 : 1);
          if (segmentHits(p, next, this.tmp, r)) {
            hitSoldier = s;
            zone = b.zone;
            hitPoint = next.clone();
            break;
          }
        }
        if (hitSoldier) break;
      }
      if (hitSoldier || next.y < 0) {
        hitPoint = next.clone();
        break;
      }
      p = next;
    }

    const positions = this.tracer.geometry.attributes.position as THREE.BufferAttribute;
    positions.setXYZ(0, origin.x, origin.y, origin.z);
    positions.setXYZ(1, hitPoint.x, hitPoint.y, hitPoint.z);
    positions.needsUpdate = true;
    this.tracer.visible = true;
    this.tracerLife = 0.12;

    if (hitSoldier && zone) {
      hitSoldier.alive = false;
      hitSoldier.fall = 0.01;
      this.kills += 1;
      if (zone === "head") {
        this.heads += 1;
        this.score += 150;
        this.hit = "head";
        this.banner = "HEADSHOT";
        this.headHit();
      } else {
        this.score += 80;
        this.hit = "body";
        this.banner = "HIT";
        this.bodyHit();
      }
      this.bannerTimer = 0.7;
      this.hitTimer = 0.35;
      if (this.kills >= this.mission.need) this.finish(true);
    } else {
      this.hit = "miss";
      this.hitTimer = 0.25;
      this.score = Math.max(0, this.score - 10);
      this.noise(0.12, 0.12, 180, 0.5);
    }
    if (!this.ended && this.ammo <= 0 && this.kills < this.mission.need) {
      window.setTimeout(() => {
        if (!this.ended) this.finish(false);
      }, 700);
    }
    this.pushHud();
  }

  private finish(win: boolean) {
    if (this.ended) return;
    this.ended = true;
    let stars = 0;
    if (win) {
      const acc = this.shots > 0 ? this.kills / this.shots : 0;
      const headRate = this.kills > 0 ? this.heads / this.kills : 0;
      stars = 1;
      if (acc >= 0.55) stars = 2;
      if (acc >= 0.75 && headRate >= 0.4) stars = 3;
      this.score += stars * 50;
    }
    this.onEnd({ win, score: this.score, kills: this.kills, shots: this.shots, heads: this.heads, stars });
  }

  private loop = () => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.t += dt;

    const breathKey = this.keys.has("ShiftLeft") || this.keys.has("ShiftRight") || this.keys.has("Space");
    if (!breathKey && !this.coarse) this.holding = false;
    if (this.holding && this.breath > 0) this.breath = Math.max(0, this.breath - dt * 0.28);
    else this.breath = Math.min(1, this.breath + dt * 0.18);
    const steady = this.holding && this.breath > 0.02;

    if (this.reloading > 0) this.reloading = Math.max(0, this.reloading - dt);
    this.recoil = Math.max(0, this.recoil - dt * 0.08);
    if (this.flash.intensity > 0) {
      this.flash.intensity = Math.max(0, this.flash.intensity - dt * 40);
      if (this.flash.intensity < 0.2) this.muzzle.visible = false;
    }
    if (this.tracerLife > 0) {
      this.tracerLife -= dt;
      if (this.tracerLife <= 0) this.tracer.visible = false;
    }
    if (this.hitTimer > 0) this.hitTimer -= dt;
    else this.hit = null;
    if (this.bannerTimer > 0) this.bannerTimer -= dt;
    else this.banner = "";

    if (this.timeLeft != null && !this.ended) {
      this.timeLeft -= dt;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.finish(this.kills >= this.mission.need);
      }
    }

    const amp = this.scoped ? (steady ? 0.00035 : 0.0034) : 0.0006;
    const swayY = Math.sin(this.t * 1.6) * amp + Math.sin(this.t * 0.47) * amp * 0.4;
    const swayP = Math.cos(this.t * 1.9) * amp * 0.65;
    this.camera.rotation.y = this.yaw + swayY;
    this.camera.rotation.x = this.pitch + swayP + this.recoil;
    const fovTarget = this.scoped ? 11 : 68;
    this.camera.fov += (fovTarget - this.camera.fov) * Math.min(1, dt * 10);
    this.camera.updateProjectionMatrix();
    const gun = this.camera.children[0] as THREE.Object3D | undefined;
    if (gun) gun.visible = !this.scoped || this.camera.fov > 30;

    for (const s of this.soldiers) {
      if (s.move && s.alive) {
        const m = s.move;
        const off = Math.sin(this.t * m.speed + m.phase) * m.amp;
        if (m.axis === "x") s.group.position.x = s.base.x + off;
        else s.group.position.z = s.base.z + off;
        s.group.rotation.y = Math.cos(this.t * m.speed + m.phase) * 0.15;
      }
      if (s.peek && s.alive) {
        const up = Math.sin(this.t * 0.7 + s.phase) > 0.15;
        const targetY = up ? s.base.y : s.base.y - 1.35;
        s.group.position.y += (targetY - s.group.position.y) * Math.min(1, dt * 4);
      }
      if (s.fall > 0 && s.fall < 1) {
        s.fall = Math.min(1, s.fall + dt * 1.8);
        s.group.rotation.x = -s.fall * 1.4;
        s.group.position.y = s.base.y - s.fall * 0.3;
      }
    }

    this.sampleRange();
    this.hudAcc += dt;
    if (this.hudAcc > 0.12) {
      this.hudAcc = 0;
      this.pushHud();
    }
    this.renderer.render(this.scene, this.camera);
  };

  private sampleRange() {
    this.camera.getWorldDirection(this.dir);
    this.ray.set(this.camera.position, this.dir);
    const meshes: THREE.Object3D[] = [];
    for (const s of this.soldiers) {
      if (!s.alive) continue;
      for (const b of s.boxes) meshes.push(b.mesh);
    }
    const hits = this.ray.intersectObjects(meshes, false);
    const first = hits[0];
    this.dist = first ? Math.round(first.distance) : null;
  }

  private pushHud() {
    this.onHud({
      ammo: this.ammo,
      ammoMax: this.mission.ammo,
      kills: this.kills,
      need: this.mission.need,
      wind: this.mission.wind,
      breath: this.breath,
      scoped: this.scoped,
      holding: this.holding && this.breath > 0.02,
      distance: this.dist,
      timeLeft: this.timeLeft,
      reloading: this.reloading > 0,
      hit: this.hit,
      score: this.score,
      banner: this.bannerTimer > 0 ? this.banner : "",
    });
  }

  private buildWorld() {
    const m = this.mission;
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(600, 600),
      new THREE.MeshStandardMaterial({ color: m.ground, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const hillMat = new THREE.MeshStandardMaterial({ color: m.hill, roughness: 1 });
    for (let i = 0; i < 9; i++) {
      const hill = new THREE.Mesh(new THREE.SphereGeometry(12 + (i % 4) * 6, 10, 8), hillMat);
      hill.scale.y = 0.35;
      hill.position.set((i - 4) * 28 + (i % 2) * 8, -2, -80 - i * 22);
      this.scene.add(hill);
    }

    const trunk = new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.9 });
    const leaf = new THREE.MeshStandardMaterial({ color: m.id === "night" ? 0x243028 : 0x3e5a38, roughness: 0.85 });
    for (let i = 0; i < 28; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (16 + (i % 5) * 4);
      const z = -20 - i * 9;
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.4, 3.2, 6), trunk);
      t.position.set(x, 1.6, z);
      t.castShadow = true;
      const c = new THREE.Mesh(new THREE.ConeGeometry(1.8, 4.2, 7), leaf);
      c.position.set(x, 4.2, z);
      c.castShadow = true;
      this.scene.add(t, c);
    }

    if (m.id === "roofs" || m.id === "night") {
      const wall = new THREE.MeshStandardMaterial({ color: m.id === "night" ? 0x2c3036 : 0xb7a898, roughness: 0.9 });
      const roof = new THREE.MeshStandardMaterial({ color: 0x6e4034, roughness: 0.8 });
      const spots = [
        [-12, -40, 8, 6],
        [10, -55, 10, 9],
        [-6, -72, 7, 5],
        [14, -90, 9, 7],
        [-16, -108, 8, 6],
      ];
      for (const [x, z, w, h] of spots) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(w!, h!, 6), wall);
        b.position.set(x!, h! / 2, z!);
        b.castShadow = true;
        b.receiveShadow = true;
        const r = new THREE.Mesh(new THREE.BoxGeometry(w! + 0.6, 0.35, 6.6), roof);
        r.position.set(x!, h! + 0.2, z!);
        this.scene.add(b, r);
      }
    }

    const postMat = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.6 });
    for (const mark of [50, 100, 150, 200, 250]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.6, 0.15), postMat);
      p.position.set(-14, 0.8, -mark + this.mission.cam[2]);
      this.scene.add(p);
    }
  }

  private spawnTargets() {
    for (const spec of this.mission.targets) {
      const built = buildSoldier(spec.color);
      built.group.scale.setScalar(1.35);
      built.group.position.set(spec.x, spec.y, spec.z);
      this.scene.add(built.group);
      const soldier: Soldier = {
        group: built.group,
        boxes: built.boxes.map((b) => ({ ...b, group: built.group })),
        alive: true,
        base: new THREE.Vector3(spec.x, spec.y, spec.z),
        move: spec.move,
        peek: !!spec.peek,
        phase: spec.x,
        fall: 0,
      };
      this.soldiers.push(soldier);
    }
  }
}

function segmentHits(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, r: number) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const abz = b.z - a.z;
  const acx = c.x - a.x;
  const acy = c.y - a.y;
  const acz = c.z - a.z;
  const ab2 = abx * abx + aby * aby + abz * abz || 1e-6;
  let t = (acx * abx + acy * aby + acz * abz) / ab2;
  t = Math.max(0, Math.min(1, t));
  const dx = a.x + abx * t - c.x;
  const dy = a.y + aby * t - c.y;
  const dz = a.z + abz * t - c.z;
  return dx * dx + dy * dy + dz * dz <= r * r;
}
