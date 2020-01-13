const urlAPI = `https://randomuser.me/api/?results=12&nat=us&inc=name, 
                picture,
                email, 
                location, 
                phone, 
                dob`
const empContainer = document.querySelector(".employee-container");
const overlay = document.getElementById("overlay");
const popupContainer = document.getElementById("popup-container");
const modalClose = document.querySelector(".modal-close");
const searchInput = document.getElementById('search-input')
const searchIcon = document.getElementById('search-icon');
let newArr = [];
let employees = [];

fetch(urlAPI)
    .then(response => response.json())
    .then(response => response.results)
    .then(showPerson)
    .catch(error => alert(error))

function showPerson(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
    <div class="employee-card card" data-index="${index}">
    <div class="image-container">
    <img class="employee-image" src="${picture.large}">
    </div>
    <div class="text-container">
    <h1 class="name">${name.first} ${name.last}</h1>
    <p class="card-email">${email}</p>
    <p class="card-address">${city}</p>
    </div>
    </div>
    `
});
empContainer.innerHTML = employeeHTML;
}

function showPopup(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    let overlayHTML = `
    <div class="popup-container" id="popup-container">
        <i class="fas fa-times"></i>
        <div class="img-container">
            <img src="${picture.large}">
        </div>
        <div class="popup-text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <ul>
            <li><p class="email">${email}</p><li>
            <li><p class="location">${city}, ${state}</p><li>
            <li><p class="phone">Cell - ${phone}</p><li>
            <li><p class="address">${street.number} ${street.name}</p><p>${city}, ${state} ${postcode}</p><li>
            <li><p class="birthday">DOB - 
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p><li>
        </ul>
            </div>
        <div class="card-nav">
            <p class="left-arrow arrows"><i class="fas fa-arrow-left"></i></p>
            <p class="right-arrow arrows"><i class="fas fa-arrow-right"></i></p>
        </div>
    </div>  
`;
    popupContainer.innerHTML = overlayHTML;
}
empContainer.addEventListener('click',function(e) {
    if (event.target !== empContainer) {
    $('.overlay').css('display', 'flex')
    $('.overlay').fadeIn();
    $('.popup-container').fadeIn();
    $('body').css('overflow', 'hidden');
    $('.content-container').css('filter', 'blur(1px)');
    const card = event.target.closest(".card");
    const index = card.getAttribute('data-index');
    showPopup(index);
    newArr.push(index);
    console.log(newArr);
    } 
});
window.addEventListener('click', function(e) {
    if (event.target.classList.contains('right-arrow') || event.target.classList.contains('fa-arrow-right')) {
        //right arrow clicked
    } else if 
       (event.target.classList.contains('left-arrow') || event.target.classList.contains('fa-arrow-left')) {
        //left arrow clicked
       }
})
window.addEventListener('click', function(r) {
    if (event.target.classList.contains('fa-times')) {
        $('.overlay').fadeOut();
        $('body').css('overflow', 'initial');
        $('.content-container').css('filter', 'none');
        $('.popup-container').fadeOut();
    } else if 
        (event.target.classList.contains('popup')) {
        $('.overlay').fadeOut();
        $('body').css('overflow', 'initial');
        $('.content-container').css('filter', 'none');
        $('.popup-container').fadeOut();
        }
})

searchIcon.style.display = 'none';
$('.search-input').on('focus', function () {
    $('#search-icon').fadeIn();
})
$('.search-input').on('focusout', function() {
    $('#search-icon').fadeOut();
})