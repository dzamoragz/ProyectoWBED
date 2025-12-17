const filtroTexto = document.getElementById("filtroTexto");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroConsola = document.getElementById("filtroConsola");
const filas = document.querySelectorAll(".fila-videojuego");

function aplicarStriped() {
  let visibleIndex = 0;

  filas.forEach(fila => {
    if (fila.style.display !== "none") {
      fila.classList.remove("table-light", "table-secondary");

      fila.classList.add(
        visibleIndex % 2 === 0 ? "table-light" : "table-secondary"
      );

      visibleIndex++;
    }
  });
}

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function filtrar() {
  const texto = normalizar(filtroTexto.value);
  const categoria = normalizar(filtroCategoria.value);
  const consola = normalizar(filtroConsola.value);

  filas.forEach(fila => {
    const nombre = normalizar(fila.dataset.nombre);
    const cat = normalizar(fila.dataset.categoria);
    const con = normalizar(fila.dataset.consola);

    const coincideTexto = nombre.includes(texto);
    const coincideCategoria = !categoria || cat === categoria;
    const coincideConsola = !consola || con === consola;

    fila.style.display =
      coincideTexto && coincideCategoria && coincideConsola
        ? ""
        : "none";
  });
   aplicarStriped();
}



filtroTexto.addEventListener("input", filtrar);
filtroCategoria.addEventListener("change", filtrar);
filtroConsola.addEventListener("change", filtrar);