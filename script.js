//formulario cliente
function cargaSendMail() {
  $("#c_enviar").attr("disabled", true);
  $(".c_error").remove();
  var filter = /^[A-Za-z][A-Za-z0-9_.-]*@[A-Za-z0-9_]+.[A-Za-z0-9_.]+[A-za-z]$/;
  var s_name = $('#c_nombre').val();
  var s_email = $('#c_email').val();
  if (filter.test(s_email)) {
      sendMail = "true";
  } else {
      $('#email-box').after("<span class='c_error' id='c_error_mail'>Ingrese e-mail valido.</span>");
      $('#c_email').css("border-bottom", "1px solid #bd2130");
      sendMail = "false";
  }
  if (s_name.length == 0) {
      $('#nombre-box').after("<span class='c_error' id='c_error_name'>Ingrese su nombre.</span>");
      $('#c_nombre').css("border-bottom", "1px solid #bd2130");
      var sendMail = "false";
  }
  if (s_email.length == 0) {
      $('#email-box').after("<span class='c_error' id='c_error_msg'>Ingrese un email. </span>");
      $('#c_email').css("border-bottom", "1px solid #bd2130");
      var sendMail = "false";
  }
  if (sendMail == "true") {
      var datos = {
          "nombre": $('#c_nombre').val(),
          "email": $('#c_email').val(),
          "telefono": $('#c_telefono').val(),
          "consulta": $('#c_consulta').val(),
      };
      $.ajax({
          data: datos,
          // hacemos referencia al archivo contacto.php
          url: 'contacto-datos.php',
          type: 'post',
          beforeSend: function() {
              $("#c_enviar").html("ENVIANDO");
          },
          complete: function() {
              $("#c_enviar").removeAttr("disabled").html("ENVIAR");
          },
          success:  function (response) {
            $('form')[0].reset();
            $('#c_email').css("border-bottom", "1px solid #fff");
            $('#c_nombre').css("border-bottom", "1px solid #fff");
            $("#c_information p").html('Gracias por enviarnos tu consulta, nos contactaremos a la brevedad.');
            $("#c_information").fadeIn('slow');
          },
          error: function() {
              $("#c_information p").html("<span class='c_error'>Ha ocurrido un error al enviar el formulario, por favor reintente a la brevedad. </span>");
          }
      });
  } else {
      $("#c_enviar").removeAttr("disabled");
  }
}



//Smooth scroll
function smoothScroll() {
    $('.scrollTo').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
        return false;
    });
}

function toggleMenuElements() {
  $('header .menu').toggle();
  $('.navbar-toggler').toggleClass('menu-animation');
  $('body').toggleClass('fixed-body');
}

//Despliega el menú mobile
function mobileMenu() {
  $('.navbar-toggler').click(function(){
    toggleMenuElements();
  });
}

//Cierra el menu en el click del boton en mobile
function closeMenuOnAnchor() {
  if ($(window).width() < 992){
    $('header nav li a').each(function() {
      $(this).click(function(){
        toggleMenuElements();
      });
    });
  }
}

//Funciones que se llaman en el document ready
$(document).ready(function() {
    smoothScroll();
    mobileMenu();
    closeMenuOnAnchor();
});

//Funciones que se llaman en el windows resize
$(window).on('resize', function(){
  closeMenuOnAnchor();
});

