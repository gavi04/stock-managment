import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bootstrapSchema, loginSchema } from '../schemas/authSchemas.js';

const defaultValues = {
  fullName: '',
  username: '',
  password: ''
};

function Field({ label, error, registration, ...inputProps }) {
  const { ref, ...fieldProps } = registration ?? {};

  return (
    <label className="field">
      <span>{label}</span>
      <input ref={ref} {...fieldProps} {...inputProps} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}

export function AuthForm({ onLogin, onBootstrap, needsBootstrap, busy }) {
  const mode = needsBootstrap ? 'bootstrap' : 'login';
  const schema = mode === 'bootstrap' ? bootstrapSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const submit = async (values) => {
    if (mode === 'bootstrap') {
      await onBootstrap(values);
      return;
    }

    await onLogin(values);
  };

  return (
    <section className="auth-card">
      <div className="auth-header">
        <p className="eyebrow">StockOps</p>
        <h1>{mode === 'bootstrap' ? 'Create your login account' : 'Sign in'}</h1>
        <p>
          {mode === 'bootstrap'
            ? 'This happens once on first launch and creates your single local account.'
            : 'Use a local account to access the offline stock system.'}
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit(submit)}>
        {mode === 'bootstrap' ? (
          <Field label="Full name" error={errors.fullName?.message} registration={register('fullName')} />
        ) : null}

        <Field label="Username" error={errors.username?.message} registration={register('username')} />
        <Field label="Password" type="password" error={errors.password?.message} registration={register('password')} />

        <button type="submit" disabled={busy}>
          {busy ? 'Working...' : mode === 'bootstrap' ? 'Create Account' : 'Sign In'}
        </button>
      </form>
    </section>
  );
}