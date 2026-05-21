const API_URL = 'http://localhost:5000/api/items';

const form = document.getElementById('itemForm');
const tableBody = document.getElementById('tableBody');

async function loadItems() {
  try {
    const response = await fetch(API_URL);

    // If backend returns an error, show it instead of crashing the UI
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      tableBody.innerHTML = `<tr><td colspan="6">${data.message || 'Failed to load items'}</td></tr>`;
      return;
    }

    // Expect array from GET /api/items
    if (!Array.isArray(data)) {
      tableBody.innerHTML = `<tr><td colspan="6">Unexpected response from server</td></tr>`;
      return;
    }

    tableBody.innerHTML = '';

    data.forEach((item) => {
      const row = `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.type_name}</td>
          <td>${String(item.purchase_date).split('T')[0]}</td>
          <td>${item.stock_available ? 'Available' : 'Out of Stock'}</td>
          <td>
            <button onclick="deleteItem(${item.id})">Delete</button>
          </td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="6">Network error. Is backend running?</td></tr>`;
  }
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const item = {
    name: document.getElementById('name').value,
    item_type_id: document.getElementById('itemType').value,
    purchase_date: document.getElementById('purchaseDate').value,
    stock_available: document.getElementById('stockAvailable').checked,
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [item] }),
  });

  const result = await response.json();
  alert(result.message);

  form.reset();
  loadItems();
});

async function deleteItem(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadItems();
}

loadItems();

