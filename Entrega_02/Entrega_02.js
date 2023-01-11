// Formato: carpeta comprimida con el proyecto.
// >> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el
// nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
// ● save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// ● getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// ● getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// ● deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// ● deleteAll(): void - Elimina todos los objetos presentes en el archivo.
// >> Aspectos a incluir en el entregable:
// - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id
// del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// - Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con
// async/await y manejo de errores.
// - Probar el módulo creando un contenedor de productos, que se guarde en el archivo:
// “productos.txt”
// - Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para
// verificar el correcto funcionamiento del módulo construído.
// - El formato de cada producto será : {
// title: (nombre del producto),
// price: (precio),
// thumbnail: (url de la foto del producto)
// }

const fs = require ('fs'); //Importa fs.

class Contenedor{
    constructor(file){
        this.file = file;
        this.read = null;
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
                    return product.find(product => product.id === id);
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

const productoNew = {
    title: "escuadra",
    price: 18.78,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};

//producto.getAll();//Muestra datos en archivo;
//producto.save(productoNew);//Agrega nuevo objeto;
//producto.getById(1);//Muestra y devuelve objeto con id = 1;
//producto.getAll();//Devuelve todos los objetos del archivo;
//producto.deleteById(1);//Elimina el objeto con id = 1;
//producto.deleteAll();//Sobrescribe el archivo productos.txt con dato vacío;