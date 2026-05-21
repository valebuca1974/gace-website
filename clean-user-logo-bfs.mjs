import sharp from 'sharp';

async function removeBackground() {
  try {
    const inputPath = 'C:/Users/dean valentin/.gemini/antigravity/brain/6a604d82-1425-4bd1-a32d-7c373d44cc84/media__1779135803496.jpg';
    
    // 1. Cargar imagen y convertir a búfer raw RGBA
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = 4;

    // Helper para obtener el índice de un píxel
    const getIndex = (x, y) => (y * width + x) * channels;

    // Matriz de visitados para el BFS (usamos un Uint8Array para eficiencia)
    const visited = new Uint8Array(width * height);

    // Cola para el BFS
    const queue = [];
    let head = 0;

    // Función para verificar si un píxel es "blanco" (cercano a blanco)
    const isWhite = (x, y) => {
      const idx = getIndex(x, y);
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      // El fondo de la imagen es blanco puro (#FFFFFF), por lo que podemos usar un umbral alto
      return r > 240 && g > 240 && b > 240;
    };

    // Añadir todos los píxeles de los bordes como semillas si son blancos
    for (let x = 0; x < width; x++) {
      // Borde superior
      if (isWhite(x, 0)) {
        const idx = 0 * width + x;
        visited[idx] = 1;
        queue.push(idx);
      }
      // Borde inferior
      if (isWhite(x, height - 1)) {
        const idx = (height - 1) * width + x;
        visited[idx] = 1;
        queue.push(idx);
      }
    }
    for (let y = 0; y < height; y++) {
      // Borde izquierdo
      if (isWhite(0, y)) {
        const idx = y * width + 0;
        if (!visited[idx]) {
          visited[idx] = 1;
          queue.push(idx);
        }
      }
      // Borde derecho
      if (isWhite(width - 1, y)) {
        const idx = y * width + (width - 1);
        if (!visited[idx]) {
          visited[idx] = 1;
          queue.push(idx);
        }
      }
    }

    console.log(`Semillas iniciales en la cola: ${queue.length}`);

    // BFS
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    while (head < queue.length) {
      const curr = queue[head++];
      const cx = curr % width;
      const cy = Math.floor(curr / width);

      // Hacer este píxel completamente transparente
      const cIdx = getIndex(cx, cy);
      data[cIdx + 3] = 0; // Alpha = 0

      // Explorar vecinos
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = ny * width + nx;
          if (!visited[nIdx]) {
            if (isWhite(nx, ny)) {
              visited[nIdx] = 1;
              queue.push(nIdx);
            }
          }
        }
      }
    }

    console.log(`Píxeles de fondo eliminados: ${head}`);

    // 2. Guardar la imagen con sharp, aplicando trim para eliminar bordes vacíos/transparentes
    const trimmedLogoBuffer = await sharp(data, {
      raw: {
        width: width,
        height: height,
        channels: channels
      }
    })
    .trim() // Recorta los bordes transparentes
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

    // Guardamos en todas las rutas oficiales para asegurar que se reemplace en toda la app
    const outputPaths = [
      'public/logo-gace-oficial-transparent.png',
      'public/logo-gace-oficial.png',
      'public/logo-gace.png',
      'public/logo-gace-final-transparent.png',
      'public/logo-gace-final-trimmed.png',
      'public/logo-gace-oficial-trimmed.png'
    ];

    for (const outputPath of outputPaths) {
      await sharp(trimmedLogoBuffer).toFile(outputPath);
      console.log(`Logo guardado exitosamente en: ${outputPath}`);
    }

  } catch (err) {
    console.error('Error al procesar el logo:', err);
  }
}

removeBackground();
