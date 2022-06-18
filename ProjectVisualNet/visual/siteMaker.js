var slideIndex = 1
showSlides(slideIndex)

function plusSlides(n){
    showSlides(slideIndex += n)
}

function currentSlide(n){
    showSlides(slideIndex = n)
}

function showSlides(n){
    var i
    var slides = document.getElementsByClassName("mySlides")
    var dots = document.getElementsByClassName("dot")

    if(n > slides.length){
        slideIndex = 1
    }
    if(n < 1){
        slideIndex=slides.length
    }
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = "none"
    }
    for (i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace("active", "")
    }
    slides[slideIndex - 1].style.display = "block"
    dots[slideIndex - 1].className += " active"
}

// function drawPoint(){
//     var canvas = document.querySelector('.canvas')
//     canvas.insertAdjacentHTML(
//         'beforeend',
//         `<div class="point"></div>`
//     )
// }
//
// function drawEdge(){
//     var canvas = document.querySelector('.canvas')
//     canvas.insertAdjacentHTML(
//         'beforeend',
//         `<div class="edge"></div>`
//     )
// }

// document.querySelector('.canvas').onmouseover = function (event){
//     var target = event.target
//     if(target.className == 'point' || target.className == 'edge'){
//         document.addEventListener('keyup', function (eve){
//             if(eve.key == 'Delete'){
//                 target.remove()
//             }
//         })
//     }
// }