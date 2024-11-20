import { productosServicios } from "../services/product-services.js";

const containerProductos = document.querySelector("[data-productos]");
const formulario = document.querySelector("[data-formulario]");
const buscar = document.querySelector("[data-btn-buscar]");

// Estructura HTML del Card del Producto
function crearCard({ nombre, precio, imagenUrl, id }) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
    <li class="productos__card">
      <img class="producto-img" src="${imagenUrl}" alt="${nombre}">
      <h3 class="producto-nombre">${nombre}</h3>
      <span class="producto-footer">
        <p>$ ${precio}</p>
        <button class="btn-borrar" aria-label="eliminar producto">
          <i class="fa-solid fa-trash icon"></i>
        </button>
      </span>
    </li>`;

  // Llama a la función eliminar producto apretando botón con ícono de tacho de basura
  addDeleteEvent(card, id);
  return card;
}

// Función eliminar producto apretando botón con ícono de tacho de basura
function addDeleteEvent(card, id) {
  const btnBorrar = card.querySelector(".btn-borrar");
  btnBorrar.addEventListener("click", async () => {
    try {
      await productosServicios.borrarProducto(id);
      card.remove();
      console.log(`Producto con id ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el producto con id ${id}:`, error);
    }
  });
}

// Renderización de los productos (muestra los productos)
const renderizarProductos = async () => {
  try {
    const listaDeProductos = await productosServicios.listarProductos();
    listaDeProductos.forEach((producto) => {
      const productoCard = crearCard(producto);
      containerProductos.appendChild(productoCard);
    });
  } catch (error) {
    console.error("Error al renderizar productos:", error);
  }
};

// Cargar productos por el formulario
formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagenUrl = document.querySelector("[data-imagen-url]").value;

  if (nombre === "" || precio === "" || imagenUrl === "") {
    alert("Por favor, complete todos los campos");
  } else {
    try {
      const nuevoProducto = await productosServicios.crearProducto(
        nombre,
        precio,
        imagenUrl
      );
      console.log("Producto creado:", nuevoProducto);
      const nuevaCard = crearCard(nuevoProducto);
      containerProductos.appendChild(nuevaCard);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }

    // Limpia los campos del formulario
    formulario.reset();
  }
});

// Ejecuta la función de la renderización de los productos (muestra los productos)
renderizarProductos();