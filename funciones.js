async function unPersonaje(){
    let i=1;
    let personajeEncontrado=false;

    let contenedorGlobal=document.getElementById("contenedor");
    contenedorGlobal.innerHTML="";
    contenedorGlobal.style.backgroundImage= 'url("./imagenes/buscando.png")';
    contenedorGlobal.style.backgroundPosition="center, -30px";

    let personajeElegido=document.getElementById("personajeElegido").value;
    if(personajeElegido==""){
        contenedorGlobal.style.backgroundImage= 'url("./imagenes/mickey.png")';
        contenedorGlobal.style.backgroundPosition="center, -30px";
        alert("Introduzca el nombre de un personaje, por favor");
    }else{
        while(i<=149){
                await fetch("https://api.disneyapi.dev/character?page="+i)
                    .then(response=> response.json())
                    .then(personaje=>{
                        console.log(personaje);

                        let lista=personaje.data;

                        for(let x=0;x<lista.length;x++){
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

                                return;
                            }
                        }
                    })
            i++;
        }
        contenedorGlobal.style.backgroundImage="none";

        if(!personajeEncontrado){
            contenedorGlobal.style.backgroundImage='url("./imagenes/personajes.jpg")';
            contenedorGlobal.style.backgroundPosition="center -70px";
            alert("No se encontró el personaje");
        }
    }
}









function unaPagina(palabraClave, i){
    let pagina=document.getElementById("numPagina").value;
    
    let contenedorGlobal=document.getElementById("contenedor");
    contenedorGlobal.innerHTML="";

    contenedorGlobal.style.backgroundImage= 'url("./imagenes/buscando.png")';
    contenedorGlobal.style.backgroundPosition="center, -30px";

    if(palabraClave=="todasLasPaginas"){
        pagina=i;
    }

    if(isNaN(pagina)||pagina==""||pagina<1||pagina>149){
        contenedorGlobal.style.backgroundImage= 'url("./imagenes/mickey.png")';
        contenedorGlobal.style.backgroundPosition="center, -30px";
        alert("Introduzca un número entre el 1 y 149, por favor");
    }else{
        fetch("https://api.disneyapi.dev/character?page="+pagina)
            .then(response=>response.json())
            .then(personajes=>{
                console.log(personajes);

                contenedorGlobal.style.backgroundImage="none";

                let lista=personajes.data;

                lista.forEach(personaje => {
                    let peliculas=personaje.films;
                    if(peliculas==""){
                        peliculas="---";
                    }

                    let imagen=personaje.imageUrl;
                    let nombre=personaje.name;

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
                })
            })
    }
}









function todasLasPaginas(){
    let contenedorGlobal=document.getElementById("contenedor");
    contenedorGlobal.innerHTML="";
    contenedorGlobal.style.backgroundImage= 'url("./imagenes/buscando.png")';
    contenedorGlobal.style.backgroundPosition="center, -30px";

    let i=1;
    while(i<=149){
        unaPagina("todasLasPaginas",i);
        i++;
    }
}