const axios = require("axios");
const stockItemId = 1;
const qty = 5;

async function mainLoading() {
  let listStockItems = await fetchStockItems();
  let listStockIngredients = await fetchStockIngerdients();
  listStockItems.forEach((currentItem) => {
    // selesai update current stock di sotckitems
    currentItem.Recipe.forEach((currIngredients) => {
      let currentStock = listStockIngredients.find(
        (ingredient) => ingredient.id == currIngredients.id
      );
      // console.log(currentStock, currIngredients);
      currIngredients.total = currentStock.total;
      // console.log(currIngredients);
    });
    const lowestIngredients = currentItem.Recipe.sort(
      (a, b) => a.total / a.qty - b.total / b.qty
    )[0];
    currentItem.stock = lowestIngredients.total / lowestIngredients.qty;
  });
  console.log(listStockItems[0]);
  return "";
}

async function mainFunctionUpdateStock() {
  let item = await getItemById(stockItemId);
  // TODO jalanin fuction post sales
  await updateStockIngredients(item.Recipe);
  let curStockIngredients = await fetchStockItems();

  // TODO bikin logika update stock item ketika stockingredients udah ke update
}

async function fetchStockIngerdients() {
  let response = await axios.get("http://localhost:5500/StockIngredients");
  const data = response.data;
  return data;
}

async function fetchStockItems() {
  try {
    let response = await axios.get("http://localhost:5500/StockItems");
    const data = response.data;
    return data;
  } catch (e) {}
}

async function fetchSales() {
  try {
    let response = await axios.get("http://localhost:5500/Sales");
    const data = response.data;
    console.log(data, "<<< sales");
  } catch (e) {}
}

async function getItemById(id) {
  try {
    let response = await axios.get(`http://localhost:5500/StockItems/${id}`);
    const data = response.data;
    console.log(JSON.stringify(data, null, 2), "<<< stockIngredients");
    return data;
  } catch (e) {}
}

async function testBelanja(item, qty) {
  // create post sales
  // update stockItem dan stockIngredients
  // clg  function fetchStockItems, stockIngredients, sama sales
  item.stock = qty;
  try {
    let response = await axios.post("http://localhost:5500/Sales", {
      data: {
        item,
        payment: "Cash",
      },
    });
  } catch (err) {}
}

async function updateStockIngredients(newIngerdients) {
  newIngerdients.forEach(async (e) => {
    const newTotal = e.total - e.qty;
    // console.log(e, newTotal);
    await updateSingleIngredient(e.id, newTotal);
  });
}
async function updateSingleIngredient(id, newTotal) {
  try {
    let response = await axios.patch(
      `http://localhost:5500/StockIngredients/${id}`,
      {
        total: newTotal,
      }
    );
    const data = response.data;
    // console.log(data);
  } catch (err) {}
}

// mainFunctionUpdateStock();
mainLoading();

// admin buka  aplikasi
// loading
// nge fetch semua list stockIngredients
// nge fetch semua list stockItem
// forEach untuk check ingredients
// selesai aman dan semua stock ada
// update currentItem stock jadi nilai terendah dari ingredients
