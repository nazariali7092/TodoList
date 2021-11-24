function getDate2()
{
   let n =  new Date();
   let y = n.getFullYear();
   let m = n.getMonth() + 1;
   let d = n.getDate();
   document.getElementById('date').value = m + "/" + d + "/" + y;
   document.getElementById('date').placeholder = m + "/" + d + "/" + y;
}
getDate2();
function addChanger(isEdit)
{
    let url = window.location.href;
    let urlID = url.split('=').pop();
    if(url.includes('ID') && isEdit)
    {
        document.getElementById('addbtn').classList.remove('d-block');
        document.getElementById('addbtn').classList.add('d-none');
        document.getElementById('edit').classList.remove('d-none');
        document.getElementById('edit').classList.add('d-block');
        document.getElementById('edit').innerHTML = 'save';
        fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${urlID}`)
            .then(data => {
                return data.json();
            })
        .then(result => {
            document.getElementById('title').value = result.title;
            document.getElementById('description').value = result.description;
            document.getElementById('date').value = result.dueDate;
        });
    }
    else if(url.includes('ID') && !isEdit)
    {
        document.getElementById('addbtn').classList.add('d-block');
        document.getElementById('addbtn').classList.remove('d-none');
        document.getElementById('edit').classList.add('d-none');
        document.getElementById('edit').classList.remove('d-block');
        document.getElementById('save').innerHTML = 'edit';
    }
}
let title = document.getElementById("title");
title.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13)
        if (!window.location.href.includes('ID'))
            addNewField();
        else
            editPassedData();
});


function addNewField() {
    let title = document.getElementById('title');
    let descp = document.getElementById('description');
    let date = document.getElementById('date');
    if (title.value === '') {
        prompt('Please add something');
        title.style.border = '1px solid red';
    }
    else
    {
        postData(title.value,descp.value,date.value);
        title.value = '';
        descp.value = '';
    }
}
function postData(dataEntry1,dataEntry2,dataEntry3) {
    const timestamp = new Date().toISOString();
    let data = {
        title: dataEntry1,
        description: dataEntry2,
        createdAt: timestamp,
        updatedAt: timestamp,
        dueDate: dataEntry3,
        checked: false
    }

    fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}

function editPassedData()
{
    let url = window.location.href;
    let urlID = url.split('=').pop();
    let data =
        {
            urlID : url.slice(-2),
            input : document.getElementById('title').value,
            descp : document.getElementById('description').value,
            updateData : Date.now(),
            dueDate: document.getElementById('date').value
        }
    editData(data,urlID);
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    addChanger(false);
}
function editData(dataEntry,urlID)
{
    let data =
        {
            title: dataEntry.input,
            description: dataEntry.descp,
            updatedAt: dataEntry.updateData
        }
    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${urlID}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(response=>{
        return response.json()
    }).then(data=>
            console.log(data)
    );
}