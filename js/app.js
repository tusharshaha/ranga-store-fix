const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const {rate, count} = product.rating
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4 class="text-capitalize mt-2">${product.title}</h3>
      <p class="text-capitalize">Category: ${product.category}</p>
      <div class="d-flex justify-content-center mb-2">
      <i class="fas fa-star me-4"><span class="fw-bold fs-5"> ${rate}</span></i><i class="fas fa-user"><span class="fw-bold fs-5"> ${count}</span></i>
      </div>
      <h4>Price: $ ${product.price}</h4>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-warning me-4 text-white fw-bold ">Add to cart</button>
      <button onclick="showProductDetail(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  document.getElementById('showDetail').textContent = ''
};
// show single product details
const showProductDetail = id =>{
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    document.getElementById('showDetail').innerHTML = `
    <div class="card mx-auto" style="width: 300px">
      <img src="${data.image}" class="mx-auto product-image" alt="...">
      <div class="card-body">
        <h4 class="card-title fw-bold text-center text-capitalize">${data.category}</h4>
        <p class="card-text text-center text-capitalize">${data.description.slice(0,150)}</p>
      </div>
    </div>
    `
  });
}
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// price and total update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
  updateTotal()
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
