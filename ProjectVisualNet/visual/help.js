var modal = document.getElementById('myModal')
var btn = document.getElementById('myBtn')
var span = document.getElementsByClassName('close')[0]
var p = document.getElementById('p1')

btn.onclick = function(){
    modal.style.display = "block"
    document.querySelector('#p1').innerHTML = "Для построение графа используйте панель иснтрументов для построения графа, чтобы пройтись по шагам алгоритма, вам следует " +
        "решить алгоритм с помощью 2 кнопок Блока 'GraphSolver'" +
        ". Блок 'Node' нужен для построения/удаления вершины, блок 'Edge' нужен для построения/удаления ребра, блок 'GenGraph' нужен для построения произвольного графа" +
        " с заданными количествами вершин и ребер. "
    document.querySelector('#p1').innerHTML +=
    "При прохождении по алгоритму точек сочленения, пройденные точки окрашиваются в синий, если они не являются точками сочленения, в противном случае окрашиваются в желтый. " +
        "При прохождении по алгоритму нахождения мостов в графе, пройденные мосты окрашиваются в красный, если они являются мостами, в противном случае окрашиваются в синий. Если же он остается белым," +
        " то он не был посещен и не является мостом (не был посещен из-за того, что мост ведет в посещенную вершину)."
}
span.onclick = function(){
    modal.style.display = "none"
}
// p.onclick = function (){
//     modal.style.display = "none"
// }
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none"
    }
}

document.getElementById('myModal').onmouseover = function(event){
    var target = event.target
    if(target.className == 'close'){
        span.style.cursor = 'pointer'
    }
    // if(target.className == 'p1'){
    //     p.style.cursor = 'pointer'
    // }
    if(target.className != 'modal-content' && target.className == 'modal'){
        modal.style.cursor = 'pointer'
    }
    else{
        modal.style.cursor = 'default'
    }
}