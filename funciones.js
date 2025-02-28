//El parámetro "palabraClave" marca si el valor de "pagina" es el que dice #numPagina ó todasLasPaginas().
//El uso de i es para cuando uso todasLasPaginas(). A través de ahí, le digo a unaPagina(), qué página quiero que me muestre.
function unaPagina(palabraClave, i){
    //Guardo el valor del input con id #numPagina en la variable pagina.
    let pagina=document.getElementById("numPagina").value;
    
    /*Almaceno el div creado en el html con este id, en la variable contenedorGlobal. Este será el que englobe todos los 
    siguientes contenedores*/
    let contenedorGlobal=document.getElementById("contenedor");
    /*Borro el contenido previo*/
    contenedorGlobal.innerHTML="";

    contenedorGlobal.style.backgroundImage= 'url("./imagenes/buscando.png")';
    contenedorGlobal.style.backgroundPosition="center, -30px";
    /*contenedorGlobal.style.backgroundRepeat= "repeat";
    contenedorGlobal.style.backgroundSize= "auto";
    contenedorGlobal.style.height= "100%";*/

    /*Si quiero usar todasLasPaginas(), el parámetro palabraClave le dirá a unaPagina() que almacene en pagina, 
    el parámetro i en lugar de lo del input.*/
    if(palabraClave=="todasLasPaginas"){
        pagina=i;
    }

    /*Si en el input, introduzco texto (ya no porque le he puesto de tipo number), nada ó un número que no sea de 1 a 149 
    (número de páginas disponibles), que no deje y que muestre un alert avisando.*/
    if(isNaN(pagina)||pagina==""||pagina<1||pagina>149){
        contenedorGlobal.style.backgroundImage= 'url("./imagenes/mickey.png")';
        contenedorGlobal.style.backgroundPosition="center, -30px";
        alert("Introduzca un número entre el 1 y 149, por favor");
    }else{
        /*Accedo a la api a través de un enlace que no es el original (url base:"https://api.disneyapi.dev" + endpoint "/character")
        porque en este caso, quiero un botón para mostrar todas las páginas y no sólo la primera, y para ello necesito este enlace que 
        aparece en la carpeta info del json.*/
        fetch("https://api.disneyapi.dev/character?page="+pagina)
            //Transforma la respuesta http a json.
            //Response es lo que me devuelve el fetch.
            //Puedo llamarlo response ó cómo quiera.
            .then(response=>response.json())
            //En personajes tengo almacenado el json. Puedo llamarlo cómo quiera.
            .then(personajes=>{
                //Console.log es para ver lo que me devuelve, en la consola de inspeccionar.
                console.log(personajes);

                /*Quito la imagen de fondo que hay puesta en un origen*/
                contenedorGlobal.style.backgroundImage="none";
                /*contenedorGlobal.style.backgroundColor="var(--cont-background-color)";
                contenedorGlobal.style.height="auto";*/

                    /*A continuación salen 3 bucles, usable cualquiera de ellos pero me acabé decantando por el que no está comentando.
                    Los comentados están incompletos, claro.*/
                    /*Destacar que insertAdjacentHTML me sirve para cuando uso todasLasPaginas() ya que digo como quiero que me vaya
                    colocando el nombre de los personajes, todos seguidos y si el nuevo que se crea lo coloco antes ó después por ejemplo
                    del ya creado justo antes.

                    /*for(let i=0;i<personajes.data.length;i++){
                        let nombre=personajes.data[i].name;
                        let p=document.createElement("p");
                        p.innerHTML=nombre;
                        contenedor.appendChild(p);
                    }*/
                    
                    /*let lista=personajes.data;
                    lista.forEach(personaje => {
                        let nombre=personaje.name;
                        contenedor.insertAdjacentHTML("beforeend",nombre+"<br>"); 
                    })*/


                    /*Los datos de los personajes están en una carpeta llamada data, que está dentro del json por lo que este directorio
                    lo almaceno en una variable para mejor control.*/
                    let lista=personajes.data;

                    /*Creo un bucle para crear cada personaje. Cada iteracción es un personaje creado. Parará cuando ya no haya más personajes
                    que crear en la página actual*/
                    lista.forEach(personaje => {
                        //Almaceno el campo "films" en una variable.
                        let peliculas=personaje.films;
                        //Hay personajes sin nada puesto en el campo "films" por lo que le digo con un if, que si es así, me guarde eso.
                        if(peliculas==""){
                            peliculas="---";
                        }
                        //Almaceno el campo "imageUrl" en una variable.
                        let imagen=personaje.imageUrl;
                        //Almaceno el campo "name" en una variable.
                        let nombre=personaje.name;

                        //Creo un img en el html, el cual queda guardado en esta variable.
                        let img=document.createElement("img");
                        //Vuelco el anterior campo "imageUrl" en el img creado.
                        img.src=imagen;

                        /*Ahora crearé varios divs, unos dentro de otros, basicámente para temas flexbox y que al hacer hover sobre uno, no
                        me trastoque el resto.*/
                        /*Creo un div que estará dentro del global y que contendrá todos los siguientes.*/
                        let contenedorImgTextoPadre=document.createElement("div");
                        /*Creo un div que estará dentro del anterior y que contendrá todos los siguientes.*/
                        let contenedorImgTexto=document.createElement("div");
                        /*Creo 2 divs que estarán dentro del anterior y que uno contendrá la imagen y el otro, el nombre y las películas.*/
                        let contenedorImg=document.createElement("div");
                        let contenedorTexto=document.createElement("div");
                        
                        /*Creo un h2 para que vaya ahí "Nombre:" y "Películas:" más adelante, con la intención de poder aplicar css a esto
                        sólo y no al resto de texto, pero no lo consigo asique de momento no aporta nada.*/
                        let nompel=document.createElement("h2");

                        //Creo un id a los siguientes contenedores para poder aplicarles css.
                        contenedorImgTextoPadre.id="mini-contenedor-padre";
                        contenedorImgTexto.id="mini-contenedor-hijo";
                        contenedorImg=img;
                        contenedorImg.id="mini-contenedor-hijo-img";

                        //Inserto el nombre y las películas y le pongo un id al contenedor.
                        contenedorTexto.innerHTML=(nompel.innerHTML="Nombre:")+"<br>"+nombre+"<br>"+"<br>"+(nompel.innerHTML="Películas:")+"<br>"+peliculas;
                        contenedorTexto.id="mini-contenedor-hijo-texto";

                        //Digo qué contenedores son hijos de quién.
                        contenedorImgTexto.appendChild(contenedorImg);
                        contenedorImgTexto.appendChild(contenedorTexto);
                        contenedorImgTextoPadre.appendChild(contenedorImgTexto);
                        contenedorGlobal.appendChild(contenedorImgTextoPadre);
                    })
            })


            /*INTENTO FALLIDO DE PAGINACIÓN
            let btnNext;
            let btnPrev;
            let aNext;
            let aPrev;
            btnNext=document.createElement("button");
            btnPrev=document.createElement("button");
            btnNext.innerHTML="NEXT";
            btnPrev.innerHTML="PREV";
            btnNext.onclick = function() {
                window.location.href = response.info.nextPage;
            };
            btnPrev.onclick = function() {
                window.location.href = response.info.previousPage;
            };
            contenedorGlobal.appendChild(btnNext);
            contenedorGlobal.appendChild(btnPrev);
            */
    }
}








//Función para mostrar todas las páginas.
function todasLasPaginas(){
    /*Imagen de espera*/
    let contenedorGlobal=document.getElementById("contenedor");
    contenedorGlobal.innerHTML="";
    contenedorGlobal.style.backgroundImage= 'url("./imagenes/buscando.png")';
    contenedorGlobal.style.backgroundPosition="center, -30px";
    /*i es la variable que se irá pasando por parámetro a unaPagina e indicando que número de página ir impriendo en cada momento*/
    let i=1;
    while(i<=149){
        unaPagina("todasLasPaginas",i);
        i++;
    }
}







/*Repetición de las 2 funciones anteriores con ciertos añadidos y cambios para hacer que solo me coja los personajes que tienen 
el nombre que se pide*/
/*Pongo la función en async porque he puesto el fetch en await*/
async function unPersonaje(){
    let i=1;
    let personajeEncontrado=false;

    let contenedorGlobal=document.getElementById("contenedor");
    contenedorGlobal.innerHTML="";
    /* Intento de que para cuando se vayan cargando los personajes, se quite ya la imagen de espera
    let buscando=document.createElement("img");
    contenedorGlobal.appendChild(buscando);
    buscando.src= 'url("./imagenes/buscando.png")';
    buscando.style.position="center, -30px";*/
    contenedorGlobal.style.backgroundImage= 'url("./imagenes/buscando.png")';
    contenedorGlobal.style.backgroundPosition="center, -30px";

    let personajeElegido=document.getElementById("personajeElegido").value;
    if(personajeElegido==""){
        contenedorGlobal.style.backgroundImage= 'url("./imagenes/mickey.png")';
        contenedorGlobal.style.backgroundPosition="center, -30px";
        alert("Introduzca el nombre de un personaje, por favor");
    }else{
        while(i<=149){
                /*Necesario el await de cara a que funcione el uso de personajeEncontrado*/
                await fetch("https://api.disneyapi.dev/character?page="+i)
                    .then(response=> response.json())
                    .then(personaje=>{
                        console.log(personaje);

                        /*LO HE PUESTO ABAJO contenedorGlobal.style.backgroundImage="none";*/

                        let lista=personaje.data;

                        for(let x=0;x<lista.length;x++){
                            /*Para permitir el reconocimiento de parte del nombre, por ejemplo cuando es nombre y apellido y sólo se
                            introduce el apellido, en vez de poner personajeElegido=lista[x].name, usamos el método includes()*/
                            if(lista[x].name.includes(personajeElegido)){
                                let peliculas=lista[x].films;
                                if(peliculas==""){
                                    peliculas="---";
                                }
                                let imagen=lista[x].imageUrl;
                                let nombre=lista[x].name;
        
                                let img=document.createElement("img");
                                img.src=imagen;
        
                                let contenedorImgTextoPadre=document.createElement("div");
                                let contenedorImgTexto=document.createElement("div");
                                let contenedorImg=document.createElement("div");
                                let contenedorTexto=document.createElement("div");
                                
                                let nompel=document.createElement("h2");
        
                                contenedorImgTextoPadre.id="mini-contenedor-padre";
                                contenedorImgTexto.id="mini-contenedor-hijo";
                                contenedorImg=img;
                                contenedorImg.id="mini-contenedor-hijo-img";

                                contenedorTexto.innerHTML=(nompel.innerHTML="Nombre:")+"<br>"+nombre+"<br>"+"<br>"+(nompel.innerHTML="Películas:")+"<br>"+peliculas;
                                contenedorTexto.id="mini-contenedor-hijo-texto";

                                contenedorImgTexto.appendChild(contenedorImg);
                                contenedorImgTexto.appendChild(contenedorTexto);
                                contenedorImgTextoPadre.appendChild(contenedorImgTexto);
                                contenedorGlobal.appendChild(contenedorImgTextoPadre);

                                personajeEncontrado=true;

                                /*Si usara break, me cortaría el bucle y ya no haría más iteraciones*/
                                return;
                            }
                        }
                    })
            i++;
            /*Si usara break, me cortaría el bucle y ya no haría más iteraciones
            if(personajeEncontrado){
                break;
            }*/
        }
        contenedorGlobal.style.backgroundImage="none";
        /*contenedorGlobal.style.backgroundColor="var(--cont-background-color)";
        contenedorGlobal.style.height="auto";*/

        /*Si personajeEncontrado es false...*/
        if(!personajeEncontrado){
            contenedorGlobal.style.backgroundImage='url("./imagenes/personajes.jpg")';
            contenedorGlobal.style.backgroundPosition="center -70px";
            alert("No se encontró el personaje");
        }
    }
}