/*declaracion de variables*/
let data=[]
const getData= async ()=>{
await fetch('./assets/files/data.json')
.then(res=> res.json())
     .then(res=> {
   data=res.events
     });
loadInformation(data)

}
const loadInformation=(data)=>{
    let inner=''
    // await getData()
    data.forEach(element => {    
    inner+= ` 
            <div class="col-sm-3">
                <div class="card d-flex flex-column align-items-center flex-wrap">
                    <img src="${element.image}" class=" picture-category " alt="...">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.description}</p>
                    </div>
                </div>
            </div>`
document.getElementById('cards').innerHTML=inner
});
}
getData()
/**se cambia la informacion de json respecto a las imagenes porque no estan en el servidor */

/**buscador */
let input=document.getElementById('input');
let inputSearch;
let glass=document.getElementById('glass')
input.addEventListener('input',(e)=>{
    inputSearch=e.target.value;
    console.log(inputSearch);
    if(inputSearch=="")loadInformation(data)
})
glass.addEventListener('click',()=>{
    // let dataFilter=lowerArray()
    let dataFilter= data.filter(element=> element.name.toLowerCase()==inputSearch.toLowerCase())
    loadInformation(dataFilter)
})

//carga de la pagina
document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("input").value=''
})