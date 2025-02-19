import fs from "fs";
import path from "path";
import chokidar from "chokidar";

const appPath = path.join(process.cwd(), "app"); // Ruta de la carpeta app
const exportPath = path.join(process.cwd(), "public", "menuData.json"); // Guardar el archivo JSON en la carpeta public

let menuStructure = {};

// Función para escanear la carpeta "app" al inicio
const scanAppFolder = () => {
  if (!fs.existsSync(appPath)) return;

  menuStructure = {};
  const folders = fs.readdirSync(appPath, { withFileTypes: true });

  folders.forEach((dir) => {
    if (dir.isDirectory()) {
      const folderName = dir.name;
      const folderPath = path.join(appPath, folderName);
      const files = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".mdx"));

      menuStructure[folderName] = files;
    }
  });

  saveMenu();
};

// Función para guardar la estructura en JSON
const saveMenu = () => {
  fs.writeFileSync(exportPath, JSON.stringify(menuStructure, null, 2));
  console.log("📜 Menú actualizado en menuData.json");
};

// Escanea la carpeta al inicio
scanAppFolder();

// Observador para detectar cambios en tiempo real
const watcher = chokidar.watch(appPath, {
  persistent: true,
  ignoreInitial: false,
  depth: 1,
});

// Detecta nuevas carpetas
watcher.on("addDir", (folderPath) => {
  const folderName = path.basename(folderPath);
  if (!menuStructure[folderName]) {
    menuStructure[folderName] = [];
    console.log(`📁 Nueva carpeta detectada: ${folderName}`);
    saveMenu();
  }
});

// Detecta nuevos archivos .mdx
watcher.on("add", (filePath) => {
  const fileName = path.basename(filePath);
  const folderName = path.basename(path.dirname(filePath));

  if (fileName.endsWith(".mdx")) {
    if (!menuStructure[folderName]) {
      menuStructure[folderName] = [];
    }
    if (!menuStructure[folderName].includes(fileName)) {
      menuStructure[folderName].push(fileName);
      console.log(
        `📄 Nuevo archivo MDX detectado en ${folderName}: ${fileName}`
      );
      saveMenu();
    }
  }
});

// Detecta eliminación de carpetas
watcher.on("unlinkDir", (folderPath) => {
  const folderName = path.basename(folderPath);
  if (menuStructure[folderName]) {
    delete menuStructure[folderName];
    console.log(`❌ Carpeta eliminada: ${folderName}`);
    saveMenu();
  }
});

// Detecta eliminación de archivos .mdx
watcher.on("unlink", (filePath) => {
  const fileName = path.basename(filePath);
  const folderName = path.basename(path.dirname(filePath));

  if (fileName.endsWith(".mdx") && menuStructure[folderName]) {
    menuStructure[folderName] = menuStructure[folderName].filter(
      (file) => file !== fileName
    );
    console.log(`🗑️ Archivo MDX eliminado en ${folderName}: ${fileName}`);
    saveMenu();
  }
});

console.log(`🔍 Observando cambios en la carpeta: ${appPath}`);
