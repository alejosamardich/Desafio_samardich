import fs from "fs";

class Product {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(`./src/${this.nameFile}`, "utf-8");
		if (response === "") {
			return this.assign(true);
		} else {
			return JSON.parse(response);
		}
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos`,
			};
		}
		return data.find((element) => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		product.timestamp = Date.now();
		product.code = `${product.nombre}${product.timestamp}`;
		data.push(product);
		fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		return {
			product: product,
		};
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos.`,
			};
		} else {
			product.id = id;
			product.timestamp = Date.now();
			product.code = `${product.nombre}${product.timestamp}`;
			const previousProduct = data.splice(id - 1, 1, product);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			return {
				previous: previousProduct[0],
				new: product,
			};
		}
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos`,
			};
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct,
			};
		}
	}

	// Agrega id a los productos del archivo "products.json" si sufre alguna modificacion
	assign(empty = false) {
		if (empty) {
			let id = 1;
			listProducts.forEach((element) => {
				element.id = id++;
				element.timestamp = Date.now();
				element.code = `${element.nombre}${element.timestamp}`;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(listProducts));
			return listProducts;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach((element) => {
				element.id = id++;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		}
	}
}
export default Product;

// Lista de productos por defecto
const listProducts = 
[
{id:1,nombre:"PS5",stock:2,precio:900,imagen:"https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21"},
{id:2,nombre:"XBOX SERIES X",stock:5,precio:800,"imagen":"https://www.atajo.com.ar/thumb/0000000RRT-0000234357RRT-00002-Consola-Xbox-Series-X-01_800x800.jpg"},
{id:3,nombre:"NINTENDO SWITCH",stock:3,precio:600,"imagen":"https://www.atajo.com.ar/images/00000HAD-S-KABAA65619HAD-S-KABAA-Consola-Nintendo-Switch-Neon-01.jpg"},
{id:4,nombre:"PS2","precio":100,stock:1,imagen:"https://sm.ign.com/t/ign_es/gallery/t/the-best-p/the-best-ps2-games-ever_7ser.1280.jpg"}
];
