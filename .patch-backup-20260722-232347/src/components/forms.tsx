import { useState, type FormEvent, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Shared form primitives: labelled fields, validation, human errors  */
/* ------------------------------------------------------------------ */

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isPhone = (v: string) => /^[+\d][\d\s-]{6,17}$/.test(v.trim());

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  optional?: boolean;
  dark?: boolean;
}

function FieldShell({ id, label, error, children, optional, dark }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium ${dark ? "text-porcelain" : "text-ink"}`}>
        {label}
        {optional && <span className={`ml-2 font-normal ${dark ? "text-porcelain/50" : "text-carbon/50"}`}>(optional)</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-[#A2542F]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (dark?: boolean, error?: string) =>
  `w-full border px-4 py-3 text-sm focus:outline-none ${
    dark
      ? "border-porcelain/25 bg-transparent text-porcelain placeholder:text-porcelain/40 focus:border-brass"
      : "border-ink/20 bg-white text-carbon placeholder:text-carbon/40 focus:border-steel"
  } ${error ? "border-[#A2542F]" : ""}`;

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  dark?: boolean;
  autoComplete?: string;
}

export function TextField({ id, label, value, onChange, type = "text", placeholder, error, optional, dark, autoComplete }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} optional={optional} dark={dark}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls(dark, error)}
      />
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
  dark?: boolean;
}

export function SelectField({ id, label, value, onChange, options, placeholder = "Select one", error, dark }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} dark={dark}>
      <select
        id={id}
        value={value}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls(dark, error)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </FieldShell>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  dark?: boolean;
  rows?: number;
}

export function TextAreaField({ id, label, value, onChange, placeholder, error, optional, dark, rows = 4 }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} optional={optional} dark={dark}>
      <textarea
        id={id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls(dark, error)}
      />
    </FieldShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Lead gate: name / email / organisation, used for guides & teasers */
/* ------------------------------------------------------------------ */

interface LeadGateFormProps {
  /** What the person receives on success, e.g. "the ICU Guide". */
  itemLabel: string;
  submitLabel: string;
  onComplete: (lead: { name: string; email: string; organisation: string }) => void;
  dark?: boolean;
  idPrefix: string;
}

export function LeadGateForm({ itemLabel, submitLabel, onComplete, dark, idPrefix }: LeadGateFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; org?: string }>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Enter your full name so we know who we're sending this to.";
    if (!isEmail(email)) next.email = `Enter a valid email address because that is where ${itemLabel} will be sent.`;
    if (org.trim().length < 2) next.org = "Tell us your organisation (or 'Individual' if this is personal).";
    setErrors(next);
    if (Object.keys(next).length) return;
    onComplete({ name: name.trim(), email: email.trim(), organisation: org.trim() });
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <TextField id={`${idPrefix}-name`} label="Full name" value={name} onChange={setName} error={errors.name} dark={dark} autoComplete="name" placeholder="Adaeze Okonkwo" />
      <TextField id={`${idPrefix}-email`} label="Work email" value={email} onChange={setEmail} type="email" error={errors.email} dark={dark} autoComplete="email" placeholder="you@organisation.com" />
      <TextField id={`${idPrefix}-org`} label="Organisation" value={org} onChange={setOrg} error={errors.org} dark={dark} autoComplete="organization" placeholder="Your hospital, HMO or company" />
      <button
        type="submit"
        className={`mt-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors ${
          dark ? "bg-brass text-ink hover:bg-[#b98a49]" : "bg-steel text-porcelain hover:bg-[#3d5d8c]"
        }`}
      >
        {submitLabel}
      </button>
    </form>
  );
}
