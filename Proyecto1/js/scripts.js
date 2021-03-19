let carrito = [];
if (localStorage.getItem("carrito") != null) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  document.getElementById("contador").innerHTML = carrito.length;
  $("#total").css("display", "inline");
  llenarCarrito();
} 

let total = 0;
let bbdd = [];
class Item {
  constructor(id, marca, modelo, stock, oferta, precio, img) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.stock = stock;
    this.oferta = oferta;
    this.precio = precio;
    this.img = img;
  }
}



let prod1 = new Item(2, "Topper", "tigger", 1, true, 510, "../Proyecto1/assets/img/zapa1.png ");
let prod2 = new Item(1, "Adidas", "Stabil", 3, false, 7500, "../Proyecto1/assets/img/zapa.png" );
let prod3 = new Item(3, "Nike", "Shox", 2, false, 6200, "../Proyecto1/assets/img/zapa2.png" );
let prod4 = new Item(4, "havaianas", "Ojotinhas", 12, true, 3300,"../Proyecto1/assets/img/zapa3.png" );
let prod5 = new Item(6, "Jagguar", "lona", 50, true, 5120, "../Proyecto1/assets/img/zapa4.png" );
let prod6 = new Item(7, "Vans", "sk8", 65, false, 1510, "../Proyecto1/assets/img/zapa5.png" );
let prod7 = new Item(8, "Nike", "Runner", 34, false, 5510, "../Proyecto1/assets/img/zapa6.png" );
let prod8 = new Item(17, "Adidas", "classic", 52, false, 7510, "../Proyecto1/assets/img/zapa7.png" );
let prod9 = new Item(16, "Topper", "traper", 25, true, 5210, "../Proyecto1/assets/img/zapa8.png" );
let prod10 = new Item(14, "All Stars", "jason", 2, false, 3900, "../Proyecto1/assets/img/zapa1.png" );
let prod11 = new Item(12, "Crocs", "Chanclas", 12, true, 1510, "../Proyecto1/assets/img/zapa1.png" );

bbdd.push(prod1);
bbdd.push(prod2);
bbdd.push(prod3);
bbdd.push(prod4);
bbdd.push(prod5);
bbdd.push(prod6);
bbdd.push(prod7);
bbdd.push(prod8);
bbdd.push(prod9);
bbdd.push(prod10);
bbdd.push(prod11);

/* 
$.get(
  "/articulos.json",
  function(valores,estado){
    console.log(valores);
    console.log(estado);
  }
) */

//Cargar Ofertas

let aux = ``;
for (let i = 0; i < bbdd.length; i++) {
  if (bbdd[i].stock > 0 && bbdd[i].oferta == true) {
    aux += `
       <div class="card">
        <img src="${bbdd[i].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">${bbdd[i].marca}</h4>
          <h8 class="card-title">${bbdd[i].modelo}</h8>
          <h3 class="card-title">$${bbdd[i].precio}</h3>
          <button class="btn btn-primary" style="width:100%" 
          onclick='agregarAlCarrito(${JSON.stringify(bbdd[i])})'>Comprar</button>
         
          </div>
      </div>
           `;
  }
}
document.getElementById("ofertas").innerHTML = aux;


//Cargar productos al index

let auxProductos = ``;
for (let i = 0; i < bbdd.length; i++) {
  if (bbdd[i].stock > 0) {
    auxProductos += `
       <div class="col-4">
       <a href="#" data-toggle="modal" data-target="#modalProducto" class="imgProd"  onclick='verProducto(${JSON.stringify(bbdd[i])})'><img src="${bbdd[i].img}" class="card-img-top " alt="..." ></a>
        
        <div class="card-body">
          <h4 class="card-title">${bbdd[i].marca}</h4>
          <h8 class="card-title">${bbdd[i].modelo}</h8>
          <h3 class="card-title">$${bbdd[i].precio}</h3>
          <button class="btn btn-primary" style="width:100%" 
          onclick='agregarAlCarrito(${JSON.stringify(bbdd[i])})'>Comprar</button>
          </div>
      </div>
           `;
  }
}
document.getElementById("productos").innerHTML = auxProductos;

//***Agregar al carrito****/
function agregarAlCarrito(Item) {
  carrito.push(Item);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  $("#total").css("display", "inline");
  llenarCarrito();
}

function llenarCarrito(){ //armé esta función porque vi que iba a ser necesaria usarla en un par de lugares...y para eso están las funciones, no? =P jajaja
  let aux = 0;
  let itemCarrito = ``;
  for (let i = 0; i < carrito.length; i++) {
    aux += carrito[i].precio;
  
  if (carrito.length > 1 || localStorage.length!= null) {
      itemCarrito += `   
      <button type="button" class="close" data-dismiss="modal" onclick="borrarItem(Item)" aria-label="Close"><span aria-hidden="true">&times;</span></button>    
      <div class="dropdown-item">  
        <h5 >${carrito[i].marca}</h5>
        <p>${carrito[i].modelo}</p>
        <h6>$${carrito[i].precio}</h6>  
        <hr>
      </div>
    `
      document.getElementById("contador").innerHTML = carrito.length;
      document.getElementById("carrito").innerHTML = itemCarrito;
      $("#montoTotal").html("$"+aux);
      $("#finalizar").css("display","inline");
    }
    else if(carrito.length==0){
      $("#total").css("display", "none");
    }
    else{
      $("#total").css("display", "inline");
    }
  }
}

function verProducto(item){
  
  aux= `
  
  
<section class="container" >
  <div class="row">
    <div class="col-8">
    <img src="${item.img}" alt="" class="col">
    </div>
      <div class="col-4">
        <h1>${item.marca}</h1>
        <h6>${item.modelo}</h6>
        <h6>$${item.precio}</h6>
        <button class="btn btn-primary btn-sm" style="width:100%"  onclick='agregarAlCarrito(${JSON.stringify(item)})'>Comprar</button>
      </div>
    </div>
  </div>
    <br>
    </div>
</section>
 
  `
  $("#verProducto").html(aux);
}



function borrarItem(Item){ //Choreadisimo del código de la clase
  const nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (i != 1) {
      nuevoCarrito.push(carrito[i]);
    }

  }
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  document.getElementById("contador").innerHTML = carrito.length;
  llenarCarrito();
}

$( ".imgProd" )
  .mouseover(function() {
    $(this).css("filter","grayscale(100%)");
  })
  .mouseout(function() {
    $(this).css("filter","grayscale(0%)");
  });
function comprar(){
  alert("hola!")
}

function buscar(){
      var inputBusqueda = $(busqueda).val().toLowerCase();
      let auxBusqueda = ``;
      var contador=0;
      for(i=0;i<bbdd.length;i++){
        if(bbdd[i].marca.toLowerCase() == inputBusqueda || bbdd[i].modelo == busqueda ){
          auxBusqueda+= `
          <section class="container" >
            <div class="row">
              <div class="col-8">
              <img src="${bbdd[i].img}" alt="" class="col">
              </div>
                <div class="col-4">
                  <h1>${bbdd[i].marca}</h1>
                  <h6>${bbdd[i].modelo}</h6>
                  <h6>$${bbdd[i].precio}</h6>
                  <button class="btn btn-primary btn-sm" style="width:100%"  onclick='agregarAlCarrito(${JSON.stringify(bbdd[i])})'>Comprar</button>
                </div>
              </div>
            </div>
              <br>
              </div>
          </section>
           
            `
          console.log(bbdd[i].marca);
          contador++;
        }
        }
        if(contador==0 && inputBusqueda!=""){
          auxBusqueda+= `<h3>No se han encontrado articulos</h3>`
        }
        $("#verBusqueda").html(auxBusqueda);
      }

// ***************************************************************************************************************************************************************************

(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function () {
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery); // End of use strict
