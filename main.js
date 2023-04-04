
const nameInput=document.querySelector('#name');
const emailInput=document.querySelector('#email');
const numberInput=document.querySelector('#phone');
const appointmentList=document.querySelector('.appointments');



// used to add new data i.e. retrieve the user entered data upon clicking submit
function submitHandler(e){
// preventing the form refresh
    e.preventDefault();
    
    const name=nameInput.value;
    const email=emailInput.value;
    const number=numberInput.value;

    const data={
        "name":name,
        "email":email,
        "phone":number
    }
    axios.post('http://localhost:3000/user/add-user',data)
    .then(res=>logdata(res.data.resData))
    .catch(err=>console.error(err));
   
    setTimeout(()=>{
        window.location.reload();
    },200);
    
    
}




// To retrieve the data when the app is started newly
function showUsers(){
    axios.get('http://localhost:3000/user/show-users')
    .then(res=>res.data.resData.forEach(logdata))
    .catch(err=>console.error(err));
    

}
showUsers();        
//Called at the start




// To log the data for individual data object after retrieving it from backend(using the showUsers)
function logdata(element){
    

    // Extracting the name, email, number and the id that has been creaadted for us by crud crud
    const name=element.name;
    const email=element.email;
    const number=element.phone;
    const id=element.id;

    // Creating a list element
    //Creating the li
    const li=document.createElement('li');
    li.classList.add(id)
    // Adding text to li
    li.appendChild(document.createTextNode(`${name} - ${email} - ${number}-`));
    // Creating a button and adding it at the end of li
    const deleteB=document.createElement('button');



    // Adding the delete handler on the delete button
    deleteB.onclick=()=>{
        axios.post( `http://localhost:3000/user/delete-user/${id}`)
                .then(res=> console.log("Removed"))
                .catch(err=>console.error(err));
        appointmentList.removeChild(li);
        // Refresh the page after deleting a li
        
        // We are refreshing it after some time so that the element might get deleted first and then we go for refresh
        setTimeout(()=>{
            window.location.reload();
        },200);
    }
    // Adding text on button
    deleteB.appendChild(document.createTextNode('Delete'));
    // Adding button at the end of li tag
    li.appendChild(deleteB);



    
    // Edit functionality
    const edit=document.createElement('button');
    edit.onclick=()=>{
        // const retrieved_obj=JSON.parse(localStorage.getItem(email));
        axios.get(`http://localhost:3000/user/get-user/${id}`)
            .then(res=>editFunctionality(res.data.resData))
            .catch(err=>console.error(err));
        appointmentList.removeChild(li);
        
    }
    edit.appendChild(document.createTextNode('Edit'));
    li.appendChild(edit);

    // Adding new li to our page
    appointmentList.appendChild(li);
}




// To complete the edit functionality
function editFunctionality(retrieved_obj){

    nameInput.value=retrieved_obj.name;
    emailInput.value=retrieved_obj.email;
    numberInput.value=retrieved_obj.phone;
    let id=retrieved_obj.id;

    axios.post( `http://localhost:3000/user/delete-user/${id}`)
            .then(res=> console.log("Ready to edit"))
            .catch(err=>console.error(err));

}