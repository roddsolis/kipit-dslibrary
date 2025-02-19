import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Separa un archivo JSON de tokens en archivos por categoría.
 * @param {string} inputFilePath - Ruta del archivo JSON de entrada.
 * @param {string} outputDir - Directorio donde se guardarán los archivos separados.
 */
async function splitTokens(inputFilePath, outputDir) {
  try {
    // Leer el archivo JSON
    const data = await fs.readFile(inputFilePath, "utf8");
    const tokens = JSON.parse(data);

    // Crear el directorio de salida si no existe
    await fs.mkdir(outputDir, { recursive: true });

    // Separar los tokens por categoría y escribirlos en archivos
    const writePromises = Object.entries(tokens).map(
      async ([category, tokenData]) => {
        const outputFilePath = path.join(outputDir, `${category}.json`);
        await fs.writeFile(
          outputFilePath,
          JSON.stringify(tokenData, null, 2),
          "utf8"
        );
        console.log(`Archivo creado: ${outputFilePath}`);
      }
    );

    await Promise.all(writePromises);
    console.log("Separación de tokens completada.");
  } catch (error) {
    console.error("Error al procesar los tokens:", error);
  }
}

// Configurar las rutas
const inputFilePath = path.resolve(__dirname, "tokens.json"); // Archivo JSON en el mismo directorio
const outputDir = path.resolve(__dirname, "src/tokens"); // Directorio de salida corregido
// Ejecutar la función
splitTokens(inputFilePath, outputDir);
