$(document).ready(function(){
    $('.selectors ul').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(e.srcElement.getAttribute("class"));
        var addIt = e.srcElement.getAttribute("class");
        switch(addIt){
            case "videoBtn":
            addIn("VIDEO")
            builder('.video_module')
            break;
            case "chatBtn":
            addIn("CHAT")
            builder('.datas_module')
            break;
            case "minigameBtn":
            addIn("MINIGAME")
            break;
            case "downloadBtn":
                wsCreate()
            break;
        }
    })
})

function addIn(a){
    if(document.querySelector('.'+a) !== null){
        document.querySelector('#show .'+a).remove();
    }else{
    var item = document.createElement('li');
    item.innerText = a;
    item.classList.add(a);
    document.querySelector('#show').appendChild(item);
    }
}
function builder(item){
    var extant = document.querySelector(`.is_main ${item}`);
    if(extant !== null){
        document.querySelector(`.is_main ${item}`).remove();
    }else{
        var copied = document.querySelector(item).cloneNode(true)
        document.querySelector('.is_main').appendChild(copied);
    }
}
function wsCreate(){
let main = document.querySelector('.is_main').innerHTML
    let owner = prompt('what is your name?', '')
    let finale = new WebSocket(`ws://127.0.0.1:3002/?channelName=${owner}`)
    finale.onopen = function () {
        finale.send(main)
    }
    finale.onmessage = function (data) {
    console.log(data)
    console.log(data.data)
        if (data.data) {
            let fileBlob = new Blob([data.data], {type: 'application/*'})
            let fileUrl = window.URL.createObjectURL(fileBlob)
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style.display = 'none'
            a.href = fileUrl
            a.download = owner + '.zip'
            a.click()
            window.URL.revokeObjectURL(fileUrl)
        }
    }
}