import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const hsnSchema = z.object({
  code: z.string().min(1, 'HSN code is required'),
  description: z.string().optional().nullable()
});

const defaultValues = { code: '', description: '' };

export function HsnMasterPanel({ rows, busy, onCreate, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: zodResolver(hsnSchema), defaultValues });

  const startEdit = (row) => {
    setEditingId(row.id);
    reset({ code: row.code ?? '', description: row.description ?? '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset(defaultValues);
    setError(null);
  };

  const submit = async (values) => {
    setError(null);
    try {
      if (editingId) {
        await onUpdate(editingId, values);
      } else {
        await onCreate(values);
      }
      cancelEdit();
    } catch (err) {
      setError(err.message || 'Failed to save HSN code');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this HSN code?')) return;
    try {
      await onDelete(id);
      if (editingId === id) cancelEdit();
    } catch (err) {
      setError(err.message || 'Failed to delete HSN code');
    }
  };

  return (
    <div className="hsn-master-view" style={{ display: 'grid', gap: '16px' }}>
      <section className="panel">
        <h2>{editingId ? 'Edit HSN Code' : 'New HSN Code'}</h2>
        {error ? <p className="error-message">{error}</p> : null}
        <form className="inline-form" onSubmit={handleSubmit(submit)}>
          <label>
            HSN Code
            <input {...register('code')} placeholder="e.g. 7208" />
            {errors.code ? <small>{errors.code.message}</small> : null}
          </label>
          <label>
            Description
            <input {...register('description')} placeholder="Optional" />
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'end' }}>
            <button type="submit" disabled={busy}>
              {editingId ? 'Update' : 'Save'}
            </button>
            {editingId ? (
              <button type="button" className="ghost-light-btn" onClick={cancelEdit}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>HSN Codes ({rows.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th style={{ width: '140px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3}>No HSN codes yet.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.code}</td>
                  <td>{row.description || '-'}</td>
                  <td>
                    <div className="action-row">
                      <button type="button" className="ghost-light-btn" onClick={() => startEdit(row)}>
                        Edit
                      </button>
                      <button type="button" className="danger-btn" onClick={() => handleDelete(row.id)}>
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
    </div>
  );
}
