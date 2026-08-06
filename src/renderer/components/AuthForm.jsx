import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bootstrapSchema, loginSchema, resetPasswordSchema } from '../schemas/authSchemas.js';

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

// Shown once, right after an account is created or a password is reset. The code
// only exists in plaintext here — after this screen only its hash is stored.
function RecoveryCodePanel({ code, context, onDone }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-header">
        <p className="eyebrow">StockOps</p>
        <h1>Save your recovery code</h1>
        <p>
          {context === 'reset'
            ? 'Your password was reset. Here is your new recovery code — the old one no longer works.'
            : 'Write this code down and keep it safe. It is the only way to reset your password if you forget it.'}
        </p>
      </div>

      <div className="recovery-code-box">{code}</div>

      <p className="stock-hint" style={{ textAlign: 'center' }}>
        We can’t show this again — it isn’t stored in a readable form.
      </p>

      <div className="auth-actions">
        <button type="button" className="ghost-light-btn" onClick={copy}>
          {copied ? 'Copied' : 'Copy code'}
        </button>
        <button type="button" onClick={onDone}>
          I’ve saved it — continue
        </button>
      </div>
    </section>
  );
}

function ResetForm({ busy, onReset, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { username: '', recoveryCode: '', newPassword: '' }
  });

  return (
    <section className="auth-card">
      <div className="auth-header">
        <p className="eyebrow">StockOps</p>
        <h1>Reset password</h1>
        <p>Enter your username and the recovery code you saved when the account was created.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit(onReset)}>
        <Field label="Username" error={errors.username?.message} registration={register('username')} />
        <Field
          label="Recovery code"
          error={errors.recoveryCode?.message}
          registration={register('recoveryCode')}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          autoComplete="off"
        />
        <Field
          label="New password"
          type="password"
          error={errors.newPassword?.message}
          registration={register('newPassword')}
        />

        <button type="submit" disabled={busy}>
          {busy ? 'Working...' : 'Reset Password'}
        </button>
      </form>

      <button type="button" className="link-button" onClick={onBack}>
        Back to sign in
      </button>
    </section>
  );
}

export function AuthForm({ onLogin, onBootstrap, onReset, needsBootstrap, busy }) {
  const [recoveryInfo, setRecoveryInfo] = useState(null); // { code, context }
  const [showReset, setShowReset] = useState(false);

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

  if (recoveryInfo) {
    return (
      <RecoveryCodePanel
        code={recoveryInfo.code}
        context={recoveryInfo.context}
        onDone={() => {
          setRecoveryInfo(null);
          setShowReset(false);
        }}
      />
    );
  }

  if (mode === 'login' && showReset) {
    return (
      <ResetForm
        busy={busy}
        onBack={() => setShowReset(false)}
        onReset={async (values) => {
          const code = await onReset(values);
          if (code) setRecoveryInfo({ code, context: 'reset' });
        }}
      />
    );
  }

  const submit = async (values) => {
    if (mode === 'bootstrap') {
      const code = await onBootstrap(values);
      if (code) setRecoveryInfo({ code, context: 'bootstrap' });
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

      {mode === 'login' ? (
        <button type="button" className="link-button" onClick={() => setShowReset(true)}>
          Forgot password?
        </button>
      ) : null}
    </section>
  );
}
