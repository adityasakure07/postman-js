console.log("post master");


//Function for creating element
function getElementString(string){
    let div = document.createElement('div');
    div.innerHTML = string;

    //creating div and adding string inside div to make it dom element
    return div.firstElementChild; 
    //returning the first child, which would be <div class="form-row my-2"> and all ele
}

// Initialize no of parameters
let addedParamCount = 1;

let parameterBox = document.getElementById("parametersBox");
//hiding param box initiallu
parameterBox.style.display = "none";

let jsonRadio = document.getElementById("jsonRadio");
let paramsRedio = document.getElementById("paramsRadio");

jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

paramsRedio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "block";
  document.getElementById("requestJsonBox").style.display = "none";
});

let addParam = document.getElementById("addParam");

addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="row my-2">
  <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount+1}</label>
  <div class="col-md-4">
    <input
      type="text"
      class="form-control"
      id="parameterKey${addedParamCount+1}"
      aria-label="Enter Parameter ${addedParamCount+1} Key"
    />
  </div>
  <div class="col-md-4">
    <input
      type="text"
      class="form-control"
      id="parameterValue${addedParamCount+1}"
      aria-label="Enter Parameter ${addedParamCount+1} Key"
    />
  </div>
  <button  class="btn btn-primary col-sm-1 deleteParam">-</button>
</div>`;
     //we can not add id 
    // coverting the element to dom node

    let paramElement = getElementString(string);
    // console.log(paramElement)
    params.appendChild(paramElement);


    let deleteParam = document.getElementsByClassName('deleteParam')
    // console.log(deleteParam);

    // Array.from(deleteParam).forEach(element => {
    //    console.log(element) ;
    // });

    for ( item of deleteParam){
        console.log(item);
        item.addEventListener('click',(e)=>{
            // e.target - where its clicked  that is the target
            e.target.parentElement.remove();
           
        })
    }
  
    addedParamCount++;
});


let submit  = document.getElementById('submit');

submit.addEventListener('click',()=>{

    document.getElementById('responseJsonText').value  = 'Please wait... fetching Response...';

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name ='requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;


    //debug log
    // console.log(url);
    // console.log(requestType);
    console.log(contentType)
    // //can be done like below but will have to use if else and other logic
    // console.log(document.getElementById('get').checked)

    //check option -> if its param. get all params and make an object

    // let data = {};
    

    if (contentType === 'params'){
    data = {};
    for(let i = 1 ; i <= addedParamCount ; i++){
        if(document.getElementById('parameterKey'+(i)) != undefined){
            let key = document.getElementById('parameterKey'+(i)).value;
            let value = document.getElementById('parameterValue'+(i)).value;
            data[key] = value;
        }
    }
    console.log(data);
    data = JSON.stringify(data);
    }else{
        data = document.getElementById('requestJsonText').value;
    }

    console.log(data);

    // console.log(data);
    // data.key = 'value';
    // console.log(data); 
    // console.log(method);
    // let dat1 = {};
    // dat1.key = 'value';
    // dat1.key1 = 'value1';
    // console.log(dat1);

    //GET Request

    if(requestType === 'GET'){
        fetch(url,{
            method: 'GET'
        }).then(response => response.text()).then((text)=>{
            document.getElementById('responseJsonText').value  =text;
        })
    }
    else{
        fetch(url,{
            method: 'POST',
            body: data,
            headers:{
                 "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) =>{
            return response.text();
        }).then((text)=>{
            document.getElementById('responseJsonText').value=text;
        })
    }

})

console.log(JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }))