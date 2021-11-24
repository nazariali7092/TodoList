
function displayData(data,dividend,page) {
    displayDataByPage(data,page);
    const pagList = document.getElementById('pagination');
    let btn = '';
    for(let i = 0; i < dividend;i++){
        btn += `<button class='pagination__btn' id="${i}">${i + 1}</button>`
    }
    pagList.innerHTML = btn;
    let btnPage = document.getElementsByClassName('pagination__btn');
    btnPage[0].classList.add('pagination__btn-active');
    for(let i=0 ; i<dividend ; i++)
    btnPage[i].addEventListener('click',(e) => {
        paginationToggler(i,dividend);
        displayDataByPage(data,e.target.innerHTML-1)
    });
}
function paginationToggler(pageNum,dividend)
{
    let btnPage = document.getElementsByClassName('pagination__btn');
    for(let i=0 ; i<dividend ; i++)
    {
        if(i !== pageNum)
            btnPage[i].classList.remove('pagination__btn-active');
        else
        btnPage[i].classList.add('pagination__btn-active');
    }
}

function displayDataByPage(data,pageNum)
{
    let todoDiv = document.getElementById('todo');
    todoDiv.classList.add('row', 'justify-content-align-content-between', 'my-2');
    todoDiv.innerHTML = '';
    for(let i=data[pageNum].length-1 ; i>=0 ; i--)
    {
    if(data[pageNum][i].checked === 'checked')
    {

        let newHtml = `<div class="bg-light rounded shadow  my-3 py-3 ">
                    <div class="col-12 d-flex align-items-center padd " id=${data[pageNum][i].id}>
                    <input type="checkbox" id="${data[pageNum][i].id}" ${data[pageNum][i].checked} onclick="checkTodo('${data[pageNum][i].id}')"> <label for="${data[pageNum][i].title}" onclick="checkFunction(${data[pageNum][i].id})" class="w-100 ms-4 p-1 fs-5 check-line"> <a>${data[pageNum][i].title}</a> </label>
                    <button class="icon px-2"  onclick="editBtn('${data[pageNum][i].id}', this)""><i class="fas fa-pencil-alt"></i></button>
                    <button class="icon px-2" onclick="delBtn('${data[pageNum][i].id}',${pageNum})"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="col-12 d-flex align-items-center padd">
                    <label for="${data[pageNum][i].description}" class="w-200 ms-4 p-1 fs-5"> <a>${data[pageNum][i].description}</a>
                    </div>
                    </div>
                    `;
        newHtml += todoDiv.innerHTML;
        todoDiv.innerHTML = newHtml;
    }
    else
    {
        let newHtml = `<div class="bg-light rounded shadow  my-3 py-3 ">
                    <div class="col-12 d-flex align-items-center padd " id=${data[pageNum][i].id}>
                    <input type="checkbox" id="${data[pageNum][i].id}" ${data[pageNum][i].checked} onclick="checkTodo('${data[pageNum][i].id}')"> <label for="${data[pageNum][i].title}" onclick="checkFunction(${data[pageNum][i].id})" class="w-100 ms-4 p-1 fs-5"> <a>${data[pageNum][i].title}</a> </label>
                    <button class="icon px-2"  onclick="editBtn('${data[pageNum][i].id}', this)""><i class="fas fa-pencil-alt"></i></button>
                    <button class="icon px-2" onclick="delBtn('${data[pageNum][i].id}',${pageNum})"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="col-12 d-flex align-items-center padd">
                    <label for="${data[pageNum][i].description}" class="w-200 ms-4 p-1 fs-5"> <a>${data[pageNum][i].description}</a>
                    </div>
                    </div>
                    `;
        newHtml += todoDiv.innerHTML;
        todoDiv.innerHTML = newHtml;
    }
    }
}
function editBtn(event) {
    window.location.href = `todo.html?ID=${event}`;
}

function delBtn(event,pageNum)
{
    if(confirm('Are you sure?')){

        deleteData(event,pageNum);
    }
    else
        return;
}
function deleteData(dataEntry,pageNum)
{

    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${dataEntry}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(json => console.log(json)).then(()=> fetchData().then(result => makePaginationArray(result,pageNum)))
        .catch(err => console.log(err));

}

function fetchData()
{
    return fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
        .then(data => {
            return data.json();
        })
}
fetchData().then(result => makePaginationArray(result,0));

function fetchDataById(id)
{
    return fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`)
        .then(data => {
            return data.json();
        })
}

function makePaginationArray(result,pageNum)
{
    let temp = Math.floor(result.length / 10) + 1;
    let c = result.length;
    let twoDarr= new Array(temp);

    for (let i=0; i<temp; i++) {twoDarr[i]=[];}

    for(let i=0 ; i<temp; i++)
    {
        for(let j=0 ; j<10; j++)
        {
            if(c === 0)
                break;
            twoDarr[i][j] = result[--c];

        }
    }
    displayData(twoDarr,temp,pageNum);
}

function checkTodo(checkedID)
{
    fetchDataById(checkedID).then(result => checkFetch(result,checkedID));
}
function checkFetch(item,checkedID)
{
    if(item.checked === 'checked')
        item.checked = 'unchecked';
    else
        item.checked = 'checked';
    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${checkedID}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    }).then(response=>{
        return response.json()
    }).then(data=>
        console.log(data)
    );
}




