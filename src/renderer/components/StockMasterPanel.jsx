import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const stockMasterSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  code: z.string().optional().default(''),
  category_id: z.string().optional().default(''),
  unit_id: z.string().optional().default(''),
  size: z.string().optional().default(''),
  length: z.string().optional().default(''),
  opening_qty: z.coerce.number().min(0).default(0),
  opening_rate: z.coerce.number().min(0).default(0),
  opening_date: z.string().optional().default(''),
  min_stock: z.coerce.number().min(0).default(0),
  is_active: z.enum(['1', '0']).default('1'),
  isi_marked: z.boolean().default(false)
});

function todayDateInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function getDefaultValues() {
  return {
    name: '',
    code: '',
    category_id: '',
    unit_id: '',
    size: '',
    length: '',
    opening_qty: 0,
    opening_rate: 0,
    opening_date: todayDateInputValue(),
    min_stock: 0,
    is_active: '1',
    isi_marked: false
  };
}

export function StockMasterPanel({ products, categories, units, onCreate, onUpdate, onDelete, busy }) {
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(stockMasterSchema),
    defaultValues: getDefaultValues()
  });

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((category) => map.set(String(category.id), category.name));
    return map;
  }, [categories]);

  const unitMap = useMemo(() => {
    const map = new Map();
    units.forEach((unit) => map.set(String(unit.id), unit.name));
    return map;
  }, [units]);

  const rows = useMemo(() => {
    return products.filter((item) => {
      const categoryMatch = categoryFilter === 'all' || String(item.category_id ?? '') === categoryFilter;
      const statusMatch = statusFilter === 'all' || String(item.is_active ?? 1) === statusFilter;
      return categoryMatch && statusMatch;
    });
  }, [products, categoryFilter, statusFilter]);

  const submit = async (values) => {
    const payload = {
      name: values.name.trim(),
      code: values.code.trim(),
      category_id: values.category_id ? Number(values.category_id) : null,
      unit_id: values.unit_id ? Number(values.unit_id) : null,
      barcode: null,
      sku: [values.size.trim(), values.length.trim()].filter(Boolean).join(' x ') || null,
      is_active: Number(values.is_active),
      track_batch: values.isi_marked ? 1 : 0,
      track_serial: 0,
      min_stock: Number(values.min_stock),
      opening_qty: Number(values.opening_qty),
      opening_rate: Number(values.opening_rate),
      opening_date: values.opening_date || todayDateInputValue()
    };

    if (editingId) {
      await onUpdate(editingId, payload);
    } else {
      await onCreate(payload);
    }

    setEditingId(null);
    reset(getDefaultValues());
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setShowForm(true);
    const [size = '', length = ''] = String(row.sku || '').split(' x ');
    reset({
      name: row.name ?? '',
      code: row.code ?? '',
      category_id: row.category_id ? String(row.category_id) : '',
      unit_id: row.unit_id ? String(row.unit_id) : '',
      size,
      length,
      opening_qty: 0,
      opening_rate: 0,
      opening_date: todayDateInputValue(),
      min_stock: Number(row.min_stock ?? 0),
      is_active: String(row.is_active ?? 1),
      isi_marked: Number(row.track_batch ?? 0) === 1
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset(getDefaultValues());
  };

  return (
    <section className="stock-master-view">
      <div className="stock-master-head">
        <div>
          <h2>Stock Master</h2>
          <p>{products.length} items</p>
        </div>
        <button type="button" onClick={() => setShowForm((value) => !value)}>
          {showForm ? 'Hide Form' : '+ New Item'}
        </button>
      </div>

      {showForm ? (
        <section className="panel stock-form-panel">
          <h3>{editingId ? 'Edit Item' : 'New Item'}</h3>
          <form className="stock-grid-form" onSubmit={handleSubmit(submit)}>
            <label>
              Item Name
              <input {...register('name')} />
              {errors.name ? <small>{errors.name.message}</small> : null}
            </label>
            <label>
              Code
              <input {...register('code')} placeholder="Auto if empty" />
            </label>
            <label>
              Category
              <select {...register('category_id')}>
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              UOM
              <select {...register('unit_id')}>
                <option value="">Select</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Size
              <input {...register('size')} />
            </label>
            <label>
              Length
              <input {...register('length')} />
            </label>
            <label>
              Opening Stock Qty
              <input type="number" step="0.001" {...register('opening_qty')} />
            </label>
            <label>
              Opening Stock Date
              <input type="date" {...register('opening_date')} />
            </label>
            <label>
              Opening Stock Rate
              <input type="number" step="0.01" {...register('opening_rate')} />
            </label>
            <label>
              Reorder Level
              <input type="number" step="0.001" {...register('min_stock')} />
            </label>
            <label>
              Status
              <select {...register('is_active')}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" {...register('isi_marked')} />
              ISI Marked
            </label>

            <div className="stock-form-actions">
              <button type="submit" disabled={busy}>
                {editingId ? 'Update Item' : 'Save Item'}
              </button>
              {editingId ? (
                <button type="button" className="ghost-light-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </section>
      ) : null}

      <section className="stock-master-filters">
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </section>

      <section className="panel">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>UOM</th>
              <th>Current Stock</th>
              <th>Reorder Lvl</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8}>No items found.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.code}</td>
                  <td>{row.name}</td>
                  <td>{categoryMap.get(String(row.category_id ?? '')) || '-'}</td>
                  <td>{unitMap.get(String(row.unit_id ?? '')) || '-'}</td>
                  <td>{Number(row.current_stock ?? 0).toFixed(3)}</td>
                  <td>{Number(row.min_stock ?? 0).toFixed(3)}</td>
                  <td>{Number(row.is_active ?? 1) === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <div className="action-row">
                      <button type="button" className="ghost-light-btn" onClick={() => startEdit(row)}>
                        Edit
                      </button>
                      <button type="button" className="danger-btn" onClick={() => onDelete(row.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
}