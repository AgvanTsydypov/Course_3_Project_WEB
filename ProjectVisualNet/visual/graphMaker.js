// function defaultDict(defaultValueFn) {
//     const handler = {
//         get: (obj, prop) => {
//             if(!(prop in obj)) obj[prop] = defaultValueFn();
//             return obj[prop];
//         },
//     };
//     return new Proxy({}, handler);
// }
// var nestedDefaultDict = () => defaultDict(nestedDefaultDict);
// this.graph = nestedDefaultDict();

class Pair{
    constructor(n1, n2){
        this.n1 = n1
        this.n2 = n2
    }
}

var maxCountOfNodes = 30

function checkEdges(){
    console.log("checkEdges")
    for(var i of edgesNames) {
        console.log(i.source.name + " " + i.target.name)
    }
    // console.log(edgesNames)
    console.log("checkEdges")
    console.log("checkNodes")
    for(var i of nodesNames) {
        console.log(i.name)
    }
    // console.log(nodesNames)
    console.log("checkNodes")
}

var bridges = Array(maxCountOfNodes)

function whiteEdges(){
    for(var i of edgesNames){
        i.data.color = 'white'
    }
}

var APs = Array(maxCountOfNodes)

function greenNodes(){
    for(var i of nodesNames){
        i.data.color = 'green'
    }
}

var mapArray = Array()
var mapArray2 = Array()
var openRange = false
var openRange2 = false

class GraphMaker {
    constructor(vertices){
        this.V= vertices
        this.graph = new Array(this.V)
        for(var i = 0; i < this.graph.length; i++)
            this.graph[i] = new Array(0)
        this.Time = 0
    }
    addEdge(u, v){
        console.log('u ' + u + ' - ' + this.graph[u] + ' + ' + v)
        // console.log(v + ' ' + this.graph[v])
        // if(this.graph[u] == undefined)
        //     this.graph[u] = Array(0)
        // if(this.graph[v] == undefined)
        //     this.graph[v] = Array(0)
        this.graph[u].push(v)
        console.log('v ' + v + ' - ' + this.graph[v] + ' + ' + u)
        this.graph[v].push(u)
    }
    bridgeUtil(u, visited, parent, low, disc){
        visited[u] = true
        disc[u] = this.Time
        low[u] = this.Time
        this.Time += 1
        for(const v of this.graph[u]){
            if (visited[v] == false){
                mapArray2.push(new Pair(u, v))
                parent[v] = u
                this.bridgeUtil(v, visited, parent, low, disc)
                low[u] = Math.min(low[u], low[v])
                if (low[v] > disc[u]) {
                    bridges[u].push(v)
                }
            }
            else
                if (v != parent[u])
                    low[u] = Math.min(low[u], disc[v])
        }
    }
    APUtil(u, visited, ap, parent, low, disc){
        mapArray.push(u)
        var children = 0
        visited[u] = true
        disc[u] = this.Time
        low[u] = this.Time
        this.Time += 1
        for(const v of this.graph[u]){
            if(visited[v] == false) {
                parent[v] = u
                children += 1
                this.APUtil(v, visited, ap, parent, low, disc)
                low[u] = Math.min(low[u], low[v])
                if(parent[u] == -1 && children > 1)
                    ap[u] = true
                if(parent[u] != -1 && low[v] >= disc[u])
                    ap[u] = true
            }
            else
            if(v != parent[u]){
                low[u] = Math.min(low[u], disc[v])
            }
        }
    }
    AP(){
        const visited = Array(this.V).fill(false)
        const disc = Array(this.V).fill(Number.MAX_SAFE_INTEGER)
        const low = Array(this.V).fill(Number.MAX_SAFE_INTEGER)
        const parent = Array(this.V).fill(-1)
        const ap = Array(this.V).fill(false)
        for(var i = 0; i < this.V; i++){
            if(visited[i] == false)
                this.APUtil(i, visited, ap, parent, low, disc)
        }
        for(var i = 0; i < this.V; i++){
            if(ap[i] == true) {
                // console.log(i + ' AP')
                APs[i] = 1
            }
        }
    }
    bridge(){
        const visited = Array(this.V).fill(false)
        const disc = Array(this.V).fill(Number.MAX_SAFE_INTEGER)
        const low = Array(this.V).fill(Number.MAX_SAFE_INTEGER)
        const parent = Array(this.V).fill(-1)
        for(var i = 0; i < this.V; i++){
            if(visited[i] == false)
                this.bridgeUtil(i, visited, parent, low, disc)
        }
        // console.log("Bridge alg")
    }
}

function findBridges(){
    var divBlockMap2 = document.querySelector('#divBlockMap2')
    divBlockMap2.style.visibility = "visible"
    openRange2 = true
    mapArray2 = new Array()
    counter2 = 0


    for(var i = 0; i < bridges.length; i++)
        bridges[i] = new Array(0)
    whiteEdges()
    var g3 = new GraphMaker(nodesNames.size  + delCount)
    // checkEdges()
    console.log("findBridges")
    for(var i of edgesNames)
    {
        // console.log(i.source.name + " " + i.target.name)
        console.log(g3.graph)
        g3.addEdge(parseInt(i.source.name), parseInt(i.target.name))
    }
    g3.bridge()
    for(var i = 0; i < bridges.length; i++) {
        if(bridges[i].length != 0)
            for(var j of bridges[i]) {
                for (var e of edgesNames) {
                    if (i == parseInt(e.source.name) && j == parseInt(e.target.name) || j == parseInt(e.source.name) && i == parseInt(e.target.name)) {
                        // e.data({'color':'red'})
                        // console.log(e.source.name + " " + e.target.name + " find bridges")
                        e.data.color = 'red'
                    }
                }
            }
    }
    console.log(mapArray2)
}

var delCount = 0

function findAP(){
    var divBlockMap = document.querySelector('#divBlockMap')
    divBlockMap.style.visibility = "visible"
    mapArray = new Array()
    counter = 0
    openRange = true


    for(var i = 0; i < APs.length; i++)
        APs[i] = -1
    greenNodes()
    const g3 = new GraphMaker(nodesNames.size + delCount)
    // checkEdges()
    console.log("findAPs")
    for(var i of edgesNames)
    {
        // console.log(i.source.name + " " + i.target.name)
        try {
            g3.addEdge(parseInt(i.source.name), parseInt(i.target.name))
        }
        catch {
            g3.addEdge(parseInt(i.target.name), parseInt(i.source.name))
        }
    }
    g3.AP()
    for(var i = 0; i < APs.length; i++) {
        if(APs[i] != -1)
            for (var n of nodesNames){
                if(n.name == i)
                    n.data.color = 'red'
            }
    }
    // var rng = document.getElementById('r1')
    // rng.setAttribute('max', mapArray.length)
    // console.log('AP alg')
}

var sys = arbor.ParticleSystem()
sys.parameters({gravity:false})
sys.renderer = Renderer("#viewport")

var nodesNames = new Set()
var edgesNames = new Set()

var n1 = sys.addNode('0',{'color':'green','shape':'dot','label':'node_0'})
var n2 = sys.addNode('1',{'color':'green','shape':'dot','label':'node_1'})
var e1 = sys.addEdge(n1, n2)
nodesNames.add(n1)
nodesNames.add(n2)
edgesNames.add(e1)
e1.data.color = 'white'

var canvas = document.querySelector('canvas'),
    ctx    = canvas.getContext('2d');
fitToContainer(canvas);

function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function selectorOptAdd(link, input){
    var myselect = document.querySelector(link)
    var currentText = input
    var objOption = document.createElement("option")
    objOption.text = currentText
    objOption.value = currentText
    //myselect.add(objOption)
    myselect.options.add(objOption)
}

function createDot(){
    var divBlockMap = document.querySelector('#divBlockMap')
    divBlockMap.style.visibility = "hidden"
    counter = 0
    mapArray = new Array()
    openRange = false

    var divBlockMap2 = document.querySelector('#divBlockMap2')
    divBlockMap2.style.visibility = "hidden"
    counter2 = 0
    mapArray2 = new Array()
    openRange2 = false


    // var input = document.querySelector('#dotInput').value
    var input = 0;
    for(var i = 0; i < maxCountOfNodes; i++){
        if(sys.getNode(i) == undefined) {
            input = i
            break
        }
    }
    console.log(input + '_input')
    // if (isNaN(input)) {
    //     console.log('неправльный инпут')
    //     return
    // }
    // else
    //     console.log('парс прошел')
    if(sys.getNode(input) == undefined && input < maxCountOfNodes) {
        var n = sys.addNode(input, {'color': 'green', 'shape': 'dot', 'label': "node_" + input})
        nodesNames.add(n)
        selectorOptAdd('#select1dot', input)
        selectorOptAdd('#select2dot', input)
    }
    else {
        console.log('много точек > ' + maxCountOfNodes + ' или точка уже создана')
        alert('много точек > ' + maxCountOfNodes + ' или точка уже создана')
    }
}

function deleteDot() {
    var divBlockMap = document.querySelector('#divBlockMap')
    divBlockMap.style.visibility = "hidden"
    counter = 0
    mapArray = new Array()
    openRange = false

    var divBlockMap2 = document.querySelector('#divBlockMap2')
    divBlockMap2.style.visibility = "hidden"
    counter2 = 0
    mapArray2 = new Array()
    openRange2 = false


    var input = document.querySelector('#dotInput').value
    if (nodesNames.size == 2) {
        alert('Не удалить, если вершин 2')
        return
    }
    // checkEdges()
    // console.log("Deletion")
    if (sys.getNode(input) != undefined) {
        delCount += 1
        for(const i of nodesNames) {
            if(i.name == input) {
                var edges = sys.getEdgesFrom(i)
                for(var edge of edges)
                    if(edge.source.name == sys.getNode(input).name || edge.target.name == sys.getNode(input).name) {
                        // console.log(edge.source.name + ' ' + edge.target.name)
                        sys.pruneEdge(edge)
                        edgesNames.delete(edge)
                    }
                var edges = sys.getEdgesTo(i)
                for(var edge of edges)
                    if(edge.source.name == sys.getNode(input).name || edge.target.name == sys.getNode(input).name) {
                        // console.log(edge.source.name + ' ' + edge.target.name)
                        sys.pruneEdge(edge)
                        edgesNames.delete(edge)
                    }
                sys.pruneNode(i)
                nodesNames.delete(i)
            }
        }
        var selectobject1 = document.querySelector('#select1dot')
        for (var i=0; i<selectobject1.length; i++) {
            if (selectobject1.options[i].value == input)
                selectobject1.remove(i)
        }
        var selectobject2 = document.querySelector('#select2dot')
        for (var i=0; i<selectobject2.length; i++) {
            if (selectobject2.options[i].value == input)
                selectobject2.remove(i)
        }
    }
    else {
        alert('Такой вершины нет (node_' + input + ')')
    }
    console.log("ShowAfterDeletion")
    // checkEdges()
}

window.onload = function(){
    for(const i of nodesNames){
        selectorOptAdd('#select1dot', i.name)
        selectorOptAdd('#select2dot', i.name)
    }
    selectorOptAdd('#ownGraphSelect', 'firstGraph')
    selectorOptAdd('#ownGraphSelect', 'secondGraph')
}

function createEdge(){
    var divBlockMap = document.querySelector('#divBlockMap')
    divBlockMap.style.visibility = "hidden"
    counter = 0
    mapArray = new Array()
    openRange = false

    var divBlockMap2 = document.querySelector('#divBlockMap2')
    divBlockMap2.style.visibility = "hidden"
    counter2 = 0
    mapArray2 = new Array()
    openRange2 = false


    var input1 = document.querySelector('#select1dot').selectedIndex
    var input2 = document.querySelector('#select2dot').selectedIndex
    var options1 = document.querySelector('#select1dot').options
    var options2 = document.querySelector('#select2dot').options
    for(const i of edgesNames){
        if(i.source.name == options1[input1].text && i.target.name == options2[input2].text || i.source.name == options2[input2].text && i.target.name == options1[input1].text){
            console.log('ребро уже существует')
            alert('ребро уже существует')
            return
        }
    }
    var edge = sys.addEdge(options1[input1].text, options2[input2].text);
    edge.data.color = 'white'
    edgesNames.add(edge)
}

function deleteEdge(){
    var divBlockMap = document.querySelector('#divBlockMap')
    divBlockMap.style.visibility = "hidden"
    counter = 0
    mapArray = new Array()
    openRange = false

    var divBlockMap2 = document.querySelector('#divBlockMap2')
    divBlockMap2.style.visibility = "hidden"
    counter2 = 0
    mapArray2 = new Array()
    openRange2 = false


    var input1 = document.querySelector('#select1dot').selectedIndex
    var input2 = document.querySelector('#select2dot').selectedIndex
    var options1 = document.querySelector('#select1dot').options
    var options2 = document.querySelector('#select2dot').options
    for(const i of edgesNames){
        if(i.source.name == options1[input1].text && i.target.name == options2[input2].text || i.source.name == options2[input2].text && i.target.name == options1[input1].text){
            sys.pruneEdge(i)
            edgesNames.delete(i)
        }
    }
}

function generateGraph() {
    var divBlockMap = document.querySelector('#divBlockMap')
    divBlockMap.style.visibility = "hidden"
    counter = 0
    mapArray = new Array()
    openRange = false

    var divBlockMap2 = document.querySelector('#divBlockMap2')
    divBlockMap2.style.visibility = "hidden"
    counter2 = 0
    mapArray2 = new Array()
    openRange2 = false


    // var rng = document.getElementById('r1')
    // rng.value = 0
    var nodes = document.querySelector('#nInput').value
    var edges = document.querySelector('#eInput').value
    if(edges>(nodes*(nodes-1)/2)){
        alert('Слишком много ребер')
        return
    }
    if(parseInt(nodes) > maxCountOfNodes || parseInt(nodes) < 2 || nodes == '') {
        alert('Слишком много вершин > ' + maxCountOfNodes + ", или их слишком мало < 2, или задано пустое значение")
        return
    }
    if(edges < 0) {
        alert('Отрицательное количество ребер')
        return
    }
    // edgesNames.forEach(function deletion(value1,value2,edgesNames)
    // {
    //     sys.pruneEdge(value1)
    //     edgesNames.delete(value1);
    // })
    for(var i of edgesNames){
        sys.pruneEdge(i)
        edgesNames.delete(i)
    }
    for(var j of nodesNames)
    {
        sys.pruneNode(j)
        nodesNames.delete(j)
        var selectobject1 = document.querySelector('#select1dot')
        for (var i=0; i<selectobject1.length; i++) {
            selectobject1.remove(i)
        }
        var selectobject2 = document.querySelector('#select2dot')
        for (var i=0; i<selectobject2.length; i++) {
            selectobject2.remove(i)
        }
    }
    // nodesNames.forEach(function deletion(value1,value2,nodesNames)
    // {
    //     sys.pruneNode(value1)
    //     nodesNames.delete(value1);
    //     var selectobject1 = document.querySelector('#select1dot')
    //     for (var i=0; i<selectobject1.length; i++) {
    //         selectobject1.remove(i)
    //     }
    //     var selectobject2 = document.querySelector('#select2dot')
    //     for (var i=0; i<selectobject2.length; i++) {
    //         selectobject2.remove(i)
    //     }
    // })
    for(var i=0; i<nodes; i++){
        selectorOptAdd('#select1dot', i)
        selectorOptAdd('#select2dot', i)
        var n = sys.addNode(i, {'color': 'green', 'shape': 'dot', 'label': 'node_' + i})
        nodesNames.add(n)
    }
    var k = 0
    while(k < edges){
        var a = Math.floor(Math.random() * nodes)
        var b = Math.floor(Math.random() * nodes)
        if((a!=b)&&((sys.getEdges(a, b).length==0)&&(sys.getEdges(b, a).length==0))){
            var n = sys.addEdge(a, b)
            n.data.color = 'white'
            edgesNames.add(n)
            k++;
        }
    }
}

var counter = 0

var keyHelp = true

function showSolveMap(a){
    var excCounter = 0
    if(openRange == false)
        return

    if(keyHelp == true)
    {
        alert('Обрати внимание, что алгоритм начинает работу с вершины "Node_0"')
        keyHelp = false
    }

    // var rng = document.getElementById('r1')
    // rng.setAttribute('max', mapArray.length)

    if(a == 1) {
        if(counter >= mapArray.length - delCount) {
            // sys.getNode(mapArray[it - 1]).data.color = 'green'
            // greenNodes()
            // for(var i = 0; i < APs.length; i++) {
            //     if(APs[i] != -1)
            //         for (var n of nodesNames){
            //             if(n.name == i)
            //                 n.data.color = 'red'
            //         }
            // }
            counter = mapArray.length - delCount
            return
        }
        // sys.getNode(mapArray[it - 1]).data.color = 'green'
        try {
            if (sys.getNode(mapArray[counter]).data.color == 'red')
                sys.getNode(mapArray[counter]).data.color = 'orange'
            else
                sys.getNode(mapArray[counter]).data.color = 'blue'
            counter += a
            document.getElementById('showIt').innerHTML = counter + '/' + (mapArray.length - delCount)
        } catch{
            excCounter += 1
            counter += a
            document.getElementById('showIt').innerHTML = (counter - excCounter) + '/' + (mapArray.length - delCount)
        }
    }
    if(a == -1) {
        counter -= 1
        if(counter <= 0) {
            // sys.getNode(mapArray[it - 1]).data.color = 'green'
            // findAP()
            greenNodes()
            for(var i = 0; i < APs.length; i++) {
                if(APs[i] != -1)
                    for (var n of nodesNames){
                        if(n.name == i)
                            n.data.color = 'red'
                    }
            }
            counter = 0
            return
        }
        // sys.getNode(mapArray[it - 1]).data.color = 'green'
        try {
            if (sys.getNode(mapArray[counter]).data.color == 'orange')
                sys.getNode(mapArray[counter]).data.color = 'red'
            else
                sys.getNode(mapArray[counter]).data.color = 'green'
            document.getElementById('showIt').innerHTML = counter + '/' + (mapArray.length - delCount)
        } catch{
            document.getElementById('showIt').innerHTML = (counter - excCounter) + '/' + (mapArray.length - delCount)
        }
    }
    if(counter < 0)
        counter = 0
    if(counter > mapArray.length)
        counter = mapArray.length - delCount
}

var counter2 = 0

function getEdge(n1, n2){
    for(var edge of sys.getEdgesFrom(n1)){
        if(edge.source.name == n1 && edge.target.name == n2 || edge.source.name == n2 && edge.target.name == n1){
            console.log(edge)
            return edge
        }
    }
    for(var edge of sys.getEdgesTo(n1)){
        if(edge.source.name == n1 && edge.target.name == n2 || edge.source.name == n2 && edge.target.name == n1){
            console.log(edge)
            return edge
        }
    }
}

function showSolveMap2(a){
    if(openRange2 == false)
        return

    console.log("openRange2")

    if(keyHelp == true)
    {
        alert('Обрати внимание, что алгоритм начинает работу с вершины "Node_0"')
        keyHelp = false
    }

    if(a == 1) {
        if(counter2 >= mapArray2.length) {
            counter2 = mapArray2.length
            return
        }
        console.log(mapArray2[counter2].n1 + ' ' + mapArray2[counter2].n2)
        if ((getEdge(mapArray2[counter2].n1, mapArray2[counter2].n2)).data.color == 'red')
            getEdge(mapArray2[counter2].n1, mapArray2[counter2].n2).data.color = 'orange'
        else
            getEdge(mapArray2[counter2].n1, mapArray2[counter2].n2).data.color = 'blue'
        counter2 += a
        document.getElementById('showIt2').innerHTML = counter2 + '/' + (mapArray2.length)
    }
    if(a == -1) {
        counter2 -= 1
        if(counter2 <= 0) {
            whiteEdges()
            for(var i = 0; i < bridges.length; i++) {
                if(bridges[i].length != 0)
                    for(var j of bridges[i]) {
                        for (var e of edgesNames) {
                            if (i == parseInt(e.source.name) && j == parseInt(e.target.name) || j == parseInt(e.source.name) && i == parseInt(e.target.name)) {
                                e.data.color = 'red'
                            }
                        }
                    }
            }
            counter2 = 0
            return
        }
        console.log(2222)
        if (getEdge(mapArray2[counter2].n1, mapArray2[counter2].n2).data.color == 'orange')
            getEdge(mapArray2[counter2].n1, mapArray2[counter2].n2).data.color = 'red'
        else
            getEdge(mapArray2[counter2].n1, mapArray2[counter2].n2).data.color = 'white'
        document.getElementById('showIt2').innerHTML = counter2 + '/' + (mapArray2.length)
    }
    if(counter2 < 0)
        counter2 = 0
    if(counter2 > mapArray2.length)
        counter2 = mapArray2.length
}


function generateFirstGraph(){
    var n1 = sys.addNode('0',{'color':'green','shape':'dot','label':'node_0'})
    var n2 = sys.addNode('1',{'color':'green','shape':'dot','label':'node_1'})
    var n3 = sys.addNode('2',{'color':'green','shape':'dot','label':'node_2'})
    var n4 = sys.addNode('3',{'color':'green','shape':'dot','label':'node_3'})
    var n5 = sys.addNode('4',{'color':'green','shape':'dot','label':'node_4'})
    var n6 = sys.addNode('5',{'color':'green','shape':'dot','label':'node_5'})
    var e1 = sys.addEdge(n1, n2)
    var e2 = sys.addEdge(n2, n3)
    var e3 = sys.addEdge(n2, n4)
    var e4 = sys.addEdge(n4, n5)
    var e5 = sys.addEdge(n4, n6)
    nodesNames.add(n1)
    nodesNames.add(n2)
    nodesNames.add(n3)
    nodesNames.add(n4)
    nodesNames.add(n5)
    nodesNames.add(n6)
    for(const i of nodesNames){
        selectorOptAdd('#select1dot', i.name)
        selectorOptAdd('#select2dot', i.name)
    }
    edgesNames.add(e1)
    edgesNames.add(e2)
    edgesNames.add(e3)
    edgesNames.add(e4)
    edgesNames.add(e5)
}

function generateSecondGraph(){
    var n1 = sys.addNode('0',{'color':'green','shape':'dot','label':'node_0'})
    var n2 = sys.addNode('1',{'color':'green','shape':'dot','label':'node_1'})
    var n3 = sys.addNode('2',{'color':'green','shape':'dot','label':'node_2'})
    var n4 = sys.addNode('3',{'color':'green','shape':'dot','label':'node_3'})
    var n5 = sys.addNode('4',{'color':'green','shape':'dot','label':'node_4'})
    var n6 = sys.addNode('5',{'color':'green','shape':'dot','label':'node_5'})
    var e1 = sys.addEdge(n1, n2)
    var e2 = sys.addEdge(n2, n3)
    var e3 = sys.addEdge(n4, n1)
    var e4 = sys.addEdge(n5, n2)
    var e5 = sys.addEdge(n6, n3)
    var e6 = sys.addEdge(n3, n1)
    nodesNames.add(n1)
    nodesNames.add(n2)
    nodesNames.add(n3)
    nodesNames.add(n4)
    nodesNames.add(n5)
    nodesNames.add(n6)
    for(const i of nodesNames){
        selectorOptAdd('#select1dot', i.name)
        selectorOptAdd('#select2dot', i.name)
    }
    edgesNames.add(e1)
    edgesNames.add(e2)
    edgesNames.add(e3)
    edgesNames.add(e4)
    edgesNames.add(e5)
    edgesNames.add(e6)
}

function generateOwn(){
    for(var i of edgesNames){
        sys.pruneEdge(i)
        edgesNames.delete(i)
    }
    for(var j of nodesNames)
    {
        sys.pruneNode(j)
        nodesNames.delete(j)
        var selectobject1 = document.querySelector('#select1dot')
        for (var i=0; i<selectobject1.length; i++) {
            selectobject1.remove(i)
        }
        var selectobject2 = document.querySelector('#select2dot')
        for (var i=0; i<selectobject2.length; i++) {
            selectobject2.remove(i)
        }
    }

    var divBlockMap = document.querySelector('#divBlockMap')
    divBlockMap.style.visibility = "hidden"
    counter = 0
    mapArray = new Array()
    openRange = false

    var divBlockMap2 = document.querySelector('#divBlockMap2')
    divBlockMap2.style.visibility = "hidden"
    counter2 = 0
    mapArray2 = new Array()
    openRange2 = false

    var input1 = document.querySelector('#ownGraphSelect').selectedIndex
    var options1 = document.querySelector('#ownGraphSelect').options
    if(options1[input1].text == 'firstGraph')
        generateFirstGraph()
    if(options1[input1].text == 'secondGraph')
        generateSecondGraph()
}