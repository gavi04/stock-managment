import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { buildItemCode } from '../../shared/itemCode.js';
import { handleFormKeyNav } from '../utils/formKeyNav.js';
import { HsnSelect } from './HsnSelect.jsx';

const stockMasterSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  code: z.string().optional().default(''),
  category_id: z.string().optional().default(''),
  hsn: z.string().optional().default(''),
  unit_id: z.string().optional().default(''),
  unit_basis: z.enum(['quantity', 'pcs']).default('quantity'),
  size: z.string().optional().default(''),
  length: z.string().optional().default(''),
  gst_rate: z.coerce.number().min(0).default(0),
  sale_rate: z.coerce.number().min(0).default(0),
  purchase_rate: z.coerce.number().min(0).default(0),
  size_diff: z.coerce.number().default(0),
  batch_no: z.string().optional().default(''),
  description: z.string().optional().default(''),
  opening_qty: z.coerce.number().min(0).default(0),
  opening_date: z.string().optional().default(''),
  isi_mark: z.enum(['yes', 'no']).default('no')
});

function todayDateInputValue() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function getDefaultValues() {
  return {
    name: '',
    code: '',
    category_id: '',
    hsn: '',
    unit_id: '',
    unit_basis: 'quantity',
    size: '',
    length: '',
    gst_rate: 0,
    sale_rate: 0,
    purchase_rate: 0,
    size_diff: 0,
    batch_no: '',
    description: '',
    opening_qty: 0,
    opening_date: todayDateInputValue(),
    isi_mark: 'no'
  };
}

export function StockMasterPanel({ products, categories, units, onCreate, onUpdate, onDelete, busy }) {
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [groupFilter, setGroupFilter] = useState('all');
  // Once the user manually edits the code, stop auto-generating it.
  const [codeTouched, setCodeTouched] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(stockMasterSchema),
    defaultValues: getDefaultValues()
  });

  const watchedName = watch('name');
  const watchedSize = watch('size');
  const watchedLength = watch('length');

  // Auto-fill the item code from name/size/length while creating a new item,
  // unless the user has overridden it. Existing items keep their saved code.
  useEffect(() => {
    if (!editingId && !codeTouched) {
      setValue('code', buildItemCode(watchedName, watchedSize, watchedLength));
    }
  }, [watchedName, watchedSize, watchedLength, editingId, codeTouched, setValue]);

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
      return groupFilter === 'all' || String(item.category_id ?? '') === groupFilter;
    });
  }, [products, groupFilter]);

  const submit = async (values) => {
    const payload = {
      name: values.name.trim(),
      code: values.code.trim(),
      category_id: values.category_id ? Number(values.category_id) : null,
      hsn: values.hsn || null,
      unit_id: values.unit_id ? Number(values.unit_id) : null,
      unit_basis: values.unit_basis,
      size: values.size.trim() || null,
      length: values.length.trim() || null,
      gst_rate: Number(values.gst_rate),
      sale_rate: Number(values.sale_rate),
      purchase_rate: Number(values.purchase_rate),
      size_diff: Number(values.size_diff),
      batch_no: values.batch_no.trim() || null,
      description: values.description.trim() || null,
      opening_stock_date: values.opening_date || null,
      isi_mark: values.isi_mark === 'yes',
      is_active: true,
      // Transient — consumed by App to record the opening-balance stock movement.
      opening_qty: Number(values.opening_qty),
      opening_rate: Number(values.purchase_rate),
      opening_date: values.opening_date || todayDateInputValue()
    };

    setFormError(null);
    try {
      if (editingId) {
        await onUpdate(editingId, payload);
      } else {
        await onCreate(payload);
      }
    } catch (err) {
      // e.g. duplicate item code — keep the form so the user can fix it.
      const clean = (err?.message || 'Unable to save item')
        .replace(/^Error invoking remote method '[^']*':\s*/, '')
        .replace(/^AppError:\s*/, '');
      setFormError(clean);
      return;
    }

    setEditingId(null);
    setCodeTouched(false);
    reset(getDefaultValues());
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setShowForm(true);
    // Keep the existing code as-is; don't regenerate it from name/size/length.
    setCodeTouched(true);
    reset({
      name: row.name ?? '',
      code: row.code ?? '',
      category_id: row.category_id ? String(row.category_id) : '',
      hsn: row.hsn ?? '',
      unit_id: row.unit_id ? String(row.unit_id) : '',
      unit_basis: row.unit_basis === 'pcs' ? 'pcs' : 'quantity',
      size: row.size ?? '',
      length: row.length ?? '',
      gst_rate: Number(row.gst_rate ?? 0),
      sale_rate: Number(row.sale_rate ?? 0),
      purchase_rate: Number(row.purchase_rate ?? 0),
      size_diff: Number(row.size_diff ?? 0),
      batch_no: row.batch_no ?? '',
      description: row.description ?? '',
      opening_qty: 0,
      opening_date: row.opening_stock_date || todayDateInputValue(),
      isi_mark: row.isi_mark ? 'yes' : 'no'
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setCodeTouched(false);
    setFormError(null);
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
          {formError ? <p className="error-message">{formError}</p> : null}
          <form className="stock-grid-form" onSubmit={handleSubmit(submit)} onKeyDown={handleFormKeyNav}>
            <label>
              Stock Name
              <input {...register('name')} />
              {errors.name ? <small>{errors.name.message}</small> : null}
            </label>
            <label>
              Group
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
              HSN Code
              <HsnSelect value={watch('hsn')} onChange={(code) => setValue('hsn', code, { shouldDirty: true })} />
              <input type="hidden" {...register('hsn')} />
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
              Measured By
              <select {...register('unit_basis')}>
                <option value="quantity">Quantity</option>
                <option value="pcs">Pcs</option>
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
              GST Rate (%)
              <input type="text" inputMode="decimal" step="0.01" {...register('gst_rate')} />
            </label>
            <label>
              Sale Rate
              <input type="text" inputMode="decimal" step="0.01" {...register('sale_rate')} />
            </label>
            <label>
              Purchase Rate
              <input type="text" inputMode="decimal" step="0.01" {...register('purchase_rate')} />
            </label>
            <label>
              Size Difference
              <input type="text" inputMode="decimal" step="0.01" {...register('size_diff')} />
            </label>
            <label>
              Batch No.
              <input {...register('batch_no')} />
            </label>
            <label>
              Opening Stock Qty
              <input type="text" inputMode="decimal" step="0.001" {...register('opening_qty')} />
            </label>
            <label>
              Opening Stock Date
              <input type="text" placeholder="dd/mm/yyyy" {...register('opening_date')} />
            </label>
            <label style={{ gridColumn: 'span 2' }}>
              General Description
              <input {...register('description')} />
            </label>
            <label>
              ISI Marked
              <select {...register('isi_mark')}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
            <label style={{ gridColumn: 'span 2' }}>
              Item Code
              <input
                {...register('code', { onChange: () => setCodeTouched(true) })}
                placeholder="Auto from name / size / length"
              />
              <small className="stock-hint">
                Auto-generated as name/size/length. Unique, can be overridden.
              </small>
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
        <select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
          <option value="all">All Groups</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
      </section>

      <section className="panel">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Group</th>
              <th>HSN</th>
              <th>UOM</th>
              <th>Basis</th>
              <th>Sale Rate</th>
              <th>Current Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9}>No items found.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.code}</td>
                  <td>{row.name}</td>
                  <td>{categoryMap.get(String(row.category_id ?? '')) || '-'}</td>
                  <td>{row.hsn || '-'}</td>
                  <td>{unitMap.get(String(row.unit_id ?? '')) || '-'}</td>
                  <td style={{ textTransform: 'capitalize' }}>{row.unit_basis || 'quantity'}</td>
                  <td>{Number(row.sale_rate ?? 0).toFixed(2)}</td>
                  <td>{Number(row.current_stock ?? 0).toFixed(3)}</td>
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
