<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>AfincalIA — Pasos para subir la nueva versión</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:system-ui,sans-serif;background:#F2F5F2;color:#111917;padding:20px 16px;line-height:1.6;}
.wrap{max-width:700px;margin:0 auto;}
.header{background:#0C3521;border-radius:18px;padding:28px 24px;margin-bottom:24px;}
.logo{display:flex;align-items:center;gap:8px;margin-bottom:16px;}
.dots{display:flex;flex-direction:column;gap:3px;}
.dot-row{display:flex;gap:3px;}
.dot{width:5px;height:5px;border-radius:50%;background:#C4362C;}
.logo-txt{font-family:Georgia,serif;font-size:20px;color:#fff;}
.logo-ia{color:#4ADE80;}
h1{font-family:Georgia,serif;font-size:22px;color:#fff;margin-bottom:8px;}
.header p{font-size:14px;color:rgba(255,255,255,.6);}
.prog{background:#fff;border:1px solid #C8DFCF;border-radius:14px;padding:16px 20px;margin-bottom:20px;display:flex;align-items:center;gap:14px;}
.prog-bg{flex:1;background:#EBF4EE;border-radius:100px;height:10px;}
.prog-bar{background:#1A6B42;height:10px;border-radius:100px;width:0%;transition:width .3s;}
.prog-txt{font-size:14px;font-weight:700;color:#1A6B42;white-space:nowrap;}
.step{background:#fff;border:1px solid #C8DFCF;border-radius:16px;margin-bottom:14px;overflow:hidden;}
.step-head{padding:18px 20px;display:flex;align-items:center;gap:12px;}
.step-num{width:36px;height:36px;border-radius:50%;background:#1A6B42;color:#fff;font-weight:800;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.step-title{font-size:16px;font-weight:700;flex:1;}
.badge{font-size:11px;font-weight:700;border-radius:100px;padding:3px 10px;}
.b-red{background:#FEE2E2;color:#DC2626;}
.b-green{background:#DCFCE7;color:#1A6B42;}
.task{display:flex;gap:12px;padding:14px 20px;border-top:1px solid #EBF4EE;align-items:flex-start;}
.cb{width:24px;height:24px;border:2px solid #C8DFCF;border-radius:6px;flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .2s;margin-top:1px;user-select:none;}
.cb.done{background:#1A6B42;border-color:#1A6B42;color:#fff;}
.task-body{flex:1;}
.task-title{font-size:15px;font-weight:600;margin-bottom:4px;}
.task-desc{font-size:13px;color:#3D4D44;line-height:1.6;margin-bottom:10px;}
.btn{display:inline-flex;align-items:center;gap:6px;border-radius:100px;padding:7px 16px;font-size:13px;font-weight:700;text-decoration:none;margin-right:6px;margin-bottom:4px;}
.btn-green{background:#EBF4EE;color:#1A6B42;border:1px solid #C8DFCF;}
.btn-blue{background:#EEF2FF;color:#1E4FA3;border:1px solid #C7D2FE;}
.code{background:#F2F5F2;border:1px solid #C8DFCF;border-radius:8px;padding:10px 14px;font-family:monospace;font-size:12px;line-height:1.7;margin:6px 0;word-break:break-all;}
.files-box{background:#EEF2FF;border:1px solid #C7D2FE;border-radius:12px;padding:18px 20px;margin-bottom:18px;}
.files-box h3{font-size:14px;font-weight:700;color:#1E4FA3;margin-bottom:12px;}
.file-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #C7D2FE;font-size:13px;}
.file-row:last-child{border:none;}
.file-name{font-family:monospace;font-size:12px;color:#1E4FA3;font-weight:700;}
.file-arrow{color:#9CA3AF;flex-shrink:0;}
.file-dest{font-size:12px;color:#6B7280;}
.alert{background:#FEF3C7;border:1px solid #FDE68A;border-radius:10px;padding:12px 16px;font-size:13px;color:#92400E;margin-bottom:16px;}
.footer{background:#0C3521;border-radius:14px;padding:22px;text-align:center;margin-top:24px;}
.footer p{color:rgba(255,255,255,.6);font-size:14px;margin-bottom:12px;}
.wa-btn{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;border-radius:100px;padding:11px 22px;font-weight:700;font-size:14px;text-decoration:none;}
</style>
</head>
<body>
<div class="wrap">

<div class="header">
  <div class="logo">
    <div class="dots">
      <div class="dot-row"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
      <div class="dot-row"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    </div>
    <span class="logo-txt">Afincal<span class="logo-ia">IA</span></span>
  </div>
  <h1>Pasos para subir la nueva versión</h1>
  <p>Hola Adriana 👋 Nueva estructura con subpáginas reales. Sigue los pasos en orden y márcalos conforme los completes.</p>
</div>

<div class="prog">
  <div class="prog-bg"><div class="prog-bar" id="pbar"></div></div>
  <div class="prog-txt" id="ptxt">0 / 0</div>
</div>

<div class="files-box">
  <h3>📁 Archivos que hay que subir — mapa completo</h3>
  <div class="file-row"><span class="file-name">page-index.jsx</span><span class="file-arrow">→</span><span class="file-dest">pages/index.jsx (reemplaza el actual)</span></div>
  <div class="file-row"><span class="file-name">page-como-funciona.jsx</span><span class="file-arrow">→</span><span class="file-dest">pages/como-funciona.jsx (nuevo)</span></div>
  <div class="file-row"><span class="file-name">page-precios.jsx</span><span class="file-arrow">→</span><span class="file-dest">pages/precios.jsx (nuevo)</span></div>
  <div class="file-row"><span class="file-name">page-actas.jsx</span><span class="file-arrow">→</span><span class="file-dest">pages/actas.jsx (nuevo)</span></div>
  <div class="file-row"><span class="file-name">page-rgpd.jsx</span><span class="file-arrow">→</span><span class="file-dest">pages/rgpd.jsx (nuevo)</span></div>
  <div class="file-row"><span class="file-name">page-blog.jsx</span><span class="file-arrow">→</span><span class="file-dest">pages/blog/index.jsx (reemplaza el actual)</span></div>
  <div class="file-row"><span class="file-name">api-chat.js</span><span class="file-arrow">→</span><span class="file-dest">pages/api/chat.js (ya existe, no tocar si funciona)</span></div>
  <div class="file-row"><span class="file-name">api-registro.js</span><span class="file-arrow">→</span><span class="file-dest">pages/api/registro.js (ya existe, no tocar si funciona)</span></div>
</div>

<div class="alert">⚠️ <strong>Importante:</strong> Todos estos archivos van en la carpeta <strong>pages/</strong> del repositorio GitHub. Vercel los convierte automáticamente en rutas de la web. No hay que tocar nada más.</div>

<!-- PASO 1 -->
<div class="step">
  <div class="step-head">
    <div class="step-num">1</div>
    <span class="step-title">Abrir el repositorio en GitHub</span>
    <span class="badge b-red">PRIMERO</span>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Ir al repositorio de AfincalIA</div>
      <div class="task-desc">Abre GitHub y ve al repositorio del proyecto. Todas las subidas van dentro de la carpeta <strong>pages/</strong>.</div>
      <a href="https://github.com" target="_blank" class="btn btn-blue">→ Abrir GitHub</a>
    </div>
  </div>
</div>

<!-- PASO 2 -->
<div class="step">
  <div class="step-head">
    <div class="step-num">2</div>
    <span class="step-title">Reemplazar la página principal</span>
    <span class="badge b-red">CRÍTICO</span>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Editar pages/index.jsx</div>
      <div class="task-desc">En GitHub → pages/index.jsx → lápiz ✏️ → seleccionar todo (Ctrl+A) → borrar → pegar el contenido de <strong>page-index.jsx</strong> → Commit con mensaje:</div>
      <div class="code">v7: landing corta con subpáginas reales</div>
    </div>
  </div>
</div>

<!-- PASO 3 -->
<div class="step">
  <div class="step-head">
    <div class="step-num">3</div>
    <span class="step-title">Crear las subpáginas nuevas</span>
    <span class="badge b-red">CRÍTICO</span>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Crear pages/como-funciona.jsx</div>
      <div class="task-desc">GitHub → Add file → Create new file → escribir <strong>pages/como-funciona.jsx</strong> → pegar contenido de <strong>page-como-funciona.jsx</strong> → Commit:</div>
      <div class="code">feat: subpágina cómo funciona</div>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Crear pages/precios.jsx</div>
      <div class="task-desc">GitHub → Add file → Create new file → nombre: <strong>pages/precios.jsx</strong> → pegar contenido de <strong>page-precios.jsx</strong> → Commit:</div>
      <div class="code">feat: subpágina precios con FAQ</div>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Crear pages/actas.jsx</div>
      <div class="task-desc">GitHub → Add file → nombre: <strong>pages/actas.jsx</strong> → pegar contenido de <strong>page-actas.jsx</strong> → Commit:</div>
      <div class="code">feat: subpágina actas IA</div>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Crear pages/rgpd.jsx</div>
      <div class="task-desc">GitHub → Add file → nombre: <strong>pages/rgpd.jsx</strong> → pegar contenido de <strong>page-rgpd.jsx</strong> → Commit:</div>
      <div class="code">feat: subpágina RGPD</div>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Actualizar pages/blog/index.jsx</div>
      <div class="task-desc">GitHub → pages/blog/index.jsx → lápiz ✏️ → seleccionar todo → borrar → pegar contenido de <strong>page-blog.jsx</strong> → Commit:</div>
      <div class="code">feat: blog con 12 artículos completos</div>
    </div>
  </div>
</div>

<!-- PASO 4 -->
<div class="step">
  <div class="step-head">
    <div class="step-num">4</div>
    <span class="step-title">Esperar el deploy automático</span>
    <span class="badge b-green">AUTO</span>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Vercel despliega solo</div>
      <div class="task-desc">Cada commit a GitHub dispara un deploy automático en Vercel. Espera 1-2 minutos y comprueba que el deploy está en verde.</div>
      <a href="https://vercel.com/dashboard" target="_blank" class="btn btn-blue">→ Ver deploys en Vercel</a>
    </div>
  </div>
</div>

<!-- PASO 5 -->
<div class="step">
  <div class="step-head">
    <div class="step-num">5</div>
    <span class="step-title">Verificar que todo funciona</span>
    <span class="badge b-green">FINAL</span>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Comprobar la landing principal</div>
      <div class="task-desc">Abrir afincalia.es desde el móvil. Debe cargar desde arriba (Hero). Los 4 beneficios deben ser clicables y llevar a sus subpáginas.</div>
      <a href="https://afincalia.es" target="_blank" class="btn btn-green">→ afincalia.es</a>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Comprobar todas las subpáginas</div>
      <div class="task-desc">Abrir cada URL y confirmar que carga correctamente:</div>
      <a href="https://afincalia.es/como-funciona" target="_blank" class="btn btn-green">→ /como-funciona</a>
      <a href="https://afincalia.es/actas" target="_blank" class="btn btn-green">→ /actas</a>
      <a href="https://afincalia.es/rgpd" target="_blank" class="btn btn-green">→ /rgpd</a>
      <a href="https://afincalia.es/precios" target="_blank" class="btn btn-green">→ /precios</a>
      <a href="https://afincalia.es/blog" target="_blank" class="btn btn-green">→ /blog</a>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Probar el navbar en móvil</div>
      <div class="task-desc">En móvil, abrir el menú hamburguesa. Debe mostrar dos grupos: "El producto" y "Contratar". Cada enlace debe llevar a su subpágina.</div>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Probar el chat demo y el formulario</div>
      <div class="task-desc">En la landing, escribir "El ascensor no funciona" en el chat. Debe responder. Luego pulsar "Empezar 14 días gratis" y completar el formulario de prueba.</div>
    </div>
  </div>
  <div class="task">
    <div class="cb" onclick="toggle(this)">☐</div>
    <div class="task-body">
      <div class="task-title">Confirmar el registro en Supabase</div>
      <div class="task-desc">Tras el formulario de prueba, ir a Supabase → Table Editor → registros_trial y confirmar que apareció el registro.</div>
      <a href="https://supabase.com/dashboard" target="_blank" class="btn btn-blue">→ Supabase</a>
    </div>
  </div>
</div>

<div class="footer">
  <p>¿Alguna duda? Escribe a Alberto</p>
  <a href="https://wa.me/34614557419?text=Hola%20Alberto%2C%20tengo%20una%20duda%20con%20el%20deploy" target="_blank" class="wa-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    WhatsApp a Alberto
  </a>
  <p style="margin-top:12px;font-size:11px;color:rgba(255,255,255,.3);">AfincalIA v7 · Abril 2026</p>
</div>

</div>
<script>
function toggle(el){el.classList.toggle('done');el.textContent=el.classList.contains('done')?'✓':'☐';updateProgress();}
function updateProgress(){const t=document.querySelectorAll('.cb').length;const d=document.querySelectorAll('.cb.done').length;const pct=t>0?Math.round(d/t*100):0;document.getElementById('pbar').style.width=pct+'%';document.getElementById('ptxt').textContent=d+' / '+t+' completados';}
updateProgress();
</script>
</body>
</html>
