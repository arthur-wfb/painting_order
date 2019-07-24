var picField = document.getElementById('rectangle');
var radios = document.orderForm.sizeRadios;
var defaultSizes = {
    A5Width: 20,
    A5Height: 15,

    A4Width: 30,
    A4Height: 21,

    A3Width: 40,
    A3Height: 30
  };
var pic = document.getElementById('image');
var x, y, dx, dy;
var clicked = false;
var scale = 1;

function changePicHeight() {
    var height = document.getElementById('pic-height').value * 10;
    picField.style.height = height+'px';
    changeHeightIfaceAttributes(height);
    calculatePrice();
}

function changePicWidth() {
    var width = document.getElementById('pic-width').value * 10;
    picField.style.width = width+'px';
    changeWidthtIfaceAttributes(width);
    calculatePrice();
}

function changeHeightIfaceAttributes(height){
    document.getElementById('resultHeight').innerHTML = height/10 + ' см';
    document.getElementById('height-iface').style.height = height - 20 + 'px';
    document.getElementById('width-iface').style.top = 260 + height/2 + 'px';
    document.getElementById('height-iface-value').innerHTML = height/10 + ' см';
}

function changeWidthtIfaceAttributes(width){
    document.getElementById('resultWidth').innerHTML = width/10 + ' см';
    document.getElementById('height-iface').style.left = 245 - width/2 + 'px';
    document.getElementById('width-iface').style.width = width - 20 + 'px';
    document.getElementById('width-iface-value').innerHTML = width/10 + ' см';
}

function setDefaultSize(){
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            switch(radios[i].id){
                case 'A5':
                        document.getElementById('pic-width').value = defaultSizes.A5Width;
                        document.getElementById('pic-height').value = defaultSizes.A5Height;
                        break;
                case 'A4':
                        document.getElementById('pic-width').value = defaultSizes.A4Width;
                        document.getElementById('pic-height').value = defaultSizes.A4Height;
                        break;
                case 'A3':
                        document.getElementById('pic-width').value = defaultSizes.A3Width;
                        document.getElementById('pic-height').value = defaultSizes.A3Height;
                        break;
            }
            changePicHeight();
            changePicWidth();
        }
    }
}

function flip() {
    var glass;
    glass = defaultSizes.A5Width;
    defaultSizes.A5Width = defaultSizes.A5Height;
    defaultSizes.A5Height = glass;

    glass = defaultSizes.A4Width;
    defaultSizes.A4Width = defaultSizes.A4Height;
    defaultSizes.A4Height = glass;

    glass = defaultSizes.A3Width;
    defaultSizes.A3Width = defaultSizes.A3Height;
    defaultSizes.A3Height = glass;

    setDefaultSize();
}

function uncheckRadios() {
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
}

function calculatePrice() {
    var width = document.getElementById('pic-width').value;
    var height = document.getElementById('pic-height').value;
    var price = width * height * 2.5;
    document.getElementById('price').innerHTML = price;
}

window.addEventListener('mousedown', function(e){
    clicked = true;
    x = e.clientX;
    y = e.clientY;
})

picField.addEventListener('mousemove', function(e) {
    if (clicked){
        dx = e.clientX - x;
        dy = e.clientY - y;
        pic.style.left = (+pic.style.left.substring(0, pic.style.left.length - 2) + dx) + 'px' ;
        pic.style.top = (+pic.style.top.substring(0, pic.style.top.length - 2) + dy) + 'px' ;
        x = e.clientX;
        y = e.clientY;
        console.log(e.clientX, dx);
    }
})

window.addEventListener('mouseup', function(e){
    if (clicked){
        clicked = false;
    }
})

picField.addEventListener('wheel', function(e){
    if (e.deltaY < 0) {
        scale += 0.2;
    } else 
    if (e.deltaY > 0) {
        scale -= 0.2;
    }
    pic.style.transform = 'scale(' + scale + ')';
})

var reader = new FileReader();
reader.onload = function(event) {
    var dataUri = event.target.result,
    img = document.getElementById("image");
    img.src = dataUri;
};
 
document.getElementById('photoFile').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (file.type.match('image.*')) {
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                var img = document.getElementById('image');
                img.src = e.target.result;
                img.style.display = 'block'; 
            };
        })(file);
        reader.readAsDataURL(file);
    } else {
    alert('Некорректный формат.')
    }
});