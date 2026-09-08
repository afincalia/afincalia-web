# Persistencia comercial — validación controlada 08/09/2026

## Corregido

La ejecución del SQL propuesto detectó una comilla ausente en `payload->>'privacy_version'`. PostgreSQL rechazaba el script completo. Se corrigió y se ejecutó sin sustituir el SQL por mocks.

Se mantiene la tabla y la API existentes. Los reintentos de notificación se acotan a 23 horas desde la creación del lead, dentro de las [24 horas de idempotencia de Resend](https://resend.com/docs/dashboard/emails/idempotency-keys). Una fecha ausente/inválida/futura o una notificación antigua queda pendiente de reconciliación, sin envío automático. El cron señala `reconciliationRequired` y devuelve 503; las solicitudes recientes se procesan sin quedar bloqueadas por registros antiguos. No se borran ni se marcan falsamente como notificados. Antes de activar hay que monitorizar ese resultado y revisar pendientes con el proveedor; no existe reintento ciego tras caducar la clave.

## Comprobado

23 tests correctos. Se añadió PGlite como dependencia de desarrollo fijada a 0.5.8, igual que en la app, con lockfile. El recorrido usa la API real de Next, validación y funciones/tablas SQL reales sobre PostgreSQL local en disco. Solo se sustituyen HTTP/PostgREST por un adaptador al SQL y el transporte de email por uno controlado.

- Persistencia antes de notificar y referencia duradera en la confirmación.
- Doble petición solapada y nuevo UUID inmediato: un solo lead y una clave de notificación. No demuestra concurrencia multiservidor ni idempotencia real del proveedor.
- Fallo de email: lead conservado, reapertura de la BD y reintento del mismo registro.
- Email y consentimiento inválidos: sin persistencia. La función SQL también rechaza ausencia de consentimiento.
- Anon y authenticated: sin enumeración, lectura, inserción, edición, borrado ni ejecución de RPC privadas. RLS habilitada en las tres tablas. No equivale a validar el Supabase alojado.
- Notificación antigua/incierta: sin nueva llamada externa; señal de reconciliación sin bloquear leads recientes.
- TypeScript, ESLint y build local correctos.

## Pendiente alojado

No se aplicó el SQL a Supabase alojado. No se enviaron correos reales, no se activó el formulario ni se configuró cron. El destino público de contacto sigue mostrando alternativas y envío desde la página no disponible.

Antes de activar: inspeccionar si existe un almacén equivalente, contrastar/aplicar SQL, configurar claves privadas de Supabase y Resend/remitente existente, datos jurídicos reales y monitorización de reintentos. Probar formulario móvil/escritorio → persistencia → recepción del email, fallos y acceso anónimo directo. No basta con aceptación HTTP de Resend.

Baseline web para rollback: `5d5eb9f5f60730d723f1c43e653a9c1c3256a329`, despliegue `dpl_3nNdkQuQxmUit4VFR5UCjf8WRGov`. Los cambios mantienen las puertas de activación y no incluyen migraciones destructivas ni cambios de marketing.
