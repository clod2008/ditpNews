# setting.md

## Reglas y Buenas Prácticas para Ejecución de Peticiones

1. **Comunicación:**
   - Todas las respuestas y documentación deben estar en Español.
   - Explicar cada cambio o comando antes de ejecutarlo si es relevante.

2. **Control de Versiones:**
   - Usar ramas para nuevas funcionalidades o cambios importantes.
   - La rama `dev` es para desarrollo, `main` solo para producción.
   - No es necesario el uso de pull requests ya que el proyecto es desarrollado por una sola persona.
   - **Siempre revisar que no se esté trabajando directamente en la rama `main`.**
   - **Solo publicar cambios en `main` que hayan sido previamente testeados y verificados en `dev`.**
   - **Minimizar conflictos entre ramas:**
     1. Antes de crear una nueva rama, asegúrate de que `dev` esté actualizada y sincronizada con `main`.
     2. Antes de subir cambios a `dev`, realiza un `git pull origin dev` para traer los últimos cambios remotos.
     3. Antes de fusionar cambios de `dev` a `main`, realiza un `git pull origin main` estando en `dev` y resuelve cualquier conflicto.
     4. Sube los cambios a remoto después de resolver conflictos (`git push origin dev`).
     5. Solo fusiona a `main` cuando `dev` esté completamente probada y sincronizada.

3. **Estructura de Código:**
   - Mantener la estructura de carpetas y archivos organizada.
   - Usar nombres descriptivos y consistentes para archivos y funciones.

4. **Documentación:**
   - Documentar funciones y componentes nuevos.
   - Actualizar este archivo si se agregan nuevas reglas.

5. **Estilo de Código:**
   - Seguir las convenciones de estilo del proyecto (por ejemplo, uso de SCSS, componentes en carpetas separadas, etc).
   - Comentar el código cuando sea necesario para claridad.

6. **Testing:**
   - Probar los cambios localmente antes de dar por finalizada una tarea.

7. **Peticiones al Asistente:**
   - Especificar claramente la tarea o cambio requerido.
   - Si se requiere un flujo o proceso, describirlo paso a paso.

---

*Actualiza este archivo según evolucione el proyecto o cambien las necesidades del equipo.* 