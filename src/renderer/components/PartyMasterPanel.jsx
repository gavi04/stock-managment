import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const partySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Party Name is required'),
  code: z.string().min(1, 'Party Code is required'),
  mobile: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  pin_code: z.string().optional().nullable(),
  gstin: z
    .string()
    .regex(/^[0-9A-Z]{15}$/, 'GST No. must be 15 uppercase letters/digits')
    .optional()
    .or(z.literal(''))
});

const defaultValues = {
  name: '',
  code: '',
  mobile: '',
  address: '',
  city: '',
  district: '',
  state: '',
  pin_code: '',
  gstin: ''
};

export function PartyMasterPanel({ rows, busy, onCreate, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(partySchema),
    defaultValues
  });

  const generateCode = async () => {
    try {
      const nextCode = await window.stockOps.getNextPartyCode();
      setValue('code', nextCode);
    } catch (err) {
      console.error('Failed to generate party code', err);
    }
  };

  useEffect(() => {
    if (!editingId) {
      generateCode();
    }
  }, [editingId]);

  const onEdit = (row) => {
    setEditingId(row.id);
    reset({
      name: row.name,
      code: row.code,
      mobile: row.mobile || '',
      address: row.address || '',
      city: row.city || '',
      district: row.district || '',
      state: row.state || '',
      pin_code: row.pin_code || '',
      gstin: row.gstin || ''
    });
  };

  const onCancel = () => {
    setEditingId(null);
    reset(defaultValues);
    generateCode();
    setError(null);
  };

  const onSubmit = async (values) => {
    setError(null);
    try {
      if (editingId) {
        await onUpdate(editingId, values);
      } else {
        await onCreate(values);
      }
      onCancel();
    } catch (err) {
      setError(err.message || 'Failed to save party');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this party?')) return;
    try {
      await onDelete(id);
      if (editingId === id) onCancel();
    } catch (err) {
      setError(err.message || 'Failed to delete party');
    }
  };

  // Helper for keyboard navigation
  const handleKeyDown = (e, nextFieldId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextFieldId) {
        document.getElementById(nextFieldId)?.focus();
      } else {
        // if no next field, perhaps submit form
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <div className="party-master-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <section className="panel">
        <h2>{editingId ? 'Edit Party' : 'Create Party'}</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="field">
              <span>GST No.</span>
              <input 
                id="party-gstin"
                {...register('gstin')} 
                onKeyDown={(e) => handleKeyDown(e, 'party-address')}
                placeholder="Enter GST Number" 
              />
              {errors.gstin && <small>{errors.gstin.message}</small>}
            </label>

            <label className="field">
              <span>Address</span>
              <input 
                id="party-address"
                {...register('address')} 
                onKeyDown={(e) => handleKeyDown(e, 'party-district')}
              />
              {errors.address && <small>{errors.address.message}</small>}
            </label>

            <label className="field">
              <span>District</span>
              <input 
                id="party-district"
                {...register('district')} 
                onKeyDown={(e) => handleKeyDown(e, 'party-pin')}
              />
              {errors.district && <small>{errors.district.message}</small>}
            </label>

            <label className="field">
              <span>PIN Code</span>
              <input 
                id="party-pin"
                {...register('pin_code')} 
                onKeyDown={(e) => handleKeyDown(e, 'party-name')}
              />
              {errors.pin_code && <small>{errors.pin_code.message}</small>}
            </label>
          </div>

          {/* MIDDLE COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="field">
              <span>Party Name <span style={{color: 'red'}}>*</span></span>
              <input 
                id="party-name"
                autoFocus
                {...register('name')} 
                onKeyDown={(e) => handleKeyDown(e, 'party-city')}
              />
              {errors.name && <small>{errors.name.message}</small>}
            </label>

            <label className="field">
              <span>City</span>
              <input 
                id="party-city"
                {...register('city')} 
                onKeyDown={(e) => handleKeyDown(e, 'party-state')}
              />
              {errors.city && <small>{errors.city.message}</small>}
            </label>

            <label className="field">
              <span>State</span>
              <input 
                id="party-state"
                {...register('state')} 
                onKeyDown={(e) => handleKeyDown(e, 'party-mobile')}
              />
              {errors.state && <small>{errors.state.message}</small>}
            </label>

            <label className="field">
              <span>Mobile Number</span>
              <input
                id="party-mobile"
                {...register('mobile')}
                onKeyDown={(e) => handleKeyDown(e, 'party-code')}
              />
              {errors.mobile && <small>{errors.mobile.message}</small>}
            </label>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="field">
              <span>Party Code <span style={{color: 'red'}}>*</span></span>
              <input
                id="party-code"
                {...register('code')}
                onKeyDown={(e) => handleKeyDown(e, 'party-submit')}
              />
              {errors.code && <small>{errors.code.message}</small>}
              <small className="stock-hint">Auto-generated, can be overridden.</small>
            </label>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button id="party-submit" type="submit" disabled={busy} style={{ flex: 1 }}>
                {busy ? 'Saving...' : editingId ? 'Update Party' : 'Save Party'}
              </button>
              {editingId && (
                <button type="button" onClick={onCancel} disabled={busy} className="secondary">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Parties List</h2>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>GSTIN</th>
                <th>City</th>
                <th>Mobile</th>
                <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6}>No parties found.</td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.code}</td>
                    <td>{row.name}</td>
                    <td>{row.gstin || '-'}</td>
                    <td>{row.city || '-'}</td>
                    <td>{row.mobile || '-'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-buttons">
                        <button className="icon-button" onClick={() => onEdit(row)}>✏️</button>
                        <button className="icon-button danger" onClick={() => handleDelete(row.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
