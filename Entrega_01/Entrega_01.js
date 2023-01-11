class Usuario{
   constructor(nombre, apellido, libros, mascotas){
       this.nombre = nombre;
       this.apellido = apellido;
       this.libros = libros;
       this.mascotas = mascotas;
   };

    static countPet = 1;

    //Return Full Name
    getFullName(){
        return (`${this.nombre} ${this.apellido}`);
    };

    //Add a Pet
    addMascota(namePet){
        this.mascotas.push(namePet);
        Usuario.countPet++;
    };

    //Return Mascotas total
    countMascotas(){
        return Usuario.countPet;
    };

    //Add Books
    addBook(nombre, autor){
        this.libros.push(nombre, autor);
    };

    //Get Book Names
    getBookNames(){
        let tempBookName = [];
        let i = 0, j = 0;
        let temp = this.libros.length;
        while(i != temp){
            tempBookName[j] = this.libros[i];
            i = i + 1;
            i++;
            j++;
        }
        return tempBookName;
    };
};

const usuario = new Usuario('Cristian', 'Apablaza',['The Lord of the Rings', 'Tolkien'],['Aime']);

console.log(usuario);

const FullName = usuario.getFullName();
let total = usuario.countMascotas();

console.log(`\nEl nombre completo es: ${FullName}`);
console.log(`En este punto la cantidad total de mascotas es ${total}.`);

usuario.addMascota('Morita');
usuario.addMascota('Logan');

total = usuario.countMascotas();

console.log(`En este punto la cantidad total de mascotas es ${total}.`);

usuario.addBook('Civil War', 'Marvel');
let books = usuario.getBookNames();
console.log(`Los nombres de los libros son ${books}.`);

usuario.addBook('Doomsday Clock', 'DC');
books = usuario.getBookNames();
console.log(`Los nombres de los libros son ${books}.`);