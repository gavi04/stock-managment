import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  product_id: z.coerce.number().int().positive(),
  party_id: z.coerce.number().int().positive().optional().nullable(),
  quantity: z.coerce.number().positive(),
  rate: z.coerce.number().min(0),
  notes: z.string().optional()
});

export function VoucherEntryPanel({ title, products, parties, onSubmitVoucher, sign = 1 }) {
  const [availableStock, setAvailableStock] = useState(0);
  const [loadingStock, setLoadingStock] = useState(false);
  const defaultValues = useMemo(
    () => ({
      product_id: products[0]?.id ?? '',
      party_id: parties[0]?.id ?? '',
      quantity: 1,
      rate: 0,
      notes: ''
    }),
    [products, parties]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const selectedProductId = watch('product_id');
  const selectedProduct = products.find((product) => String(product.id) === String(selectedProductId));

  useEffect(() => {
    let active = true;

    const loadStock = async () => {
      if (sign >= 0 || !selectedProduct?.id) {
        setAvailableStock(0);
        return;
      }

      setLoadingStock(true);
      try {
        const balance = await window.stockOps.getStockBalance(selectedProduct.id, 1);
        if (active) {
          setAvailableStock(Number(balance ?? 0));
        }
      } finally {
        if (active) {
          setLoadingStock(false);
        }
      }
    };

    loadStock().catch(() => undefined);

    return () => {
      active = false;
    };
  }, [selectedProduct?.id, sign]);

  const submit = async (values) => {
    const quantity = Number(values.quantity) * sign;

    if (sign < 0 && Number(values.quantity) > availableStock) {
      setError('quantity', {
        type: 'validate',
        message: `Maximum available stock is ${Number(availableStock).toFixed(3)}`
      });
      return;
    }

    clearErrors('quantity');
    await onSubmitVoucher({ ...values, quantity });
    reset(defaultValues);
  };

  return (
    <section className="panel">
      <h2>{title}</h2>
      <form className="inline-form" onSubmit={handleSubmit(submit)}>
        <label>
          Product
          <select {...register('product_id')}>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.code})
              </option>
            ))}
          </select>
          {errors.product_id ? <small>{errors.product_id.message}</small> : null}
        </label>

        <label>
          Party
          <select {...register('party_id')}>
            {parties.map((party) => (
              <option key={party.id} value={party.id}>
                {party.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantity
          <input
            type="number"
            step="0.001"
            max={sign < 0 ? availableStock : undefined}
            {...register('quantity')}
          />
          {sign < 0 ? (
            <small className="stock-hint">
              {loadingStock
                ? 'Loading available stock...'
                : `Available stock: ${Number(availableStock).toFixed(3)}${selectedProduct ? ` for ${selectedProduct.name}` : ''}`}
            </small>
          ) : null}
          {errors.quantity ? <small>{errors.quantity.message}</small> : null}
        </label>

        <label>
          Rate
          <input type="number" step="0.01" {...register('rate')} />
        </label>

        <label>
          Notes
          <input {...register('notes')} />
        </label>

        <button type="submit">Post Voucher</button>
      </form>
    </section>
  );
}