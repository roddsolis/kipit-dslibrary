// generateDynamicContent.js
import fs from "fs";
import path from "path";

export function scanAppDirectory() {
  const appDir = path.join(process.cwd(), "src", "app"); // Ruta correcta para escanear
  const publicDir = path.join(process.cwd(), "public"); // Ruta donde se guardará el archivo .json
  console.log("Escaneando carpeta de aplicaciones: ", appDir);

  if (!fs.existsSync(appDir)) {
    console.log("La carpeta 'src/app' no existe.");
    return [];
  }

  const categories = [];

  // Escanea la carpeta src/app
  const folders = fs.readdirSync(appDir);
  folders.forEach((folder) => {
    const folderPath = path.join(appDir, folder);

    // Verifica si es una carpeta
    if (fs.statSync(folderPath).isDirectory()) {
      const category = { categoryName: folder, subCategories: [] };

      // Escanea los archivos .mdx dentro de la carpeta
      const mdxFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".mdx"));
      mdxFiles.forEach((mdx) => {
        category.subCategories.push({
          subCategoryName: mdx.replace(".mdx", ""),
        });
      });

      categories.push(category);
    }
  });

  // Escribe el archivo JSON en la carpeta public
  const jsonData = JSON.stringify(categories, null, 2);
  const jsonFilePath = path.join(publicDir, "menuData.json");
  fs.writeFileSync(jsonFilePath, jsonData);

  console.log(
    "Archivo menuData.json generado correctamente en la carpeta public"
  );
  return categories;
}

// Ejecuta la función para generar el archivo .json
scanAppDirectory();
