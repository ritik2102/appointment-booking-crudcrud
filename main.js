
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const numberInput=document.querySelector('#phone');
const appointmentList=document.querySelector('.appointments');


function submitHandler(e){
// preventing the form refresh
    e.preventDefault();
    
    const name=nameInput.value;
    const email=emailInput.value;
    const number=numberInput.value;
    
    //Creating the li
    const li=document.createElement('li');
    li.classList.add(email)
    // Adding text to li
    li.appendChild(document.createTextNode(`${name} - ${email} - ${number}`));
    // Creating a button and adding it at the end of li
    const deleteB=document.createElement('button');

    // Adding the delete handler on the delete button
    deleteB.onclick=()=>{
        localStorage.removeItem(email);
        appointmentList.removeChild(li);
    }
    // Adding text on button
    deleteB.appendChild(document.createTextNode('Delete'));
    // Adding button at the end of li tag
    li.appendChild(deleteB);

    const edit=document.createElement('button');
    edit.onclick=()=>{
        const retrieved_obj=JSON.parse(localStorage.getItem(email));
        nameInput.value=retrieved_obj.name;
        emailInput.value=retrieved_obj.email;
        numberInput.value=retrieved_obj.phone;

        localStorage.removeItem(email);
    }
    edit.appendChild(document.createTextNode('Edit'));
    li.appendChild(edit);

    // Adding new li to our page
    appointmentList.appendChild(li);

    const data={
        "name":name,
        "email":email,
        "phone":number
    }
    // Storing the data witn key and value in local storage
    // localStorage.setItem(email,JSON.stringify(data));
    axios.post('https://crudcrud.com/api/ec868542c7fc4e6d940f08ebf68c3a33/appointmentData',data)
    .then(res=>console.log(res))
    .catch(err=>console.error(err));
    
}

function showUsers(){
    axios.get('https://crudcrud.com/api/ec868542c7fc4e6d940f08ebf68c3a33/appointmentData')
    .then(res=>res.data.forEach(logdata))
    .catch(err=>console.error(err));
    

}
showUsers();

function logdata(element){
    
    console.log(element);
    const name=element.name;
    const email=element.email;
    const number=element.number;
    
    //Creating the li
    const li=document.createElement('li');
    li.classList.add(email)
    // Adding text to li
    li.appendChild(document.createTextNode(`${name} - ${email} - ${number}`));
    // Creating a button and adding it at the end of li
    const deleteB=document.createElement('button');

    // Adding the delete handler on the delete button
    deleteB.onclick=()=>{
        localStorage.removeItem(email);
        appointmentList.removeChild(li);
    }
    // Adding text on button
    deleteB.appendChild(document.createTextNode('Delete'));
    // Adding button at the end of li tag
    li.appendChild(deleteB);

    const edit=document.createElement('button');
    edit.onclick=()=>{
        const retrieved_obj=JSON.parse(localStorage.getItem(email));
        nameInput.value=retrieved_obj.name;
        emailInput.value=retrieved_obj.email;
        numberInput.value=retrieved_obj.phone;

        localStorage.removeItem(email);
    }
    edit.appendChild(document.createTextNode('Edit'));
    li.appendChild(edit);

    // Adding new li to our page
    appointmentList.appendChild(li);
}