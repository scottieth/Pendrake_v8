
function service_selector1(){
  $('#content3container').fadeOut('slow', function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
      if (xhr.status ===200){
        document.getElementById('content3container').innerHTML = xhr.responseText;
      }
    };
    xhr.open('GET','data/website-creation-content.html',true)
    xhr.send(null);
    $('#content3container').fadeIn('slow')
  })
}


$('#sbox1').on('click', function(){
  service_selector1();
});
