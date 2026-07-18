import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schemas = {
  product: z.object({
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Code is required'),
    barcode: z.string().optional(),
    min_stock: z.coerce.number().min(0)
  }),
  party: z.object({
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Code is required'),
    type: z.enum(['customer', 'supplier', 'both']),
    phone: z.string().optional()
  })
};

const defaults = {
  product: { name: '', code: '', barcode: '', min_stock: 0 },
  party: { name: '', code: '', type: 'both', phone: '' }
};

export function MasterPanel({ type, title, rows, onCreate, onDelete }) {
  const schema = useMemo(() => schemas[type], [type]);
  const defaultValues = useMemo(() => defaults[type], [type]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const submit = async (values) => {
    await onCreate(values);
    reset(defaultValues);
  };

  return (
    <div className="master-layout">
      <section className="panel">
        <h2>{title} Entry</h2>
        <form className="inline-form" onSubmit={handleSubmit(submit)}>
          <label>
            Name
            <input {...register('name')} />
            {errors.name ? <small>{errors.name.message}</small> : null}
          </label>
          <label>
            Code
            <input {...register('code')} />
            {errors.code ? <small>{errors.code.message}</small> : null}
          </label>

          {type === 'product' ? (
            <>
              <label>
                Barcode
                <input {...register('barcode')} />
              </label>
              <label>
                Reorder Level
                <input type="number" step="0.001" {...register('min_stock')} />
              </label>
            </>
          ) : null}

          {type === 'party' ? (
            <>
              <label>
                Type
                <select {...register('type')}>
                  <option value="customer">Customer</option>
                  <option value="supplier">Supplier</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label>
                Phone
                <input {...register('phone')} />
              </label>
            </>
          ) : null}

          <button type="submit">Save</button>
        </form>
      </section>

      <section className="panel">
        <h2>{title} List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>{type === 'product' ? 'Barcode' : 'Type'}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4}>No data found.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.code}</td>
                  <td>{type === 'product' ? row.barcode || '-' : row.type}</td>
                  <td>
                    <button type="button" className="danger-btn" onClick={() => onDelete(row.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}