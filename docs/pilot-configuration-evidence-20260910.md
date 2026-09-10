# Configuración de preview y comprobación alojada — 10/09/2026

## Cambios ejecutados

- Proyecto Vercel: `afincalia-web-dxnf` (`prj_ueleBSsKJ39dPIKQBSV7pNbPwlgN`).
- Rama exclusiva: `codex/validacion-formulario`, entorno Preview.
- Confirmada en el panel la presencia de `SUPABASE_SECRET_KEY` en esa rama. No se ha sustituido ni expuesto su valor; no equivale a validar sus credenciales.
- Creada mediante la conexión de Resend la clave `afincalia-piloto`, permiso `sending_access`, limitada al dominio verificado `afincalia.es`. La clave anterior se conserva.
- Guardada privadamente como `RESEND_API_KEY`, tipo Secret, exclusivamente en esa rama. Vercel confirmó el guardado y mostró el ámbito Preview/rama.
- Reutilizado el remitente existente de la aplicación: `AfincalIA <actas@afincalia.es>`. Guardado como `AFINCALIA_EMAIL_FROM` en la misma rama, tipo Config.
- No se modificaron variables de producción ni se fusionaron PR.

## Despliegue y evidencia nueva

- Redespliegue de la fuente existente `4bf94a3442111cf8ab590bcd1ab85472cea9322e`, PR 5.
- Despliegue anterior conservado: `dpl_9RcHSUCZZ9DqZp4UUjU5uaRDqjpR`.
- Nuevo despliegue: `dpl_FoyX6tQNpuii3ihJPXLix7XDX1EF`.
- URL: https://afincalia-web-dxnf-pnnks42q7-afincalia.vercel.app
- Alias: https://afincalia-web-dxnf-git-codex-validacion-formulario-afincalia.vercel.app
- El panel y la conexión Vercel confirmaron estado `READY`, rama y commit correctos, sin promoción a producción.
- Navegación real en navegador: página principal → CTA «Solicitar demo» → `/contacto`.
- Contacto muestra «El envío desde esta página todavía no está disponible». No se habilitó la captación ni se intentó eludir `ready()`.

## No demostrado todavía

- Las credenciales guardadas no se han validado mediante el recorrido formulario → persistencia → Resend → recepción en buzón.
- Conservación de solicitudes pendiente de aprobación; revisión de textos identificativos y buzón pendientes. No se introdujo plazo provisional.
- Meta: abrir el panel de la aplicación en el navegador compartido conduce a «Log into Meta for Developers». No se modificó callback ni suscripción y no se envió WhatsApp.
- Programador, autonomía, aislamiento operativo completo y parada del transporte siguen pendientes de ensayo real. Esta comprobación de configuración no sustituye esas pruebas.

No se guardan secretos ni datos personales de prueba en este documento.
# Comprobación del buzón disponible — 10/09/2026

La conexión Gmail disponible corresponde a una cuenta personal de Adriana, no a `hola@afincalia.es`. Una búsqueda limitada a mensajes dirigidos a `hola@afincalia.es` de los últimos 90 días, excluyendo enviados y borradores, devolvió cero resultados. No prueba que no exista reenvío ni que el buzón comercial esté inoperativo. No se ha cambiado el destinatario del formulario ni enviado correo para sustituir su ensayo. Sigue pendiente confirmar quién puede comprobar la recepción en el buzón comercial.

## Destinatario QA autorizado y configurado — 10/09/2026

El usuario autorizó utilizar su Gmail conectado exclusivamente para notificaciones del ensayo. Se guardó `LEAD_PREVIEW_RECIPIENT` como variable privada en `afincalia-web-dxnf`, Preview y rama `codex/validacion-formulario`; el panel confirmó ese ámbito. Producción y otras ramas no reciben esta variable. No se crea un buzón ni se cambia el destinatario comercial público.

PR 5 actualizada sin fusión: `52d58295f4b0c1fa24f5c950a609864da31ebe68` configura el destinatario; `e9542df4e45c76402b28545a08a32453c6ce18f0` restringe envíos/reintentos a solicitudes QA usando el campo source existente, escogido por el servidor, y separa su deduplicación. Ninguna dirección personal se incluye en código o tests públicos. No se crean tablas. Las solicitudes públicas no pueden atribuirse el origen reservado y los envíos rechazan filas de otro entorno.

Validación local afectada: 23 tests correctos, compilación TypeScript y ESLint correctos. Incluye tests previos conservados localmente; el test de conservación del borrador local no se ha añadido a la PR con esta corrección. El primer intento de la suite completa perdió la sesión con un error de aprobación de red cancelada y no se contó como superado; la comprobación dirigida posterior usó los ejecutables locales y no servicios externos.

No se ha enviado correo. `LEADS_ENABLED` permanece false y la conservación sigue pendiente de aprobación. Estas comprobaciones no demuestran todavía formulario, persistencia y recepción reales.

Despliegue final confirmado por Vercel: `dpl_4SS5Zb7eaKEBfoJZmjMF9nmKbevN`, READY, Preview, commit `e9542df4e45c76402b28545a08a32453c6ce18f0`, alias asignado sin error. URL única `https://afincalia-web-dxnf-ob0wpju6f-afincalia.vercel.app`. GET real `/api/leads`: HTTP 200, `{"available":false}`, ruta coincidente. Se abrió `/contacto` mediante el navegador. No hubo POST del formulario ni comunicación externa. PR 5 sigue draft, no fusionada, con ese SHA exacto. Producción no se desplegó.

## Ensayo real del formulario — 10/09/2026, 22:00–22:04 UTC

El usuario aprobó conservar la solicitud un máximo de siete días y aceptó los plazos del correo: Resend publica 30 días, Gmail conserva el mensaje 30 días en papelera. Ensayo exclusivamente QA, no apertura comercial.

Se guardaron los cuatro valores legales existentes exclusivamente en Preview/codex/validacion-formulario, usando datos aportados por el titular sin verificarlos documentalmente. La conservación del ensayo aparece en privacidad. No se serializa NIF ni domicilio en la página de privacidad; aviso legal contiene la identificación.

Commit PR5: `9f567dab1474bca243f327336ec7c6d7947f3a48`. Caducidad de solicitudes y notificaciones QA mediante `LEAD_PREVIEW_EXPIRES_AT`, máximo dos horas; timestamp configurado `2026-09-10T23:29:07.376Z`. 24 tests locales, TypeScript y lint correctos; no equivalen al ensayo alojado. PR sin fusionar.

Primer POST real devolvió 503/lead_storage_error. Se comprobó en el panel que SUPABASE_URL global heredada apuntaba a otro proyecto. Se conservó esa variable y se añadió una sobrescritura exclusiva de la rama QA hacia el proyecto AfincalIA correcto `rulrawusghzojxfwigor`. No se consultaron registros de aquel proyecto ni se cambió producción.

Despliegue corregido: `dpl_FQEN6bapMg6qLxdhfjUeNGEa9TYz`, READY; fuente 9f567dab1474bca243f327336ec7c6d7947f3a48. Formulario usado desde el alias de rama /contacto.

Evidencia real correlacionada:
- POST /api/leads 201 a las 22:00:13 UTC y reenvío desde nueva carga de formulario a las 22:01:41 UTC, ambos registrados por Vercel en ese despliegue.
- La interfaz confirmó la misma referencia en ambos: `c14a2aac-42b6-4907-a759-5ec5c81933b8`.
- Supabase: una única fila, created_at 22:00:14.732381 UTC, privacy_version 2026-09-10, notified_at 22:00:15.010 UTC.
- Resend: `f37efd4d-1d6d-4c2e-904d-7d6bd846f6d0`, estado delivered.
- Gmail: `1a08d55f44dd7518`, comprobado INBOX; referencia y marcador coinciden con la solicitud. Una sola coincidencia después del segundo POST. No se envió correo directamente desde una herramienta.
- La lectura accesible del navegador omitía el valor email, aunque la captura mostraba el correo autorizado. Una revisión automática bloqueó un intento por campo aparentemente vacío. Se obtuvo evidencia visual del campo rellenado antes de repetir el envío por el mismo formulario; no se eludieron controles ni se cambió de canal.

Limpieza autorizada: el mensaje específico fue trasladado a TRASH y comprobado por Gmail; no se declara borrado permanente. Se eliminó una única solicitud QA por id, source, empresa ficticia y notification_id coincidentes; consulta posterior confirmó cero filas para esa referencia. Se retiró la huella antiabuso del mismo instante transaccional, sin imprimir su valor.

Se cambió LEADS_ENABLED a false en la rama QA y se inició redespliegue de cierre. Las previews anteriores retienen su configuración hasta la caducidad indicada; no afirmar que todas han quedado desactivadas antes de comprobarlo. Producción permaneció disponible=false durante el ensayo.

Esto valida formulario, persistencia, deduplicación y recepción real. No valida WhatsApp, recordatorio automático, interfaz autenticada ni parada del seguimiento operativo.

Cierre confirmado: `dpl_Bwro1w5ZYy6eGdbCGRgQCBP7JcWe`, READY, misma fuente. GET del alias QA /api/leads y de producción devolvieron HTTP 200 con available=false. Navegación real a /contacto muestra el formulario deshabilitado. Consulta final: cero filas de solicitud y cero huellas de límite del ensayo. Gmail mantiene únicamente la copia en TRASH conforme a lo autorizado. La caducidad de URLs únicas antiguas se implementó y se probó localmente; todavía no se observó su vencimiento alojado.
