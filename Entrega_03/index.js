const express = require ('express'); //Importa  módulo Express
const fs = require ('fs'); //Importa fs.

const app = express();
const PORT = 8080;

/* 1)Realizar un proyecto de servidor basado en node.js que utilice el módulo express e
implemente los siguientes endpoints en el puerto 8080:
a) Ruta get '/productos' que devuelva un array con todos los productos disponibles
en el servidor
b) Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos
los productos disponibles
2) Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío
anterior para acceder a los datos persistidos del servidor.
Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el
ejemplo del desafío anterior. */

class Contenedor{
    constructor(file){
        this.file = file;
        this.read = null;
        this.random = {};
    };

    static id = 1;
  
    //Función de guardado en archivo enviado por parámetro.
    save(Object){
        fs.readFile(this.file, "utf-8", (err, data) =>{
            if(err){
                throw new Error("Error en la lectura del archivo.");
            };
            if(data.length === 0){ //Si el archivo está vacío (Primer dato a ingresar).
                Object.id = Contenedor.id;
                this.read = Object;
                fs.unlink(this.file , err => {
                    if(err){
                        throw new Error("Error en el archivo.");
                    };
                });
                fs.appendFile(this.file, String('['+ JSON.stringify(this.read) + ']'), err =>{
                    if(err){
                        throw new Error("Error en el guardado.");
                    };
                });
            }else{ //Si el archivo tiene información.
                this.read = JSON.parse(data);   //Se convierte en objeto estructurado.
                console.log(`Los datos al momento son:`);
                console.log(this.read);
                Object.id = this.read[this.read.length-1].id + 1;
                console.log(`Se agrega el dato:`);
                console.log(Object);
                this.read.push(Object);
                fs.unlink(this.file, err => {
                    if(err){
                        throw new Error("Error en el archivo.");
                    }
                })
                fs.appendFile(this.file, String(JSON.stringify(this.read)), err =>{
                    if(err){
                        throw new Error("Error en el guardado del archivo.");
                    }
                })
            } return Object.id; //Devuelve id generado.
        });       
    };

    //Función de devolución de objeto según id enviado.
    getById(id){
        fs.readFile(this.file, "utf-8", (err, data) => {
                if(err){
                    throw new Error("Error en la lectura del archivo.");
                };
                let product = JSON.parse(data);
                if(product.find(product => product.id === id) !== undefined){
                    console.log(`El dato correspondiente al id ${id} es:`);
                    console.log(product.find(product => product.id === id));
                    this.random = product.find(product => product.id === id);
                }else{
                    console.log(`No hay objeto con el id: ${id}`);
                    return null;
                };
        });
    };

    //Función devuelve un array con los objetos presentes en el archivo.
    getAll(){
        fs.readFile(this.file, "utf-8", (err, data) => {
                if(err){
                    throw new Error("Error en la lectura del archivo.");
                };
                this.read = JSON.parse(data);
                console.log(`Los datos en el archivo son:`);
                console.log(this.read);
                return this.read;
        });
    };

    //Función elimina del archivo el objeto con el id buscado.
    deleteById(id){
        fs.readFile(this.file, "utf-8", (err, data) => {
         if(err){
                throw new Error("Error en la lectura del archivo.");
            };
         if(data.length !== 0){
                this.read = JSON.parse(data);
                let product = this.read.filter(product => product.id !== id)
                fs.writeFile(this.file, JSON.stringify(product), err => {
                    if(err){
                        throw new Error("Error en la escritura del archivo.");
                    };
                })
                console.log(`Elemento con id ${id} eliminado correctamente.`);
            };
        });
    };

    //Función elimina del archivo el objeto con el id buscado.
    deleteAll(){
        fs.writeFile(this.file, "", err => {
            if(err){
                throw new Error("Error en la escritura del archivo.");
            };
        });
    };
};

const producto = new Contenedor('./productos.txt');
producto.getAll();//Muestra datos en archivo;

//Manejo servidor
const server = app.listen(PORT, () => {
     console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`)
  });
 
  server.on("error", e => console.log(`Error en servidor ${e}`))
 
  app.get('/productos', (solicitud, respuesta) => {
      respuesta.send(producto.read);
  });
 
  app.get("/productoRandom", (solicitud, respuesta) => {
    num = Math.floor(Math.random() * 3 + 1);
    producto.getById(num);
    respuesta.send(producto.random);
});