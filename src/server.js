import express from "express";
const app = express();

// <---------- Routes ---------->

import routerProducts from "./routes/products.routes.js";
app.use("/api/productos", routerProducts);

import routerCart from "./routes/cart.routes.js";
app.use("/api/carrito", routerCart);

// <---------- Servidor Error 404 ---------->

function error404(req, res, next) {
	console.log(req.url, req.method);
	const message = {
		error: 404,
		descripcion: `ruta ${req.url} y metodo ${req.method} no estan implementados`,
	};
	if (req.url !== "/" || (req.url === "/" && req.method !== "GET")) {
		res.status(404).json(message);
	}
	next();
}

app.use(error404);

// <---------- Servidor ---------->

app.get("/", (req, res) => {
	res.send("<h1>Primer entrega del proyecto</h1>");
})

// <---------- Servidor ---------->

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
