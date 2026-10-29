import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Crosshair, i as Target, r as Timer, t as Wind } from "../_libs/lucide-react.mjs";
import { C as Vector3, S as TorusGeometry, _ as PlaneGeometry, a as ConeGeometry, b as Scene, c as Fog, d as Line, f as LineBasicMaterial, g as PerspectiveCamera, h as MeshStandardMaterial, i as Color, l as Group, m as MeshBasicMaterial, n as BoxGeometry, o as CylinderGeometry, p as Mesh, r as BufferGeometry, s as DirectionalLight, t as WebGLRenderer, u as HemisphereLight, v as PointLight, x as SphereGeometry, y as Raycaster } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C4JGocR_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var olive = 5071428;
var sand = 9269320;
var MISSIONS = [
	{
		id: "boot",
		index: 1,
		name: "Zero the Rifle",
		place: "Camp Kestrel",
		brief: "Five static silhouettes on the known-distance lane. Calm air. Learn the hold.",
		sky: 10205129,
		fog: 12043972,
		ground: 7174738,
		hill: 6056008,
		sun: [
			40,
			60,
			20
		],
		sunColor: 16773590,
		hemi: 12965088,
		wind: 1.2,
		ammo: 8,
		need: 5,
		time: 0,
		cam: [
			0,
			6.2,
			14
		],
		lookZ: -70,
		targets: [
			{
				x: -6,
				y: 0,
				z: -42,
				color: olive
			},
			{
				x: 4,
				y: 0,
				z: -58,
				color: 5916210
			},
			{
				x: -2,
				y: 0,
				z: -74,
				color: olive
			},
			{
				x: 7,
				y: 0,
				z: -92,
				color: 4082232
			},
			{
				x: -8,
				y: 0,
				z: -110,
				color: sand
			}
		]
	},
	{
		id: "gallery",
		index: 2,
		name: "Moving Gallery",
		place: "Rail Range",
		brief: "Walkers on lateral rails. Lead them. Wind is picking up from the left.",
		sky: 8890564,
		fog: 11122868,
		ground: 8022600,
		hill: 6970432,
		sun: [
			30,
			50,
			-10
		],
		sunColor: 16769712,
		hemi: 14207144,
		wind: 4.5,
		ammo: 10,
		need: 6,
		time: 90,
		cam: [
			0,
			7.4,
			16
		],
		lookZ: -80,
		targets: [
			{
				x: 0,
				y: 0,
				z: -48,
				color: olive,
				move: {
					axis: "x",
					amp: 6,
					speed: .7,
					phase: 0
				}
			},
			{
				x: 0,
				y: 0,
				z: -68,
				color: 7027242,
				move: {
					axis: "x",
					amp: 8,
					speed: .95,
					phase: 1.2
				}
			},
			{
				x: 0,
				y: 0,
				z: -88,
				color: olive,
				move: {
					axis: "x",
					amp: 7,
					speed: .55,
					phase: 2
				}
			},
			{
				x: -4,
				y: 0,
				z: -108,
				color: sand,
				move: {
					axis: "x",
					amp: 5,
					speed: 1.15,
					phase: .4
				}
			},
			{
				x: 3,
				y: 0,
				z: -128,
				color: 4017210,
				move: {
					axis: "x",
					amp: 9,
					speed: .62,
					phase: 2.4
				}
			},
			{
				x: 0,
				y: 0,
				z: -150,
				color: olive,
				move: {
					axis: "x",
					amp: 6,
					speed: .8,
					phase: 1
				}
			}
		]
	},
	{
		id: "roofs",
		index: 3,
		name: "Roofline",
		place: "Old Port",
		brief: "Spotters on the roofs. They duck. Wait for the window, then commit.",
		sky: 12880234,
		fog: 14202266,
		ground: 9075304,
		hill: 7234136,
		sun: [
			-20,
			28,
			30
		],
		sunColor: 16761994,
		hemi: 15780008,
		wind: -3.2,
		ammo: 9,
		need: 5,
		time: 80,
		cam: [
			2,
			18,
			22
		],
		lookZ: -70,
		targets: [
			{
				x: -10,
				y: 6,
				z: -40,
				color: 4866104,
				peek: true
			},
			{
				x: 8,
				y: 9,
				z: -55,
				color: olive,
				peek: true
			},
			{
				x: -4,
				y: 4,
				z: -72,
				color: 6047286,
				peek: true
			},
			{
				x: 12,
				y: 7,
				z: -90,
				color: sand,
				peek: true
			},
			{
				x: -14,
				y: 5,
				z: -108,
				color: olive,
				peek: true
			}
		]
	},
	{
		id: "canyon",
		index: 4,
		name: "Long Hold",
		place: "Red Canyon",
		brief: "Past two hundred meters the round falls. Dial the mils. Wind is ugly.",
		sky: 14723192,
		fog: 14200976,
		ground: 11565650,
		hill: 10514504,
		sun: [
			50,
			40,
			10
		],
		sunColor: 16765088,
		hemi: 1578e4,
		wind: 7.5,
		ammo: 8,
		need: 4,
		time: 70,
		cam: [
			0,
			11,
			18
		],
		lookZ: -160,
		targets: [
			{
				x: -8,
				y: 0,
				z: -140,
				color: 6963248
			},
			{
				x: 6,
				y: 2,
				z: -175,
				color: olive,
				move: {
					axis: "x",
					amp: 4,
					speed: .45,
					phase: .5
				}
			},
			{
				x: -3,
				y: 0,
				z: -210,
				color: sand
			},
			{
				x: 10,
				y: 1,
				z: -250,
				color: 5912616,
				move: {
					axis: "x",
					amp: 5,
					speed: .35,
					phase: 1.6
				}
			}
		]
	},
	{
		id: "night",
		index: 5,
		name: "Last Light",
		place: "Ridge 9",
		brief: "Dusk. Muzzle flash gives you away only if you miss. Five contacts. No extras.",
		sky: 1713984,
		fog: 2371652,
		ground: 2765612,
		hill: 2239016,
		sun: [
			-30,
			12,
			-20
		],
		sunColor: 16756858,
		hemi: 3359836,
		wind: -5.5,
		ammo: 7,
		need: 5,
		time: 75,
		cam: [
			-2,
			8.5,
			12
		],
		lookZ: -90,
		targets: [
			{
				x: 4,
				y: 0,
				z: -50,
				color: 3029554,
				move: {
					axis: "x",
					amp: 3,
					speed: .5,
					phase: 0
				}
			},
			{
				x: -7,
				y: 0,
				z: -72,
				color: 3812904,
				peek: true
			},
			{
				x: 2,
				y: 0,
				z: -96,
				color: 2371624,
				move: {
					axis: "x",
					amp: 5,
					speed: .85,
					phase: 1
				}
			},
			{
				x: -3,
				y: 3,
				z: -120,
				color: 3352608,
				peek: true
			},
			{
				x: 8,
				y: 0,
				z: -148,
				color: 2765608,
				move: {
					axis: "x",
					amp: 4,
					speed: .4,
					phase: 2
				}
			}
		]
	}
];
var UP = new Vector3(0, 1, 0);
var MUZZLE = 820;
function soldierColor(hex) {
	return new MeshStandardMaterial({
		color: hex,
		roughness: .78,
		metalness: .05
	});
}
function buildSoldier(color) {
	const group = new Group();
	const cloth = soldierColor(color);
	const skin = new MeshStandardMaterial({
		color: 14135434,
		roughness: .7
	});
	const dark = soldierColor(1975328);
	const torso = new Mesh(new BoxGeometry(.46, .62, .28), cloth);
	torso.position.y = 1.18;
	torso.castShadow = true;
	const head = new Mesh(new SphereGeometry(.16, 14, 12), skin);
	head.position.y = 1.66;
	head.castShadow = true;
	const helm = new Mesh(new SphereGeometry(.17, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dark);
	helm.position.y = 1.7;
	const legL = new Mesh(new BoxGeometry(.16, .7, .16), cloth);
	legL.position.set(-.12, .4, 0);
	const legR = legL.clone();
	legR.position.x = .12;
	const armL = new Mesh(new BoxGeometry(.12, .5, .12), cloth);
	armL.position.set(-.32, 1.15, 0);
	const armR = armL.clone();
	armR.position.x = .32;
	const rifle = new Mesh(new BoxGeometry(.06, .06, .7), dark);
	rifle.position.set(.28, 1.22, -.28);
	const vest = new Mesh(new BoxGeometry(.48, .28, .3), new MeshStandardMaterial({
		color: 12866874,
		roughness: .6
	}));
	vest.position.y = 1.28;
	const board = new Mesh(new PlaneGeometry(1.25, 2.05), new MeshStandardMaterial({
		color: 15195332,
		roughness: .9
	}));
	board.position.set(0, 1.05, .22);
	group.add(board, torso, vest, head, helm, legL, legR, armL, armR, rifle);
	return {
		group,
		boxes: [{
			mesh: head,
			zone: "head",
			radius: .28
		}, {
			mesh: torso,
			zone: "body",
			radius: .62
		}]
	};
}
function buildViewmodel() {
	const gun = new Group();
	const metal = new MeshStandardMaterial({
		color: 2764332,
		roughness: .35,
		metalness: .7
	});
	const wood = new MeshStandardMaterial({
		color: 6964008,
		roughness: .7
	});
	const brass = new MeshStandardMaterial({
		color: 13017434,
		roughness: .4,
		metalness: .5
	});
	const body = new Mesh(new BoxGeometry(.07, .09, .72), metal);
	const barrel = new Mesh(new CylinderGeometry(.018, .02, .55, 10), metal);
	barrel.rotation.x = Math.PI / 2;
	barrel.position.set(0, .04, -.55);
	const stock = new Mesh(new BoxGeometry(.06, .1, .28), wood);
	stock.position.set(0, -.02, .42);
	const scope = new Mesh(new CylinderGeometry(.028, .028, .22, 12), metal);
	scope.rotation.x = Math.PI / 2;
	scope.position.set(0, .1, -.08);
	const ring = new Mesh(new TorusGeometry(.03, .006, 6, 12), brass);
	ring.position.set(0, .1, .04);
	gun.add(body, barrel, stock, scope, ring);
	gun.position.set(.34, -.2, -.48);
	return gun;
}
var SniperGame = class {
	renderer;
	scene = new Scene();
	camera;
	soldiers = [];
	raf = 0;
	running = false;
	yaw = 0;
	pitch = -.08;
	keys = /* @__PURE__ */ new Set();
	scoped = false;
	holding = false;
	breath = 1;
	ammo;
	kills = 0;
	score = 0;
	shots = 0;
	heads = 0;
	reloading = 0;
	recoil = 0;
	timeLeft;
	ended = false;
	hit = null;
	hitTimer = 0;
	banner = "";
	bannerTimer = 0;
	t = 0;
	last = 0;
	dist = null;
	ray = new Raycaster();
	flash;
	muzzle;
	tracer;
	tracerLife = 0;
	tmp = new Vector3();
	right = new Vector3();
	dir = new Vector3();
	audio;
	onHud;
	onEnd;
	el;
	mission;
	lookBound;
	keyDown;
	keyUp;
	mouseDown;
	context;
	touchStart;
	touchMove;
	blur;
	lastTouch = null;
	hudAcc = 0;
	coarse;
	constructor(canvas, mission, hooks) {
		this.el = canvas;
		this.mission = mission;
		this.onHud = hooks.onHud;
		this.onEnd = hooks.onEnd;
		this.ammo = mission.ammo;
		this.timeLeft = mission.time > 0 ? mission.time : null;
		this.coarse = window.matchMedia("(pointer: coarse)").matches;
		this.renderer = new WebGLRenderer({
			canvas,
			antialias: true,
			alpha: false
		});
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
		this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = 2;
		this.renderer.setClearColor(mission.sky);
		this.camera = new PerspectiveCamera(68, 1, .08, 800);
		this.camera.position.set(...mission.cam);
		this.camera.rotation.order = "YXZ";
		const look = new Vector3(mission.cam[0] * .15, 1.35, mission.lookZ);
		this.camera.lookAt(look);
		this.yaw = this.camera.rotation.y;
		this.pitch = this.camera.rotation.x;
		this.scene.background = new Color(mission.sky);
		this.scene.fog = new Fog(mission.fog, 80, 420);
		const hemi = new HemisphereLight(mission.hemi, 3814184, .85);
		const sun = new DirectionalLight(mission.sunColor, 1.35);
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
		this.muzzle = new Mesh(new SphereGeometry(.04, 8, 8), new MeshBasicMaterial({ color: 16770984 }));
		this.muzzle.position.set(.28, -.22, -1.05);
		this.muzzle.visible = false;
		this.camera.add(this.muzzle);
		this.flash = new PointLight(16762218, 0, 8);
		this.flash.position.copy(this.muzzle.position);
		this.camera.add(this.flash);
		const geo = new BufferGeometry().setFromPoints([new Vector3(), new Vector3(0, 0, -1)]);
		this.tracer = new Line(geo, new LineBasicMaterial({
			color: 16769696,
			transparent: true,
			opacity: .85
		}));
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
			const m = o;
			if (m.geometry) m.geometry.dispose();
			const mat = m.material;
			if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
			else mat?.dispose();
		});
	}
	setScope(v) {
		this.scoped = v;
	}
	toggleScope() {
		this.scoped = !this.scoped;
	}
	setBreath(v) {
		this.holding = v;
	}
	fireFromUi() {
		this.shoot();
	}
	requestLock() {
		if (this.coarse) return;
		const anyEl = this.el;
		try {
			const p = anyEl.requestPointerLock?.({ unadjustedMovement: true });
			if (p && typeof p.catch === "function") p.catch(() => this.el.requestPointerLock());
		} catch {
			this.el.requestPointerLock();
		}
	}
	resize = () => {
		const w = this.el.clientWidth || window.innerWidth;
		const h = this.el.clientHeight || window.innerHeight;
		this.renderer.setSize(w, h, false);
		this.camera.aspect = w / Math.max(1, h);
		this.camera.updateProjectionMatrix();
	};
	onLook(e) {
		if (this.ended) return;
		if (document.pointerLockElement !== this.el) return;
		const sens = (this.scoped ? 55e-5 : .0017) * (this.holding && this.breath > .05 ? .72 : 1);
		this.yaw -= e.movementX * sens;
		this.pitch -= e.movementY * sens;
		this.pitch = Math.max(-1.15, Math.min(.7, this.pitch));
	}
	onTouchStart(e) {
		if (e.touches.length !== 1) return;
		const t = e.touches[0];
		if (!t) return;
		this.lastTouch = {
			x: t.clientX,
			y: t.clientY
		};
	}
	onTouchMove(e) {
		if (!this.lastTouch || this.ended) return;
		const t = e.touches[0];
		if (!t) return;
		e.preventDefault();
		const dx = t.clientX - this.lastTouch.x;
		const dy = t.clientY - this.lastTouch.y;
		this.lastTouch = {
			x: t.clientX,
			y: t.clientY
		};
		const sens = this.scoped ? .0022 : .0048;
		this.yaw -= dx * sens;
		this.pitch -= dy * sens;
		this.pitch = Math.max(-1.15, Math.min(.7, this.pitch));
	}
	onKey(e, down) {
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
	onMouse(e) {
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
	ensureAudio() {
		if (!this.audio) {
			const AC = window.AudioContext || window.webkitAudioContext;
			this.audio = new AC();
		}
		if (this.audio.state === "suspended") this.audio.resume();
		return this.audio;
	}
	tone(freq, dur, type, gain = .08, slide = 0) {
		const ac = this.ensureAudio();
		const o = ac.createOscillator();
		const g = ac.createGain();
		o.type = type;
		o.frequency.setValueAtTime(freq, ac.currentTime);
		if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), ac.currentTime + dur);
		g.gain.setValueAtTime(gain, ac.currentTime);
		g.gain.exponentialRampToValueAtTime(1e-4, ac.currentTime + dur);
		o.connect(g);
		g.connect(ac.destination);
		o.start();
		o.stop(ac.currentTime + dur + .02);
	}
	shoot() {
		if (this.ended || this.reloading > 0 || this.ammo <= 0) {
			if (this.ammo <= 0) this.tone(140, .08, "square", .04);
			return;
		}
		this.ensureAudio();
		this.ammo -= 1;
		this.shots += 1;
		this.reloading = .95;
		this.recoil = this.scoped ? .012 : .02;
		this.flash.intensity = 6;
		this.muzzle.visible = true;
		this.tone(180, .12, "sawtooth", .07, -120);
		this.tone(90, .18, "triangle", .05, -40);
		this.camera.getWorldDirection(this.dir);
		this.right.crossVectors(this.dir, UP).normalize();
		const origin = this.camera.getWorldPosition(new Vector3());
		const vel = this.dir.clone().multiplyScalar(MUZZLE);
		vel.addScaledVector(this.right, this.mission.wind * 3.1);
		let p = origin.clone();
		const step = 1 / 60;
		let hitSoldier = null;
		let zone = null;
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
		const positions = this.tracer.geometry.attributes.position;
		positions.setXYZ(0, origin.x, origin.y, origin.z);
		positions.setXYZ(1, hitPoint.x, hitPoint.y, hitPoint.z);
		positions.needsUpdate = true;
		this.tracer.visible = true;
		this.tracerLife = .12;
		if (hitSoldier && zone) {
			hitSoldier.alive = false;
			hitSoldier.fall = .01;
			this.kills += 1;
			if (zone === "head") {
				this.heads += 1;
				this.score += 150;
				this.hit = "head";
				this.banner = "HEADSHOT";
				this.tone(880, .08, "square", .05);
				this.tone(1320, .12, "triangle", .04);
			} else {
				this.score += 80;
				this.hit = "body";
				this.banner = "HIT";
				this.tone(420, .09, "square", .04);
			}
			this.bannerTimer = .7;
			this.hitTimer = .35;
			if (this.kills >= this.mission.need) this.finish(true);
		} else {
			this.hit = "miss";
			this.hitTimer = .25;
			this.score = Math.max(0, this.score - 10);
		}
		if (!this.ended && this.ammo <= 0 && this.kills < this.mission.need) window.setTimeout(() => {
			if (!this.ended) this.finish(false);
		}, 700);
		this.pushHud();
	}
	finish(win) {
		if (this.ended) return;
		this.ended = true;
		let stars = 0;
		if (win) {
			const acc = this.shots > 0 ? this.kills / this.shots : 0;
			const headRate = this.kills > 0 ? this.heads / this.kills : 0;
			stars = 1;
			if (acc >= .55) stars = 2;
			if (acc >= .75 && headRate >= .4) stars = 3;
			this.score += stars * 50;
		}
		this.onEnd({
			win,
			score: this.score,
			kills: this.kills,
			shots: this.shots,
			heads: this.heads,
			stars
		});
	}
	loop = () => {
		if (!this.running) return;
		this.raf = requestAnimationFrame(this.loop);
		const now = performance.now();
		const dt = Math.min(.05, (now - this.last) / 1e3);
		this.last = now;
		this.t += dt;
		if (!(this.keys.has("ShiftLeft") || this.keys.has("ShiftRight") || this.keys.has("Space")) && !this.coarse) this.holding = false;
		if (this.holding && this.breath > 0) this.breath = Math.max(0, this.breath - dt * .28);
		else this.breath = Math.min(1, this.breath + dt * .18);
		const steady = this.holding && this.breath > .02;
		if (this.reloading > 0) this.reloading = Math.max(0, this.reloading - dt);
		this.recoil = Math.max(0, this.recoil - dt * .08);
		if (this.flash.intensity > 0) {
			this.flash.intensity = Math.max(0, this.flash.intensity - dt * 40);
			if (this.flash.intensity < .2) this.muzzle.visible = false;
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
		const amp = this.scoped ? steady ? 35e-5 : .0034 : 6e-4;
		const swayY = Math.sin(this.t * 1.6) * amp + Math.sin(this.t * .47) * amp * .4;
		const swayP = Math.cos(this.t * 1.9) * amp * .65;
		this.camera.rotation.y = this.yaw + swayY;
		this.camera.rotation.x = this.pitch + swayP + this.recoil;
		const fovTarget = this.scoped ? 11 : 68;
		this.camera.fov += (fovTarget - this.camera.fov) * Math.min(1, dt * 10);
		this.camera.updateProjectionMatrix();
		const gun = this.camera.children[0];
		if (gun) gun.visible = !this.scoped || this.camera.fov > 30;
		for (const s of this.soldiers) {
			if (s.move && s.alive) {
				const m = s.move;
				const off = Math.sin(this.t * m.speed + m.phase) * m.amp;
				if (m.axis === "x") s.group.position.x = s.base.x + off;
				else s.group.position.z = s.base.z + off;
				s.group.rotation.y = Math.cos(this.t * m.speed + m.phase) * .15;
			}
			if (s.peek && s.alive) {
				const targetY = Math.sin(this.t * .7 + s.phase) > .15 ? s.base.y : s.base.y - 1.35;
				s.group.position.y += (targetY - s.group.position.y) * Math.min(1, dt * 4);
			}
			if (s.fall > 0 && s.fall < 1) {
				s.fall = Math.min(1, s.fall + dt * 1.8);
				s.group.rotation.x = -s.fall * 1.4;
				s.group.position.y = s.base.y - s.fall * .3;
			}
		}
		this.sampleRange();
		this.hudAcc += dt;
		if (this.hudAcc > .12) {
			this.hudAcc = 0;
			this.pushHud();
		}
		this.renderer.render(this.scene, this.camera);
	};
	sampleRange() {
		this.camera.getWorldDirection(this.dir);
		this.ray.set(this.camera.position, this.dir);
		const meshes = [];
		for (const s of this.soldiers) {
			if (!s.alive) continue;
			for (const b of s.boxes) meshes.push(b.mesh);
		}
		const first = this.ray.intersectObjects(meshes, false)[0];
		this.dist = first ? Math.round(first.distance) : null;
	}
	pushHud() {
		this.onHud({
			ammo: this.ammo,
			ammoMax: this.mission.ammo,
			kills: this.kills,
			need: this.mission.need,
			wind: this.mission.wind,
			breath: this.breath,
			scoped: this.scoped,
			holding: this.holding && this.breath > .02,
			distance: this.dist,
			timeLeft: this.timeLeft,
			reloading: this.reloading > 0,
			hit: this.hit,
			score: this.score,
			banner: this.bannerTimer > 0 ? this.banner : ""
		});
	}
	buildWorld() {
		const m = this.mission;
		const ground = new Mesh(new PlaneGeometry(600, 600), new MeshStandardMaterial({
			color: m.ground,
			roughness: 1
		}));
		ground.rotation.x = -Math.PI / 2;
		ground.receiveShadow = true;
		this.scene.add(ground);
		const hillMat = new MeshStandardMaterial({
			color: m.hill,
			roughness: 1
		});
		for (let i = 0; i < 9; i++) {
			const hill = new Mesh(new SphereGeometry(12 + i % 4 * 6, 10, 8), hillMat);
			hill.scale.y = .35;
			hill.position.set((i - 4) * 28 + i % 2 * 8, -2, -80 - i * 22);
			this.scene.add(hill);
		}
		const trunk = new MeshStandardMaterial({
			color: 5914672,
			roughness: .9
		});
		const leaf = new MeshStandardMaterial({
			color: m.id === "night" ? 2371624 : 4086328,
			roughness: .85
		});
		for (let i = 0; i < 28; i++) {
			const x = (i % 2 === 0 ? -1 : 1) * (16 + i % 5 * 4);
			const z = -20 - i * 9;
			const t = new Mesh(new CylinderGeometry(.25, .4, 3.2, 6), trunk);
			t.position.set(x, 1.6, z);
			t.castShadow = true;
			const c = new Mesh(new ConeGeometry(1.8, 4.2, 7), leaf);
			c.position.set(x, 4.2, z);
			c.castShadow = true;
			this.scene.add(t, c);
		}
		if (m.id === "roofs" || m.id === "night") {
			const wall = new MeshStandardMaterial({
				color: m.id === "night" ? 2895926 : 12036248,
				roughness: .9
			});
			const roof = new MeshStandardMaterial({
				color: 7225396,
				roughness: .8
			});
			for (const [x, z, w, h] of [
				[
					-12,
					-40,
					8,
					6
				],
				[
					10,
					-55,
					10,
					9
				],
				[
					-6,
					-72,
					7,
					5
				],
				[
					14,
					-90,
					9,
					7
				],
				[
					-16,
					-108,
					8,
					6
				]
			]) {
				const b = new Mesh(new BoxGeometry(w, h, 6), wall);
				b.position.set(x, h / 2, z);
				b.castShadow = true;
				b.receiveShadow = true;
				const r = new Mesh(new BoxGeometry(w + .6, .35, 6.6), roof);
				r.position.set(x, h + .2, z);
				this.scene.add(b, r);
			}
		}
		const postMat = new MeshStandardMaterial({
			color: 14209732,
			roughness: .6
		});
		for (const mark of [
			50,
			100,
			150,
			200,
			250
		]) {
			const p = new Mesh(new BoxGeometry(.15, 1.6, .15), postMat);
			p.position.set(-14, .8, -mark + this.mission.cam[2]);
			this.scene.add(p);
		}
	}
	spawnTargets() {
		for (const spec of this.mission.targets) {
			const built = buildSoldier(spec.color);
			built.group.scale.setScalar(1.35);
			built.group.position.set(spec.x, spec.y, spec.z);
			this.scene.add(built.group);
			const soldier = {
				group: built.group,
				boxes: built.boxes.map((b) => ({
					...b,
					group: built.group
				})),
				alive: true,
				base: new Vector3(spec.x, spec.y, spec.z),
				move: spec.move,
				peek: !!spec.peek,
				phase: spec.x,
				fall: 0
			};
			this.soldiers.push(soldier);
		}
	}
};
function segmentHits(a, b, c, r) {
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
var SAVE_KEY = "longshot-best-v1";
function loadBest() {
	try {
		return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}");
	} catch {
		return {};
	}
}
function Home() {
	const [best, setBest] = (0, import_react.useState)({});
	const [picked, setPicked] = (0, import_react.useState)(MISSIONS[0]);
	const [phase, setPhase] = (0, import_react.useState)("menu");
	const [run, setRun] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setBest(loadBest());
	}, []);
	const start = (m) => {
		setPicked(m);
		setRun((n) => n + 1);
		setPhase("play");
	};
	const save = (m, r) => {
		if (!r.win) return;
		setBest((prev) => {
			const cur = prev[m.id];
			const next = {
				...prev,
				[m.id]: {
					stars: Math.max(cur?.stars ?? 0, r.stars),
					score: Math.max(cur?.score ?? 0, r.score)
				}
			};
			localStorage.setItem(SAVE_KEY, JSON.stringify(next));
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "relative h-full w-full overflow-hidden bg-bg text-fg",
		children: phase === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefing, {
			best,
			picked,
			onPick: setPicked,
			onDeploy: () => start(picked)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, {
			mission: picked,
			onExit: () => setPhase("menu"),
			onDone: (r) => save(picked, r),
			onRetry: () => start(picked),
			onNext: () => {
				const i = MISSIONS.findIndex((m) => m.id === picked.id);
				const nxt = MISSIONS[Math.min(MISSIONS.length - 1, i + 1)];
				start(nxt);
			}
		}, run)
	});
}
function Briefing({ best, picked, onPick, onDeploy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col md:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-1 flex-col justify-between gap-6 px-5 py-6 md:px-10 md:py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm tracking-[0.28em] text-brass",
					children: "FIELD MANUAL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-2 text-5xl leading-none font-semibold tracking-wide text-fg md:text-8xl",
					children: "LONGSHOT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-base leading-relaxed text-muted",
					children: "A bolt-action range. The round drops and the wind pushes it. Scope in, steady your breath, and place the mil-dot — not the crosshair — on the target."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-lg border border-line bg-bg-raised p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl tracking-wide",
							children: picked.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-brass tracking-widest",
							children: ["0", picked.index]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-brass",
						children: picked.place
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: picked.brief
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-3 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Rounds",
								v: String(picked.ammo)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Contacts",
								v: String(picked.need)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Wind",
								v: `${picked.wind > 0 ? "L" : "R"} ${Math.abs(picked.wind).toFixed(1)}`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onDeploy,
						className: "mt-5 h-12 w-full bg-brass font-display text-xl tracking-[0.18em] text-bg transition-opacity hover:opacity-90",
						children: "DEPLOY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-muted",
						children: "Desktop: click to aim, left click fire, right click scope, hold Shift to steady. Phone: drag to aim, use the buttons."
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "flex max-h-[46%] flex-col gap-2 overflow-auto border-t border-line bg-bg-raised p-3 md:max-h-none md:w-[22rem] md:border-t-0 md:border-l",
			children: MISSIONS.map((m) => {
				const b = best[m.id];
				const on = m.id === picked.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(m),
					className: `flex items-center justify-between gap-3 border px-3 py-3 text-left ${on ? "border-brass bg-surface" : "border-line bg-bg"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display block text-xl tracking-wide",
						children: m.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: m.place
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-brass",
						children: b ? "●".repeat(b.stars) + "○".repeat(3 - b.stars) : "○○○"
					})]
				}, m.id);
			})
		})]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-wide text-muted uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-2xl leading-none",
			children: v
		})]
	});
}
var EMPTY = {
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
	banner: ""
};
function Range({ mission, onExit, onDone, onRetry, onNext }) {
	const canvasRef = (0, import_react.useRef)(null);
	const gameRef = (0, import_react.useRef)(null);
	const [hud, setHud] = (0, import_react.useState)({
		...EMPTY,
		ammo: mission.ammo,
		ammoMax: mission.ammo,
		need: mission.need,
		wind: mission.wind,
		timeLeft: mission.time || null
	});
	const [result, setResult] = (0, import_react.useState)(null);
	const onHud = (0, import_react.useCallback)((h) => setHud(h), []);
	const handleEnd = (0, import_react.useCallback)((r) => {
		setResult(r);
		onDone(r);
	}, [onDone]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const game = new SniperGame(canvas, mission, {
			onHud,
			onEnd: handleEnd
		});
		gameRef.current = game;
		game.start();
		return () => {
			game.dispose();
			gameRef.current = null;
		};
	}, [
		mission,
		onHud,
		handleEnd
	]);
	const windDir = hud.wind >= 0 ? "FROM LEFT" : "FROM RIGHT";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full w-full touch-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 h-full w-full"
			}),
			!hud.scoped && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-0 h-px w-full bg-fg/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 h-full w-px bg-fg/80" })]
			}),
			hud.scoped && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scope, { holding: hud.holding }),
			hud.hit && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 border-2 ${hud.hit === "miss" ? "border-muted" : "border-brass"}` }),
			hud.banner && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute top-[18%] left-1/2 -translate-x-1/2 font-display text-4xl tracking-[0.2em] text-brass",
				children: hud.banner
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 md:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-bg/75 px-3 py-2 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-[0.22em] text-brass",
						children: mission.place
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl leading-none",
						children: mission.name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }),
							label: `${hud.kills}/${hud.need}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "size-4" }),
							label: String(hud.score)
						}),
						hud.timeLeft != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4" }),
							label: `${Math.ceil(hud.timeLeft)}s`
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute bottom-24 left-3 flex flex-col gap-2 md:bottom-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-bg/75 px-3 py-2 text-sm backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-xs tracking-widest text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-4 text-brass" }),
									" WIND ",
									windDir
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl leading-none",
								children: [Math.abs(hud.wind).toFixed(1), " m/s"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: hud.wind >= 0 ? "Hold right of target" : "Hold left of target"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-40 bg-bg/75 px-3 py-2 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-muted",
							children: "BREATH"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-2 bg-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-olive",
								style: { width: `${Math.round(hud.breath * 100)}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "bg-bg/75 px-3 py-2 font-display text-xl backdrop-blur-sm",
						children: [hud.distance != null ? `${hud.distance} m` : "— m", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-3 text-brass",
							children: hud.reloading ? "BOLT" : `${hud.ammo} RD`
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onExit,
				className: "absolute top-3 left-1/2 hidden -translate-x-1/2 bg-bg/70 px-3 py-2 text-xs tracking-widest text-muted md:block",
				children: "ABORT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-3 bottom-4 flex flex-col gap-2 md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, {
						label: "SCOPE",
						onDown: () => gameRef.current?.toggleScope()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, {
						label: "STEADY",
						onDown: () => gameRef.current?.setBreath(true),
						onUp: () => gameRef.current?.setBreath(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, {
						label: "FIRE",
						onDown: () => gameRef.current?.fireFromUi(),
						primary: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onExit,
				className: "absolute bottom-4 left-3 bg-bg/80 px-4 py-3 text-xs tracking-widest md:hidden",
				children: "ABORT"
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-bg/80 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md border border-line bg-bg-raised p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display tracking-[0.25em] text-brass",
							children: result.win ? "RANGE CLEAR" : "MISSION FAILED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-5xl",
							children: result.win ? "●".repeat(result.stars) + "○".repeat(3 - result.stars) : "NO STARS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Score",
									v: String(result.score)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Drops",
									v: `${result.kills}/${mission.need}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Shots",
									v: String(result.shots)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Heads",
									v: String(result.heads)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onRetry,
									className: "h-12 bg-brass font-display text-xl tracking-widest text-bg",
									children: "RUN IT BACK"
								}),
								result.win && mission.index < MISSIONS.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onNext,
									className: "h-12 border border-brass font-display text-xl tracking-widest text-brass",
									children: "NEXT RANGE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onExit,
									className: "h-11 text-sm tracking-widest text-muted",
									children: "BACK TO BRIEFING"
								})
							]
						})
					]
				})
			})
		]
	});
}
function Chip({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 bg-bg/75 px-3 py-2 font-display text-xl backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-brass",
			children: icon
		}), label]
	});
}
function Touch({ label, onDown, onUp, primary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onPointerDown: (e) => {
			e.stopPropagation();
			onDown();
		},
		onPointerUp: (e) => {
			e.stopPropagation();
			onUp?.();
		},
		onPointerLeave: () => onUp?.(),
		className: `h-14 w-28 font-display text-lg tracking-widest ${primary ? "bg-brass text-bg" : "border border-brass bg-bg/80 text-fg"}`,
		children: label
	});
}
function Scope({ holding }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 flex items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,#070907_46%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 200 200",
				className: "relative h-[min(78vh,78vw)] w-[min(78vh,78vw)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "100",
						cy: "100",
						r: "92",
						fill: "none",
						stroke: "#c6a15a",
						strokeWidth: "1.2",
						opacity: "0.85"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "100",
						cy: "100",
						r: "2",
						fill: "#efe6d4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "100",
						y1: "8",
						x2: "100",
						y2: "192",
						stroke: "#efe6d4",
						strokeWidth: "0.6",
						opacity: "0.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "8",
						y1: "100",
						x2: "192",
						y2: "100",
						stroke: "#efe6d4",
						strokeWidth: "0.6",
						opacity: "0.8"
					}),
					[
						12,
						24,
						36,
						48
					].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: 94,
							y1: 100 + d,
							x2: 106,
							y2: 100 + d,
							stroke: "#c6a15a",
							strokeWidth: "0.8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: 100 - d,
							y1: 94,
							x2: 100 - d,
							y2: 106,
							stroke: "#efe6d4",
							strokeWidth: "0.5",
							opacity: "0.7"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: 100 + d,
							y1: 94,
							x2: 100 + d,
							y2: 106,
							stroke: "#efe6d4",
							strokeWidth: "0.5",
							opacity: "0.7"
						})
					] }, d))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `absolute bottom-[14%] font-display tracking-[0.3em] ${holding ? "text-olive" : "text-muted"}`,
				children: holding ? "STEADY" : "HOLD SHIFT"
			})
		]
	});
}
//#endregion
export { Home as component };
