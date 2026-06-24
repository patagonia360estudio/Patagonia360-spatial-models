<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#080807">
  <title>Casa Palm — Visor AR</title>

  <!-- model-viewer: AR nativo iOS + Android -->
  <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

  <!-- Three.js via importmap -->
  <script type="importmap">
  {
    "imports": {
      "three":         "https://unpkg.com/three@0.160.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
    }
  }
  </script>

  <style>
  /* ── Reset ──────────────────────────────────────────────── */
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;height:100%;overflow:hidden;background:#080807}
  :root{
    --oro:#C8A96E;--oro-l:#E5D4A8;--oro-d:#7A6540;
    --crema:#F5F0E8;--niebla:#9A9288;--fantasma:#524E4A;
    --sup:#141412;--sup2:#1C1C1A;--borde:#252522;--borde-hi:#363632;
    --serif:'Cormorant Garamond',Georgia,serif;
    --sans:'DM Sans',system-ui,sans-serif;
    --tr:280ms cubic-bezier(.4,0,.2,1);
    --r:12px;--r-lg:20px;
  }
  body{color:var(--crema);font-family:var(--sans);-webkit-font-smoothing:antialiased}

  /* ── Loader ──────────────────────────────────────────────── */
  #loader{position:fixed;inset:0;z-index:9999;background:#080807;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    transition:opacity .8s ease,visibility .8s}
  #loader.out{opacity:0;visibility:hidden;pointer-events:none}
  .l-logo{font-family:var(--serif);font-size:clamp(32px,6vw,52px);font-weight:300;
    letter-spacing:.2em;opacity:0;animation:fadeUp .7s ease .1s forwards}
  .l-logo em{color:var(--oro);font-style:normal}
  .l-sub{font-size:9px;letter-spacing:.28em;text-transform:uppercase;
    color:var(--fantasma);margin:6px 0 52px;opacity:0;animation:fadeUp .7s ease .3s forwards}
  .l-track{width:160px;height:1px;background:var(--borde);position:relative;overflow:hidden}
  .l-fill{position:absolute;left:0;top:0;height:100%;width:0%;
    background:linear-gradient(90deg,var(--oro-d),var(--oro),var(--oro-l));transition:width .15s ease}
  .l-pct{margin-top:12px;font-size:10px;letter-spacing:.16em;color:var(--fantasma);
    opacity:0;animation:fadeUp .7s ease .5s forwards}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

  /* ── Viewport ────────────────────────────────────────────── */
  #vp{position:fixed;inset:0}
  #cv{width:100%;height:100%;display:block}

  /* model-viewer oculto — solo se activa para AR */
  #mv{position:absolute;inset:0;width:100%;height:100%;
    --poster-color:transparent;opacity:0;pointer-events:none;z-index:0}
  /* 
    ⬆ NO ponemos 'ar-active' class en este elemento.
    El AR se lanza con activateAR() o con el enlace iOS.
  */

  /* ── Top bar ─────────────────────────────────────────────── */
  #topbar{position:fixed;top:0;left:0;right:0;z-index:50;height:60px;
    display:flex;align-items:center;justify-content:space-between;padding:0 18px;
    background:linear-gradient(180deg,rgba(8,8,7,.92) 0%,transparent 100%);
    pointer-events:none}
  #topbar>*{pointer-events:all}
  .back{display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:var(--r);
    background:rgba(20,20,18,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
    border:1px solid var(--borde);font-family:var(--sans);font-size:11px;
    letter-spacing:.10em;text-transform:uppercase;color:var(--niebla);
    cursor:pointer;transition:var(--tr);text-decoration:none}
  .back:hover{border-color:var(--borde-hi);color:var(--crema)}
  .back svg{width:14px;height:14px}
  .top-logo{font-family:var(--serif);font-size:17px;font-weight:400;
    letter-spacing:.14em;display:none}
  .top-logo em{color:var(--oro);font-style:normal}
  @media(min-width:480px){.top-logo{display:block}}
  .topright{display:flex;gap:8px}
  .ibtn{width:40px;height:40px;border-radius:50%;
    background:rgba(20,20,18,.80);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
    border:1px solid var(--borde);color:var(--niebla);display:flex;
    align-items:center;justify-content:center;cursor:pointer;transition:var(--tr)}
  .ibtn svg{width:16px;height:16px}
  .ibtn:hover,.ibtn.on{border-color:var(--oro-d);color:var(--oro);
    background:rgba(200,169,110,.10)}

  /* ── Chip producto ───────────────────────────────────────── */
  #chip{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:48;
    display:flex;align-items:center;gap:9px;padding:7px 18px;border-radius:100px;
    background:rgba(12,12,10,.86);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
    border:1px solid var(--borde);pointer-events:none;white-space:nowrap}
  .chip-dot{width:6px;height:6px;border-radius:50%;background:var(--oro);
    box-shadow:0 0 8px var(--oro);animation:pulse 2.4s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
  #chip-name{font-size:12px;font-weight:500;letter-spacing:.04em}
  #chip-price{font-size:11px;color:var(--oro);letter-spacing:.08em}

  /* ── Hint ────────────────────────────────────────────────── */
  #hint{position:fixed;bottom:98px;left:50%;transform:translateX(-50%);z-index:48;
    padding:5px 15px;border-radius:100px;
    background:rgba(8,8,7,.65);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
    border:1px solid var(--borde);font-size:10px;color:var(--fantasma);
    letter-spacing:.10em;white-space:nowrap;pointer-events:none;transition:var(--tr)}

  /* ── Scan ring ───────────────────────────────────────────── */
  #scan{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    width:150px;height:150px;z-index:46;pointer-events:none;
    opacity:0;transition:opacity .4s ease}
  #scan.show{opacity:1}

  /* ── Toolbar ─────────────────────────────────────────────── */
  #toolbar{position:fixed;bottom:0;left:0;right:0;z-index:50;height:88px;
    display:flex;align-items:center;justify-content:center;gap:8px;
    padding:0 16px 18px;
    background:linear-gradient(0deg,rgba(8,8,7,1) 50%,transparent 100%);
    pointer-events:none}
  #toolbar>*{pointer-events:all}
  .tgrp{display:flex;gap:3px;background:var(--sup);border:1px solid var(--borde);
    border-radius:var(--r);padding:4px}
  .tbtn{display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:3px;padding:8px 11px;min-width:48px;border-radius:8px;border:none;
    background:transparent;cursor:pointer;color:var(--fantasma);
    font-family:var(--sans);font-size:8.5px;font-weight:400;
    letter-spacing:.11em;text-transform:uppercase;transition:var(--tr)}
  .tbtn svg{width:17px;height:17px}
  .tbtn:hover{color:var(--niebla);background:rgba(255,255,255,.04)}
  .tbtn.on{background:rgba(200,169,110,.15);color:var(--oro)}

  /* Botón AR — principal */
  .ar-btn{display:flex;align-items:center;gap:7px;padding:11px 20px;border-radius:var(--r);
    background:linear-gradient(135deg,var(--oro-d),var(--oro));
    border:none;cursor:pointer;font-family:var(--sans);font-size:12px;font-weight:500;
    letter-spacing:.11em;text-transform:uppercase;color:#080807;
    transition:var(--tr);flex-shrink:0}
  .ar-btn:hover{background:linear-gradient(135deg,var(--oro),var(--oro-l));
    box-shadow:0 8px 28px rgba(200,169,110,.32);transform:translateY(-1px)}
  .ar-btn:active{transform:scale(.97)}
  .ar-btn svg{width:15px;height:15px}
  @media(max-width:380px){.tbtn{padding:7px 8px;min-width:42px;font-size:7.5px}
    .ar-btn{padding:11px 13px;font-size:10px}}

  /* ── Panel de colores ────────────────────────────────────── */
  #color-panel{position:fixed;bottom:104px;left:50%;
    transform:translateX(-50%) translateY(12px);z-index:55;
    padding:18px 20px;border-radius:var(--r-lg);
    background:rgba(16,16,14,.97);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    border:1px solid var(--borde);display:flex;flex-direction:column;gap:14px;
    min-width:252px;opacity:0;visibility:hidden;
    transition:opacity .26s ease,visibility .26s,transform .26s cubic-bezier(.34,1.56,.64,1)}
  #color-panel.show{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0)}
  .p-lbl{font-size:8.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--fantasma)}
  .swatches{display:flex;gap:8px;flex-wrap:wrap}
  .sw{width:28px;height:28px;border-radius:50%;border:2px solid transparent;
    cursor:pointer;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);transition:var(--tr)}
  .sw:hover{transform:scale(1.15)}
  .sw.on{border-color:var(--oro);transform:scale(1.10);box-shadow:0 0 0 3px rgba(200,169,110,.22)}
  .finish-row{display:flex;gap:6px}
  .fbtn{padding:5px 12px;border-radius:100px;border:1px solid var(--borde);
    background:transparent;color:var(--fantasma);font-family:var(--sans);
    font-size:10px;letter-spacing:.08em;cursor:pointer;transition:var(--tr)}
  .fbtn.on,.fbtn:hover{border-color:var(--oro-d);color:var(--oro)}

  /* ── CTA Modal ───────────────────────────────────────────── */
  #cta-modal{position:fixed;inset:0;z-index:100;
    background:rgba(0,0,0,.65);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
    display:flex;align-items:flex-end;opacity:0;visibility:hidden;transition:var(--tr)}
  #cta-modal.show{opacity:1;visibility:visible}
  .cta-sheet{width:100%;background:var(--sup);border-top:1px solid var(--borde);
    border-radius:24px 24px 0 0;padding:20px 24px 44px;
    transform:translateY(100%);transition:transform .42s cubic-bezier(.34,1.56,.64,1)}
  #cta-modal.show .cta-sheet{transform:translateY(0)}
  .cta-handle{width:36px;height:4px;background:var(--borde-hi);
    border-radius:2px;margin:0 auto 22px}
  .cta-row{display:flex;gap:14px;align-items:center;margin-bottom:16px}
  .cta-thumb-box{width:64px;height:64px;border-radius:var(--r);
    background:var(--sup2);border:1px solid var(--borde);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
  .cta-thumb-box img{width:100%;height:100%;object-fit:cover}
  .cta-info h3{font-family:var(--serif);font-size:24px;font-weight:400;margin-bottom:4px}
  .cta-info p{font-size:11px;color:var(--niebla)}
  .cta-price-row{display:flex;align-items:baseline;gap:10px;
    margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--borde)}
  .cta-price{font-family:var(--serif);font-size:36px;font-weight:400;color:var(--oro)}
  .cta-note{font-size:11px;color:var(--fantasma)}
  .cta-specs{display:grid;grid-template-columns:1fr 1fr;gap:10px 20px;margin-bottom:20px}
  .spec{display:flex;flex-direction:column;gap:2px}
  .spec-l{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--fantasma)}
  .spec-v{font-size:13px;color:var(--niebla)}
  .cta-btns{display:flex;flex-direction:column;gap:10px}
  .btn-gold{padding:16px;background:linear-gradient(135deg,var(--oro-d),var(--oro));
    border:none;border-radius:var(--r);font-family:var(--sans);font-size:13px;font-weight:500;
    letter-spacing:.10em;text-transform:uppercase;color:#080807;cursor:pointer;transition:var(--tr)}
  .btn-gold:hover{background:linear-gradient(135deg,var(--oro),var(--oro-l));
    box-shadow:0 8px 28px rgba(200,169,110,.30)}
  .btn-ghost{padding:16px;background:transparent;border:1px solid var(--borde);border-radius:var(--r);
    font-family:var(--sans);font-size:13px;font-weight:400;letter-spacing:.08em;
    text-transform:uppercase;color:var(--niebla);cursor:pointer;transition:var(--tr)}
  .btn-ghost:hover{border-color:var(--borde-hi);color:var(--crema)}

  /* ── Toast ───────────────────────────────────────────────── */
  #toast{position:fixed;top:74px;left:50%;transform:translateX(-50%) translateY(-10px);
    z-index:9000;padding:9px 18px;border-radius:100px;
    background:rgba(16,16,14,.97);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
    border:1px solid rgba(200,169,110,.38);display:flex;align-items:center;gap:8px;
    font-size:12px;color:var(--crema);white-space:nowrap;pointer-events:none;
    opacity:0;visibility:hidden;
    transition:opacity .26s ease,visibility .26s,transform .26s cubic-bezier(.34,1.56,.64,1)}
  #toast.show{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0)}
  #toast svg{width:13px;height:13px;color:var(--oro);flex-shrink:0}
  </style>
</head>
<body>

<!-- ── Loader ──────────────────────────────────────────── -->
<div id="loader">
  <div class="l-logo">Casa <em>Palm</em></div>
  <p class="l-sub">Cargando visor 3D</p>
  <div class="l-track"><div class="l-fill" id="lfill"></div></div>
  <p class="l-pct" id="lpct">0%</p>
</div>

<!-- ── Viewport ────────────────────────────────────────── -->
<div id="vp">
  <canvas id="cv"></canvas>

  <!--
    model-viewer: permanece en el DOM siempre.
    iOS Quick Look y Android Scene Viewer/WebXR usan este elemento.
    src e ios-src se setean por JS según el producto.
  -->
  <model-viewer
    id="mv"
    alt="Producto Casa Palm"
    shadow-intensity="1.2"
    exposure="1.1"
    ar
    ar-modes="webxr scene-viewer quick-look"
    ar-scale="fixed"
    camera-controls
  ></model-viewer>

  <!--
    ENLACE AR PARA iOS — debe existir en el DOM desde el inicio.
    Safari/iOS no permite activar AR con elementos creados dinámicamente.
    Se actualiza el href por JS antes del click.
  -->
  <a id="ios-ar-link" rel="ar" href="#"
    style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px">
    <img id="ios-ar-img" src="" alt="">
  </a>
</div>

<!-- ── Chip producto ────────────────────────────────────── -->
<div id="chip">
  <div class="chip-dot"></div>
  <span id="chip-name">Cargando…</span>
  <span id="chip-price"></span>
</div>

<!-- ── Hint ─────────────────────────────────────────────── -->
<div id="hint">Arrastra para rotar · Pellizca para zoom</div>

<!-- ── Scan ring ────────────────────────────────────────── -->
<svg id="scan" viewBox="0 0 150 150">
  <circle cx="75" cy="75" r="65" fill="none" stroke="rgba(200,169,110,.13)" stroke-width="1.5" stroke-dasharray="6 10"/>
  <circle cx="75" cy="75" r="65" fill="none" stroke="rgba(200,169,110,.65)" stroke-width="2" stroke-dasharray="36 368" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" from="0 75 75" to="360 75 75" dur="2.4s" repeatCount="indefinite"/>
  </circle>
  <path d="M22 22L22 33M22 22L33 22" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>
  <path d="M128 22L128 33M128 22L117 22" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>
  <path d="M22 128L22 117M22 128L33 128" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>
  <path d="M128 128L128 117M128 128L117 128" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>
</svg>

<!-- ── Top bar ───────────────────────────────────────────── -->
<div id="topbar">
  <div style="display:flex;align-items:center;gap:10px">
    <a class="back" id="btn-back" href="index.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      Catálogo
    </a>
    <div class="top-logo">Casa <em>Palm</em></div>
  </div>
  <div class="topright">
    <button class="ibtn" id="btn-shot" title="Captura">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    </button>
    <button class="ibtn" id="btn-info" title="Información">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8" stroke-linecap="round" stroke-width="2"/>
      </svg>
    </button>
  </div>
</div>

<!-- ── Toolbar ───────────────────────────────────────────── -->
<div id="toolbar">
  <div class="tgrp">
    <button class="tbtn on" data-tool="orbit">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>
        <path d="M2 12h20"/>
      </svg>
      Vista
    </button>
    <button class="tbtn" data-tool="move">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/>
        <polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/>
        <line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/>
      </svg>
      Mover
    </button>
    <button class="tbtn" data-tool="rotate">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
      Rotar
    </button>
    <button class="tbtn" data-tool="scale">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
        <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
      </svg>
      Escala
    </button>
    <button class="tbtn" data-tool="color">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        <circle cx="8" cy="9" r="1" fill="currentColor"/>
        <circle cx="13" cy="6.5" r="1" fill="currentColor"/>
        <circle cx="17" cy="10.5" r="1" fill="currentColor"/>
      </svg>
      Color
    </button>
  </div>

  <button class="ar-btn" id="btn-ar">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
    Ver en AR
  </button>
</div>

<!-- ── Panel de colores ──────────────────────────────────── -->
<div id="color-panel">
  <div class="p-lbl">Color de material</div>
  <div class="swatches" id="swatches"></div>
  <div class="p-lbl">Acabado</div>
  <div class="finish-row">
    <button class="fbtn on" data-finish="matte">Mate</button>
    <button class="fbtn" data-finish="satin">Satinado</button>
    <button class="fbtn" data-finish="gloss">Brillante</button>
    <button class="fbtn" data-finish="metal">Metálico</button>
  </div>
</div>

<!-- ── CTA Modal ─────────────────────────────────────────── -->
<div id="cta-modal">
  <div class="cta-sheet">
    <div class="cta-handle"></div>
    <div class="cta-row">
      <div class="cta-thumb-box">
        <img id="cta-thumb" src="" alt="">
      </div>
      <div class="cta-info">
        <h3 id="cta-name">—</h3>
        <p id="cta-cat">Casa Palm</p>
      </div>
    </div>
    <div class="cta-price-row">
      <div class="cta-price" id="cta-price">—</div>
      <div class="cta-note">IVA incluido · Envío disponible</div>
    </div>
    <div class="cta-specs" id="cta-specs"></div>
    <div class="cta-btns">
      <button class="btn-gold" id="btn-buy">Comprar ahora →</button>
      <button class="btn-ghost" id="btn-cta-close">Seguir explorando</button>
    </div>
  </div>
</div>

<!-- ── Toast ──────────────────────────────────────────────── -->
<div id="toast">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
  <span id="toast-msg">Listo</span>
</div>

<!-- ── App Script ─────────────────────────────────────────── -->
<script type="module">
import * as THREE            from 'three';
import { GLTFLoader }        from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader }       from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls }     from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { RoomEnvironment }   from 'three/addons/environments/RoomEnvironment.js';

/* ── Catálogo hardcodeado — sin dependencia de catalog.js ── */
const CATALOG = {
  'mueble': {
    id: 'mueble',
    name: 'Armario Clásico',
    categoryLabel: 'Mobiliario',
    priceFormatted: '$1.290',
    glb:  'models/antique_wardrobe.glb',
    usdz: 'models/Antique_Wardrobe.usdz',
    thumbnail: 'thumbnails/mueble.svg',
    specs: [
      { label: 'Material', value: 'Madera maciza + latón' },
      { label: 'Acabado',  value: 'Natural cera'           },
      { label: 'Garantía', value: '5 años'                 },
    ],
  },
  'silla-vintage': {
    id: 'silla-vintage',
    name: 'Silla Vintage',
    categoryLabel: 'Sillas',
    priceFormatted: '$490',
    glb:  'models/vintage_chair.glb',
    usdz: 'models/Vintage_Chair.usdz',
    thumbnail: 'thumbnails/silla-vintage.svg',
    specs: [
      { label: 'Material', value: 'Roble + bouclé'   },
      { label: 'Acabado',  value: 'Aceite natural'    },
      { label: 'Garantía', value: '3 años'            },
    ],
  },
  'lavabo': {
    id: 'lavabo',
    name: 'Lavabo Minimal',
    categoryLabel: 'Baños',
    priceFormatted: '$890',
    glb:  'models/bathroom_sink__low_poly.glb',
    usdz: 'models/Bathroom_Sink__Low_Poly.usdz',
    thumbnail: 'thumbnails/lavabo.svg',
    specs: [
      { label: 'Material', value: 'Porcelana vitrificada' },
      { label: 'Acabado',  value: 'Blanco mate'           },
      { label: 'Garantía', value: '10 años'               },
    ],
  },
};

/* ── PBR finishes ──────────────────────────────────────────── */
const FINISHES = {
  matte: { roughness:.88, metalness:.02, envMapIntensity:.20 },
  satin: { roughness:.50, metalness:.10, envMapIntensity:.55 },
  gloss: { roughness:.08, metalness:.20, envMapIntensity:1.1 },
  metal: { roughness:.15, metalness:.95, envMapIntensity:1.7 },
};

/* ── Color palette ─────────────────────────────────────────── */
const PALETTE = [
  { hex:'#8B6914', name:'Madera Natural' },
  { hex:'#2A2A28', name:'Ébano' },
  { hex:'#F0EBE3', name:'Blanco Arena' },
  { hex:'#5C6470', name:'Gris Piedra' },
  { hex:'#6B3D0A', name:'Nogal' },
  { hex:'#2A5F42', name:'Verde Oliva' },
  { hex:'#8B2020', name:'Terracota' },
  { hex:'#1A3F6B', name:'Índigo' },
];

/* ── Resolución del producto desde URL ─────────────────────── */
const params  = new URLSearchParams(location.search);
const pid     = params.get('product') || 'mueble';
const product = CATALOG[pid] || CATALOG['mueble'];

/* ── Estado ────────────────────────────────────────────────── */
const S = { tool:'orbit', color:'#8B6914', finish:'matte' };
let meshes = [], origMats = new Map(), pivot;

/* ── Helpers de UI ─────────────────────────────────────────── */
const $ = id => document.getElementById(id);
function setProgress(v) {
  $('lfill').style.width = v+'%';
  $('lpct').textContent  = Math.round(v)+'%';
}
function hideLoader() {
  setTimeout(() => $('loader').classList.add('out'), 400);
}
let toastT;
function toast(msg) {
  $('toast-msg').textContent = msg;
  $('toast').classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => $('toast').classList.remove('show'), 3000);
}

/* ── Poblar UI con datos del producto ──────────────────────── */
document.title         = product.name + ' — Casa Palm';
$('chip-name').textContent  = product.name;
$('chip-price').textContent = product.priceFormatted;
$('cta-name').textContent   = product.name;
$('cta-cat').textContent    = product.categoryLabel + ' · Casa Palm';
$('cta-price').textContent  = product.priceFormatted;
$('cta-thumb').src          = product.thumbnail;
$('cta-specs').innerHTML    = (product.specs||[]).map(s=>
  `<div class="spec"><span class="spec-l">${s.label}</span><span class="spec-v">${s.value}</span></div>`
).join('');

/* ── Configurar model-viewer para AR ───────────────────────── */
const mv = $('mv');
mv.setAttribute('src', product.glb);
mv.setAttribute('ios-src', product.usdz);
mv.setAttribute('alt', product.name);

/* ── Configurar enlace iOS (pre-existing en DOM) ───────────── */
const iosLink = $('ios-ar-link');
const iosImg  = $('ios-ar-img');
iosLink.href  = product.usdz;
iosImg.src    = product.usdz;

/* ══════════════════════════════════════════════════════════
   THREE.JS VIEWER
   ══════════════════════════════════════════════════════════ */
const canvas = $('cv');
const vp     = $('vp');

const renderer = new THREE.WebGLRenderer({
  canvas, antialias:true, alpha:false, preserveDrawingBuffer:true
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(vp.clientWidth, vp.clientHeight, false);
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
renderer.outputColorSpace   = THREE.SRGBColorSpace;
renderer.toneMapping        = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.30;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0B0B09);
scene.fog = new THREE.FogExp2(0x09090A, 0.045);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
pmrem.dispose();

const camera = new THREE.PerspectiveCamera(44, vp.clientWidth/vp.clientHeight, 0.01, 500);
camera.position.set(2, 1.4, 3.5);

/* Iluminación showroom cálida */
const key = new THREE.DirectionalLight(0xFFF6E8, 2.5);
key.position.set(5,10,6); key.castShadow = true;
key.shadow.mapSize.set(2048,2048);
Object.assign(key.shadow.camera,{left:-6,right:6,top:6,bottom:-6,near:.5,far:50});
key.shadow.bias = -0.0003; key.shadow.normalBias = 0.025;
scene.add(key);
scene.add(Object.assign(new THREE.DirectionalLight(0xD5E5FF,.42),{position:new THREE.Vector3(-7,4,-5)}));
scene.add(Object.assign(new THREE.DirectionalLight(0xFFE0A0,.58),{position:new THREE.Vector3(0,7,-8)}));
scene.add(new THREE.HemisphereLight(0xFFF2D8,0x120A02,.32));
scene.add(new THREE.AmbientLight(0xFFFAF2,.15));

/* Suelo y grilla */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40,40),
  new THREE.MeshStandardMaterial({color:0x0E0E0C,roughness:.95,metalness:0})
);
floor.rotation.x = -Math.PI/2; floor.receiveShadow = true;
scene.add(floor);
const grid = new THREE.GridHelper(20,40,0x1E1E1C,0x181816);
grid.position.y = 0.001; scene.add(grid);

/* OrbitControls */
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true; orbit.dampingFactor = .07;
orbit.minDistance = .15; orbit.maxDistance = 80;
orbit.maxPolarAngle = Math.PI/2 + .05;
orbit.target.set(0,.6,0); orbit.update();

/* TransformControls */
const tctrl = new TransformControls(camera, renderer.domElement);
tctrl.size = .70;
tctrl.addEventListener('dragging-changed', e => { orbit.enabled = !e.value; });
tctrl.addEventListener('objectChange', () => {
  if (!pivot) return;
  const s = pivot.scale.x;
  if (s<.20) pivot.scale.setScalar(.20);
  if (s>3.50) pivot.scale.setScalar(3.50);
});
scene.add(tctrl);

pivot = new THREE.Group();
scene.add(pivot);

/* Render loop */
(function loop(){
  requestAnimationFrame(loop);
  orbit.update();
  if (S.tool==='orbit') pivot.position.y = Math.sin(performance.now()*.00046)*.014;
  renderer.render(scene,camera);
})();

/* Resize */
window.addEventListener('resize', ()=>{
  const W=vp.clientWidth,H=vp.clientHeight;
  camera.aspect=W/H; camera.updateProjectionMatrix();
  renderer.setSize(W,H,false);
},{passive:true});

/* ── Carga del modelo GLB ──────────────────────────────────── */
function loadModel(url) {
  /* Limpiar escena */
  tctrl.detach(); tctrl.visible=false;
  while(pivot.children.length) pivot.remove(pivot.children[0]);
  meshes.length=0; origMats.clear();

  const draco = new DRACOLoader();
  draco.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  setProgress(5);

  loader.load(url,
    gltf => {
      setProgress(90);
      const root = gltf.scene;

      /* ════════════════════════════════════════════════
         POSICIÓN SOLAMENTE — escala de Blender intacta
         ════════════════════════════════════════════════ */
      const box    = new THREE.Box3().setFromObject(root);
      const center = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      root.position.x -= center.x;  // centrar X
      root.position.z -= center.z;  // centrar Z
      root.position.y -= box.min.y; // apoyar en suelo
      /* root.scale NUNCA se modifica */

      root.traverse(n=>{
        if (!n.isMesh) return;
        n.castShadow = n.receiveShadow = true;
        meshes.push(n);
        if (n.material) {
          if (!n.material.isMeshStandardMaterial) {
            n.material = new THREE.MeshStandardMaterial({
              color: n.material.color ?? new THREE.Color(0x8B6914),
              map:   n.material.map   ?? null,
              roughness:.72, metalness:.05
            });
          }
          origMats.set(n.uuid, n.material.clone());
        }
      });

      pivot.add(root);

      /* Cámara adaptada al tamaño real del modelo */
      const fovRad  = camera.fov*(Math.PI/180);
      const maxDim  = Math.max(size.x,size.y,size.z);
      const dist    = ((maxDim*.5)/Math.tan(fovRad*.5))*1.90;
      const targetY = size.y*.42;
      camera.position.set(dist*.65, targetY+dist*.22, dist);
      camera.near = Math.max(.01,dist*.008); camera.far = dist*60;
      camera.updateProjectionMatrix();
      orbit.target.set(0,targetY,0);
      orbit.minDistance=dist*.18; orbit.maxDistance=dist*5;
      orbit.update();

      tctrl.attach(pivot); tctrl.visible=false;
      setProgress(100);
      hideLoader();

      /* Animación de entrada */
      pivot.scale.setScalar(.001);
      const t0=performance.now();
      (function enter(t){
        const p=Math.min((t-t0)/680,1),e=1-Math.pow(1-p,3);
        pivot.scale.setScalar(.001+.999*e);
        if(p<1)requestAnimationFrame(enter);
      })(t0);
    },
    xhr=>{ if(xhr.total>0) setProgress(5+(xhr.loaded/xhr.total)*84); },
    err=>{
      console.warn('GLB no cargó:', err);
      buildFallback();
    }
  );
}

/* Fallback 3D si el GLB no carga */
function buildFallback() {
  const g=new THREE.Group();
  const wm=new THREE.MeshStandardMaterial({color:0x8B6914,roughness:.72,metalness:.04});
  const mm=new THREE.MeshStandardMaterial({color:0xC8A96E,roughness:.20,metalness:.90});
  const body=new THREE.Mesh(new THREE.BoxGeometry(1.2,.80,.42),wm);
  body.position.y=.47; body.castShadow=body.receiveShadow=true; g.add(body);
  [[-0.52,-0.17],[0.52,-0.17],[-0.52,.17],[.52,.17]].forEach(([x,z])=>{
    const l=new THREE.Mesh(new THREE.CylinderGeometry(.022,.018,.12,10),mm);
    l.position.set(x,.06,z); l.castShadow=true; g.add(l);
  });
  [-0.30,.30].forEach(x=>{
    const h=new THREE.Mesh(new THREE.TorusGeometry(.044,.009,8,24,Math.PI),mm);
    h.position.set(x,.47,.224); h.rotation.z=Math.PI/2; h.castShadow=true; g.add(h);
  });
  pivot.add(g);
  g.traverse(n=>{
    if(!n.isMesh)return;
    meshes.push(n); origMats.set(n.uuid,n.material.clone());
  });
  const box=new THREE.Box3().setFromObject(g);
  const size=box.getSize(new THREE.Vector3());
  const fovRad=camera.fov*(Math.PI/180);
  const dist=((Math.max(size.x,size.y,size.z)*.5)/Math.tan(fovRad*.5))*1.9;
  camera.position.set(dist*.65,size.y*.42+dist*.22,dist);
  camera.near=Math.max(.01,dist*.008); camera.far=dist*60;
  camera.updateProjectionMatrix();
  orbit.target.set(0,size.y*.42,0);
  orbit.minDistance=dist*.18; orbit.maxDistance=dist*5; orbit.update();
  tctrl.attach(pivot); tctrl.visible=false;
  setProgress(100); hideLoader();
  pivot.scale.setScalar(.001);
  const t0=performance.now();
  (function e(t){const p=Math.min((t-t0)/680,1),v=1-Math.pow(1-p,3);
    pivot.scale.setScalar(.001+.999*v);if(p<1)requestAnimationFrame(e);})(t0);
  toast('Modelo de muestra — subir GLB para ver el real');
}

/* ── Material / Color ──────────────────────────────────────── */
function applyMaterial(hex, finish) {
  if (!meshes.length) return;
  const col=new THREE.Color(hex), fp=FINISHES[finish]||FINISHES.matte;
  meshes.forEach(m=>{
    if (!m.material?.isMeshStandardMaterial) return;
    m.material.color.copy(col);
    m.material.roughness       = fp.roughness;
    m.material.metalness       = fp.metalness;
    m.material.envMapIntensity = fp.envMapIntensity;
    m.material.needsUpdate     = true;
  });
}

/* ── Tool system ───────────────────────────────────────────── */
const HINTS = {
  orbit:'Arrastra para rotar · Pellizca para zoom',
  move:'Arrastra para mover el objeto',
  rotate:'Eje Y (verde) → girá el objeto',
  scale:'Arrastra para cambiar tamaño',
  color:'Elegí color y acabado',
};
function setTool(t){
  S.tool=t;
  document.querySelectorAll('.tbtn').forEach(b=>b.classList.toggle('on',b.dataset.tool===t));
  $('hint').textContent=HINTS[t]||'';
  $('color-panel').classList.toggle('show',t==='color');
  $('scan').classList.toggle('show',t==='move');
  if(t==='orbit'){tctrl.visible=false;}
  else if(t==='move'){tctrl.mode='translate';tctrl.showX=true;tctrl.showY=false;tctrl.showZ=true;tctrl.visible=true;}
  else if(t==='rotate'){tctrl.mode='rotate';tctrl.showX=false;tctrl.showY=true;tctrl.showZ=false;tctrl.visible=true;}
  else if(t==='scale'){tctrl.mode='scale';tctrl.showX=tctrl.showY=tctrl.showZ=true;tctrl.visible=true;}
  else if(t==='color'){tctrl.visible=false;}
}

/* ── Screenshot con branding ───────────────────────────────── */
function takeShot(){
  renderer.render(scene,camera);
  const src=canvas,out=document.createElement('canvas');
  out.width=src.width; out.height=src.height;
  const ctx=out.getContext('2d');
  ctx.drawImage(src,0,0);
  const barH=Math.max(56,src.height*.06);
  const grad=ctx.createLinearGradient(0,src.height-barH,0,src.height);
  grad.addColorStop(0,'rgba(8,8,7,0)');
  grad.addColorStop(.35,'rgba(8,8,7,.86)');
  grad.addColorStop(1,'rgba(8,8,7,.97)');
  ctx.fillStyle=grad;
  ctx.fillRect(0,src.height-barH,src.width,barH);
  const px=src.width*.032,py=src.height-barH*.28;
  ctx.font=`300 ${barH*.40}px 'Cormorant Garamond',serif`;
  ctx.fillStyle='#C8A96E';
  ctx.fillText('CASA PALM',px,py);
  ctx.font=`400 ${barH*.22}px 'DM Sans',sans-serif`;
  ctx.fillStyle='rgba(245,240,232,.40)';
  ctx.fillText(`${product.name}  ·  casapalm.com`,px,py+barH*.30);
  out.toBlob(blob=>{
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=`casapalm-${Date.now()}.jpg`;
    a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),6000);
  },'image/jpeg',.93);
  toast('Captura guardada ✓');
}

/* ══════════════════════════════════════════════════════════
   AR — LANZAMIENTO CORRECTO PARA iOS Y ANDROID
   ══════════════════════════════════════════════════════════ */
$('btn-ar').addEventListener('click', function() {
  const isIOS     = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isIOS) {
    /*
      iOS AR Quick Look:
      - Requiere elemento <a rel="ar"> pre-existente en el DOM
      - El href debe apuntar a un archivo .usdz válido
      - El click debe ser sincrónico dentro del handler del usuario
    */
    iosLink.href = product.usdz;
    iosImg.src   = product.usdz;
    iosLink.click();
    toast('Abriendo AR en tu iPhone…');

  } else if (isAndroid) {
    /*
      Android Scene Viewer:
      - Requiere URL absoluta del GLB
      - Se lanza via Intent URL o URL directa de Scene Viewer
    */
    const absGlb = new URL(product.glb, window.location.href).href;
    const sceneUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(absGlb)}&mode=ar_preferred&title=${encodeURIComponent(product.name)}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(absGlb)};end;`;
    window.location.href = sceneUrl;
    toast('Abriendo AR en tu Android…');

  } else {
    /*
      Desktop: mostrar CTA con información del producto
    */
    openCTA();
    toast('AR disponible en iPhone y Android');
  }
});

/* ── Swatches de color ─────────────────────────────────────── */
const swatchContainer = $('swatches');
PALETTE.forEach((col,i)=>{
  const sw=document.createElement('div');
  sw.className='sw'+(i===0?' on':'');
  sw.style.background=col.hex;
  sw.title=col.name;
  sw.addEventListener('click',()=>{
    swatchContainer.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));
    sw.classList.add('on');
    S.color=col.hex;
    applyMaterial(S.color,S.finish);
    toast(col.name);
  });
  swatchContainer.appendChild(sw);
});

/* ── Finish buttons ────────────────────────────────────────── */
document.querySelectorAll('.fbtn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    S.finish=btn.dataset.finish;
    applyMaterial(S.color,S.finish);
  });
});

/* ── Tool buttons ──────────────────────────────────────────── */
document.querySelectorAll('.tbtn').forEach(btn=>{
  btn.addEventListener('click',()=>setTool(btn.dataset.tool));
});

/* ── CTA modal ─────────────────────────────────────────────── */
function openCTA()  { $('cta-modal').classList.add('show'); }
function closeCTA() { $('cta-modal').classList.remove('show'); }
$('btn-info').addEventListener('click', openCTA);
$('btn-cta-close').addEventListener('click', closeCTA);
$('btn-buy').addEventListener('click',()=>window.open('https://casapalm.com','_blank'));
$('cta-modal').addEventListener('click',e=>{ if(e.target===$('cta-modal')) closeCTA(); });

/* ── Screenshot ────────────────────────────────────────────── */
$('btn-shot').addEventListener('click', takeShot);

/* ── Iniciar carga del modelo ──────────────────────────────── */
loadModel(product.glb);
</script>
</body>
</html>
