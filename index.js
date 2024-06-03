// Dummy services data
const servicesData = [
    {
        id: 1,
        name: 'House Cleaning',
        category: 'Cleaning',
        rate: 'Rs. 20,000',
        location: 'Colombo',
        images: ['img1.jpg', 'img1.jpg', 'img1.jpg'],
        postedDate: '2023-05-01',
        description: 'Professional house cleaning services available at affordable rates. Contact us for more details.'
    },
    // Add more services here
];

let filteredServices = [...servicesData];

function handleServiceSearch() {
    const minRate = document.getElementById('minRate').value;
    const maxRate = document.getElementById('maxRate').value;
    const serviceLocation = document.getElementById('serviceLocation').value;
    const serviceCategory = document.getElementById('serviceCategory').value;

    filteredServices = servicesData.filter(service => {
        return (!minRate || service.rate >= minRate) &&
               (!maxRate || service.rate <= maxRate) &&
               (!serviceLocation || service.location.toLowerCase().includes(serviceLocation.toLowerCase())) &&
               (!serviceCategory || service.category.toLowerCase().includes(serviceCategory.toLowerCase()));
    });

    displayServices();
}

function displayServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    servicesContainer.innerHTML = '';

    filteredServices.forEach(service => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 service-card">
                <div id="carouselService${service.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${service.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${img}" alt="Service image">
                            </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carouselService${service.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselService${service.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${service.name}</h5>
                    <p class="card-text">Category: ${service.category}</p>
                    <p class="card-text">Rate: ${service.rate}</p>
                    <p class="card-text">Location: ${service.location}</p>
                    <p class="card-text">Posted: ${service.postedDate}</p>
                    <p class="card-text">${service.description.slice(0, 100)}... <a href="#" onclick="handleViewServiceDetails(${service.id})">View More</a></p>
                    <button class="btn btn-primary" onclick="handleViewServiceDetails(${service.id})">View Details</button>
                </div>
            </div>`;
        servicesContainer.appendChild(card);
    });
}

function handleViewServiceDetails(id) {
    const service = filteredServices.find(e => e.id === id);
    const modal = new bootstrap.Modal(document.getElementById('serviceModal'));

    document.getElementById('serviceModalLabel').innerText = service.name;
    document.getElementById('carouselServiceInner').innerHTML = service.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Service image">
        </div>`).join('');
    document.getElementById('modalServiceCategory').innerText = `Category: ${service.category}`;
    document.getElementById('modalRate').innerText = `Rate: ${service.rate}`;
    document.getElementById('modalServiceLocation').innerText = `Location: ${service.location}`;
    document.getElementById('modalPostedDate').innerText = `Posted: ${service.postedDate}`;
    document.getElementById('modalServiceDescription').innerText = service.description;

    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    displayServices();
});
