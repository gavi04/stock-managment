-- Add one-time recovery code hash for offline password reset.
ALTER TABLE "users" ADD COLUMN "recovery_code_hash" TEXT;
