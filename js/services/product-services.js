const BASE_URL = "http://localhost:3000/productosag";

// Genera una lista de los productos cargados
const listarProductos = async () => {
  try {
    const respuesta = await fetch(BASE_URL);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
  }
};

// Obtiene los datos del formulario y crea un producto
const crearProducto = async (nombre, precio, imagenUrl) => {
  try {
    const respuesta = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({nombre, precio, imagenUrl }),
    });

    const data = await respuesta.json();
    console.log("Solicitud POST exitosa:", data);
    return data;
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
  }
};

// Metodo para borrar los productos
const borrarProducto = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Producto con id ${id} eliminado exitosamente`);
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
  }
};

export const productosServicios = {
  listarProductos,
  crearProducto,
  borrarProducto
};