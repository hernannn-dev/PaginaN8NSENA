/*=========================================
        VARIABLES
=========================================*/

const nombre = document.getElementById("f-nombre");
const email = document.getElementById("f-email");
const pregunta = document.getElementById("f-pregunta");

const boton = document.getElementById("btn-enviar");

const prompt = document.getElementById("prompt-preview");

const respuestaIA = document.getElementById("ai-response");

const estadoIA = document.getElementById("ai-status");

const estadoCorreo = document.getElementById("email-status");

const correoPara = document.getElementById("em-to");

const asuntoCorreo = document.getElementById("em-subject");

const cuerpoCorreo = document.getElementById("em-body");

const enviado = document.getElementById("sent-message");

const palabras = document.getElementById("word-count");

const tiempo = document.getElementById("time-response");


/*=========================================
            EVENTOS
=========================================*/

nombre.addEventListener("input", actualizarPrompt);
pregunta.addEventListener("input", actualizarPrompt);

boton.addEventListener("click", ejecutarFlujo);


/*=========================================
      ACTUALIZAR PROMPT
=========================================*/

function actualizarPrompt(){

prompt.textContent=
`Eres un asistente inteligente experto en tecnología.

Nombre del usuario:

${nombre.value}

Pregunta:

${pregunta.value}

Responde de forma clara,
profesional,
paso a paso
y utilizando ejemplos cuando sea necesario.`;

}


/*=========================================
            ESPERA
=========================================*/

function esperar(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}
/*=========================================
        EJECUTAR FLUJO
=========================================*/

async function ejecutarFlujo(){

    if(nombre.value.trim()==="" ||
       email.value.trim()==="" ||
       pregunta.value.trim()===""){

        alert("Por favor completa todos los campos.");

        return;

    }

    boton.disabled=true;

    boton.textContent="Procesando...";

    enviado.classList.remove("show");

    respuestaIA.innerHTML="";

    cuerpoCorreo.innerHTML="";

    palabras.textContent="0";

    tiempo.textContent="0 s";

    actualizarPrompt();

    await iniciarFlujo();

}


/*=========================================
        FLUJO N8N
=========================================*/

async function iniciarFlujo(){

    activarPaso("ps-form");

    await esperar(800);

    activarPaso("ps-n8n");

    await esperar(1200);

    activarPaso("ps-ai");

    estadoIA.className="status-badge badge-loading";

    estadoIA.innerHTML="🧠 Pensando...";

    respuestaIA.innerHTML=`
Analizando la consulta...

Buscando la mejor respuesta...

Generando respuesta...
`;

    await esperar(2500);

    let respuesta = generarRespuesta(pregunta.value);

    await escribirRespuesta(respuesta);

    estadoIA.className="status-badge badge-success";

    estadoIA.innerHTML="Respuesta lista";

    await esperar(700);

    activarPaso("ps-email");

    await generarCorreo(respuesta);

}


/*=========================================
        ACTIVAR PASOS
=========================================*/

function activarPaso(id){

    document.querySelectorAll(".pipe-step").forEach(p=>{

        p.classList.remove("active");

        p.classList.add("done");

    });

    const paso=document.getElementById(id);

    paso.classList.remove("done");

    paso.classList.add("active");

}


/*=========================================
        CONTADOR
=========================================*/

function actualizarContadores(texto,inicio){

    const cantidad=texto.split(" ").length;

    palabras.textContent=cantidad;

    let segundos=((Date.now()-inicio)/1000).toFixed(1);

    tiempo.textContent=segundos+" s";

}

/*=========================================
      RESPUESTAS DEL ASISTENTE IA
=========================================*/

function generarRespuesta(texto){

    texto = texto.toLowerCase();

    /*================ JAVA ================*/

    if(texto.includes("java")){

        return `Java es un lenguaje de programación orientado a objetos muy utilizado en aplicaciones empresariales, móviles y de escritorio.

Para aprender Java te recomiendo seguir este orden:

• Clases y Objetos.
• Encapsulamiento.
• Herencia.
• Polimorfismo.
• Interfaces.
• ArrayList.
• Pilas y Colas.
• Manejo de archivos.
• Bases de datos con MySQL.
• Proyectos completos.

La práctica constante es la mejor forma de dominar este lenguaje.`;

    }

    /*================ HTML ================*/

    if(texto.includes("html")){

        return `HTML es el lenguaje encargado de estructurar una página web.

Con HTML puedes crear:

• Títulos.
• Párrafos.
• Imágenes.
• Tablas.
• Formularios.
• Videos.
• Enlaces.

Posteriormente CSS se utiliza para darle diseño y JavaScript para agregar interactividad.`;

    }

    /*================ CSS ================*/

    if(texto.includes("css")){

        return `CSS permite darle estilo a una página web.

Puedes modificar:

• Colores.
• Tamaños.
• Márgenes.
• Animaciones.
• Sombras.
• Botones.
• Diseño Responsive.

Gracias a CSS una página puede verse moderna y profesional.`;

    }

    /*================ JAVASCRIPT ================*/

    if(texto.includes("javascript")){

        return `JavaScript agrega comportamiento a una página web.

Con JavaScript puedes:

• Validar formularios.
• Crear animaciones.
• Consumir APIs.
• Actualizar información sin recargar la página.
• Manipular el HTML y CSS dinámicamente.

Es uno de los lenguajes más importantes para el desarrollo web.`;

    }

    /*================ N8N ================*/

    if(texto.includes("n8n")){

        return `n8n es una plataforma de automatización de procesos.

Permite conectar diferentes aplicaciones mediante flujos de trabajo utilizando nodos.

Algunos ejemplos son:

• Enviar correos automáticamente.
• Conectar APIs.
• Automatizar reportes.
• Leer archivos Excel.
• Integrar Inteligencia Artificial.
• Automatizar procesos empresariales.

Es una excelente herramienta para aumentar la productividad.`;

    }

    /*================ API ================*/

    if(texto.includes("api")){

        return `Una API permite que dos aplicaciones intercambien información.

Por ejemplo:

Una página web puede enviar una pregunta a una IA mediante una API y recibir una respuesta automáticamente.

Actualmente muchas plataformas como OpenAI, Google o GitHub ofrecen APIs para integrar sus servicios.`;

    }

    /*================ IA ================*/

    if(texto.includes("ia") ||
       texto.includes("inteligencia artificial") ||
       texto.includes("chatgpt")){

        return `La Inteligencia Artificial permite que los computadores analicen información y generen respuestas similares a las de una persona.

Actualmente la IA puede ayudar en:

• Programación.
• Educación.
• Atención al cliente.
• Automatización.
• Análisis de datos.
• Creación de contenido.

Cada vez es más utilizada en empresas para mejorar la productividad.`;

    }

    /*================ BASES DE DATOS ================*/

    if(texto.includes("mysql") ||
       texto.includes("base de datos") ||
       texto.includes("sql")){

        return `Las bases de datos permiten almacenar información de manera organizada.

MySQL es uno de los gestores de bases de datos más utilizados.

Con él puedes guardar información como:

• Usuarios.
• Productos.
• Ventas.
• Clientes.
• Facturas.

Normalmente se conecta con aplicaciones desarrolladas en Java, PHP, Python o JavaScript.`;

    }

    /*================ RESPUESTA GENERAL ================*/

    return `Gracias por tu consulta.

He analizado la información que escribiste y considero que la mejor solución es investigar el tema paso a paso, practicar con ejemplos reales y desarrollar pequeños proyectos.

La práctica constante es la mejor forma de aprender tecnología y mejorar tus habilidades como desarrollador.`;

}

/*=========================================
        EFECTO ESCRITURA
=========================================*/

async function escribirRespuesta(texto){

    const inicio = Date.now();

    respuestaIA.innerHTML = "";

    respuestaIA.classList.add("typing");

    for(let i=0;i<texto.length;i++){

        respuestaIA.innerHTML += texto.charAt(i);

        actualizarContadores(
            respuestaIA.innerText,
            inicio
        );

        await esperar(20);

    }

    respuestaIA.classList.remove("typing");

}


/*=========================================
        GENERAR CORREO
=========================================*/

async function generarCorreo(respuesta){

    estadoCorreo.className="status-badge badge-loading";

    estadoCorreo.innerHTML="Enviando...";

    correoPara.innerHTML=email.value;

    asuntoCorreo.innerHTML="Respuesta automática a tu consulta";

    cuerpoCorreo.innerHTML="";

    let mensaje=
`Hola ${nombre.value},

Gracias por comunicarte con nosotros.

Nuestro asistente de Inteligencia Artificial analizó tu consulta y preparó la siguiente respuesta:

${respuesta}

Esperamos que esta información haya sido útil.

Saludos cordiales,

Equipo de Automatización
n8n + Asistente IA`;

    for(let i=0;i<mensaje.length;i++){

        cuerpoCorreo.innerHTML += mensaje.charAt(i);

        await esperar(10);

    }

    await esperar(600);

    estadoCorreo.className="status-badge badge-success";

    estadoCorreo.innerHTML="Correo enviado";

    enviado.classList.add("show");

    boton.disabled=false;

    boton.innerHTML="🚀 Ejecutar Flujo";

}


/*=========================================
        REINICIAR
=========================================*/

function reiniciar(){

    respuestaIA.innerHTML="";

    cuerpoCorreo.innerHTML="";

    enviado.classList.remove("show");

    estadoIA.className="status-badge badge-idle";

    estadoIA.innerHTML="En espera";

    estadoCorreo.className="status-badge badge-idle";

    estadoCorreo.innerHTML="En espera";

}


/*=========================================
        INICIALIZAR
=========================================*/

actualizarPrompt();