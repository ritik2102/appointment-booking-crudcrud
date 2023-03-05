
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const numberInput=document.querySelector('#phone');
const appointmentList=document.querySelector('.appointments');



// used to add new data
function submitHandler(e){
// preventing the form refresh
    e.preventDefault();
    
    const name=nameInput.value;
    const email=emailInput.value;
    const number=numberInput.value;
    
    // //Creating the li
    // const li=document.createElement('li');
    // li.classList.add(email)
    // // Adding text to li
    // li.appendChild(document.createTextNode(`${name} - ${email} - ${number}`));
    // // Creating a button and adding it at the end of li
    // const deleteB=document.createElement('button');

    // // Adding the delete handler on the delete button
    // deleteB.onclick=()=>{
    //     localStorage.removeItem(email);
    //     appointmentList.removeChild(li);
    // }
    // // Adding text on button
    // deleteB.appendChild(document.createTextNode('Delete'));
    // // Adding button at the end of li tag
    // li.appendChild(deleteB);

    // const edit=document.createElement('button');
    // edit.onclick=()=>{
    //     const retrieved_obj=JSON.parse(localStorage.getItem(email));
    //     nameInput.value=retrieved_obj.name;
    //     emailInput.value=retrieved_obj.email;
    //     numberInput.value=retrieved_obj.phone;

    //     localStorage.removeItem(email);
    // }
    // edit.appendChild(document.createTextNode('Edit'));
    // li.appendChild(edit);

    // // Adding new li to our page
    // appointmentList.appendChild(li);

    const data={
        "name":name,
        "email":email,
        "phone":number
    }
    // Storing the data witn key and value in local storage
    // localStorage.setItem(email,JSON.stringify(data));
    axios.post('https://crudcrud.com/api/9d4f4f1ec7de40b7b2c00340c0f5835e/appointmentData',data)
    .then(res=>logdata(res.data))
    .catch(err=>console.error(err));
    
}


// To retrieve the data when the app is started newly
function showUsers(){
    axios.get('https://crudcrud.com/api/9d4f4f1ec7de40b7b2c00340c0f5835e/appointmentData')
    .then(res=>res.data.forEach(logdata))
    .catch(err=>console.error(err));
    

}
showUsers();        //Called at the start


// To log the data for individual data object
function logdata(element){
    

    // Extracting the name, email, number and the id that has been creaadted for us by crud crud
    const name=element.name;
    const email=element.email;
    const number=element.phone;
    const id=element._id;

    // Creating a list element
    //Creating the li
    const li=document.createElement('li');
    li.classList.add(id)
    // Adding text to li
    li.appendChild(document.createTextNode(`${name} - ${email} - ${number}`));
    // Creating a button and adding it at the end of li
    const deleteB=document.createElement('button');



    // Adding the delete handler on the delete button
    deleteB.onclick=()=>{
        localStorage.removeItem(email);
        axios.delete( `https://crudcrud.com/api/9d4f4f1ec7de40b7b2c00340c0f5835e/appointmentData/${id}`)
                .then(res=> console.log(res,id))
                .catch(err=>console.error(err)).then(showUsers);
        appointmentList.removeChild(li);
        // Refresh the page after deleting a li
        window.location.reload();
    }
    // Adding text on button
    deleteB.appendChild(document.createTextNode('Delete'));
    // Adding button at the end of li tag
    li.appendChild(deleteB);



    // Edit functionality
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