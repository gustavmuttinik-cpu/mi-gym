// ============================================================
// MI GYM - APP.JS
// ============================================================


// ============================================================
// SUPABASE
// ============================================================

const SUPABASE_URL =
    "https://qajiammwkxnvultapdok.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_kfGo-qDiPdAIip31DuKccw_79ASqABN";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ============================================================
// ELEMENTOS HTML
// ============================================================

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const botonRegistrar =
    document.getElementById("registrar");

const botonIniciarSesion =
    document.getElementById("iniciarSesion");

const botonCerrarSesion =
    document.getElementById("cerrarSesion");

const mensaje =
    document.getElementById("mensaje");

const usuarioActual =
    document.getElementById("usuarioActual");

const pantallaLogin =
    document.getElementById("pantallaLogin");

const aplicacion =
    document.getElementById("aplicacion");

const pantallaEntrenamientos =
    document.getElementById(
        "pantallaEntrenamientos"
    );

const pantallaMisSesiones =
    document.getElementById(
        "pantallaMisSesiones"
    );

const pantallaRutinas =
    document.getElementById(
        "pantallaRutinas"
    );

const pantallaProgreso =
    document.getElementById(
        "pantallaProgreso"
    );

const ejerciciosSesion =
    document.getElementById(
        "ejerciciosSesion"
    );

const anadirEjercicio =
    document.getElementById(
        "anadirEjercicio"
    );

const modificarSesion =
    document.getElementById(
        "modificarSesion"
    );

// Solo se muestra cuando hay una sesión activa.
modificarSesion.style.display = "none";

function actualizarBotonModificarSesion() {

    if (!modificarSesion) {
        return;
    }

    modificarSesion.style.display =
        sesionActualId ? "inline-block" : "none";
}

const guardarSesion =
    document.getElementById(
        "guardarSesion"
    );

const verMisSesiones =
    document.getElementById(
        "verMisSesiones"
    );

const volverEntrenamiento =
    document.getElementById(
        "volverEntrenamiento"
    );

const resultadoSesiones =
    document.getElementById(
        "resultadoSesiones"
    );

const navEntrenamientos =
    document.getElementById(
        "navEntrenamientos"
    );

const navRutinas =
    document.getElementById(
        "navRutinas"
    );

const navProgreso =
    document.getElementById(
        "navProgreso"
    );


// ============================================================
// ELEMENTOS DEL CALENDARIO
// ============================================================

const calendarioSemana =
    document.getElementById(
        "calendarioSemana"
    );

const diasSemana =
    document.getElementById(
        "diasSemana"
    );

const entrenamientosSemana =
    document.getElementById(
        "entrenamientosSemana"
    );

const verCalendario =
    document.getElementById(
        "verCalendario"
    );

const calendarioMensual =
    document.getElementById(
        "calendarioMensual"
    );

const calendario =
    document.getElementById(
        "calendario"
    );

const mesActual =
    document.getElementById(
        "mesActual"
    );

const mesAnterior =
    document.getElementById(
        "mesAnterior"
    );

const mesSiguiente =
    document.getElementById(
        "mesSiguiente"
    );

const cerrarCalendario =
    document.getElementById(
        "cerrarCalendario"
    );

const detalleDia =
    document.getElementById(
        "detalleDia"
    );

// ============================================================
// ELEMENTOS DE RUTINAS
// ============================================================



// ============================================================
// ELEMENTOS DE PROGRESO
// ============================================================

const listaGruposMusculares =
    document.getElementById(
        "listaGruposMusculares"
    );

const detalleGrupoMuscular =
    document.getElementById(
        "detalleGrupoMuscular"
    );

const selectorEjercicioVolumen =
    document.getElementById(
        "selectorEjercicioVolumen"
    );

const mensajeVolumen =
    document.getElementById(
        "mensajeVolumen"
    );

const graficaVolumenCanvas =
    document.getElementById(
        "graficaVolumen"
    );

const selectorEjercicioPR =
    document.getElementById(
        "selectorEjercicioPR"
    );

const mensajePR =
    document.getElementById(
        "mensajePR"
    );

const graficaPRCanvas =
    document.getElementById(
        "graficaPR"
    );

const graficaSesionesCanvas =
    document.getElementById(
        "graficaSesiones"
    );


// ============================================================
// VARIABLES
// ============================================================

let catalogoEjercicios = [];

let sesionActualId =
    localStorage.getItem(
        "sesionActualId"
    );

let sesionesCalendario = [];

let fechaCalendario =
    new Date();

let graficaVolumen = null;

let graficaPR = null;

let graficaSesiones = null;

let datosProgresoCargados = false;

let datosVolumenCache = {};


// ============================================================
// GRUPOS MUSCULARES
// ============================================================

const gruposMusculares = [
    "Abdominales",
    "Antebrazo",
    "Bíceps",
    "Bíceps femoral",
    "Cuádriceps",
    "Espalda",
    "Gemelos",
    "Glúteo",
    "Hombro",
    "Pecho",
    "Tríceps"
];


// ============================================================
// INTERFAZ
// ============================================================

function actualizarInterfaz(usuario) {

    if (usuario) {

        pantallaLogin.style.display =
            "none";

        aplicacion.style.display =
            "block";

        usuarioActual.textContent =
            "Sesión iniciada como: " +
            usuario.email;

    } else {

        pantallaLogin.style.display =
            "block";

        aplicacion.style.display =
            "none";

        usuarioActual.textContent =
            "";
    }
}


// ============================================================
// NAVEGACIÓN ENTRE PANTALLAS
// ============================================================

function mostrarPantalla(
    pantalla
) {

    pantallaEntrenamientos.style.display =
        "none";

    pantallaMisSesiones.style.display =
        "none";

    pantallaRutinas.style.display =
        "none";

    pantallaProgreso.style.display =
        "none";

    pantalla.style.display =
        "block";
}


// ============================================================
// REGISTRO
// ============================================================

botonRegistrar.addEventListener(
    "click",
    async function() {

        const correo =
            email.value.trim();

        const contrasena =
            password.value;

        if (
            !correo ||
            !contrasena
        ) {

            mensaje.textContent =
                "Introduce email y contraseña.";

            return;
        }

        mensaje.textContent =
            "Creando cuenta...";

        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({
                email: correo,
                password: contrasena
            });

        if (error) {

            console.error(
                "Error registrando:",
                error
            );

            mensaje.textContent =
                "Error: " +
                error.message;

            return;
        }

        if (
            data &&
            data.user
        ) {

            actualizarInterfaz(
                data.user
            );

            mensaje.textContent =
                "";

            await cargarEjercicios();

            await recuperarSesionActual();

        } else {

            mensaje.textContent =
                "Cuenta creada. Revisa tu correo si es necesario.";

        }
    }
);


// ============================================================
// INICIAR SESIÓN
// ============================================================

botonIniciarSesion.addEventListener(
    "click",
    async function() {

        const correo =
            email.value.trim();

        const contrasena =
            password.value;

        if (
            !correo ||
            !contrasena
        ) {

            mensaje.textContent =
                "Introduce email y contraseña.";

            return;
        }

        mensaje.textContent =
            "Iniciando sesión...";

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signInWithPassword({
                    email: correo,
                    password: contrasena
                });

        if (error) {

            console.error(
                "Error iniciando sesión:",
                error
            );

            mensaje.textContent =
                "Error: " +
                error.message;

            return;
        }

        mensaje.textContent =
            "";

        actualizarInterfaz(
            data.user
        );

        await cargarEjercicios();

        // IMPORTANTE:
        // Recuperamos la sesión de entrenamiento
        // después del login.
        await recuperarSesionActual();

        await cargarSesionesCalendario();

        mostrarSemana();
    }
);


// ============================================================
// CERRAR SESIÓN
// ============================================================

botonCerrarSesion.addEventListener(
    "click",
    async function() {

        const {
            error
        } =
            await supabaseClient.auth.signOut();

        if (error) {

            console.error(
                "Error cerrando sesión:",
                error
            );

            return;
        }

        sesionActualId =
            null;

        localStorage.removeItem(
            "sesionActualId"
        );

        actualizarBotonModificarSesion();

        ejerciciosSesion.innerHTML =
            "";

        actualizarInterfaz(
            null
        );
    }
);


// ============================================================
// CARGAR CATÁLOGO DE EJERCICIOS
// ============================================================

async function cargarEjercicios() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("ejercicios")
            .select(
                "id, nombre"
            )
            .order(
                "nombre",
                {
                    ascending: true
                }
            );

    if (error) {

        console.error(
            "Error cargando ejercicios:",
            error
        );

        return;
    }

    catalogoEjercicios =
        data || [];
}


// ============================================================
// CREAR SELECT DE EJERCICIOS
// ============================================================

function crearSelectEjercicios() {

    const select =
        document.createElement(
            "select"
        );

    select.className =
        "selectEjercicioSesion";

    const opcionInicial =
        document.createElement(
            "option"
        );

    opcionInicial.value =
        "";

    opcionInicial.textContent =
        "Selecciona un ejercicio";

    select.appendChild(
        opcionInicial
    );

    catalogoEjercicios.forEach(
        function(ejercicio) {

            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value =
                ejercicio.id;

            opcion.textContent =
                ejercicio.nombre;

            select.appendChild(
                opcion
            );
        }
    );

    return select;
}


// ============================================================
// CREAR SESIÓN ACTUAL
// ============================================================

async function crearSesionActual() {

    if (sesionActualId) {

        return true;
    }

    const {
        data: usuarioData,
        error: usuarioError
    } =
        await supabaseClient.auth.getUser();

    if (
        usuarioError ||
        !usuarioData.user
    ) {

        alert(
            "Debes iniciar sesión."
        );

        return false;
    }

    const {
        data,
        error
    } =
        await supabaseClient
            .from("Sesiones")
            .insert([
                {
                    usuario_id:
                        usuarioData.user.id
                }
            ])
            .select()
            .single();

    if (error) {

        console.error(
            "Error creando sesión:",
            error
        );

        alert(
            "No se pudo crear la sesión."
        );

        return false;
    }

    sesionActualId =
        data.id;

    // MUY IMPORTANTE:
    // Guardamos el ID para que sobreviva
    // a una recarga de la página.
    localStorage.setItem(
        "sesionActualId",
        String(
            sesionActualId
        )
    );

    actualizarBotonModificarSesion();

    return true;
}


// ============================================================
// AÑADIR EJERCICIO A LA SESIÓN
// ============================================================

async function anadirEjercicioASesion() {

    const bloque =
        document.createElement(
            "div"
        );

    bloque.className =
        "bloqueEjercicioSesion";

    bloque.style.marginBottom =
        "25px";


    // --------------------------------------------------------
    // RESUMEN
    // --------------------------------------------------------

    const resumen =
        document.createElement(
            "div"
        );

    resumen.className =
        "resumenEjercicio";

    resumen.style.display =
        "none";


    const textoResumen =
        document.createElement(
            "strong"
        );

    textoResumen.textContent =
        "Nuevo ejercicio";


    resumen.appendChild(
        textoResumen
    );


    const botonModificarResumen =
        document.createElement(
            "button"
        );

    botonModificarResumen.type =
        "button";

    botonModificarResumen.textContent =
        " ✏️ Modificar";


    resumen.appendChild(
        botonModificarResumen
    );


    const botonEliminarResumen =
        document.createElement(
            "button"
        );

    botonEliminarResumen.type =
        "button";

    botonEliminarResumen.textContent =
        " 🗑️ Eliminar ejercicio";


    resumen.appendChild(
        botonEliminarResumen
    );


    bloque.appendChild(
        resumen
    );


    // --------------------------------------------------------
    // CONTENIDO
    // --------------------------------------------------------

    const contenido =
        document.createElement(
            "div"
        );

    contenido.className =
        "contenidoEjercicio";


    const titulo =
        document.createElement(
            "h3"
        );

    titulo.textContent =
        "Nuevo ejercicio";


    contenido.appendChild(
        titulo
    );


    // --------------------------------------------------------
    // SELECT
    // --------------------------------------------------------

    const select =
        crearSelectEjercicios();

    contenido.appendChild(
        select
    );


    // --------------------------------------------------------
    // MÚSCULOS
    // --------------------------------------------------------

    const musculos =
        document.createElement(
            "div"
        );

    musculos.className =
        "musculosSesion";

    musculos.style.marginTop =
        "10px";

    contenido.appendChild(
        musculos
    );


    // --------------------------------------------------------
    // CONTADOR
    // --------------------------------------------------------

    const contador =
        document.createElement(
            "p"
        );

    contador.className =
        "contadorSeries";

    contador.textContent =
        "0 series";

    contenido.appendChild(
        contador
    );


    // --------------------------------------------------------
    // LISTA DE SERIES
    // --------------------------------------------------------

    const listaSeries =
        document.createElement(
            "div"
        );

    listaSeries.className =
        "listaSeries";

    contenido.appendChild(
        listaSeries
    );


    // --------------------------------------------------------
    // FORMULARIO
    // --------------------------------------------------------

    const formulario =
        document.createElement(
            "div"
        );

    formulario.className =
        "formularioSerie";


    const inputPeso =
        document.createElement(
            "input"
        );

    inputPeso.type =
        "number";

    inputPeso.min =
        "0";

    inputPeso.step =
        "0.5";

    inputPeso.placeholder =
        "Peso (kg)";


    const inputReps =
        document.createElement(
            "input"
        );

    inputReps.type =
        "number";

    inputReps.min =
        "1";

    inputReps.placeholder =
        "Repeticiones";


    const botonGuardarSerie =
        document.createElement(
            "button"
        );

    botonGuardarSerie.type =
        "button";

    botonGuardarSerie.textContent =
        "Guardar serie";


    formulario.appendChild(
        inputPeso
    );

    formulario.appendChild(
        inputReps
    );

    formulario.appendChild(
        botonGuardarSerie
    );

    contenido.appendChild(
        formulario
    );


    // --------------------------------------------------------
    // BOTÓN QUITAR
    // --------------------------------------------------------

    const botonQuitar =
        document.createElement(
            "button"
        );

    botonQuitar.type =
        "button";

    botonQuitar.textContent =
        "🗑️ Quitar ejercicio";

    botonQuitar.style.marginTop =
        "10px";


    contenido.appendChild(
        botonQuitar
    );


    bloque.appendChild(
        contenido
    );


    // --------------------------------------------------------
    // MODIFICAR DESDE RESUMEN
    // --------------------------------------------------------

    botonModificarResumen.addEventListener(
        "click",
        function() {

            contenido.style.display =
                "block";

            resumen.style.display =
                "none";
        }
    );


    // --------------------------------------------------------
    // ELIMINAR DESDE RESUMEN
    // --------------------------------------------------------

    botonEliminarResumen.addEventListener(
        "click",
        async function() {

            await eliminarBloqueEjercicio(
                bloque
            );
        }
    );


    // --------------------------------------------------------
    // QUITAR EJERCICIO
    // --------------------------------------------------------

    botonQuitar.addEventListener(
        "click",
        async function() {

            await eliminarBloqueEjercicio(
                bloque
            );
        }
    );


    // --------------------------------------------------------
    // SELECCIONAR EJERCICIO
    // --------------------------------------------------------

    select.addEventListener(
        "change",
        async function() {

            const ejercicioId =
                select.value;

            if (!ejercicioId) {

                musculos.innerHTML =
                    "";

                return;
            }


            // Primero crear/recuperar la sesión.
            const sesionCreada =
                await crearSesionActual();

            if (!sesionCreada) {

                select.value =
                    "";

                return;
            }


            // Mostrar músculos.
            await mostrarMusculos(
                ejercicioId,
                musculos
            );


            // Si ya existe relación,
            // no crear otra.
            if (
                bloque.dataset
                    .sesionEjercicioId
            ) {

                return;
            }


            const bloques =
                ejerciciosSesion
                    .querySelectorAll(
                        ".bloqueEjercicioSesion"
                    );


            const orden =
                bloques.length - 1;


            const {
                data,
                error
            } =
                await supabaseClient
                    .from(
                        "Sesion_Ejercicios"
                    )
                    .insert([
                        {
                            sesion_id:
                                Number(
                                    sesionActualId
                                ),

                            ejercicio_id:
                                Number(
                                    ejercicioId
                                ),

                            orden:
                                orden
                        }
                    ])
                    .select()
                    .single();


            if (error) {

                console.error(
                    "Error añadiendo ejercicio:",
                    error
                );

                alert(
                    "No se pudo añadir el ejercicio."
                );

                return;
            }


            bloque.dataset
                .sesionEjercicioId =
                    data.id;


            const ejercicio =
                catalogoEjercicios.find(
                    function(item) {

                        return Number(
                            item.id
                        ) ===
                        Number(
                            ejercicioId
                        );
                    }
                );


            const nombre =
                ejercicio
                    ? ejercicio.nombre
                    : "Ejercicio";


            titulo.textContent =
    nombre;

textoResumen.textContent =
    nombre +
    " — 0 series";


// --------------------------------------------------------
// RECUPERAR ÚLTIMO ENTRENAMIENTO DEL EJERCICIO
// --------------------------------------------------------

const seriesAnteriores =
    await obtenerSeriesUltimaSesionEjercicio(
        Number(ejercicioId)
    );


if (
    seriesAnteriores.length > 0
) {

    inputPeso.value =
        seriesAnteriores[0].peso;

    inputReps.value =
        seriesAnteriores[0].repeticiones;
}


// Cerramos los demás ejercicios.
cerrarOtrosEjercicios(
    bloque
);
        }
    );


    // --------------------------------------------------------
    // GUARDAR SERIE
    // --------------------------------------------------------

    botonGuardarSerie.addEventListener(
        "click",
        async function() {

            const ejercicioSesionId =
                bloque.dataset
                    .sesionEjercicioId;


            if (!ejercicioSesionId) {

                alert(
                    "Selecciona primero un ejercicio."
                );

                return;
            }


            if (
                inputPeso.value === "" ||
                inputReps.value === ""
            ) {

                alert(
                    "Introduce peso y repeticiones."
                );

                return;
            }


            const peso =
                Number(
                    inputPeso.value
                );

            const repeticiones =
                Number(
                    inputReps.value
                );


            if (
                peso < 0 ||
                repeticiones <= 0
            ) {

                alert(
                    "Revisa peso y repeticiones."
                );

                return;
            }


            const {
                count,
                error: countError
            } =
                await supabaseClient
                    .from("Series")
                    .select(
                        "id",
                        {
                            count:
                                "exact",
                            head:
                                true
                        }
                    )
                    .eq(
                        "sesion_ejercicio_id",
                        Number(
                            ejercicioSesionId
                        )
                    );


            if (countError) {

                console.error(
                    "Error contando series:",
                    countError
                );

                return;
            }


            const numeroSerie =
                (count || 0) + 1;


            const {
                data,
                error
            } =
                await supabaseClient
                    .from("Series")
                    .insert([
                        {
                            sesion_ejercicio_id:
                                Number(
                                    ejercicioSesionId
                                ),

                            numero_serie:
                                numeroSerie,

                            peso:
                                peso,

                            repeticiones:
                                repeticiones
                        }
                    ])
                    .select()
                    .single();


            if (error) {

                console.error(
                    "Error guardando serie:",
                    error
                );

                alert(
                    "No se pudo guardar la serie."
                );

                return;
            }


            mostrarSerieEnPantalla(
                data,
                listaSeries,
                contador
            );


            inputPeso.value = peso;

inputReps.value = repeticiones;

inputPeso.focus();
        }
    );
inputPeso.addEventListener(
    "keydown",
    function(evento) {
        if (evento.key === "Enter") {
            evento.preventDefault();
            inputReps.focus();
        }
    }
);

inputReps.addEventListener(
    "keydown",
    function(evento) {
        if (evento.key === "Enter") {
            evento.preventDefault();
            botonGuardarSerie.click();
        }
    }
);

    ejerciciosSesion.appendChild(
        bloque
    );
}


// ============================================================
// CERRAR OTROS EJERCICIOS
// ============================================================

function cerrarOtrosEjercicios(
    bloqueActual
) {

    const bloques =
        ejerciciosSesion.querySelectorAll(
            ".bloqueEjercicioSesion"
        );

    bloques.forEach(
        function(bloque) {

            if (
                bloque ===
                bloqueActual
            ) {
                return;
            }

            const contenido =
                bloque.querySelector(
                    ".contenidoEjercicio"
                );

            const resumen =
                bloque.querySelector(
                    ".resumenEjercicio"
                );

            if (contenido) {

                contenido.style.display =
                    "none";
            }

            if (resumen) {

                resumen.style.display =
                    "block";
            }
        }
    );
}


// ============================================================
// ELIMINAR BLOQUE DE EJERCICIO
// ============================================================

async function eliminarBloqueEjercicio(
    bloque
) {

    const id =
        bloque.dataset
            .sesionEjercicioId;


    if (id) {

        const {
            error
        } =
            await supabaseClient
                .from(
                    "Sesion_Ejercicios"
                )
                .delete()
                .eq(
                    "id",
                    Number(id)
                );


        if (error) {

            console.error(
                "Error eliminando ejercicio:",
                error
            );

            alert(
                "No se pudo eliminar el ejercicio."
            );

            return;
        }
    }


    bloque.remove();
}


// ============================================================
// MOSTRAR SERIE
// ============================================================

function mostrarSerieEnPantalla(
    serie,
    contenedor,
    contador
) {

    const fila =
        document.createElement(
            "div"
        );

    fila.className =
        "serieGuardada";


    const texto =
        document.createElement(
            "span"
        );

    texto.textContent =
        "✓ " +
        serie.peso +
        " kg × " +
        serie.repeticiones;


    // --------------------------------------------------------
    // EDITAR
    // --------------------------------------------------------

    const editar =
        document.createElement(
            "button"
        );

    editar.type =
        "button";

    editar.textContent =
        " ✏️";


    editar.addEventListener(
        "click",
        async function() {

            const nuevoPeso =
                prompt(
                    "Peso:",
                    serie.peso
                );

            if (
                nuevoPeso ===
                null
            ) {
                return;
            }


            const nuevasReps =
                prompt(
                    "Repeticiones:",
                    serie.repeticiones
                );

            if (
                nuevasReps ===
                null
            ) {
                return;
            }


            const peso =
                Number(
                    nuevoPeso
                );

            const repeticiones =
                Number(
                    nuevasReps
                );


            if (
                peso < 0 ||
                repeticiones <= 0
            ) {

                alert(
                    "Valores incorrectos."
                );

                return;
            }


            const {
                data,
                error
            } =
                await supabaseClient
                    .from("Series")
                    .update({
                        peso:
                            peso,

                        repeticiones:
                            repeticiones
                    })
                    .eq(
                        "id",
                        serie.id
                    )
                    .select()
                    .single();


            if (error) {

                console.error(
                    "Error modificando serie:",
                    error
                );

                return;
            }


            serie.peso =
                data.peso;

            serie.repeticiones =
                data.repeticiones;


            texto.textContent =
                "✓ " +
                data.peso +
                " kg × " +
                data.repeticiones;
        }
    );


    // --------------------------------------------------------
    // ELIMINAR
    // --------------------------------------------------------

    const eliminar =
        document.createElement(
            "button"
        );

    eliminar.type =
        "button";

    eliminar.textContent =
        " 🗑️";


    eliminar.addEventListener(
        "click",
        async function() {

            if (
                !confirm(
                    "¿Eliminar esta serie?"
                )
            ) {
                return;
            }


            const {
                error
            } =
                await supabaseClient
                    .from("Series")
                    .delete()
                    .eq(
                        "id",
                        serie.id
                    );


            if (error) {

                console.error(
                    "Error eliminando serie:",
                    error
                );

                return;
            }


            fila.remove();


            actualizarContador(
                contenedor,
                contador
            );
        }
    );


    fila.appendChild(
        texto
    );

    fila.appendChild(
        editar
    );

    fila.appendChild(
        eliminar
    );


    contenedor.appendChild(
        fila
    );


    actualizarContador(
        contenedor,
        contador
    );
}


// ============================================================
// CONTADOR DE SERIES
// ============================================================

function actualizarContador(
    contenedor,
    contador
) {

    const cantidad =
        contenedor.querySelectorAll(
            ".serieGuardada"
        ).length;


    contador.textContent =
        cantidad +
        (
            cantidad === 1
                ? " serie"
                : " series"
        );
}


// ============================================================
// MOSTRAR MÚSCULOS DE UN EJERCICIO
// ============================================================

async function mostrarMusculos(
    ejercicioId,
    contenedor
) {

    contenedor.innerHTML =
        "Cargando músculos...";


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "Ejercicio_Musculos"
            )
            .select(
                "musculo_id, importancia"
            )
            .eq(
                "ejercicio_id",
                Number(
                    ejercicioId
                )
            );


    if (error) {

        console.error(
            "Error cargando músculos:",
            error
        );

        contenedor.innerHTML =
            "";

        return;
    }


    if (
        !data ||
        data.length === 0
    ) {

        contenedor.innerHTML =
            "";

        return;
    }


    const titulo =
        document.createElement(
            "strong"
        );

    titulo.textContent =
        "Músculos trabajados:";

    contenedor.innerHTML =
        "";

    contenedor.appendChild(
        titulo
    );


    // En lugar de hacer una consulta por músculo,
    // hacemos una sola consulta.
    const ids =
        data.map(
            function(relacion) {

                return relacion.musculo_id;
            }
        );


    const {
        data: musculosBD,
        error: musculosError
    } =
        await supabaseClient
            .from("Musculos")
            .select(
                "id, nombre"
            )
            .in(
                "id",
                ids
            );


    if (musculosError) {

        console.error(
            "Error cargando nombres:",
            musculosError
        );

        return;
    }


    data.forEach(
        function(relacion) {

            const musculo =
                (musculosBD || []).find(
                    function(item) {

                        return Number(
                            item.id
                        ) ===
                        Number(
                            relacion.musculo_id
                        );
                    }
                );


            if (!musculo) {
                return;
            }


            const elemento =
                document.createElement(
                    "p"
                );

            elemento.textContent =
                musculo.nombre +
                " — " +
                relacion.importancia;

            contenedor.appendChild(
                elemento
            );
        }
    );
}


// ============================================================
// GUARDAR / FINALIZAR SESIÓN
// ============================================================

guardarSesion.addEventListener(
    "click",
    async function() {

        if (!sesionActualId) {

            alert(
                "Todavía no has creado ninguna sesión."
            );

            return;
        }


        const {
            data: ejercicios,
            error
        } =
            await supabaseClient
                .from(
                    "Sesion_Ejercicios"
                )
                .select(
                    "id"
                )
                .eq(
                    "sesion_id",
                    Number(
                        sesionActualId
                    )
                );


        if (error) {

            console.error(
                "Error comprobando sesión:",
                error
            );

            return;
        }


        if (
            !ejercicios ||
            ejercicios.length === 0
        ) {

            alert(
                "Añade al menos un ejercicio."
            );

            return;
        }


        // Comprobar series.
        for (
            const ejercicio
            of ejercicios
        ) {

            const {
                count,
                error: seriesError
            } =
                await supabaseClient
                    .from("Series")
                    .select(
                        "id",
                        {
                            count:
                                "exact",
                            head:
                                true
                        }
                    )
                    .eq(
                        "sesion_ejercicio_id",
                        ejercicio.id
                    );


            if (
                seriesError ||
                !count
            ) {

                alert(
                    "Todos los ejercicios deben tener al menos una serie."
                );

                return;
            }
        }


        alert(
            "🎉 ¡Entrenamiento completado!"
        );


        // Ahora sí eliminamos la referencia
        // a la sesión actual.
        localStorage.removeItem(
            "sesionActualId"
        );

        sesionActualId =
            null;

        actualizarBotonModificarSesion();

        ejerciciosSesion.innerHTML =
            "";


        // Actualizar calendario.
        await cargarSesionesCalendario();

        mostrarSemana();


        // Limpiar caché de progreso.
        datosProgresoCargados =
            false;

        datosVolumenCache = {};
    }
);


// ============================================================
// MODIFICAR SESIÓN ACTUAL
// ============================================================

modificarSesion.addEventListener(
    "click",
    function() {

        if (!sesionActualId) {

            alert(
                "No hay una sesión actual."
            );

            return;
        }


        const bloques =
            ejerciciosSesion.querySelectorAll(
                ".bloqueEjercicioSesion"
            );


        bloques.forEach(
            function(bloque) {

                const contenido =
                    bloque.querySelector(
                        ".contenidoEjercicio"
                    );

                const resumen =
                    bloque.querySelector(
                        ".resumenEjercicio"
                    );


                if (contenido) {

                    contenido.style.display =
                        "block";
                }


                if (resumen) {

                    resumen.style.display =
                        "none";
                }
            }
        );
    }
);


// ============================================================
// RECUPERAR SESIÓN ACTUAL DESPUÉS DE RECARGAR
// ============================================================

async function recuperarSesionActual() {

    const idGuardado =
        localStorage.getItem(
            "sesionActualId"
        );


    if (!idGuardado) {

        sesionActualId =
            null;

        actualizarBotonModificarSesion();

        return;
    }


    const id =
        Number(
            idGuardado
        );


    if (
        !Number.isFinite(id)
    ) {

        localStorage.removeItem(
            "sesionActualId"
        );

        sesionActualId =
            null;

        actualizarBotonModificarSesion();

        return;
    }


    const {
        data: usuarioData
    } =
        await supabaseClient.auth.getUser();


    if (
        !usuarioData ||
        !usuarioData.user
    ) {

        return;
    }


    // Buscar la sesión.
    const {
        data: sesion,
        error
    } =
        await supabaseClient
            .from("Sesiones")
            .select(
                "id, usuario_id, created_at"
            )
            .eq(
                "id",
                id
            )
            .eq(
                "usuario_id",
                usuarioData.user.id
            )
            .single();


    if (
        error ||
        !sesion
    ) {

        console.warn(
            "La sesión guardada ya no existe."
        );

        localStorage.removeItem(
            "sesionActualId"
        );

        sesionActualId =
            null;

        actualizarBotonModificarSesion();

        return;
    }


    sesionActualId =
        sesion.id;

    actualizarBotonModificarSesion();


    // Recuperar ejercicios.
    const {
        data: ejercicios,
        error: ejerciciosError
    } =
        await supabaseClient
            .from(
                "Sesion_Ejercicios"
            )
            .select(
                "id, sesion_id, ejercicio_id, orden"
            )
            .eq(
                "sesion_id",
                sesion.id
            )
            .order(
                "orden",
                {
                    ascending: true
                }
            );


    if (ejerciciosError) {

        console.error(
            "Error recuperando ejercicios:",
            ejerciciosError
        );

        return;
    }


    ejerciciosSesion.innerHTML =
        "";


    for (
        const ejercicio
        of ejercicios || []
    ) {

        const bloque =
            await crearBloqueEjercicioRecuperado(
                ejercicio
            );

        ejerciciosSesion.appendChild(
            bloque
        );
    }

    actualizarBotonModificarSesion();
}


// ============================================================
// CREAR BLOQUE RECUPERADO
// ============================================================

async function crearBloqueEjercicioRecuperado(
    ejercicioBD
) {

    const bloque =
        document.createElement(
            "div"
        );

    bloque.className =
        "bloqueEjercicioSesion";

    bloque.style.marginBottom =
        "25px";

    bloque.dataset
        .sesionEjercicioId =
            ejercicioBD.id;


    const ejercicio =
        catalogoEjercicios.find(
            function(item) {

                return Number(
                    item.id
                ) ===
                Number(
                    ejercicioBD.ejercicio_id
                );
            }
        );


    const nombre =
        ejercicio
            ? ejercicio.nombre
            : "Ejercicio";


    // --------------------------------------------------------
    // RESUMEN
    // --------------------------------------------------------

    const resumen =
        document.createElement(
            "div"
        );

    resumen.className =
        "resumenEjercicio";

    resumen.style.display =
        "none";


    const textoResumen =
        document.createElement(
            "strong"
        );

    resumen.appendChild(
        textoResumen
    );


    const botonModificar =
        document.createElement(
            "button"
        );

    botonModificar.type =
        "button";

    botonModificar.textContent =
        " ✏️ Modificar";

    resumen.appendChild(
        botonModificar
    );


    const botonEliminar =
        document.createElement(
            "button"
        );

    botonEliminar.type =
        "button";

    botonEliminar.textContent =
        " 🗑️ Eliminar ejercicio";

    resumen.appendChild(
        botonEliminar
    );


    bloque.appendChild(
        resumen
    );


    // --------------------------------------------------------
    // CONTENIDO
    // --------------------------------------------------------

    const contenido =
        document.createElement(
            "div"
        );

    contenido.className =
        "contenidoEjercicio";


    const titulo =
        document.createElement(
            "h3"
        );

    titulo.textContent =
        nombre;

    contenido.appendChild(
        titulo
    );


    // --------------------------------------------------------
    // SELECT
    // --------------------------------------------------------

    const select =
        crearSelectEjercicios();

    select.value =
        ejercicioBD.ejercicio_id;

    select.disabled =
        true;

    contenido.appendChild(
        select
    );


    // --------------------------------------------------------
    // MÚSCULOS
    // --------------------------------------------------------

    const musculos =
        document.createElement(
            "div"
        );

    musculos.className =
        "musculosSesion";

    musculos.style.marginTop =
        "10px";

    contenido.appendChild(
        musculos
    );


    mostrarMusculos(
        ejercicioBD.ejercicio_id,
        musculos
    );


    // --------------------------------------------------------
    // CONTADOR
    // --------------------------------------------------------

    const contador =
        document.createElement(
            "p"
        );

    contador.className =
        "contadorSeries";

    contador.textContent =
        "0 series";

    contenido.appendChild(
        contador
    );


    // --------------------------------------------------------
    // SERIES
    // --------------------------------------------------------

    const listaSeries =
        document.createElement(
            "div"
        );

    listaSeries.className =
        "listaSeries";

    contenido.appendChild(
        listaSeries
    );


    // --------------------------------------------------------
    // FORMULARIO
    // --------------------------------------------------------

    const formulario =
        document.createElement(
            "div"
        );

    formulario.className =
        "formularioSerie";


    const inputPeso =
        document.createElement(
            "input"
        );

    inputPeso.type =
        "number";

    inputPeso.min =
        "0";

    inputPeso.step =
        "0.5";

    inputPeso.placeholder =
        "Peso (kg)";


    const inputReps =
        document.createElement(
            "input"
        );

    inputReps.type =
        "number";

    inputReps.min =
        "1";

    inputReps.placeholder =
        "Repeticiones";


    const botonGuardarSerie =
        document.createElement(
            "button"
        );

    botonGuardarSerie.type =
        "button";

    botonGuardarSerie.textContent =
        "Guardar serie";


    formulario.appendChild(
        inputPeso
    );

    formulario.appendChild(
        inputReps
    );

    formulario.appendChild(
        botonGuardarSerie
    );

    contenido.appendChild(
        formulario
    );

    // --------------------------------------------------------
// BOTÓN GUARDAR EJERCICIO
// --------------------------------------------------------

const botonGuardarEjercicio =
    document.createElement(
        "button"
    );

botonGuardarEjercicio.type =
    "button";

botonGuardarEjercicio.textContent =
    "✅ Guardar ejercicio";

botonGuardarEjercicio.style.marginTop =
    "10px";

contenido.appendChild(
    botonGuardarEjercicio
);


    // --------------------------------------------------------
    // QUITAR
    // --------------------------------------------------------

    const botonQuitar =
        document.createElement(
            "button"
        );

    botonQuitar.type =
        "button";

    botonQuitar.textContent =
        "🗑️ Quitar ejercicio";

    botonQuitar.style.marginTop =
        "10px";

    contenido.appendChild(
        botonQuitar
    );


    bloque.appendChild(
        contenido
    );


    // --------------------------------------------------------
    // TEXTO DEL RESUMEN
    // --------------------------------------------------------

    await cargarSeriesRecuperadas(
        ejercicioBD.id,
        listaSeries,
        contador,
        textoResumen,
        nombre
    );


    // --------------------------------------------------------
    // MODIFICAR
    // --------------------------------------------------------

    botonModificar.addEventListener(
        "click",
        function() {

            contenido.style.display =
                "block";

            resumen.style.display =
                "none";
        }
    );


    // --------------------------------------------------------
    // ELIMINAR
    // --------------------------------------------------------

    botonEliminar.addEventListener(
        "click",
        async function() {

            await eliminarBloqueEjercicio(
                bloque
            );
        }
    );


    botonQuitar.addEventListener(
        "click",
        async function() {

            await eliminarBloqueEjercicio(
                bloque
            );
        }
    );


    // --------------------------------------------------------
    // GUARDAR NUEVA SERIE
    // --------------------------------------------------------

    botonGuardarSerie.addEventListener(
        "click",
        async function() {

            if (
                inputPeso.value === "" ||
                inputReps.value === ""
            ) {

                alert(
                    "Introduce peso y repeticiones."
                );

                return;
            }


            const peso =
                Number(
                    inputPeso.value
                );

            const repeticiones =
                Number(
                    inputReps.value
                );


            if (
                peso < 0 ||
                repeticiones <= 0
            ) {

                alert(
                    "Revisa peso y repeticiones."
                );

                return;
            }


            const {
                count,
                error: countError
            } =
                await supabaseClient
                    .from("Series")
                    .select(
                        "id",
                        {
                            count:
                                "exact",
                            head:
                                true
                        }
                    )
                    .eq(
                        "sesion_ejercicio_id",
                        ejercicioBD.id
                    );


            if (countError) {

                console.error(
                    countError
                );

                return;
            }


            const {
                data,
                error
            } =
                await supabaseClient
                    .from("Series")
                    .insert([
                        {
                            sesion_ejercicio_id:
                                ejercicioBD.id,

                            numero_serie:
                                (count || 0) + 1,

                            peso:
                                peso,

                            repeticiones:
                                repeticiones
                        }
                    ])
                    .select()
                    .single();


            if (error) {

                console.error(
                    error
                );

                return;
            }


            mostrarSerieEnPantalla(
                data,
                listaSeries,
                contador
            );


            actualizarTextoResumen(
                listaSeries,
                textoResumen,
                nombre
            );


            inputPeso.value =
                "";

            inputReps.value =
                "";
        }
    );


    return bloque;
}

// ============================================================
// CARGAR ÚLTIMAS SERIES DEL EJERCICIO
// ============================================================

async function obtenerSeriesUltimaSesionEjercicio(
    ejercicioId
) {

    const {
        data: usuarioData,
        error: usuarioError
    } =
        await supabaseClient.auth.getUser();

    if (
        usuarioError ||
        !usuarioData.user
    ) {
        return [];
    }


    const {
        data: sesiones,
        error: sesionesError
    } =
        await supabaseClient
            .from("Sesiones")
            .select(
                "id, created_at"
            )
            .eq(
                "usuario_id",
                usuarioData.user.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            )
            .limit(50);


    if (
        sesionesError ||
        !sesiones ||
        sesiones.length === 0
    ) {
        return [];
    }


    const idsSesiones =
        sesiones
            .map(
                function(sesion) {
                    return sesion.id;
                }
            );


    const {
        data: relaciones,
        error: relacionesError
    } =
        await supabaseClient
            .from("Sesion_Ejercicios")
            .select(
                "id, sesion_id, ejercicio_id"
            )
            .in(
                "sesion_id",
                idsSesiones
            )
            .eq(
                "ejercicio_id",
                Number(ejercicioId)
            );


    if (
        relacionesError ||
        !relaciones ||
        relaciones.length === 0
    ) {
        return [];
    }


    let relacionAnterior =
        null;


    for (
    const sesion of sesiones
) {

    // No utilizar la sesión que está
    // actualmente en curso.
    if (
        Number(sesion.id) ===
        Number(sesionActualId)
    ) {
        continue;
    }


    relacionAnterior =
        relaciones.find(
            function(relacion) {

                return Number(
                    relacion.sesion_id
                ) ===
                Number(
                    sesion.id
                );

            }
        );


    if (
        relacionAnterior
    ) {
        break;
    }
}


    if (
        !relacionAnterior
    ) {
        return [];
    }


    const {
        data: series,
        error: seriesError
    } =
        await supabaseClient
            .from("Series")
            .select(
                "id, numero_serie, peso, repeticiones"
            )
            .eq(
                "sesion_ejercicio_id",
                relacionAnterior.id
            )
            .order(
                "numero_serie",
                {
                    ascending: true
                }
            );


    if (
        seriesError
    ) {

        console.error(
            "Error cargando series anteriores:",
            seriesError
        );

        return [];
    }


    return series || [];
}
// ============================================================
// COMPARAR EJERCICIO CON LA ÚLTIMA VEZ
// ============================================================

async function mostrarMejorasEjercicio(
    ejercicioSesionId,
    ejercicioId,
    nombre
) {

    const {
        data: seriesActuales,
        error: errorActuales
    } =
        await supabaseClient
            .from("Series")
            .select(
                "peso, repeticiones"
            )
            .eq(
                "sesion_ejercicio_id",
                Number(
                    ejercicioSesionId
                )
            )
            .order(
                "numero_serie",
                {
                    ascending: true
                }
            );


    if (
        errorActuales
    ) {

        console.error(
            "Error obteniendo series actuales:",
            errorActuales
        );

        return;
    }


    const seriesAnteriores =
        await obtenerSeriesUltimaSesionEjercicio(
            Number(ejercicioId)
        );


    // --------------------------------------------------------
    // SI NO HAY ENTRENAMIENTO ANTERIOR
    // --------------------------------------------------------

    if (
        !seriesAnteriores ||
        seriesAnteriores.length === 0
    ) {

        alert(
            "🏋️ " +
            nombre +
            "\n\n" +
            "Primer entrenamiento registrado de este ejercicio.\n\n" +
            "¡A partir de ahora podremos comparar tu progreso!"
        );

        return;
    }


    // --------------------------------------------------------
    // CALCULAR DATOS ACTUALES
    // --------------------------------------------------------

    const pesoMaximoActual =
        Math.max(
            ...seriesActuales.map(
                function(serie) {
                    return Number(
                        serie.peso
                    );
                }
            )
        );


    const repeticionesActuales =
        seriesActuales.reduce(
            function(total, serie) {

                return total +
                    Number(
                        serie.repeticiones
                    );

            },
            0
        );


    const volumenActual =
        seriesActuales.reduce(
            function(total, serie) {

                return total +
                    (
                        Number(
                            serie.peso
                        ) *
                        Number(
                            serie.repeticiones
                        )
                    );

            },
            0
        );


    // --------------------------------------------------------
    // CALCULAR DATOS ANTERIORES
    // --------------------------------------------------------

    const pesoMaximoAnterior =
        Math.max(
            ...seriesAnteriores.map(
                function(serie) {
                    return Number(
                        serie.peso
                    );
                }
            )
        );


    const repeticionesAnteriores =
        seriesAnteriores.reduce(
            function(total, serie) {

                return total +
                    Number(
                        serie.repeticiones
                    );

            },
            0
        );


    const volumenAnterior =
        seriesAnteriores.reduce(
            function(total, serie) {

                return total +
                    (
                        Number(
                            serie.peso
                        ) *
                        Number(
                            serie.repeticiones
                        )
                    );

            },
            0
        );


    // --------------------------------------------------------
    // DIFERENCIAS
    // --------------------------------------------------------

    const diferenciaPeso =
        pesoMaximoActual -
        pesoMaximoAnterior;


    const diferenciaReps =
        repeticionesActuales -
        repeticionesAnteriores;


    const diferenciaVolumen =
        volumenActual -
        volumenAnterior;


    let mensaje =
        "🏋️ " +
        nombre +
        "\n\n";


    mensaje +=
        "ÚLTIMA VEZ\n" +
        seriesAnteriores.length +
        " series · " +
        pesoMaximoAnterior +
        " kg máximo · " +
        repeticionesAnteriores +
        " reps totales\n\n";


    mensaje +=
        "HOY\n" +
        seriesActuales.length +
        " series · " +
        pesoMaximoActual +
        " kg máximo · " +
        repeticionesActuales +
        " reps totales\n\n";


    mensaje +=
        "📈 CAMBIOS\n";


    if (
        diferenciaPeso > 0
    ) {

        mensaje +=
            "⬆️ Peso máximo: +" +
            diferenciaPeso +
            " kg\n";

    } else if (
        diferenciaPeso < 0
    ) {

        mensaje +=
            "⬇️ Peso máximo: " +
            diferenciaPeso +
            " kg\n";

    } else {

        mensaje +=
            "➡️ Peso máximo: igual\n";
    }


    if (
        diferenciaReps > 0
    ) {

        mensaje +=
            "⬆️ Repeticiones: +" +
            diferenciaReps +
            "\n";

    } else if (
        diferenciaReps < 0
    ) {

        mensaje +=
            "⬇️ Repeticiones: " +
            diferenciaReps +
            "\n";

    } else {

        mensaje +=
            "➡️ Repeticiones: igual\n";
    }


    if (
        diferenciaVolumen > 0
    ) {

        mensaje +=
            "⬆️ Volumen: +" +
            diferenciaVolumen +
            " kg\n";

    } else if (
        diferenciaVolumen < 0
    ) {

        mensaje +=
            "⬇️ Volumen: " +
            diferenciaVolumen +
            " kg\n";

    } else {

        mensaje +=
            "➡️ Volumen: igual\n";
    }


    alert(
        mensaje
    );
}
// ============================================================
// CARGAR SERIES RECUPERADAS
// ============================================================

async function cargarSeriesRecuperadas(
    sesionEjercicioId,
    listaSeries,
    contador,
    textoResumen,
    nombre
) {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("Series")
            .select(
                "id, numero_serie, peso, repeticiones"
            )
            .eq(
                "sesion_ejercicio_id",
                sesionEjercicioId
            )
            .order(
                "numero_serie",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            error
        );

        return;
    }


    listaSeries.innerHTML =
        "";


    (data || []).forEach(
        function(serie) {

            mostrarSerieEnPantalla(
                serie,
                listaSeries,
                contador
            );
        }
    );


    actualizarTextoResumen(
        listaSeries,
        textoResumen,
        nombre
    );
}


// ============================================================
// ACTUALIZAR RESUMEN
// ============================================================

function actualizarTextoResumen(
    listaSeries,
    textoResumen,
    nombre
) {

    const cantidad =
        listaSeries.querySelectorAll(
            ".serieGuardada"
        ).length;


    textoResumen.textContent =
        nombre +
        " — " +
        cantidad +
        (
            cantidad === 1
                ? " serie"
                : " series"
        );
}


// ============================================================
// MIS SESIONES
// ============================================================

verMisSesiones.addEventListener(
    "click",
    async function() {

        mostrarPantalla(
            pantallaMisSesiones
        );

        await cargarSesiones();
    }
);


// ============================================================
// VOLVER AL ENTRENAMIENTO
// ============================================================

volverEntrenamiento.addEventListener(
    "click",
    function() {

        mostrarPantalla(
            pantallaEntrenamientos
        );
    }
);


// ============================================================
// CARGAR HISTORIAL
// ============================================================

async function cargarSesiones() {

    resultadoSesiones.innerHTML =
        "Cargando sesiones...";


    const {
        data: usuarioData,
        error: usuarioError
    } =
        await supabaseClient.auth.getUser();


    if (
        usuarioError ||
        !usuarioData.user
    ) {

        resultadoSesiones.innerHTML =
            "";

        return;
    }


    const {
        data: sesiones,
        error
    } =
        await supabaseClient
            .from("Sesiones")
            .select(
                "id, usuario_id, created_at"
            )
            .eq(
                "usuario_id",
                usuarioData.user.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Error cargando sesiones:",
            error
        );

        resultadoSesiones.textContent =
            "Error cargando sesiones.";

        return;
    }


    resultadoSesiones.innerHTML =
        "";


    if (
        !sesiones ||
        sesiones.length === 0
    ) {

        resultadoSesiones.textContent =
            "Todavía no tienes sesiones.";

        return;
    }


    // No mostramos la sesión que está
    // actualmente en curso.
    const sesionesFinalizadas =
        sesiones.filter(
            function(sesion) {

                return Number(
                    sesion.id
                ) !==
                Number(
                    sesionActualId
                );
            }
        );


    if (
        sesionesFinalizadas.length === 0
    ) {

        resultadoSesiones.textContent =
            "Todavía no tienes sesiones finalizadas.";

        return;
    }


    for (
        const sesion
        of sesionesFinalizadas
    ) {

        await mostrarSesionHistorial(
            sesion
        );
    }
}


// ============================================================
// MOSTRAR SESIÓN DEL HISTORIAL
// ============================================================

async function mostrarSesionHistorial(
    sesion,
    contenedorDestino = resultadoSesiones
) {

    const tarjeta =
        document.createElement(
            "div"
        );

    tarjeta.className =
        "tarjetaSesion";


    tarjeta.style.marginBottom =
        "15px";


    // --------------------------------------------------------
    // FECHA
    // --------------------------------------------------------

    const fecha =
        new Date(
            sesion.created_at
        );


    const titulo =
        document.createElement(
            "h3"
        );

    titulo.textContent =
        "📅 " +
        fecha.toLocaleDateString(
            "es-ES"
        ) +
        " — " +
        fecha.toLocaleTimeString(
            "es-ES",
            {
                hour:
                    "2-digit",

                minute:
                    "2-digit"
            }
        );


    tarjeta.appendChild(
        titulo
    );


    // --------------------------------------------------------
    // EJERCICIOS
    // --------------------------------------------------------

    const {
        data: ejercicios,
        error
    } =
        await supabaseClient
            .from(
                "Sesion_Ejercicios"
            )
            .select(
                "id, ejercicio_id, orden"
            )
            .eq(
                "sesion_id",
                sesion.id
            )
            .order(
                "orden",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            error
        );

        return;
    }


    // --------------------------------------------------------
    // RESUMEN
    // --------------------------------------------------------

    let numeroSeries =
        0;


    for (
        const ejercicio
        of ejercicios || []
    ) {

        const {
            count
        } =
            await supabaseClient
                .from("Series")
                .select(
                    "id",
                    {
                        count:
                            "exact",
                        head:
                            true
                    }
                )
                .eq(
                    "sesion_ejercicio_id",
                    ejercicio.id
                );


        numeroSeries +=
            count || 0;
    }


    const resumen =
        document.createElement(
            "p"
        );


    const cantidadEjercicios =
        ejercicios
            ? ejercicios.length
            : 0;


    resumen.textContent =
        cantidadEjercicios +
        (
            cantidadEjercicios === 1
                ? " ejercicio"
                : " ejercicios"
        ) +
        " · " +
        numeroSeries +
        (
            numeroSeries === 1
                ? " serie"
                : " series"
        );


    tarjeta.appendChild(
        resumen
    );


    // --------------------------------------------------------
    // BOTÓN VER
    // --------------------------------------------------------

    const botonVer =
        document.createElement(
            "button"
        );

    botonVer.type =
        "button";

    botonVer.textContent =
        "👁️ Ver sesión";


    tarjeta.appendChild(
        botonVer
    );


    // --------------------------------------------------------
    // CONTENIDO
    // --------------------------------------------------------

    const contenido =
        document.createElement(
            "div"
        );

    contenido.style.display =
        "none";

    contenido.style.marginTop =
        "15px";


    botonVer.addEventListener(
        "click",
        function() {

            if (
                contenido.style.display ===
                "none"
            ) {

                contenido.style.display =
                    "block";

                botonVer.textContent =
                    "🔼 Ocultar sesión";

            } else {

                contenido.style.display =
                    "none";

                botonVer.textContent =
                    "👁️ Ver sesión";
            }
        }
    );


    // --------------------------------------------------------
    // EJERCICIOS
    // --------------------------------------------------------

    for (
        const ejercicio
        of ejercicios || []
    ) {

        const {
            data: ejercicioData
        } =
            await supabaseClient
                .from("ejercicios")
                .select(
                    "nombre"
                )
                .eq(
                    "id",
                    ejercicio.ejercicio_id
                )
                .single();


        if (!ejercicioData) {
            continue;
        }


        const nombre =
            document.createElement(
                "h4"
            );

        nombre.textContent =
            ejercicioData.nombre;


        contenido.appendChild(
            nombre
        );


        const {
            data: series
        } =
            await supabaseClient
                .from("Series")
                .select(
                    "numero_serie, peso, repeticiones"
                )
                .eq(
                    "sesion_ejercicio_id",
                    ejercicio.id
                )
                .order(
                    "numero_serie",
                    {
                        ascending: true
                    }
                );


        const lista =
            document.createElement(
                "ul"
            );


        (series || []).forEach(
            function(serie) {

                const li =
                    document.createElement(
                        "li"
                    );

                li.textContent =
                    "Serie " +
                    serie.numero_serie +
                    ": " +
                    serie.peso +
                    " kg × " +
                    serie.repeticiones;

                lista.appendChild(
                    li
                );
            }
        );


        contenido.appendChild(
            lista
        );
    }


    // --------------------------------------------------------
    // ELIMINAR SESIÓN
    // --------------------------------------------------------

    const botonEliminar =
        document.createElement(
            "button"
        );

    botonEliminar.type =
        "button";

    botonEliminar.textContent =
        "🗑️ Eliminar sesión";


    botonEliminar.style.marginTop =
        "10px";


    botonEliminar.addEventListener(
        "click",
        async function() {

            if (
                !confirm(
                    "¿Quieres eliminar esta sesión completa?"
                )
            ) {
                return;
            }


            const {
                error
            } =
                await supabaseClient
                    .from("Sesiones")
                    .delete()
                    .eq(
                        "id",
                        sesion.id
                    );


            if (error) {

                console.error(
                    "Error eliminando sesión:",
                    error
                );

                alert(
                    "No se pudo eliminar la sesión."
                );

                return;
            }


            tarjeta.remove();


            // Actualizar calendario y progreso.
            await cargarSesionesCalendario();

            datosProgresoCargados =
                false;

            datosVolumenCache = {};
        }
    );


    contenido.appendChild(
        botonEliminar
    );


    tarjeta.appendChild(
        contenido
    );


    contenedorDestino.appendChild(
        tarjeta
    );


    contenedorDestino.appendChild(
        document.createElement(
            "hr"
        )
    );
}


// ============================================================
// CALENDARIO - CARGAR SESIONES
// ============================================================

async function cargarSesionesCalendario() {

    const {
        data: usuarioData,
        error: usuarioError
    } =
        await supabaseClient.auth.getUser();


    if (
        usuarioError ||
        !usuarioData.user
    ) {

        sesionesCalendario =
            [];

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("Sesiones")
            .select(
                "id, created_at"
            )
            .eq(
                "usuario_id",
                usuarioData.user.id
            )
            .order(
                "created_at",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Error cargando calendario:",
            error
        );

        return;
    }


    // No marcar la sesión que todavía está
    // en curso.
    sesionesCalendario =
        (data || []).filter(
            function(sesion) {

                return Number(
                    sesion.id
                ) !==
                Number(
                    sesionActualId
                );
            }
        );
}


// ============================================================
// FECHA YYYY-MM-DD
// ============================================================

function fechaTextoCalendario(
    fecha
) {

    const año =
        fecha.getFullYear();

    const mes =
        String(
            fecha.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const dia =
        String(
            fecha.getDate()
        ).padStart(
            2,
            "0"
        );

    return (
        año +
        "-" +
        mes +
        "-" +
        dia
    );
}


// ============================================================
// ¿HAY ENTRENAMIENTO ESE DÍA?
// ============================================================

function hayEntrenamientoEseDia(
    fecha
) {

    const buscada =
        fechaTextoCalendario(
            fecha
        );


    return sesionesCalendario.some(
        function(sesion) {

            const fechaSesion =
                new Date(
                    sesion.created_at
                );

            return (
                fechaTextoCalendario(
                    fechaSesion
                ) ===
                buscada
            );
        }
    );
}


// ============================================================
// CALENDARIO SEMANAL
// ============================================================

function mostrarSemana() {

    if (!diasSemana) {
        return;
    }


    diasSemana.innerHTML =
        "";


    const hoy =
        new Date();


    const diaSemana =
        hoy.getDay();


    const diferencia =
        diaSemana === 0
            ? -6
            : 1 - diaSemana;


    const lunes =
        new Date(
            hoy
        );


    lunes.setDate(
        hoy.getDate() +
        diferencia
    );


    let cantidad =
        0;


    const nombres =
        [
            "L",
            "M",
            "X",
            "J",
            "V",
            "S",
            "D"
        ];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const fecha =
            new Date(
                lunes
            );


        fecha.setDate(
            lunes.getDate() +
            i
        );


        const entrenado =
            hayEntrenamientoEseDia(
                fecha
            );


        if (entrenado) {
            cantidad++;
        }


        const dia =
            document.createElement(
                "div"
            );


        dia.style.display =
            "inline-block";

        dia.style.textAlign =
            "center";

        dia.style.margin =
            "5px";


        const nombre =
            document.createElement(
                "div"
            );

        nombre.textContent =
            nombres[i];


        const numero =
            document.createElement(
                "div"
            );

        numero.textContent =
            fecha.getDate();


        const marca =
            document.createElement(
                "div"
            );

        marca.className =
            entrenado
                ? "marcaEntrenamiento"
                : "sinEntrenamiento";

        marca.textContent =
            entrenado
                ? "🔥"
                : "·";


        dia.appendChild(
            nombre
        );

        dia.appendChild(
            numero
        );

        dia.appendChild(
            marca
        );


        diasSemana.appendChild(
            dia
        );
    }


    entrenamientosSemana.textContent =
        cantidad +
        (
            cantidad === 1
                ? " entrenamiento"
                : " entrenamientos"
        );
}


// ============================================================
// NOMBRE DEL MES
// ============================================================

function obtenerNombreMes(
    fecha
) {

    return fecha.toLocaleDateString(
        "es-ES",
        {
            month:
                "long",

            year:
                "numeric"
        }
    );
}


// ============================================================
// CALENDARIO MENSUAL
// ============================================================

function mostrarCalendarioMensual() {

    if (!calendario) {
        return;
    }


    calendario.innerHTML =
        "";


    mesActual.textContent =
        obtenerNombreMes(
            fechaCalendario
        );


    const año =
        fechaCalendario.getFullYear();

    const mes =
        fechaCalendario.getMonth();


    const nombres =
        [
            "L",
            "M",
            "X",
            "J",
            "V",
            "S",
            "D"
        ];


    const cabecera =
        document.createElement(
            "div"
        );


    nombres.forEach(
        function(nombre) {

            const elemento =
                document.createElement(
                    "span"
                );

            elemento.textContent =
                nombre;

            elemento.style.display =
                "inline-block";

            elemento.style.width =
                "13%";

            elemento.style.textAlign =
                "center";

            elemento.style.fontWeight =
                "bold";


            cabecera.appendChild(
                elemento
            );
        }
    );


    calendario.appendChild(
        cabecera
    );


    const primerDia =
        new Date(
            año,
            mes,
            1
        );


    let diaInicio =
        primerDia.getDay();


    diaInicio =
        diaInicio === 0
            ? 6
            : diaInicio - 1;


    const diasDelMes =
        new Date(
            año,
            mes + 1,
            0
        ).getDate();


    const contenedor =
        document.createElement(
            "div"
        );


    for (
        let i = 0;
        i < diaInicio;
        i++
    ) {

        const espacio =
            document.createElement(
                "span"
            );

        espacio.style.display =
            "inline-block";

        espacio.style.width =
            "13%";

        espacio.style.height =
            "45px";


        contenedor.appendChild(
            espacio
        );
    }


    for (
        let dia = 1;
        dia <= diasDelMes;
        dia++
    ) {

        const fecha =
            new Date(
                año,
                mes,
                dia
            );


        const entrenado =
            hayEntrenamientoEseDia(
                fecha
            );


        const elemento =
            document.createElement(
                "button"
            );


        elemento.type =
            "button";

        elemento.style.width =
            "13%";

        elemento.style.height =
            "45px";

        elemento.style.margin =
            "1% 0";


        elemento.className =
            entrenado
                ? "diaCalendario diaEntrenado"
                : "diaCalendario";

        elemento.textContent =
            entrenado
                ? dia + " 🔥"
                : dia;


        elemento.addEventListener(
            "click",
            function() {

                mostrarDetalleDia(
                    fecha
                );
            }
        );


        contenedor.appendChild(
            elemento
        );
    }


    calendario.appendChild(
        contenedor
    );
}


// ============================================================
// DETALLE DE UN DÍA
// ============================================================

async function mostrarDetalleDia(
    fecha
) {

    detalleDia.innerHTML =
        "Cargando sesión...";


    const fechaBuscada =
        fechaTextoCalendario(
            fecha
        );


    const sesionesDia =
        sesionesCalendario.filter(
            function(sesion) {

                const fechaSesion =
                    new Date(
                        sesion.created_at
                    );

                return (
                    fechaTextoCalendario(
                        fechaSesion
                    ) ===
                    fechaBuscada
                );
            }
        );


    if (
        sesionesDia.length === 0
    ) {

        detalleDia.innerHTML =
            "";

        const mensajeDia =
            document.createElement(
                "p"
            );

        mensajeDia.textContent =
            "No entrenaste este día.";

        detalleDia.appendChild(
            mensajeDia
        );

        return;
    }


    detalleDia.innerHTML =
        "";


    const tituloDia =
        document.createElement(
            "h3"
        );


    tituloDia.textContent =
        fecha.toLocaleDateString(
            "es-ES",
            {
                weekday:
                    "long",

                day:
                    "numeric",

                month:
                    "long",

                year:
                    "numeric"
            }
        );


    detalleDia.appendChild(
        tituloDia
    );


    // Usamos exactamente el mismo formato
    // de tarjeta que "Mis sesiones".
    for (
        const sesion
        of sesionesDia
    ) {

        await mostrarSesionHistorial(
            sesion,
            detalleDia
        );
    }
}


// ============================================================
// ABRIR CALENDARIO
// ============================================================

verCalendario.addEventListener(
    "click",
    async function() {

        await cargarSesionesCalendario();

        calendarioSemana.style.display =
            "none";

        calendarioMensual.style.display =
            "block";

        detalleDia.innerHTML =
            "";

        fechaCalendario =
            new Date();

        mostrarCalendarioMensual();
    }
);


// ============================================================
// CERRAR CALENDARIO
// ============================================================

cerrarCalendario.addEventListener(
    "click",
    function() {

        calendarioMensual.style.display =
            "none";

        calendarioSemana.style.display =
            "block";

        detalleDia.innerHTML =
            "";

        mostrarSemana();
    }
);


// ============================================================
// MES ANTERIOR
// ============================================================

mesAnterior.addEventListener(
    "click",
    function() {

        fechaCalendario.setMonth(
            fechaCalendario.getMonth() - 1
        );

        detalleDia.innerHTML =
            "";

        mostrarCalendarioMensual();
    }
);


// ============================================================
// MES SIGUIENTE
// ============================================================

mesSiguiente.addEventListener(
    "click",
    function() {

        fechaCalendario.setMonth(
            fechaCalendario.getMonth() + 1
        );

        detalleDia.innerHTML =
            "";

        mostrarCalendarioMensual();
    }
);

// ============================================================
// FILTRO DE TIEMPO PARA SERIES MUSCULARES
// ============================================================

let periodoSeriesMusculares = "semana";
let fechaInicioSeriesPersonalizada = "";
let fechaFinSeriesPersonalizada = "";

function obtenerRangoSeriesMusculares() {

    const ahora = new Date();
    let inicio;
    let fin;

    if (periodoSeriesMusculares === "semana") {

        inicio = new Date(ahora);
        const dia = inicio.getDay();
        const diferencia = dia === 0 ? -6 : 1 - dia;
        inicio.setDate(inicio.getDate() + diferencia);
        inicio.setHours(0, 0, 0, 0);

        fin = new Date(inicio);
        fin.setDate(fin.getDate() + 7);

    } else if (periodoSeriesMusculares === "mes") {

        inicio = new Date(
            ahora.getFullYear(),
            ahora.getMonth(),
            1,
            0, 0, 0, 0
        );

        fin = new Date(
            ahora.getFullYear(),
            ahora.getMonth() + 1,
            1,
            0, 0, 0, 0
        );

    } else if (periodoSeriesMusculares === "año") {

        inicio = new Date(
            ahora.getFullYear(),
            0,
            1,
            0, 0, 0, 0
        );

        fin = new Date(
            ahora.getFullYear() + 1,
            0,
            1,
            0, 0, 0, 0
        );

    } else {

        if (!fechaInicioSeriesPersonalizada || !fechaFinSeriesPersonalizada) {
            return null;
        }

        inicio = new Date(
            fechaInicioSeriesPersonalizada + "T00:00:00"
        );

        fin = new Date(
            fechaFinSeriesPersonalizada + "T00:00:00"
        );

        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
            return null;
        }

        fin.setDate(fin.getDate() + 1);
    }

    return {
        inicio: inicio.toISOString(),
        fin: fin.toISOString()
    };
}


// ============================================================
// CONTROLES DEL PERIODO
// ============================================================

function prepararFiltroSeriesMusculares() {

    if (!progresoMusculos) {
        return;
    }

    let controles = document.getElementById(
        "filtroSeriesMusculares"
    );

    if (controles) {
        return;
    }

    controles = document.createElement("div");
    controles.id = "filtroSeriesMusculares";

    const etiqueta = document.createElement("strong");
    etiqueta.textContent = "Periodo:";
    controles.appendChild(etiqueta);

    const select = document.createElement("select");
    select.id = "selectorPeriodoSeries";

    [
        ["semana", "Esta semana"],
        ["mes", "Este mes"],
        ["año", "Este año"],
        ["personalizado", "Personalizado"]
    ].forEach(function(opcionData) {

        const opcion = document.createElement("option");
        opcion.value = opcionData[0];
        opcion.textContent = opcionData[1];
        select.appendChild(opcion);
    });

    select.value = periodoSeriesMusculares;
    controles.appendChild(select);

    const personalizado = document.createElement("div");
    personalizado.id = "rangoPersonalizadoSeries";
    personalizado.style.display = "none";

    const desde = document.createElement("input");
    desde.type = "date";
    desde.id = "fechaInicioSeries";

    const hasta = document.createElement("input");
    hasta.type = "date";
    hasta.id = "fechaFinSeries";

    const etiquetaDesde = document.createElement("label");
    etiquetaDesde.textContent = "Desde";
    etiquetaDesde.htmlFor = "fechaInicioSeries";

    const etiquetaHasta = document.createElement("label");
    etiquetaHasta.textContent = "Hasta";
    etiquetaHasta.htmlFor = "fechaFinSeries";

    personalizado.appendChild(etiquetaDesde);
    personalizado.appendChild(desde);
    personalizado.appendChild(etiquetaHasta);
    personalizado.appendChild(hasta);

    controles.appendChild(personalizado);

    const aplicar = document.createElement("button");
    aplicar.type = "button";
    aplicar.id = "aplicarRangoSeries";
    aplicar.textContent = "Aplicar fechas";
    aplicar.style.display = "none";
    controles.appendChild(aplicar);

    progresoMusculos.insertBefore(
        controles,
        listaGruposMusculares
    );

    select.addEventListener("change", async function() {

        periodoSeriesMusculares = select.value;

        personalizado.style.display =
            periodoSeriesMusculares === "personalizado"
                ? "block"
                : "none";

        aplicar.style.display =
            periodoSeriesMusculares === "personalizado"
                ? "inline-block"
                : "none";

        if (periodoSeriesMusculares !== "personalizado") {
            await cargarGruposMusculares();
        }
    });

    aplicar.addEventListener("click", async function() {

        if (!desde.value || !hasta.value) {
            alert("Selecciona las dos fechas.");
            return;
        }

        if (desde.value > hasta.value) {
            alert("La fecha inicial no puede ser posterior a la final.");
            return;
        }

        fechaInicioSeriesPersonalizada = desde.value;
        fechaFinSeriesPersonalizada = hasta.value;

        await cargarGruposMusculares();
    });
}


// ============================================================
// PROGRESO - CARGAR GRUPOS MUSCULARES
// ============================================================

async function cargarGruposMusculares() {

    if (!listaGruposMusculares) {
        return;
    }

    prepararFiltroSeriesMusculares();

    const rango = obtenerRangoSeriesMusculares();

    if (!rango) {
        listaGruposMusculares.textContent =
            "Selecciona un rango de fechas válido.";
        return;
    }

    listaGruposMusculares.innerHTML = "";

    const {
        data: musculos,
        error
    } = await supabaseClient
        .from("Musculos")
        .select("id, nombre, grupo")
        .order("grupo", { ascending: true })
        .order("nombre", { ascending: true });

    if (error) {
        console.error("Error cargando grupos musculares:", error);
        listaGruposMusculares.textContent =
            "No se pudieron cargar los grupos musculares.";
        return;
    }

    if (!musculos || musculos.length === 0) {
        listaGruposMusculares.textContent =
            "No hay músculos registrados.";
        return;
    }

    const grupos = {};

    musculos.forEach(function(musculo) {
        if (!grupos[musculo.grupo]) {
            grupos[musculo.grupo] = [];
        }
        grupos[musculo.grupo].push(musculo);
    });

    Object.keys(grupos).forEach(function(grupo) {

        const bloque = document.createElement("div");
        bloque.className = "grupoMuscular";
        bloque.dataset.grupo = grupo;

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "botonGrupoMuscular";

        const nombre = document.createElement("strong");
        nombre.textContent = grupo;

        const series = document.createElement("span");
        series.className = "seriesGrupo";
        series.textContent = "Cargando...";

        boton.appendChild(nombre);
        boton.appendChild(series);

        const detalle = document.createElement("div");
        detalle.className = "detalleGrupoMuscular";
        detalle.style.display = "none";

        grupos[grupo].forEach(function(musculo) {

            const elemento = document.createElement("div");
            elemento.className = "musculoDetalle";

            const nombreMusculo = document.createElement("span");
            nombreMusculo.textContent = musculo.nombre;

            const seriesMusculo = document.createElement("span");
            seriesMusculo.className = "seriesMusculo";
            seriesMusculo.textContent = "Cargando...";

            elemento.appendChild(nombreMusculo);
            elemento.appendChild(seriesMusculo);
            detalle.appendChild(elemento);

            cargarTotalSeriesMusculo(
                musculo.id,
                seriesMusculo,
                rango
            );
        });

        bloque.appendChild(boton);
        bloque.appendChild(detalle);
        listaGruposMusculares.appendChild(bloque);

        boton.addEventListener("click", function() {
            detalle.style.display =
                detalle.style.display === "none"
                    ? "block"
                    : "none";
        });

        cargarTotalSeriesGrupo(
            grupo,
            series,
            rango
        );
    });
}


// ============================================================
// TOTAL SERIES DE UN GRUPO
// ============================================================

async function cargarTotalSeriesGrupo(
    grupo,
    elemento,
    rango
) {

    try {

        elemento.textContent = "Cargando...";

        const {
            data: musculos,
            error: musculosError
        } = await supabaseClient
            .from("Musculos")
            .select("id")
            .eq("grupo", grupo);

        if (musculosError) {
            throw musculosError;
        }

        if (!musculos || musculos.length === 0) {
            elemento.textContent = "0 series";
            return;
        }

        const musculoIds = musculos.map(function(musculo) {
            return musculo.id;
        });

        const {
            data: relaciones,
            error: relacionesError
        } = await supabaseClient
            .from("Ejercicio_Musculos")
            .select("ejercicio_id")
            .in("musculo_id", musculoIds);

        if (relacionesError) {
            throw relacionesError;
        }

        if (!relaciones || relaciones.length === 0) {
            elemento.textContent = "0 series";
            return;
        }

        const ejercicioIds = [
            ...new Set(
                relaciones.map(function(relacion) {
                    return relacion.ejercicio_id;
                })
            )
        ];

        const {
            data: sesiones,
            error: sesionesError
        } = await supabaseClient
            .from("Sesiones")
            .select("id")
            .gte("created_at", rango.inicio)
            .lt("created_at", rango.fin)
            .neq("id", Number(sesionActualId) || -1);

        if (sesionesError) {
            throw sesionesError;
        }

        if (!sesiones || sesiones.length === 0) {
            elemento.textContent = "0 series";
            return;
        }

        const sesionIds = sesiones.map(function(sesion) {
            return sesion.id;
        });

        const {
            data: sesionesEjercicios,
            error: sesionesEjerciciosError
        } = await supabaseClient
            .from("Sesion_Ejercicios")
            .select("id")
            .in("ejercicio_id", ejercicioIds)
            .in("sesion_id", sesionIds);

        if (sesionesEjerciciosError) {
            throw sesionesEjerciciosError;
        }

        if (!sesionesEjercicios || sesionesEjercicios.length === 0) {
            elemento.textContent = "0 series";
            return;
        }

        const sesionEjercicioIds = sesionesEjercicios.map(function(item) {
            return item.id;
        });

        const {
            count,
            error: seriesError
        } = await supabaseClient
            .from("Series")
            .select("id", { count: "exact", head: true })
            .in("sesion_ejercicio_id", sesionEjercicioIds);

        if (seriesError) {
            throw seriesError;
        }

        const total = count || 0;

        elemento.textContent =
            total +
            (total === 1 ? " serie" : " series");

    } catch (error) {

        console.error(
            "Error calculando series del grupo:",
            grupo,
            error
        );

        elemento.textContent = "Error";
    }
}

// ============================================================
// TOTAL SERIES DE UN MÚSCULO
// ============================================================

async function cargarTotalSeriesMusculo(
    musculoId,
    elemento,
    rango
) {

    try {

        const {
            data: relaciones,
            error: relacionesError
        } =
            await supabaseClient
                .from("Ejercicio_Musculos")
                .select("ejercicio_id")
                .eq(
                    "musculo_id",
                    musculoId
                );


        if (relacionesError) {
            throw relacionesError;
        }


        if (
            !relaciones ||
            relaciones.length === 0
        ) {

            elemento.textContent =
                "0 series";

            return;
        }


        const ejercicioIds =
            [
                ...new Set(
                    relaciones.map(
                        function(relacion) {
                            return relacion.ejercicio_id;
                        }
                    )
                )
            ];


        const {
            data: sesiones,
            error: sesionesError
        } = await supabaseClient
            .from("Sesiones")
            .select("id")
            .gte("created_at", rango.inicio)
            .lt("created_at", rango.fin)
            .neq("id", Number(sesionActualId) || -1);

        if (sesionesError) {
            throw sesionesError;
        }

        if (!sesiones || sesiones.length === 0) {
            elemento.textContent = "0 series";
            return;
        }

        const sesionIds = sesiones.map(function(sesion) {
            return sesion.id;
        });

        const {
            data: sesionesEjercicios,
            error: sesionesEjerciciosError
        } = await supabaseClient
            .from("Sesion_Ejercicios")
            .select("id")
            .in("ejercicio_id", ejercicioIds)
            .in("sesion_id", sesionIds);

        if (sesionesEjerciciosError) {
            throw sesionesEjerciciosError;
        }


        if (
            !sesionesEjercicios ||
            sesionesEjercicios.length === 0
        ) {

            elemento.textContent =
                "0 series";

            return;
        }


        const ids =
            sesionesEjercicios.map(
                function(item) {
                    return item.id;
                }
            );


        const {
            count,
            error: seriesError
        } =
            await supabaseClient
                .from("Series")
                .select(
                    "id",
                    {
                        count: "exact",
                        head: true
                    }
                )
                .in(
                    "sesion_ejercicio_id",
                    ids
                );


        if (seriesError) {
            throw seriesError;
        }


        const total =
            count || 0;


        elemento.textContent =
            total +
            (
                total === 1
                    ? " serie"
                    : " series"
            );


    } catch (error) {

        console.error(
            "Error calculando series del músculo:",
            musculoId,
            error
        );

        elemento.textContent =
            "Error";
    }
}   

// ============================================================
// PREPARAR SELECTS DE PROGRESO
// ============================================================

function prepararSelectsProgreso() {

    if (
        !selectorEjercicioVolumen ||
        !selectorEjercicioPR
    ) {
        return;
    }


    selectorEjercicioVolumen.innerHTML =
        "";


    selectorEjercicioPR.innerHTML =
        "";


    const opcionVolumen =
        document.createElement(
            "option"
        );

    opcionVolumen.value =
        "";

    opcionVolumen.textContent =
        "Selecciona un ejercicio";


    const opcionPR =
        document.createElement(
            "option"
        );

    opcionPR.value =
        "";

    opcionPR.textContent =
        "Selecciona un ejercicio";


    selectorEjercicioVolumen.appendChild(
        opcionVolumen
    );

    selectorEjercicioPR.appendChild(
        opcionPR
    );


    catalogoEjercicios.forEach(
        function(ejercicio) {

            const opcion1 =
                document.createElement(
                    "option"
                );

            opcion1.value =
                ejercicio.id;

            opcion1.textContent =
                ejercicio.nombre;


            const opcion2 =
                document.createElement(
                    "option"
                );

            opcion2.value =
                ejercicio.id;

            opcion2.textContent =
                ejercicio.nombre;


            selectorEjercicioVolumen.appendChild(
                opcion1
            );

            selectorEjercicioPR.appendChild(
                opcion2
            );
        }
    );
}


// ============================================================
// CAMBIO DE EJERCICIO - VOLUMEN
// ============================================================

selectorEjercicioVolumen.addEventListener(
    "change",
    async function() {

        const ejercicioId =
            this.value;


        if (!ejercicioId) {

            destruirGraficaVolumen();

            mensajeVolumen.textContent =
                "";

            return;
        }


        await cargarGraficaVolumen(
            Number(
                ejercicioId
            )
        );
    }
);


// ============================================================
// CAMBIO DE EJERCICIO - PR
// ============================================================

selectorEjercicioPR.addEventListener(
    "change",
    async function() {

        const ejercicioId =
            this.value;


        if (!ejercicioId) {

            destruirGraficaPR();

            mensajePR.textContent =
                "";

            return;
        }


        await cargarGraficaPR(
            Number(
                ejercicioId
            )
        );
    }
);


// ============================================================
// OBTENER NOMBRE DE EJERCICIO
// ============================================================

function obtenerNombreEjercicio(
    id
) {

    const ejercicio =
        catalogoEjercicios.find(
            function(item) {

                return Number(
                    item.id
                ) ===
                Number(
                    id
                );
            }
        );


    return ejercicio
        ? ejercicio.nombre
        : "Ejercicio";
}


// ============================================================
// CARGAR DATOS DE VOLUMEN
// ============================================================

async function obtenerDatosVolumen(
    ejercicioId
) {

    // Caché para evitar volver a pedir
    // los mismos datos.
    if (
        datosVolumenCache[
            ejercicioId
        ]
    ) {

        return datosVolumenCache[
            ejercicioId
        ];
    }


    const {
        data: sesionesEjercicios,
        error
    } =
        await supabaseClient
            .from(
                "Sesion_Ejercicios"
            )
            .select(
                "id, sesion_id, ejercicio_id"
            )
            .eq(
                "ejercicio_id",
                ejercicioId
            );


    if (error) {

        console.error(
            "Error cargando progreso:",
            error
        );

        return [];
    }


    if (
        !sesionesEjercicios ||
        sesionesEjercicios.length === 0
    ) {

        datosVolumenCache[
            ejercicioId
        ] = [];

        return [];
    }


    const sesionEjercicioIds =
        sesionesEjercicios.map(
            function(item) {

                return item.id;
            }
        );


    const sesionIds =
        [
            ...new Set(
                sesionesEjercicios.map(
                    function(item) {

                        return item.sesion_id;
                    }
                )
            )
        ];


    // Obtener fechas de las sesiones.
    const {
        data: sesiones,
        error: sesionesError
    } =
        await supabaseClient
            .from("Sesiones")
            .select(
                "id, created_at"
            )
            .in(
                "id",
                sesionIds
            );


    if (sesionesError) {

        console.error(
            sesionesError
        );

        return [];
    }


    const fechaPorSesion =
        new Map();


    (sesiones || []).forEach(
        function(sesion) {

            fechaPorSesion.set(
                Number(
                    sesion.id
                ),
                sesion.created_at
            );
        }
    );


    // Una sola consulta para TODAS las series
    // del ejercicio.
    const {
        data: series,
        error: seriesError
    } =
        await supabaseClient
            .from("Series")
            .select(
                "id, sesion_ejercicio_id, peso, repeticiones"
            )
            .in(
                "sesion_ejercicio_id",
                sesionEjercicioIds
            );


    if (seriesError) {

        console.error(
            seriesError
        );

        return [];
    }


    const ejercicioPorSesionEjercicio =
        new Map();


    sesionesEjercicios.forEach(
        function(item) {

            ejercicioPorSesionEjercicio.set(
                Number(
                    item.id
                ),
                Number(
                    item.sesion_id
                )
            );
        }
    );


    const volumenPorSesion =
        new Map();


    (series || []).forEach(
        function(serie) {

            const sesionId =
                ejercicioPorSesionEjercicio.get(
                    Number(
                        serie.sesion_ejercicio_id
                    )
                );


            if (!sesionId) {
                return;
            }


            const volumen =
                Number(
                    serie.peso
                ) *
                Number(
                    serie.repeticiones
                );


            const actual =
                volumenPorSesion.get(
                    sesionId
                ) || 0;


            volumenPorSesion.set(
                sesionId,
                actual + volumen
            );
        }
    );


    const resultado =
        [];


    volumenPorSesion.forEach(
        function(volumen, sesionId) {

            const fecha =
                fechaPorSesion.get(
                    sesionId
                );


            if (!fecha) {
                return;
            }


            resultado.push({
                sesionId:
                    sesionId,

                fecha:
                    fecha,

                volumen:
                    volumen
            });
        }
    );


    resultado.sort(
        function(a, b) {

            return new Date(
                a.fecha
            ) -
            new Date(
                b.fecha
            );
        }
    );


    datosVolumenCache[
        ejercicioId
    ] = resultado;


    return resultado;
}


// ============================================================
// GRÁFICA DE VOLUMEN
// ============================================================

async function cargarGraficaVolumen(
    ejercicioId
) {

    destruirGraficaVolumen();


    mensajeVolumen.textContent =
        "Cargando...";


    const datos =
        await obtenerDatosVolumen(
            ejercicioId
        );


    if (
        !datos ||
        datos.length === 0
    ) {

        mensajeVolumen.textContent =
            "No hay registros de este ejercicio.";

        return;
    }


    mensajeVolumen.textContent =
        "";


    const labels =
        datos.map(
            function(item) {

                return new Date(
                    item.fecha
                ).toLocaleDateString(
                    "es-ES",
                    {
                        day:
                            "2-digit",

                        month:
                            "2-digit",

                        year:
                            "numeric"
                    }
                );
            }
        );


    const valores =
        datos.map(
            function(item) {

                return Math.round(
                    item.volumen
                );
            }
        );


    graficaVolumen =
        new Chart(
            graficaVolumenCanvas,
            {
                type:
                    "line",

                data:
                    {
                        labels:
                            labels,

                        datasets:
                            [
                                {
                                    label:
                                        "Volumen",

                                    data:
                                        valores,

                                    tension:
                                        0.25,

                                    fill:
                                        false
                                }
                            ]
                    },

                options:
                    {
                        responsive:
                            true,

                        maintainAspectRatio:
                            true,

                        scales:
                            {
                                y:
                                    {
                                        beginAtZero:
                                            true,

                                        title:
                                            {
                                                display:
                                                    true,

                                                text:
                                                    "Volumen (kg)"
                                            }
                                    },

                                x:
                                    {
                                        title:
                                            {
                                                display:
                                                    true,

                                                text:
                                                    "Sesión"
                                            }
                                    }
                            },

                        plugins:
                            {
                                legend:
                                    {
                                        display:
                                            false
                                    },

                                tooltip:
                                    {
                                        callbacks:
                                            {
                                                label:
                                                    function(context) {

                                                        return (
                                                            " " +
                                                            context.parsed.y +
                                                            " kg"
                                                        );
                                                    }
                                            }
                                    }
                            }
                    }
            }
        );
}


// ============================================================
// DESTRUIR GRÁFICA VOLUMEN
// ============================================================

function destruirGraficaVolumen() {

    if (
        graficaVolumen
    ) {

        graficaVolumen.destroy();

        graficaVolumen =
            null;
    }
}


// ============================================================
// GRÁFICA PR
// ============================================================

async function cargarGraficaPR(
    ejercicioId
) {

    destruirGraficaPR();


    mensajePR.textContent =
        "Cargando...";


    const datos =
        await obtenerDatosVolumen(
            ejercicioId
        );


    if (
        !datos ||
        datos.length === 0
    ) {

        mensajePR.textContent =
            "No hay registros de este ejercicio.";

        return;
    }


    // Para cada sesión buscamos el peso máximo.
    const {
        data: sesionesEjercicios,
        error
    } =
        await supabaseClient
            .from(
                "Sesion_Ejercicios"
            )
            .select(
                "id, sesion_id"
            )
            .eq(
                "ejercicio_id",
                ejercicioId
            );


    if (error) {

        console.error(
            error
        );

        mensajePR.textContent =
            "No se pudo cargar el PR.";

        return;
    }


    const ids =
        sesionesEjercicios.map(
            function(item) {

                return item.id;
            }
        );


    const {
        data: series
    } =
        await supabaseClient
            .from("Series")
            .select(
                "sesion_ejercicio_id, peso"
            )
            .in(
                "sesion_ejercicio_id",
                ids
            );


    const fechaPorSesion =
        new Map();


    datos.forEach(
        function(item) {

            fechaPorSesion.set(
                Number(
                    item.sesionId
                ),
                item.fecha
            );
        }
    );


    const sesionPorEjercicio =
        new Map();


    sesionesEjercicios.forEach(
        function(item) {

            sesionPorEjercicio.set(
                Number(
                    item.id
                ),
                Number(
                    item.sesion_id
                )
            );
        }
    );


    const maximoPorSesion =
        new Map();


    (series || []).forEach(
        function(serie) {

            const sesionId =
                sesionPorEjercicio.get(
                    Number(
                        serie.sesion_ejercicio_id
                    )
                );


            if (!sesionId) {
                return;
            }


            const peso =
                Number(
                    serie.peso
                );


            const anterior =
                maximoPorSesion.get(
                    sesionId
                );


            if (
                anterior === undefined ||
                peso > anterior
            ) {

                maximoPorSesion.set(
                    sesionId,
                    peso
                );
            }
        }
    );


    const resultados =
        [];


    maximoPorSesion.forEach(
        function(peso, sesionId) {

            resultados.push({
                fecha:
                    fechaPorSesion.get(
                        sesionId
                    ),

                peso:
                    peso
            });
        }
    );


    resultados.sort(
        function(a, b) {

            return new Date(
                a.fecha
            ) -
            new Date(
                b.fecha
            );
        }
    );


    mensajePR.textContent =
        "";


    const labels =
        resultados.map(
            function(item) {

                return new Date(
                    item.fecha
                ).toLocaleDateString(
                    "es-ES",
                    {
                        day:
                            "2-digit",

                        month:
                            "2-digit",

                        year:
                            "numeric"
                    }
                );
            }
        );


    const valores =
        resultados.map(
            function(item) {

                return item.peso;
            }
        );


    graficaPR =
        new Chart(
            graficaPRCanvas,
            {
                type:
                    "line",

                data:
                    {
                        labels:
                            labels,

                        datasets:
                            [
                                {
                                    label:
                                        "PR",

                                    data:
                                        valores,

                                    tension:
                                        0.25,

                                    fill:
                                        false
                                }
                            ]
                    },

                options:
                    {
                        responsive:
                            true,

                        maintainAspectRatio:
                            true,

                        scales:
                            {
                                y:
                                    {
                                        beginAtZero:
                                            true,

                                        title:
                                            {
                                                display:
                                                    true,

                                                text:
                                                    "Peso (kg)"
                                            }
                                    }
                            }
                    }
            }
        );
}


// ============================================================
// DESTRUIR GRÁFICA PR
// ============================================================

function destruirGraficaPR() {

    if (
        graficaPR
    ) {

        graficaPR.destroy();

        graficaPR =
            null;
    }
}


// ============================================================
// GRÁFICA SESIONES POR MES
// ============================================================

async function cargarGraficaSesiones() {

    if (
        !graficaSesionesCanvas
    ) {
        return;
    }


    const {
        data: usuarioData,
        error: usuarioError
    } =
        await supabaseClient.auth.getUser();


    if (
        usuarioError ||
        !usuarioData.user
    ) {
        return;
    }


    const año =
        new Date().getFullYear();


    const inicio =
        año +
        "-01-01T00:00:00";


    const fin =
        (año + 1) +
        "-01-01T00:00:00";


    const {
        data: sesiones,
        error
    } =
        await supabaseClient
            .from("Sesiones")
            .select(
                "id, created_at"
            )
            .eq(
                "usuario_id",
                usuarioData.user.id
            )
            .gte(
                "created_at",
                inicio
            )
            .lt(
                "created_at",
                fin
            );


    if (error) {

        console.error(
            "Error cargando sesiones por mes:",
            error
        );

        return;
    }


    const valores =
        new Array(
            12
        ).fill(
            0
        );


    (sesiones || []).forEach(
        function(sesion) {

            // No contar sesión actual.
            if (
                Number(
                    sesion.id
                ) ===
                Number(
                    sesionActualId
                )
            ) {
                return;
            }


            const fecha =
                new Date(
                    sesion.created_at
                );


            const mes =
                fecha.getMonth();


            valores[mes]++;
        }
    );


    const nombresMeses =
        [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ];


    if (
        graficaSesiones
    ) {

        graficaSesiones.destroy();
    }


    graficaSesiones =
        new Chart(
            graficaSesionesCanvas,
            {
                type:
                    "bar",

                data:
                    {
                        labels:
                            nombresMeses,

                        datasets:
                            [
                                {
                                    label:
                                        "Sesiones",

                                    data:
                                        valores
                                }
                            ]
                    },

                options:
                    {
                        responsive:
                            true,

                        maintainAspectRatio:
                            true,

                        scales:
                            {
                                y:
                                    {
                                        beginAtZero:
                                            true,

                                        ticks:
                                            {
                                                precision:
                                                    0
                                            },

                                        title:
                                            {
                                                display:
                                                    true,

                                                text:
                                                    "Nº de sesiones"
                                            }
                                    },

                                x:
                                    {
                                        title:
                                            {
                                                display:
                                                    true,

                                                text:
                                                    "Mes"
                                            }
                                    }
                            }
                    }
            }
        );
}


// ============================================================
// CARGAR TODO EL PROGRESO
// ============================================================

async function cargarProgreso() {

    if (
        datosProgresoCargados
    ) {
        return;
    }


    await cargarSesionesCalendario();

    mostrarSemana();

    prepararSelectsProgreso();

    prepararFiltroSeriesMusculares();

    await cargarGruposMusculares();

    await cargarGraficaSesiones();


    datosProgresoCargados =
        true;
}


// ============================================================
// NAVEGACIÓN - ENTRENAMIENTOS
// ============================================================

navEntrenamientos.addEventListener(
    "click",
    function() {

        mostrarPantalla(
            pantallaEntrenamientos
        );
    }
);


// ============================================================
// NAVEGACIÓN - RUTINAS
// ============================================================

navRutinas.addEventListener(
    "click",
    function() {

        mostrarPantalla(
            pantallaRutinas
        );
    }
);


// ============================================================
// NAVEGACIÓN - PROGRESO
// ============================================================

navProgreso.addEventListener(
    "click",
    async function() {

        mostrarPantalla(
            pantallaProgreso
        );

        await cargarProgreso();
    }
);


// ============================================================
// AÑADIR EJERCICIO
// ============================================================

anadirEjercicio.addEventListener(
    "click",
    async function() {

        await anadirEjercicioASesion();
    }
);


// ============================================================
// COMPROBAR USUARIO AL ABRIR LA APP
// ============================================================

async function comprobarUsuario() {

    const {
        data,
        error
    } =
        await supabaseClient.auth.getUser();


    if (error) {

        actualizarInterfaz(
            null
        );

        return;
    }


    actualizarInterfaz(
        data.user
    );


    if (
        data.user
    ) {

        await cargarEjercicios();

        // IMPORTANTE:
        // Recuperar sesión actual ANTES de terminar
        // la carga inicial.
        await recuperarSesionActual();

        await cargarSesionesCalendario();

        mostrarSemana();
    }
}


// ============================================================
// CAMBIOS DE ESTADO DE AUTENTICACIÓN
// ============================================================

supabaseClient.auth.onAuthStateChange(
    async function(
        event,
        session
    ) {

        if (
            session &&
            session.user
        ) {

            actualizarInterfaz(
                session.user
            );

        } else {

            actualizarInterfaz(
                null
            );
        }
    }
);


// ============================================================
// INICIAR APP
// ============================================================

comprobarUsuario();

// ============================================================
// RUTINAS
// ============================================================

const crearRutina =
    document.getElementById("crearRutina");

const formularioRutina =
    document.getElementById("formularioRutina");

const nombreRutina =
    document.getElementById("nombreRutina");

const guardarRutina =
    document.getElementById("guardarRutina");

const cancelarRutina =
    document.getElementById("cancelarRutina");

const mensajeRutina =
    document.getElementById("mensajeRutina");

const listaRutinas =
    document.getElementById("listaRutinas");

const detalleRutina =
    document.getElementById("detalleRutina");

const tituloRutina =
    document.getElementById("tituloRutina");

const ejerciciosRutina =
    document.getElementById("ejerciciosRutina");

const volverRutinas =
    document.getElementById("volverRutinas");

const anadirEjercicioRutina =
    document.getElementById("anadirEjercicioRutina");

// ID de la rutina que estamos viendo actualmente.
let rutinaActualId = null;
// ============================================================
// MOSTRAR FORMULARIO DE CREAR RUTINA
// ============================================================

crearRutina.addEventListener(
    "click",
    function() {

        formularioRutina.style.display =
            "block";

        nombreRutina.value =
            "";

        mensajeRutina.textContent =
            "";

        nombreRutina.focus();
    }
);


// ============================================================
// CANCELAR CREACIÓN
// ============================================================

cancelarRutina.addEventListener(
    "click",
    function() {

        formularioRutina.style.display =
            "none";

        nombreRutina.value =
            "";

        mensajeRutina.textContent =
            "";
    }
);


// ============================================================
// GUARDAR RUTINA
// ============================================================

guardarRutina.addEventListener(
    "click",
    async function() {

        const nombre =
            nombreRutina.value.trim();


        if (!nombre) {

            mensajeRutina.textContent =
                "Escribe un nombre para la rutina.";

            return;
        }


        mensajeRutina.textContent =
            "Guardando...";


        // Obtener usuario actual
        const {
            data: usuarioData,
            error: usuarioError
        } =
            await supabaseClient.auth.getUser();


        if (
            usuarioError ||
            !usuarioData.user
        ) {

            mensajeRutina.textContent =
                "Debes iniciar sesión.";

            return;
        }


        // Crear rutina
        const {
            data,
            error
        } =
            await supabaseClient
                .from("Rutinas")
                .insert([
                    {
                        usuario_id:
                            usuarioData.user.id,

                        nombre:
                            nombre
                    }
                ])
                .select()
                .single();


        if (error) {

    console.error(
        "ERROR COMPLETO CREANDO RUTINA:",
        error
    );

    mensajeRutina.textContent =
        "ERROR: " + error.message;

    return;
}


        console.log(
            "Rutina creada:",
            data
        );


        mensajeRutina.textContent =
            "✅ Rutina guardada.";


        formularioRutina.style.display =
            "none";


        // Actualizar la lista
        await cargarRutinas();
    }
);


// ============================================================
// CARGAR RUTINAS
// ============================================================

async function cargarRutinas() {

    if (!listaRutinas) {
        return;
    }

    listaRutinas.innerHTML =
        "Cargando rutinas...";


    const {
        data: usuarioData,
        error: usuarioError
    } =
        await supabaseClient.auth.getUser();


    if (
        usuarioError ||
        !usuarioData.user
    ) {

        listaRutinas.innerHTML =
            "Debes iniciar sesión.";

        return;
    }


    const {
        data: rutinas,
        error
    } =
        await supabaseClient
            .from("Rutinas")
            .select(
                "id, nombre, created_at"
            )
            .eq(
                "usuario_id",
                usuarioData.user.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Error cargando rutinas:",
            error
        );

        listaRutinas.innerHTML =
            "No se pudieron cargar las rutinas.";

        return;
    }


    listaRutinas.innerHTML =
        "";


    if (
        !rutinas ||
        rutinas.length === 0
    ) {

        listaRutinas.textContent =
            "Todavía no tienes ninguna rutina.";

        return;
    }


    rutinas.forEach(
        function(rutina) {

            const boton =
                document.createElement(
                    "button"
                );

            boton.type =
                "button";

            boton.textContent =
                "📋 " +
                rutina.nombre;


            boton.style.display =
                "block";

            boton.style.marginBottom =
                "15px";


            boton.addEventListener(
                "click",
                function() {

                    abrirRutina(
                        rutina
                    );
                }
            );


            listaRutinas.appendChild(
                boton
            );
        }
    );
}
// ============================================================
// INICIAR ENTRENAMIENTO DESDE UNA RUTINA
// ============================================================

async function iniciarRutinaDesdeDetalle() {

    if (sesionActualId) {

        alert(
            "Ya tienes un entrenamiento activo. Finalízalo antes de iniciar una rutina nueva."
        );

        return;
    }

    if (!rutinaActualId) {

        alert(
            "No hay ninguna rutina seleccionada."
        );

        return;
    }

    const {
        data: usuarioData,
        error: usuarioError
    } =
        await supabaseClient.auth.getUser();

    if (
        usuarioError ||
        !usuarioData.user
    ) {

        alert(
            "Debes iniciar sesión."
        );

        return;
    }

    const {
        data: ejerciciosRutinaBD,
        error: ejerciciosError
    } =
        await supabaseClient
            .from("Rutina_Ejercicios")
            .select(
                "id, ejercicio_id, orden, series_objetivo, repeticiones_objetivo"
            )
            .eq(
                "rutina_id",
                rutinaActualId
            )
            .order(
                "orden",
                {
                    ascending: true
                }
            );

    if (ejerciciosError) {

        console.error(
            "Error cargando la rutina para iniciar el entrenamiento:",
            ejerciciosError
        );

        alert(
            "No se pudo cargar la rutina."
        );

        return;
    }

    if (
        !ejerciciosRutinaBD ||
        ejerciciosRutinaBD.length === 0
    ) {

        alert(
            "Esta rutina todavía no tiene ejercicios."
        );

        return;
    }

    const {
        data: sesionCreada,
        error: sesionError
    } =
        await supabaseClient
            .from("Sesiones")
            .insert([
                {
                    usuario_id:
                        usuarioData.user.id
                }
            ])
            .select()
            .single();

    if (sesionError || !sesionCreada) {

        console.error(
            "Error creando la sesión desde la rutina:",
            sesionError
        );

        alert(
            "No se pudo iniciar el entrenamiento."
        );

        return;
    }

    const nuevasRelaciones =
        ejerciciosRutinaBD.map(
            function(ejercicioRutina) {

                return {
                    sesion_id:
                        sesionCreada.id,

                    ejercicio_id:
                        ejercicioRutina.ejercicio_id,

                    orden:
                        ejercicioRutina.orden
                };
            }
        );

    const {
        data: ejerciciosSesionBD,
        error: relacionesError
    } =
        await supabaseClient
            .from("Sesion_Ejercicios")
            .insert(
                nuevasRelaciones
            )
            .select(
                "id, sesion_id, ejercicio_id, orden"
            );

    if (relacionesError) {

        console.error(
            "Error añadiendo los ejercicios de la rutina a la sesión:",
            relacionesError
        );

        alert(
            "No se pudo cargar la rutina en el entrenamiento."
        );

        return;
    }

    sesionActualId =
        sesionCreada.id;

    localStorage.setItem(
        "sesionActualId",
        String(
            sesionActualId
        )
    );

    actualizarBotonModificarSesion();

    ejerciciosSesion.innerHTML =
        "";

    const relacionesOrdenadas =
        (ejerciciosSesionBD || [])
            .slice()
            .sort(
                function(a, b) {
                    return Number(a.orden) - Number(b.orden);
                }
            );

    for (
        const ejercicioBD
        of relacionesOrdenadas
    ) {

        const bloque =
            await crearBloqueEjercicioRecuperado(
                ejercicioBD
            );

        ejerciciosSesion.appendChild(
            bloque
        );
    }

    mostrarPantalla(
        pantallaEntrenamientos
    );

    alert(
        "🏋️ Rutina cargada. ¡Buen entrenamiento!"
    );
}

// ============================================================
// ABRIR UNA RUTINA
// ============================================================

async function abrirRutina(rutina) {

    rutinaActualId =
        rutina.id;

    listaRutinas.style.display =
        "none";

    crearRutina.style.display =
        "none";

    formularioRutina.style.display =
        "none";

    detalleRutina.style.display =
        "block";

    tituloRutina.textContent =
        "📋 " + rutina.nombre;

    await cargarEjerciciosRutina();
        const botonIniciarRutina =
        document.createElement("button");

    botonIniciarRutina.type =
        "button";

    botonIniciarRutina.textContent =
        "▶️ Empezar entrenamiento";

    botonIniciarRutina.addEventListener(
        "click",
        iniciarRutinaDesdeDetalle
    );

    ejerciciosRutina.prepend(
        botonIniciarRutina
    );
}

// ============================================================
// AÑADIR EJERCICIO A LA RUTINA
// ============================================================

anadirEjercicioRutina.addEventListener(
    "click",
    function() {

        if (!rutinaActualId) {

            alert(
                "No hay ninguna rutina seleccionada."
            );

            return;
        }

        const bloque =
            document.createElement("div");

        bloque.className =
            "ejercicioRutina";

        bloque.style.marginBottom =
            "15px";


        // ----------------------------------------------------
        // SELECT DE EJERCICIO
        // ----------------------------------------------------

        const select =
            crearSelectEjercicios();

        bloque.appendChild(
            select
        );


        // ----------------------------------------------------
        // SERIES OBJETIVO
        // ----------------------------------------------------

        const contenedorSeries =
    document.createElement("div");

const etiquetaSeries =
    document.createElement("label");

etiquetaSeries.textContent =
    "Nº de series:";

etiquetaSeries.style.display =
    "block";

const inputSeries =
    document.createElement("input");

inputSeries.type =
    "number";

inputSeries.min =
    "1";

inputSeries.value =
    "3";

inputSeries.placeholder =
    "Nº de series";

contenedorSeries.appendChild(
    etiquetaSeries
);

contenedorSeries.appendChild(
    inputSeries
);

bloque.appendChild(
    contenedorSeries
);

        


        // ----------------------------------------------------
        // REPETICIONES OBJETIVO
        // ----------------------------------------------------

        const contenedorReps =
    document.createElement("div");

const etiquetaReps =
    document.createElement("label");

etiquetaReps.textContent =
    "Repeticiones por serie:";

etiquetaReps.style.display =
    "block";

const inputReps =
    document.createElement("input");

inputReps.type =
    "number";

inputReps.min =
    "1";

inputReps.value =
    "8";

inputReps.placeholder =
    "Repeticiones";

contenedorReps.appendChild(
    etiquetaReps
);

contenedorReps.appendChild(
    inputReps
);

bloque.appendChild(
    contenedorReps
);

        


        // ----------------------------------------------------
        // GUARDAR
        // ----------------------------------------------------

        const botonGuardar =
            document.createElement("button");

        botonGuardar.type =
            "button";

        botonGuardar.textContent =
            "💾 Guardar ejercicio";

        bloque.appendChild(
            botonGuardar
        );


        // ----------------------------------------------------
        // CANCELAR
        // ----------------------------------------------------

        const botonCancelar =
            document.createElement("button");

        botonCancelar.type =
            "button";

        botonCancelar.textContent =
            "❌ Cancelar";

        bloque.appendChild(
            botonCancelar
        );


        // ----------------------------------------------------
        // AÑADIR AL HTML
        // ----------------------------------------------------

        ejerciciosRutina.appendChild(
            bloque
        );


        // ----------------------------------------------------
        // CANCELAR
        // ----------------------------------------------------

        botonCancelar.addEventListener(
            "click",
            function() {

                bloque.remove();
            }
        );


        // ----------------------------------------------------
        // GUARDAR EJERCICIO
        // ----------------------------------------------------

        botonGuardar.addEventListener(
            "click",
            async function() {

                const ejercicioId =
                    select.value;

                const seriesObjetivo =
                    Number(
                        inputSeries.value
                    );

                const repeticionesObjetivo =
                    Number(
                        inputReps.value
                    );


                if (!ejercicioId) {

                    alert(
                        "Selecciona un ejercicio."
                    );

                    return;
                }


                if (
                    seriesObjetivo <= 0 ||
                    repeticionesObjetivo <= 0
                ) {

                    alert(
                        "Introduce series y repeticiones válidas."
                    );

                    return;
                }


                const bloques =
                    ejerciciosRutina.querySelectorAll(
                        ".ejercicioRutina"
                    );


                const orden =
                    bloques.length - 1;


                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .from(
                            "Rutina_Ejercicios"
                        )
                        .insert([
                            {
                                rutina_id:
                                    Number(
                                        rutinaActualId
                                    ),

                                ejercicio_id:
                                    Number(
                                        ejercicioId
                                    ),

                                orden:
                                    orden,

                                series_objetivo:
                                    seriesObjetivo,

                                repeticiones_objetivo:
                                    repeticionesObjetivo
                            }
                        ])
                        .select()
                        .single();


                if (error) {

                    console.error(
                        "Error guardando ejercicio:",
                        error
                    );

                    alert(
                        "No se ha podido guardar el ejercicio."
                    );

                    return;
                }


                // Volver a cargar la rutina
                await cargarEjerciciosRutina();
            }
        );
    }
);

// ============================================================
// ORDENAR EJERCICIOS DE LA RUTINA
// ============================================================

let estadoArrastreRutina = {
    tarjeta: null,
    punteroId: null,
    activo: false,
    movido: false,
    inicioX: 0,
    inicioY: 0,
    offsetX: 0,
    offsetY: 0,
    placeholder: null,
    ordenOriginal: []
};


// ============================================================
// GUARDAR EL ORDEN DE LA RUTINA
// ============================================================

async function guardarOrdenRutina() {

    if (!ejerciciosRutina) {
        return true;
    }

    const tarjetas = Array.from(
        ejerciciosRutina.querySelectorAll(
            ".ejercicioRutina[data-id]"
        )
    );

    // Primero ponemos órdenes temporales negativos.
    // Así evitamos problemas si la tabla tiene una restricción
    // de valores únicos sobre el campo "orden".
    for (let i = 0; i < tarjetas.length; i++) {

        const id = tarjetas[i].dataset.id;

        const { error } =
            await supabaseClient
                .from("Rutina_Ejercicios")
                .update({
                    orden: -(i + 1)
                })
                .eq("id", id);

        if (error) {

            console.error(
                "Error preparando el nuevo orden:",
                error
            );

            return false;
        }
    }

    // Ahora escribimos el orden definitivo.
    for (let i = 0; i < tarjetas.length; i++) {

        const id = tarjetas[i].dataset.id;

        const { error } =
            await supabaseClient
                .from("Rutina_Ejercicios")
                .update({
                    orden: i + 1
                })
                .eq("id", id);

        if (error) {

            console.error(
                "Error guardando el orden:",
                error
            );

            return false;
        }
    }

    return true;
}


// ============================================================
// LIMPIAR ARRASTRE
// ============================================================

function limpiarArrastreRutina() {

    const estado = estadoArrastreRutina;

    if (estado.tarjeta) {

        try {
            if (
                estado.punteroId !== null &&
                estado.tarjeta.hasPointerCapture(
                    estado.punteroId
                )
            ) {
                estado.tarjeta.releasePointerCapture(
                    estado.punteroId
                );
            }
        } catch (error) {
            // No hacemos nada.
        }
    }

    if (estado.placeholder) {
        estado.placeholder.remove();
    }

    if (estado.tarjeta) {
        estado.tarjeta.classList.remove(
            "arrastrando"
        );
        estado.tarjeta.style.opacity = "";
        estado.tarjeta.style.cursor = "grab";
        estado.tarjeta.style.zIndex = "";
        estado.tarjeta.style.position = "";
        estado.tarjeta.style.left = "";
        estado.tarjeta.style.top = "";
        estado.tarjeta.style.width = "";
        estado.tarjeta.style.height = "";
        estado.tarjeta.style.pointerEvents = "";
        estado.tarjeta.style.transform = "";
    }

    estado.tarjeta = null;
    estado.punteroId = null;
    estado.activo = false;
    estado.movido = false;
    estado.inicioX = 0;
    estado.inicioY = 0;
    estado.offsetX = 0;
    estado.offsetY = 0;
    estado.placeholder = null;
    estado.ordenOriginal = [];
}


// ============================================================
// MOVER EL HUECO DURANTE EL ARRASTRE
// ============================================================

function moverTarjetaRutina(evento) {

    const estado = estadoArrastreRutina;

    if (
        !estado.activo ||
        !estado.tarjeta ||
        !estado.placeholder
    ) {
        return;
    }

    const tarjetas = Array.from(
        ejerciciosRutina.querySelectorAll(
            ".ejercicioRutina[data-id]"
        )
    ).filter(function(item) {
        return item !== estado.tarjeta;
    });

    let tarjetaDestino = null;

    for (let i = 0; i < tarjetas.length; i++) {

        const rect =
            tarjetas[i].getBoundingClientRect();

        const mitad =
            rect.top + rect.height / 2;

        if (evento.clientY < mitad) {
            tarjetaDestino = tarjetas[i];
            break;
        }
    }

    if (tarjetaDestino) {
        ejerciciosRutina.insertBefore(
            estado.placeholder,
            tarjetaDestino
        );
    } else {
        ejerciciosRutina.appendChild(
            estado.placeholder
        );
    }

    estado.tarjeta.style.left =
        (evento.clientX - estado.offsetX) + "px";

    estado.tarjeta.style.top =
        (evento.clientY - estado.offsetY) + "px";
}


// ============================================================
// INICIAR ARRASTRE
// ============================================================

function iniciarArrastreRutina(evento, tarjeta) {

    const estado = estadoArrastreRutina;

    if (
        estado.activo ||
        !tarjeta
    ) {
        return;
    }

    const rect = tarjeta.getBoundingClientRect();

    estado.tarjeta = tarjeta;
    estado.punteroId = evento.pointerId;
    estado.activo = true;
    estado.movido = false;

    estado.offsetX =
        evento.clientX - rect.left;

    estado.offsetY =
        evento.clientY - rect.top;

    const tarjetas = Array.from(
        ejerciciosRutina.querySelectorAll(
            ".ejercicioRutina[data-id]"
        )
    );

    estado.ordenOriginal =
        tarjetas.map(function(item) {
            return item.dataset.id;
        });

    const placeholder =
        document.createElement("div");

    placeholder.className =
        "placeholderEjercicioRutina";

    placeholder.style.height =
        rect.height + "px";

    placeholder.style.width =
        rect.width + "px";

    const estilo =
        getComputedStyle(tarjeta);

    placeholder.style.marginTop =
        estilo.marginTop;

    placeholder.style.marginRight =
        estilo.marginRight;

    placeholder.style.marginBottom =
        estilo.marginBottom;

    placeholder.style.marginLeft =
        estilo.marginLeft;

    estado.placeholder = placeholder;

    tarjeta.parentNode.insertBefore(
        placeholder,
        tarjeta
    );

    tarjeta.classList.add("arrastrando");

    // Nunca hacemos la tarjeta transparente/gris.
    tarjeta.style.opacity = "1";
    tarjeta.style.cursor = "grabbing";
    tarjeta.style.zIndex = "1000";
    tarjeta.style.position = "fixed";
    tarjeta.style.left = rect.left + "px";
    tarjeta.style.top = rect.top + "px";
    tarjeta.style.width = rect.width + "px";
    tarjeta.style.height = rect.height + "px";
    tarjeta.style.pointerEvents = "none";

    try {
        tarjeta.setPointerCapture(
            evento.pointerId
        );
    } catch (error) {
        console.error(
            "No se pudo capturar el puntero:",
            error
        );
    }
}


// ============================================================
// PREPARAR ARRASTRE DE UNA TARJETA
// ============================================================

function prepararArrastreRutina(tarjeta) {

    tarjeta.draggable = false;
    tarjeta.style.cursor = "grab";

    // En móvil solamente el pequeño asa de arrastre
    // bloquea el gesto para poder arrastrar sin bloquear
    // el scroll normal de la página.
    tarjeta.style.touchAction = "pan-y";

    // Creamos un asa solo si todavía no existe.
    if (
        !tarjeta.querySelector(
            ".asaArrastreRutina"
        )
    ) {

        const asa =
            document.createElement("span");

        asa.className =
            "asaArrastreRutina";

        asa.textContent = "☷";

        asa.title =
            "Mantén pulsado para ordenar";

        asa.style.display = "inline-flex";
        asa.style.alignItems = "center";
        asa.style.justifyContent = "center";
        asa.style.width = "34px";
        asa.style.height = "34px";
        asa.style.marginRight = "8px";
        asa.style.cursor = "grab";
        asa.style.touchAction = "none";
        asa.style.userSelect = "none";
        asa.style.webkitUserSelect = "none";
        asa.style.fontSize = "22px";
        asa.style.verticalAlign = "middle";

        tarjeta.insertBefore(
            asa,
            tarjeta.firstChild
        );
    }

    tarjeta.addEventListener(
        "pointerdown",
        function(evento) {

            const esBoton =
                evento.target.closest("button");

            const esInput =
                evento.target.closest("input");

            const esSelect =
                evento.target.closest("select");

            const esTextarea =
                evento.target.closest("textarea");

            const esAsa =
                evento.target.closest(
                    ".asaArrastreRutina"
                );

            if (
                esBoton ||
                esInput ||
                esSelect ||
                esTextarea
            ) {
                return;
            }

            // En móvil exigimos pulsar el asa.
            // En ordenador se puede arrastrar desde la tarjeta.
            if (
                evento.pointerType !== "mouse" &&
                !esAsa
            ) {
                return;
            }

            const estado =
                estadoArrastreRutina;

            if (estado.tarjeta) {
                return;
            }

            estado.tarjeta = tarjeta;
            estado.punteroId = evento.pointerId;
            estado.inicioX = evento.clientX;
            estado.inicioY = evento.clientY;
            estado.movido = false;

            // Ordenador: empieza inmediatamente.
            if (
                evento.pointerType === "mouse"
            ) {
                iniciarArrastreRutina(
                    evento,
                    tarjeta
                );
                return;
            }

            // Móvil: mantener pulsado 400 ms.
            estado.temporizador =
                setTimeout(
                    function() {

                        estado.temporizador = null;

                        if (
                            estado.tarjeta !== tarjeta ||
                            estado.movido
                        ) {
                            limpiarArrastreRutina();
                            return;
                        }

                        iniciarArrastreRutina(
                            evento,
                            tarjeta
                        );
                    },
                    400
                );
        }
    );


    tarjeta.addEventListener(
        "pointermove",
        function(evento) {

            const estado =
                estadoArrastreRutina;

            if (
                estado.tarjeta !== tarjeta
            ) {
                return;
            }

            if (!estado.activo) {

                const diferenciaX =
                    Math.abs(
                        evento.clientX -
                        estado.inicioX
                    );

                const diferenciaY =
                    Math.abs(
                        evento.clientY -
                        estado.inicioY
                    );

                if (
                    diferenciaX > 10 ||
                    diferenciaY > 10
                ) {

                    estado.movido = true;

                    if (
                        estado.temporizador
                    ) {
                        clearTimeout(
                            estado.temporizador
                        );
                        estado.temporizador = null;
                    }

                    estado.tarjeta = null;
                    estado.punteroId = null;
                }

                return;
            }

            if (
                evento.pointerId !==
                estado.punteroId
            ) {
                return;
            }

            evento.preventDefault();

            moverTarjetaRutina(
                evento
            );
        }
    );


    tarjeta.addEventListener(
        "pointerup",
        async function(evento) {

            const estado =
                estadoArrastreRutina;

            if (
                estado.tarjeta !== tarjeta
            ) {
                return;
            }

            if (
                estado.temporizador
            ) {
                clearTimeout(
                    estado.temporizador
                );
                estado.temporizador = null;
            }

            if (!estado.activo) {
                estado.tarjeta = null;
                estado.punteroId = null;
                return;
            }

            if (
                evento.pointerId !==
                estado.punteroId
            ) {
                return;
            }

            const tarjetaMovida =
                estado.tarjeta;

            const placeholder =
                estado.placeholder;

            if (
                placeholder &&
                placeholder.parentNode
            ) {
                placeholder.parentNode.insertBefore(
                    tarjetaMovida,
                    placeholder
                );
            }

            try {
                if (
                    tarjetaMovida.hasPointerCapture(
                        evento.pointerId
                    )
                ) {
                    tarjetaMovida.releasePointerCapture(
                        evento.pointerId
                    );
                }
            } catch (error) {
                // No hacemos nada.
            }

            if (placeholder) {
                placeholder.remove();
            }

            tarjetaMovida.classList.remove(
                "arrastrando"
            );

            tarjetaMovida.style.opacity = "";
            tarjetaMovida.style.cursor = "grab";
            tarjetaMovida.style.zIndex = "";
            tarjetaMovida.style.position = "";
            tarjetaMovida.style.left = "";
            tarjetaMovida.style.top = "";
            tarjetaMovida.style.width = "";
            tarjetaMovida.style.height = "";
            tarjetaMovida.style.pointerEvents = "";
            tarjetaMovida.style.transform = "";

            estado.tarjeta = null;
            estado.punteroId = null;
            estado.activo = false;
            estado.movido = false;
            estado.placeholder = null;

            const guardado =
                await guardarOrdenRutina();

            if (!guardado) {

                alert(
                    "No se ha podido guardar el nuevo orden."
                );

                await cargarEjerciciosRutina();
                return;
            }

            await cargarEjerciciosRutina();
        }
    );


    tarjeta.addEventListener(
        "pointercancel",
        function() {
            limpiarArrastreRutina();
        }
    );
}


// ============================================================
// CARGAR EJERCICIOS DE LA RUTINA
// ============================================================

async function cargarEjerciciosRutina() {

    if (!ejerciciosRutina) {
        return;
    }

    // Si había un arrastre en curso y recargamos la lista,
    // lo limpiamos primero.
    limpiarArrastreRutina();

    ejerciciosRutina.innerHTML =
        "Cargando ejercicios...";


    if (!rutinaActualId) {

        ejerciciosRutina.innerHTML =
            "No hay ninguna rutina seleccionada.";

        return;
    }


    const {
        data: ejercicios,
        error
    } =
        await supabaseClient
            .from("Rutina_Ejercicios")
            .select(
                "id, ejercicio_id, orden, series_objetivo, repeticiones_objetivo"
            )
            .eq(
                "rutina_id",
                rutinaActualId
            )
            .order(
                "orden",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Error cargando ejercicios de rutina:",
            error
        );

        ejerciciosRutina.innerHTML =
            "No se pudieron cargar los ejercicios.";

        return;
    }


    ejerciciosRutina.innerHTML =
        "";


    if (
        !ejercicios ||
        ejercicios.length === 0
    ) {

        ejerciciosRutina.textContent =
            "Esta rutina todavía no tiene ejercicios.";

        return;
    }


    ejercicios.forEach(
        function(ejercicioRutina) {

            const ejercicio =
                catalogoEjercicios.find(
                    function(item) {

                        return Number(
                            item.id
                        ) ===
                        Number(
                            ejercicioRutina.ejercicio_id
                        );
                    }
                );


            const tarjeta =
                document.createElement("div");

            tarjeta.className =
                "ejercicioRutina";

            tarjeta.style.marginBottom =
                "15px";

            tarjeta.dataset.id =
                ejercicioRutina.id;

            prepararArrastreRutina(
                tarjeta
            );


            // ----------------------------------------------------
            // NOMBRE
            // ----------------------------------------------------

            const nombre =
                document.createElement("h3");

            nombre.textContent =
                ejercicio
                    ? ejercicio.nombre
                    : "Ejercicio";

            tarjeta.appendChild(
                nombre
            );


            // ----------------------------------------------------
            // OBJETIVO
            // ----------------------------------------------------

            const objetivo =
                document.createElement("p");

            objetivo.textContent =
                ejercicioRutina.series_objetivo +
                " series × " +
                ejercicioRutina.repeticiones_objetivo +
                " repeticiones";

            tarjeta.appendChild(
                objetivo
            );


            // ----------------------------------------------------
            // EDITAR
            // ----------------------------------------------------

            const botonEditar =
                document.createElement("button");

            botonEditar.type =
                "button";

            botonEditar.textContent =
                "✏️ Editar";

            botonEditar.addEventListener(
                "click",
                async function() {

                    const nuevasSeries =
                        prompt(
                            "Número de series:",
                            ejercicioRutina.series_objetivo
                        );

                    if (
                        nuevasSeries === null
                    ) {
                        return;
                    }


                    const nuevasRepeticiones =
                        prompt(
                            "Número de repeticiones:",
                            ejercicioRutina.repeticiones_objetivo
                        );

                    if (
                        nuevasRepeticiones === null
                    ) {
                        return;
                    }


                    const series =
                        Number(nuevasSeries);

                    const repeticiones =
                        Number(nuevasRepeticiones);


                    if (
                        !Number.isInteger(series) ||
                        series <= 0 ||
                        !Number.isInteger(repeticiones) ||
                        repeticiones <= 0
                    ) {

                        alert(
                            "Introduce números válidos."
                        );

                        return;
                    }


                    const {
                        error: editarError
                    } =
                        await supabaseClient
                            .from("Rutina_Ejercicios")
                            .update({
                                series_objetivo:
                                    series,
                                repeticiones_objetivo:
                                    repeticiones
                            })
                            .eq(
                                "id",
                                ejercicioRutina.id
                            );


                    if (editarError) {

                        console.error(
                            "Error editando ejercicio:",
                            editarError
                        );

                        alert(
                            "No se ha podido modificar el ejercicio."
                        );

                        return;
                    }


                    await cargarEjerciciosRutina();
                }
            );

            tarjeta.appendChild(
                botonEditar
            );


            // ----------------------------------------------------
            // ELIMINAR
            // ----------------------------------------------------

            const botonEliminar =
                document.createElement("button");

            botonEliminar.type =
                "button";

            botonEliminar.textContent =
                "🗑️ Eliminar";

            botonEliminar.addEventListener(
                "click",
                async function() {

                    const confirmar =
                        confirm(
                            "¿Quieres eliminar este ejercicio de la rutina?"
                        );

                    if (!confirmar) {
                        return;
                    }


                    const {
                        error: eliminarError
                    } =
                        await supabaseClient
                            .from("Rutina_Ejercicios")
                            .delete()
                            .eq(
                                "id",
                                ejercicioRutina.id
                            );


                    if (eliminarError) {

                        console.error(
                            "Error eliminando ejercicio:",
                            eliminarError
                        );

                        alert(
                            "No se ha podido eliminar este ejercicio."
                        );

                        return;
                    }


                    await cargarEjerciciosRutina();
                }
            );

            tarjeta.appendChild(
                botonEliminar
            );


            ejerciciosRutina.appendChild(
                tarjeta
            );
        }
    );
}


// ============================================================
// VOLVER A LA LISTA DE RUTINAS
// ============================================================

volverRutinas.addEventListener(
    "click",
    function() {

        detalleRutina.style.display =
            "none";

        listaRutinas.style.display =
            "block";

        crearRutina.style.display =
            "block";
    }
);
// ============================================================
// CARGAR RUTINAS AL ENTRAR EN EL APARTADO
// ============================================================

navRutinas.addEventListener(
    "click",
    async function() {

        mostrarPantalla(
            pantallaRutinas
        );

        await cargarRutinas();
    }
);

