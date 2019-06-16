let options = document.querySelectorAll('.option'),
  animation = document.querySelector('.animation'),
     object = document.querySelector('#kolko_kwadrat'),
  hamburger = document.querySelector('#hamburger_menu'),
     drawer = document.querySelector('#drawer'),
     close  = document.querySelector('#close'),
       main = document.querySelector('main');



animation.addEventListener('click', function(){
    object.classList.add("clicked");
    setTimeout(function(){
    object.classList.remove("clicked");
    }, 2000);
});

options.forEach(function(option){
    option.addEventListener('click', function(){
      options.forEach(function(o){
            o.classList.remove("visited");
          });
      option.classList.toggle("visited");
    });
});

hamburger.addEventListener('click', function(e) {
      drawer.classList.toggle('open');
      e.stopPropagation();
    });

main.addEventListener('click', function() {
      drawer.classList.remove('open');
    });

close.addEventListener('click', function() {
      drawer.classList.remove('open');
    });
