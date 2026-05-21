const db = require('../db');

function normalizeBool(val) {
  if (typeof val === 'boolean') return val;
  if (val === 'true' || val === 1 || val === '1') return true;
  return false;
}

// Add multiple items in one purchase
exports.addItems = (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items array is required' });
  }

  for (const item of items) {
    const { name, purchase_date, stock_available, item_type_id } = item || {};

    if (!name || !purchase_date || !item_type_id) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
  }

  const sql = `
    INSERT INTO items (name, purchase_date, stock_available, item_type_id)
    VALUES ?
  `;

  const values = items.map((it) => [
    it.name,
    it.purchase_date,
    normalizeBool(it.stock_available),
    it.item_type_id,
  ]);

  db.query(sql, [values], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Add items failed' });
    }

    return res.json({ message: 'Items added successfully' });
  });
};

// Fetch all items using JOIN
exports.getItems = (req, res) => {
  const sql = `
    SELECT
      items.id,
      items.name,
      items.purchase_date,
      items.stock_available,
      item_types.type_name
    FROM items
    INNER JOIN item_types
      ON items.item_type_id = item_types.id
    ORDER BY items.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Fetch items failed' });
    }
    return res.json(results);
  });
};

// Update item details
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, purchase_date, stock_available, item_type_id } = req.body;

  if (!name || !purchase_date || !item_type_id) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const sql = `
    UPDATE items
    SET
      name = ?,
      purchase_date = ?,
      stock_available = ?,
      item_type_id = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, purchase_date, normalizeBool(stock_available), item_type_id, id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Update failed' });
      }
      return res.json({ message: 'Item updated successfully' });
    }
  );
};

// Delete Item
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM items WHERE id = ?';

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Delete failed' });
    }
    return res.json({ message: 'Item deleted successfully' });
  });
};

