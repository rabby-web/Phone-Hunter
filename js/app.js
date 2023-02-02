const loadPhones = async(searchText, dataLimit) =>{
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}
const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = ''
    // display 20 phone only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none')
    } 
    else{
        showAll.classList.add('d-none')
    }
    // displays phone no phone found
    const noPhone = document.getElementById('not-found-message');
    if(phones.length == 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    // displays phone
    phones.forEach(phone =>{
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show All Details</button>
            </div>
          </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loader
    toggleSpinner(false)
}
const processSearch = (dataLimit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('btn-field');
    const searchText =searchField.value;
    loadPhones(searchText, dataLimit)
}
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10)
})
// search input field enter key handler
document.getElementById('btn-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10)
    }
})
// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})
const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    phoneDisplayDetails(data.data)
}
const phoneDisplayDetails = phone => {
    // The API is not found
    console.log(phone)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name
    const phoneDetails = document.getElementById('Phone-details')
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate}</p>
    <p>Display Size: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    `;
}
loadPhones('apple');