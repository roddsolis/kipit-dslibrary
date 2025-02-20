import { notFound } from "next/navigation";

// Importa los archivos MDX dinámicamente
const contentModules = {
  "brand/logos": () => import("../brand/logos.mdx"),
  "componentes/alerts": () => import("../componentes/alerts.mdx"),
};

export default async function Page({ params }) {
  const { slug } = params;
  const path = slug.join("/"); // Convierte ['brand', 'logos'] en 'brand/logos'

  if (!contentModules[path]) {
    notFound(); // Muestra un 404 si el archivo no existe
  }

  const Content = (await contentModules[path]()).default;

  return (
    <div className="MainContent">
      <Content />
    </div>
  );
}
