
let codeInput = document.querySelectorAll('.form-row input')[0];
let priceInput = document.querySelectorAll('.form-row input')[1];
let categoryInput = document.querySelectorAll('.form-row input')[2];
let descriptionInput = document.querySelector('textarea');

let addBtn = document.querySelector('.add-btn');
let updateBtn = document.querySelector('.update-main');
let searchInput = document.querySelector('.search-input');
let tableBody = document.querySelector('tbody');

let products = JSON.parse(localStorage.getItem('products')) || [
    {
        code: '101',
        price: '15000',
        category: 'Phones',
        description: 'Samsung smartphone with 128GB storage.'
    },
    {
        code: '102',
        price: '20000',
        category: 'Laptops',
        description: 'HP laptop, Core i5, 8GB RAM.'
    },
    {
        code: '103',
        price: '500',
        category: 'Accessories',
        description: 'Wireless mouse, USB, black color.'
    }
];

let editIndex = -1;


function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}


function clearInputs() {
    codeInput.value = '';
    priceInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';

    editIndex = -1;
}


function displayProducts(list = products) {

    tableBody.innerHTML = '';

    list.forEach(function(product, index) {

        let realIndex = products.indexOf(product);

        let row = document.createElement('tr');

        let number = document.createElement('td');
        number.textContent = index + 1;

        let code = document.createElement('td');
        code.textContent = product.code;

        let price = document.createElement('td');
        price.textContent = Number(product.price).toLocaleString() + ' EG';

        let category = document.createElement('td');
        category.textContent = product.category;

        let description = document.createElement('td');
        description.textContent = product.description;

        let actions = document.createElement('td');

        let editButton = document.createElement('button');
        editButton.textContent = '✎ Update';
        editButton.className = 'action-btn edit-btn';

        editButton.addEventListener('click', function() {
            editProduct(realIndex);
        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '▣ Delete';
        deleteButton.className = 'action-btn delete-btn';

        deleteButton.addEventListener('click', function() {
            deleteProduct(realIndex);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        row.appendChild(number);
        row.appendChild(code);
        row.appendChild(price);
        row.appendChild(category);
        row.appendChild(description);
        row.appendChild(actions);

        tableBody.appendChild(row);
    });
}


addBtn.addEventListener('click', function() {

    let code = codeInput.value.trim();
    let price = priceInput.value.trim();
    let category = categoryInput.value.trim();
    let description = descriptionInput.value.trim();

    if (!code || !price || !category || !description) {
        alert('Please fill all fields!');
        return;
    }

    let exists = products.some(function(product) {
        return product.code === code;
    });

    if (exists) {
        alert('Product code already exists!');
        return;
    }

    let product = {
        code: code,
        price: price,
        category: category,
        description: description
    };

    products.push(product);

    saveProducts();
    displayProducts();
    clearInputs();

    alert('Product added successfully!');
});


updateBtn.addEventListener('click', function() {

    if (editIndex === -1) {
        alert('Please select a product first!');
        return;
    }

    let code = codeInput.value.trim();
    let price = priceInput.value.trim();
    let category = categoryInput.value.trim();
    let description = descriptionInput.value.trim();

    if (!code || !price || !category || !description) {
        alert('Please fill all fields!');
        return;
    }

    let exists = products.some(function(product, index) {
        return product.code === code && index !== editIndex;
    });

    if (exists) {
        alert('Product code already exists!');
        return;
    }

    products[editIndex] = {
        code: code,
        price: price,
        category: category,
        description: description
    };

    saveProducts();
    displayProducts();
    clearInputs();

    alert('Product updated successfully!');
});


function editProduct(index) {

    codeInput.value = products[index].code;
    priceInput.value = products[index].price;
    categoryInput.value = products[index].category;
    descriptionInput.value = products[index].description;

    editIndex = index;
}

function deleteProduct(index) {

    let confirmDelete = confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {

        products.splice(index, 1);

        saveProducts();
        displayProducts();
        clearInputs();

        alert('Product deleted successfully!');
    }
}


searchInput.addEventListener('input', function() {

    let searchValue = searchInput.value.toLowerCase().trim();

    let filteredProducts = products.filter(function(product) {

        return product.code.toLowerCase().includes(searchValue);

    });

    displayProducts(filteredProducts);
});


displayProducts();
