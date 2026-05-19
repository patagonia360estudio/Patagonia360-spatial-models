/**
 * Casa Palm — CasaPalmViewer
 *
 * ╔══════════════════════════════════════════════════════════╗
 * ║  SCALE POLICY: NEVER MODIFIED                           ║
 * ║  Models are pre-scaled in Blender for real-world AR.    ║
 * ║  Only centering (X/Z) and floor placement (Y) applied.  ║
 * ║  root.scale is NEVER touched.                           ║
 * ╚══════════════════════════════════════════════════════════╝
 */

import * as THREE               from 'three';
import { GLTFLoader }           from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader }          from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls }        from 'three/addons/controls/OrbitControls.js';
import { TransformControls }    from 'three/addons/controls/TransformControls.js';
import { RoomEnvironment }      from 'three/addons/environments/RoomEnvironment.js';

/* ─── PBR finish presets ─────────────────────────────────── */
export const FINISHES = {
  matte:  { roughness: 0.88, metalness: 0.02, envMapIntensity: 0.20 },
  satin:  { roughness: 0.50, metalness: 0.10, envMapIntensity: 0.55 },
  gloss:  { roughness: 0.08, metalness: 0.20, envMapIntensity: 1.10 },
  metal:  { roughness: 0.15, metalness: 0.95, envMapIntensity: 1.70 },
};

/* ─── Material color palette ─────────────────────────────── */
export const PALETTE = [
  { hex: '#8B6914', name: 'Madera Natural' },
  { hex: '#2A2A28', name: 'Ébano' },
  { hex: '#F0EBE3', name: 'Blanco Arena' },
  { hex: '#5C6470', name: 'Gris Piedra' },
  { hex: '#6B3D0A', name: 'Nogal' },
  { hex: '#2A5F42', name: 'Verde Oliva' },
  { hex: '#8B2020', name: 'Terracota' },
  { hex: '#1A3F6B', name: 'Índigo' },
];

/* ═══════════════════════════════════════════════════════════
   CasaPalmViewer
   ═══════════════════════════════════════════════════════════ */
export class CasaPalmViewer {

  constructor({ canvas, onProgress = () => {}, onLoad = () => {}, onError = console.error } = {}) {
    this.canvas     = canvas;
    this.onProgress = onProgress;
    this.onLoad     = onLoad;
    this.onError    = onError;

    this._meshes   = [];
    this._origMats = new Map();
    this._tool     = 'orbit';
    this._rafId    = null;

    this._setup();
    this._loop();
    this._bindResize();
  }

  /* ── Scene construction ──────────────────────────────────── */
  _setup() {
    const W = this.canvas.clientWidth  || window.innerWidth;
    const H = this.canvas.clientHeight || window.innerHeight;

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({
      canvas:                this.canvas,
      antialias:             true,
      alpha:                 false,
      preserveDrawingBuffer: true,   // ← needed for screenshot
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(W, H, false);
    this.renderer.shadowMap.enabled  = true;
    this.renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace   = THREE.SRGBColorSpace;
    this.renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.30;

    /* Scene */
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0B0B09);

    /* PMREM environment — baked RoomEnvironment IBL */
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(44, W / H, 0.01, 500);
    this.camera.position.set(2, 1.4, 3.5);

    /* Lighting — warm cinematic showroom */
    this._setupLights();

    /* Floor */
    this._setupFloor();

    /* Subtle atmospheric fog */
    this.scene.fog = new THREE.FogExp2(0x09090A, 0.045);

    /* Orbit controls */
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.enableDamping      = true;
    this.orbit.dampingFactor      = 0.07;
    this.orbit.screenSpacePanning = false;
    this.orbit.minDistance        = 0.15;
    this.orbit.maxDistance        = 80;
    this.orbit.maxPolarAngle      = Math.PI / 2 + 0.05;
    this.orbit.target.set(0, 0.6, 0);
    this.orbit.update();

    /* Transform controls (move / rotate / scale gizmo) */
    this.transform = new TransformControls(this.camera, this.renderer.domElement);
    this.transform.size = 0.70;
    this.transform.addEventListener('dragging-changed', e => {
      this.orbit.enabled = !e.value;
    });
    /* Clamp user-driven scale — model's BASE scale is NEVER changed */
    this.transform.addEventListener('objectChange', () => {
      if (!this._pivot) return;
      const s = this._pivot.scale.x;
      if (s < 0.20) this._pivot.scale.setScalar(0.20);
      if (s > 3.50) this._pivot.scale.setScalar(3.50);
    });
    this.scene.add(this.transform);

    /* Pivot group — TransformControls operates on this, NOT on the model */
    this._pivot = new THREE.Group();
    this.scene.add(this._pivot);
  }

  _setupLights() {
    /* Key — warm tungsten studio softbox */
    const key = new THREE.DirectionalLight(0xFFF6E8, 2.5);
    key.position.set(5, 10, 6);
    key.castShadow = true;
    Object.assign(key.shadow.mapSize, { width: 2048, height: 2048 });
    Object.assign(key.shadow.camera,  { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 50 });
    key.shadow.bias       = -0.0003;
    key.shadow.normalBias =  0.025;
    this.scene.add(key);

    /* Fill — cool daylight from opposite window */
    const fill = new THREE.DirectionalLight(0xD5E5FF, 0.42);
    fill.position.set(-7, 4, -5);
    this.scene.add(fill);

    /* Rim — warm product edge separation */
    const rim = new THREE.DirectionalLight(0xFFE0A0, 0.58);
    rim.position.set(0, 7, -8);
    this.scene.add(rim);

    /* Ground bounce — warm reflected floor light */
    const bounce = new THREE.DirectionalLight(0xFFD090, 0.20);
    bounce.position.set(0, -3, 3);
    this.scene.add(bounce);

    /* Hemisphere — warm sky / dark earth */
    this.scene.add(new THREE.HemisphereLight(0xFFF2D8, 0x120A02, 0.32));

    /* Base ambient */
    this.scene.add(new THREE.AmbientLight(0xFFFAF2, 0.15));
  }

  _setupFloor() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x0E0E0C, roughness: 0.95, metalness: 0 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const grid = new THREE.GridHelper(20, 40, 0x1E1E1C, 0x181816);
    grid.position.y = 0.001;
    this.scene.add(grid);
  }

  /* ── Model loading ───────────────────────────────────────── */
  loadModel(url) {
    /* Tear down previous */
    this._clearScene();
    this.onProgress(4);

    const draco = new DRACOLoader();
    draco.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    loader.load(
      url,
      gltf => {
        this.onProgress(90);
        const root = gltf.scene;

        /* ══════════════════════════════════════════════════
           POSITION ONLY — scale is NEVER modified
           Models already carry real-world dimensions from Blender.
           ══════════════════════════════════════════════════ */
        const box    = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size   = box.getSize(new THREE.Vector3());

        root.position.x -= center.x;   // center on X axis
        root.position.z -= center.z;   // center on Z axis
        root.position.y -= box.min.y;  // sit on floor (y = 0)
        /* root.scale is NEVER touched ─────────────────────── */

        /* Shadows + PBR materials */
        root.traverse(node => {
          if (!node.isMesh) return;
          node.castShadow    = true;
          node.receiveShadow = true;
          this._meshes.push(node);
          if (node.material) {
            this._ensurePBR(node);
            this._origMats.set(node.uuid, node.material.clone());
          }
        });

        this._pivot.add(root);

        /* Camera framing — adapts to real model size, no scale change */
        this._frameCameraTo(box, size);

        /* Attach gizmo to pivot */
        this.transform.attach(this._pivot);
        this.transform.visible = false;

        this.onProgress(100);
        this.onLoad({ size, box, product: this._currentProduct });

        /* Cinematic pop-in entrance */
        this._entranceAnim();
      },
      xhr => {
        if (xhr.total > 0) this.onProgress(4 + (xhr.loaded / xhr.total) * 84);
      },
      err => {
        console.warn('[CasaPalmViewer] GLB not found, using fallback:', err.message);
        this._buildFallback();
        this.onError(err);
      }
    );
  }

  /** Ensure mesh has MeshStandardMaterial for runtime color changes */
  _ensurePBR(node) {
    if (!node.material.isMeshStandardMaterial) {
      node.material = new THREE.MeshStandardMaterial({
        color:     node.material.color ?? new THREE.Color(0x8B6914),
        map:       node.material.map   ?? null,
        roughness: 0.72,
        metalness: 0.05,
      });
    }
  }

  /**
   * Position camera to frame the model at its REAL scale.
   * Uses FOV math — camera moves, model does not.
   */
  _frameCameraTo(box, size) {
    const fovRad  = this.camera.fov * (Math.PI / 180);
    const maxDim  = Math.max(size.x, size.y, size.z);
    const fitDist = (maxDim * 0.5) / Math.tan(fovRad * 0.5);
    const dist    = fitDist * 1.90;
    const targetY = size.y * 0.42;

    this.camera.position.set(dist * 0.65, targetY + dist * 0.22, dist);
    this.camera.near = Math.max(0.01, dist * 0.008);
    this.camera.far  = dist * 60;
    this.camera.updateProjectionMatrix();

    this.orbit.target.set(0, targetY, 0);
    this.orbit.minDistance = dist * 0.18;
    this.orbit.maxDistance = dist * 5.0;
    this.orbit.update();
  }

  /** Smooth scale-in entrance animation */
  _entranceAnim() {
    this._pivot.scale.setScalar(0.001);
    const t0 = performance.now();
    const run = t => {
      const p = Math.min((t - t0) / 680, 1);
      const e = 1 - Math.pow(1 - p, 3);
      this._pivot.scale.setScalar(0.001 + 0.999 * e);
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  /** Elegant placeholder when GLB is unavailable */
  _buildFallback() {
    const g      = new THREE.Group();
    const woodM  = new THREE.MeshStandardMaterial({ color: 0x8B6914, roughness: 0.72, metalness: 0.04 });
    const metalM = new THREE.MeshStandardMaterial({ color: 0xC8A96E, roughness: 0.20, metalness: 0.90 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.80, 0.42), woodM);
    body.position.y = 0.47;
    body.castShadow = body.receiveShadow = true;
    g.add(body);

    [[-0.52,-0.17],[0.52,-0.17],[-0.52,0.17],[0.52,0.17]].forEach(([x,z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022,0.018,0.12,10), metalM);
      leg.position.set(x, 0.06, z);
      leg.castShadow = true;
      g.add(leg);
    });

    const linePts = [new THREE.Vector3(0,-0.40,0.222), new THREE.Vector3(0,0.40,0.222)];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(linePts),
      new THREE.LineBasicMaterial({ color: 0x4A3008, transparent: true, opacity: 0.6 })
    );
    line.position.y = 0.47;
    g.add(line);

    [-0.30, 0.30].forEach(x => {
      const h = new THREE.Mesh(new THREE.TorusGeometry(0.044,0.009,8,24,Math.PI), metalM);
      h.position.set(x, 0.47, 0.224);
      h.rotation.z = Math.PI / 2;
      h.castShadow = true;
      g.add(h);
    });

    this._pivot.add(g);
    g.traverse(n => {
      if (!n.isMesh) return;
      this._meshes.push(n);
      this._origMats.set(n.uuid, n.material.clone());
    });

    const box  = new THREE.Box3().setFromObject(g);
    const size = box.getSize(new THREE.Vector3());
    this._frameCameraTo(box, size);

    this.transform.attach(this._pivot);
    this.transform.visible = false;
    this._entranceAnim();
    this.onProgress(100);
    this.onLoad({ size, box });
  }

  _clearScene() {
    this.transform.detach();
    this.transform.visible = false;
    while (this._pivot.children.length) this._pivot.remove(this._pivot.children[0]);
    this._meshes.length = 0;
    this._origMats.clear();
  }

  /* ── Tool system ─────────────────────────────────────────── */
  setTool(tool) {
    this._tool = tool;
    switch (tool) {
      case 'orbit':
        this.transform.visible = false;
        break;
      case 'move':
        this.transform.mode   = 'translate';
        this.transform.showX  = true;
        this.transform.showY  = false;
        this.transform.showZ  = true;
        this.transform.visible = true;
        break;
      case 'rotate':
        this.transform.mode   = 'rotate';
        this.transform.showX  = false;
        this.transform.showY  = true;
        this.transform.showZ  = false;
        this.transform.visible = true;
        break;
      case 'scale':
        this.transform.mode   = 'scale';
        this.transform.showX  = true;
        this.transform.showY  = true;
        this.transform.showZ  = true;
        this.transform.visible = true;
        break;
      case 'color':
        this.transform.visible = false;
        break;
    }
  }

  /* ── Material system ─────────────────────────────────────── */
  applyMaterial(hex, finish = 'matte') {
    if (!this._meshes.length) return;
    const col = new THREE.Color(hex);
    const fp  = FINISHES[finish] ?? FINISHES.matte;
    this._meshes.forEach(m => {
      if (!m.material?.isMeshStandardMaterial) return;
      m.material.color.copy(col);
      m.material.roughness       = fp.roughness;
      m.material.metalness       = fp.metalness;
      m.material.envMapIntensity = fp.envMapIntensity;
      m.material.needsUpdate     = true;
    });
  }

  resetMaterials() {
    this._meshes.forEach(m => {
      const orig = this._origMats.get(m.uuid);
      if (orig) { m.material.copy(orig); m.material.needsUpdate = true; }
    });
  }

  /* ── Screenshot with branding ────────────────────────────── */
  screenshot(productName = '') {
    this.renderer.render(this.scene, this.camera);
    const src   = this.canvas;
    const out   = document.createElement('canvas');
    out.width   = src.width;
    out.height  = src.height;
    const ctx   = out.getContext('2d');
    ctx.drawImage(src, 0, 0);

    const barH = Math.max(56, src.height * 0.06);
    const grad = ctx.createLinearGradient(0, src.height - barH, 0, src.height);
    grad.addColorStop(0, 'rgba(8,8,7,0)');
    grad.addColorStop(0.35, 'rgba(8,8,7,0.86)');
    grad.addColorStop(1,    'rgba(8,8,7,0.97)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, src.height - barH, src.width, barH);

    const px = src.width * 0.032;
    const py = src.height - barH * 0.28;
    ctx.font         = `300 ${barH * 0.40}px 'Cormorant Garamond', serif`;
    ctx.fillStyle    = '#C8A96E';
    ctx.fillText('CASA PALM', px, py);
    ctx.font         = `400 ${barH * 0.22}px 'DM Sans', sans-serif`;
    ctx.fillStyle    = 'rgba(245,240,232,0.40)';
    ctx.fillText(`${productName}  ·  casapalm.com`, px, py + barH * 0.30);

    out.toBlob(blob => {
      const a      = document.createElement('a');
      a.href       = URL.createObjectURL(blob);
      a.download   = `casapalm-${Date.now()}.jpg`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 6000);
    }, 'image/jpeg', 0.93);
  }

  /* ── AR launch ───────────────────────────────────────────── */
  launchAR(mvEl, product) {
    if (mvEl?.activateAR) { mvEl.activateAR(); return 'webxr'; }
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS && product?.usdz) {
      const a = Object.assign(document.createElement('a'), { rel: 'ar', href: product.usdz });
      a.appendChild(document.createElement('img'));
      document.body.appendChild(a);
      a.click();
      setTimeout(() => a.remove(), 400);
      return 'quicklook';
    }
    return 'unsupported';
  }

  /* ── Render loop ─────────────────────────────────────────── */
  _loop() {
    this._rafId = requestAnimationFrame(() => this._loop());
    this.orbit.update();
    if (this._pivot && this._tool === 'orbit') {
      this._pivot.position.y = Math.sin(performance.now() * 0.00046) * 0.014;
    }
    this.renderer.render(this.scene, this.camera);
  }

  /* ── Resize ──────────────────────────────────────────────── */
  _bindResize() {
    this._resizeFn = () => {
      const W = this.canvas.clientWidth;
      const H = this.canvas.clientHeight;
      this.camera.aspect = W / H;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(W, H, false);
    };
    window.addEventListener('resize', this._resizeFn, { passive: true });
  }

  /* ── Cleanup ─────────────────────────────────────────────── */
  dispose() {
    cancelAnimationFrame(this._rafId);
    window.removeEventListener('resize', this._resizeFn);
    this.renderer.dispose();
  }
}
