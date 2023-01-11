const express = require("express");
const app = express();
const fs = require("fs");
const { resolve } = require("path");
const { Router } = express;




const router = Router();
//Esto concatenara un string de la direccion de la carpeta mas el archivo segun el sistema operativo que uses
const path = require('path')

// funcion donde concateno el path para utilizarlo en la misma carpeta
const pathFin = (archivo) => {
    return path.join(__dirname, archivo)
}

class Contenedor {

    constructor(archivo) {
        this.archivo = archivo
        this.id = 1
        this.read = null
        this.products = []
        this.random = {}

        router.get('/', this.getAll);
        router.get('/:id', this.getById);
        router.post('/', this.save);
        router.put('/:id', this.updateProduct);
        router.delete('/:id', this.deleteById);
    }

    save(req, res) {
    
    let product = req.body.product

    if(product){
        fs.readFile(this.archivo, "utf-8", (err, data) =>{
            if(err){
                throw new Error("Error en la lectura.")
            }
            this.read = JSON.parse(data)
            if(this.read.length === 0){
                producto.id = this.id
                this.read.push(producto)
                fs.unlink(this.archivo, err => {
                    if(err){
                        throw new Error("Error en la lectura.")
                    }
                })
                fs.appendFile(this.archivo, String(JSON.stringify(this.read)), err =>{
                    if(err){
                        throw new Error("Error en la escritura.")
                    }
                    res.status(201).send("El producto se guardo correctamente.")
                })
            }else{
                this.read = JSON.parse(data)
                producto.id = this.read[this.read.length-1].id + 1
                this.read.push(producto)
                fs.unlink(this.archivo, err => {
                    if(err){
                        throw new Error("Error al eliminar el producto.")
                    }
                })
                fs.appendFile(this.archivo, String(JSON.stringify(this.read)), err =>{
                    if(err){
                        throw new Error("Error en la escritura.")
                    }
                    res.status(201).send("El producto se guardo correctamente.")
                })
            }
        })            
    }}


    getAll(req, res) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.archivo, "utf-8", (err, data) => {
                if (err) {
                    reject("Ocurrió un error inesperado");
                }
                this.products = JSON.parse(data);
                resolve(this.products);
                res.status(201).send(this.products);
            });
        });
    };


    updateProduct(req, res) {
        const { id } = req.params;
        const productModify = req.body;
    
        if (id >= 1 && id <= this.productos.length) {
          const saveProduct = { ...productModify, id: parseInt(id) };
          productos.splice(id - 1, 1, saveProduct);
          res.status(201).send(saveProduct);
        } else {
          res.status(400).send({ error: 'producto no encontrado' });
        }
      };


    getById(req, res) {
        
        const id = req.params.id

        return new Promise ((resolve, reject) => {
            fs.readFile(this.archivo, "utf-8", (err, data) => {
                if (err) {
                    reject("Ocurrió un error inesperado.");
                }
    
                let product = JSON.parse(data)
                this.random = product.find(product => product.id === id)
                resolve("ok");
                res.status(201).send(this.random);
            })
        }) 
    }

    async deleteById(res, req) {

        const id = req.params.id;

        fs.readFile(this.archivo, "utf-8", (err, data) => {
            if (err) {
                throw new Error("Ocurrió un error inesperado.");
            }
            let products = JSON.parse(data);
            let product = products.filter(product => product.id !== id);
            res.status(201).send(product);
            fs.writeFile(this.archivo, JSON.stringify(product), err => {
                if (err) {
                    throw new Error("Ocurrió un error inesperado.");
                };
            });
        });
    };

    deleteAll() {
        fs.writeFile(this.archivo, JSON.stringify([]), err => {
            if (err) {
                throw new Error("Ocurrió un error inesperado.");
            };
        });
    };
};

const productos = new Contenedor("E:\\Yo\\Workspace_VSCode\\Entrega_04\\producto.txt")

module.exports = router;