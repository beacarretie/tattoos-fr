# Studio Tattoos Frontend database

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#tecnologías">Tecnologías</a></li>
    
  </ol>
</details>

## Objetivo
En esta ocasión se nos requiere generar una parte frontal que conecte con nuestra API encargada de gestionar el modelo de negocio de un estudio de tatuajes. Para ello, generaremos las vistas necesarias para poder registrarnos y
logearnos como usuarios, ver nuestro perfil de usuario con datos editables y una vista en la cual podremos ver nuestro historial de citas. Se valorará muy positivamente la posibilidad de realizar una búsqueda o filtrado de citas.

Además de ello tendremos que generar una vista capaz de permitirnos agendar una nueva cita.

No debemos olvidar que los tatuadores podrán acceder como profesionales y ello les permitirá ver qué citas tienen en adelante junto con los datos personales o historiales de los clientes con los que trabajen.

Por último, debemos tener una vista de administrador desde la que se tendrá acceso a todos los usuarios y citas disponibles en la aplicación, que además permitirá la edición y borrado de éstos.

En definitiva, tendremos que ser capaces de crear una parte frontal de la app lo suficientemente versátil como para que clientes, profesionales y un administrador puedan acceder a ella y contemplen la información que proceda en cada caso. zona de usuario con sus datos personales, que solo podrá ver él mismo.

## Sobre el proyecto
Teniendo en cuenta los requisitos, podemos asesorar al respecto de las vistas
necesarias para el correcto funcionamiento de la aplicación:

1. Los servicios de registro necesarios.
2. Los servicios de login necesarios.
3. Las vistas de perfil necesarias.
4.  Vista de citas que tengo como usuario (solo las propias).
5.  Panel de búsqueda / creación / modificación de citas.
6.  Vista de todos los usuarios y citas existentes en la plataforma (como
administrador).

Extras:
- Ver una cita en detalle.
- Elegir tatuador al crear la cita.
- Seleccionar tipos de tattoo en las citas.
- Búsqueda dinámica de citas.
- Editar y borrar datos ajenos (como administrador).

## Tecnologías

Para el desarrollo de esta parte frontal usaremos ReactJs instalado mediante
Vite, junto con componentes funcionales, asumiendo buenas prácticas en la medida
de lo posible (max 400 líneas por componente y 75 por función).
Por supuesto será obligatorio valernos de las nomenclaturas de ES6 en
adelante, el dominio sobre las promesas, hooks, props, así como la funcionalidad de
async/await.
La realización del proyecto será llevada a cabo de forma individual.
El proyecto se subirá a un repositorio público de GitHub y se valorará la
existencia de ramas o trabajo en features (Git Flow), así como diversos commits con
la evolución del proyecto.

</details>