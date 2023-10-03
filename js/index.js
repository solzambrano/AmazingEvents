/**se cambia la informacion de json respecto a las imagenes porque no estan en el servidor */
/*declaracion de variables*/
let data=[]
/**variables del buscador */
let input=document.getElementById('input');
let glass=document.getElementById('glass')
/**variables de categoria */
let category=document.getElementsByClassName('category')
let categorySelected;
/*declaracion de funciones*/
const getData= async ()=>{
    await fetch('/assets/files/data.json')
    .then(res=> res.json())
    .then(res=> {
        data=res.events
     });
    loadInformation(data)
}

const loadInformation=(data)=>{
    let inner=''
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
/**llamada de la funcion */
getData()


/**buscador */
const jsonFilter=(inputSearch,field)=>{
      return dataFilter= data.filter(element=> {
      return element[field].toLowerCase().includes(inputSearch.toLowerCase())   
        })
}
input.addEventListener('input',(e)=>{
    let inputSearch=e.target.value;
   loadInformation(jsonFilter(inputSearch,'name'))
    if(inputSearch=="")loadInformation(data)
})

/***categorias */
console.log(category);
for(element of category){
    element.addEventListener('click',(event)=>{
        categorySelected=event.currentTarget.name
         loadInformation(jsonFilter(categorySelected,'category'))
         if(event.currentTarget.checked==false) loadInformation(data)
        })
}

//carga de la pagina
document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("input").value=''
      for(element of category){
        element.checked=false
}
})
/* al agregar includes() en la funcion input, ya no es necesario hacer el click pero queda comentado, por si
se agregan mas objetos*/
// glass.addEventListener('click',()=>{
//     let dataFilter= data.include(element=> element.name.toLowerCase()==inputSearch.toLowerCase())
//     loadInformation(dataFilter)
// })
