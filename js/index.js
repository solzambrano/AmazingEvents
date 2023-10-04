/**se cambia la informacion de json respecto a las imagenes porque no estan en el servidor */
/*declaracion de variables*/
let data=[]
/**variables del buscador */
let input=document.getElementById('input');
let glass=document.getElementById('glass')
/**variables de categoria */
let category=document.getElementsByClassName('category')
let categorySelected;
let page=window.location.pathname.split('/')
let actualPage=page[page.length-1]
let date=''

/*declaracion de funciones*/
/**funcion que carga la informacion del json */
const getData= async ()=>{
    await fetch('/assets/files/data.json')
    .then(res=> res.json())
    .then(res=> {
        data=res.events
     });
     console.log(actualPage);
      date=switchDate()
      loadInformation(data,date)
}
/**verifica la fecha para mostrar distintas paginas, home muestra todas las card */
const loadInformation=(data,date)=>{
    let filteredData;
    if(date!==''){
       filteredData=data.filter(element => { 
         return element.date.split("-")[0] == date
         })
         loadCard(filteredData)
    }else loadCard(data)

    }
/**funcion que toma la ultima parte de la url para poder saber el año y mostrar las distintas card en las paginas */
const switchDate=()=>{
  if (actualPage =='UpcomingEvents.html')return'2022'
    else if (actualPage == 'PastEvents.html') return'2021'
    else return''
}
/**aqui se carga la informacion de las card, si esta filtrada con fechas o va a home sin filtro */
const loadCard=(informationData)=>{
    let inner=''
    informationData.forEach(element=>{
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
/**realiza el filtrado para la barra de busqueda */
const jsonFilter=(inputSearch,field)=>{
      return dataFilter= data.filter(element=> {
      return element[field].toLowerCase().includes(inputSearch.toLowerCase())   
        })
}
/**listener que corresponde al input que ingresa el usuario */
input.addEventListener('input',(e)=>{
    let inputSearch=e.target.value;
    date=switchDate()
   loadInformation(jsonFilter(inputSearch,'name'),date)
    if(inputSearch=="")loadInformation(data,date)
})

/***categorias */
/**listener que corresponde al check de las categorias */
for(element of category){
    date=switchDate()
    element.addEventListener('click',(event)=>{
        categorySelected=event.currentTarget.name
         loadInformation(jsonFilter(categorySelected,'category'),date)
         if(event.currentTarget.checked==false) loadInformation(data,date)
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
