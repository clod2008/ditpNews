<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Next Level — DITP Argentina</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary:   '#0F172A',
            secondary: '#334155',
            accent:    '#0369A1',
            muted:     '#64748B',
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">

  <!-- Header -->
  <header class="bg-primary text-white shadow-md">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-accent font-bold text-xl tracking-wide">DITP</span>
        <span class="text-slate-400 text-sm">Argentina</span>
      </div>
      <nav class="hidden md:flex gap-6 text-sm text-slate-300">
        <a href="#" class="hover:text-white transition-colors">Inicio</a>
        <a href="#" class="hover:text-white transition-colors">Programa</a>
        <a href="#" class="hover:text-white transition-colors">Contacto</a>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="bg-gradient-to-br from-primary via-secondary to-accent text-white py-20 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Departamento de Promoción Comercial Internacional de Tailandia</p>
      <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
        Next Level
      </h1>
      <p class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Llevá tu negocio al próximo nivel con el apoyo del DITP en Argentina.
      </p>
      <a href="#" class="inline-block bg-accent hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg">
        Conocé más
      </a>
    </div>
  </section>

  <!-- Cards Section -->
  <section class="py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-primary text-center mb-2">¿Qué ofrecemos?</h2>
      <p class="text-muted text-center mb-10">Servicios y programas disponibles para empresas</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-primary mb-2">Nombre del servicio</h3>
          <p class="text-muted text-sm">Descripción breve del servicio o programa disponible para empresas participantes.</p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-primary mb-2">Nombre del servicio</h3>
          <p class="text-muted text-sm">Descripción breve del servicio o programa disponible para empresas participantes.</p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-primary mb-2">Nombre del servicio</h3>
          <p class="text-muted text-sm">Descripción breve del servicio o programa disponible para empresas participantes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="bg-accent py-14 px-6">
    <div class="max-w-3xl mx-auto text-center text-white">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">¿Listo para el próximo nivel?</h2>
      <p class="text-blue-100 mb-8">Contactanos y un representante del DITP se comunicará con vos.</p>
      <a href="mailto:info@ditp.go.th" class="inline-block bg-white text-accent font-semibold px-8 py-3 rounded-full hover:bg-slate-100 transition-colors shadow">
        Contactar ahora
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-primary text-slate-400 py-8 px-6 text-sm text
-center">
    <p>© 2025 DITP — Department of International Trade Promotion · Thailand</p>
  </footer>

</body>
</html>
