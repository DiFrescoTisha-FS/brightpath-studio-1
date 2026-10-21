import React, { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BrightPathGradientTitle from './BrightPathGradientTitle';
import { IS_PRERENDER } from '@/utils/isPrerender';

/**
 * Newsletter signup for the MailerLite "BrightPath Updates" group.
 *
 * Posts to the `newsletter-subscribe` Netlify function, which holds the
 * MailerLite credentials — nothing secret ever reaches the browser.
 *
 * Hidden unless `VITE_NEWSLETTER_ENABLED=true` at build time, so the form
 * can't appear on the live site before MailerLite's sending domain and
 * double opt-in flow have been verified. See NEWSLETTER-SETUP.md.
 */
export const NEWSLETTER_ENABLED = import.meta.env.VITE_NEWSLETTER_ENABLED === 'true';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const SUBSCRIBE_URL = `${API_BASE_URL}/api/newsletter-subscribe`;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Bot check: the function ignores signups sent sooner than this after the form
// appeared. Rather than refuse a quick visitor (autofill makes 1-2 s possible),
// the form waits out the remainder while showing "Subscribing…". Kept a little
// above MIN_ELAPSED_MS (3000) in netlify/functions/newsletter-subscribe.js so
// timer jitter can't land a real signup just under it.
const NEWSLETTER_MIN_FILL_MS = 3250;

// The function answers 'pending_confirmation' for every accepted signup —
// new or already on the list — so the form never reveals who is subscribed.
type ResultStatus =
  | 'pending_confirmation'
  | 'missing_email'
  | 'invalid_email'
  | 'rate_limited'
  | 'unavailable'
  | 'error';

const ERROR_MESSAGES: Partial<Record<ResultStatus, string>> = {
  missing_email: 'Please enter your email address.',
  invalid_email: 'Please enter a valid email address, like name@example.com.',
  rate_limited: 'Too many attempts. Please wait a few minutes and try again.',
  unavailable: 'Newsletter signup isn’t available right now. Please try again later.',
  error: 'Something went wrong and you weren’t subscribed. Please try again in a moment.',
};

const NewsletterSignup: React.FC = () => {
  const ids = useId();
  const headingId = `${ids}-heading`;
  const emailErrorId = `${ids}-email-error`;
  const privacyId = `${ids}-privacy`;

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<ResultStatus | null>(null);
  const [success, setSuccess] = useState(false);

  // A ref, not just state: a fast double-click can fire twice before React
  // re-renders the disabled button.
  const inFlight = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  // performance.now() is monotonic, so a clock change can't shorten the wait.
  const shownAt = useRef<number | null>(null);
  useEffect(() => {
    shownAt.current = performance.now();
  }, []);

  const validateEmail = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return ERROR_MESSAGES.missing_email!;
    if (trimmed.length > 254 || !EMAIL_PATTERN.test(trimmed)) return ERROR_MESSAGES.invalid_email!;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;

    setFormError(null);
    const clientError = validateEmail(email);
    setEmailError(clientError);
    if (clientError) {
      emailRef.current?.focus();
      return;
    }

    inFlight.current = true;
    setSubmitting(true);

    let status: ResultStatus = 'error';
    try {
      const startedAt = shownAt.current ?? performance.now();
      const remaining = NEWSLETTER_MIN_FILL_MS - (performance.now() - startedAt);
      if (remaining > 0) await new Promise((resolve) => window.setTimeout(resolve, remaining));

      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          bp_newsletter_extra: honeypot,
          elapsedMs: Math.round(performance.now() - startedAt),
        }),
        // The function requires an Origin header. Browsers send it on POSTs,
        // but a stricter page-wide policy (no-referrer) would turn it into
        // "null"; this request-level policy keeps it.
        referrerPolicy: 'strict-origin-when-cross-origin',
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      const data = await response.json().catch(() => null);
      if (data && typeof data.status === 'string') status = data.status as ResultStatus;
    } catch {
      status = 'error';
    }

    inFlight.current = false;
    setSubmitting(false);

    if (status === 'pending_confirmation') {
      setSuccess(true);
      setFirstName('');
      setEmail('');
      // Move focus to the confirmation so keyboard and screen-reader users
      // aren't left on a form that has just disappeared.
      window.requestAnimationFrame(() => successRef.current?.focus());
    } else if (status === 'missing_email' || status === 'invalid_email') {
      setEmailError(ERROR_MESSAGES[status]!);
      emailRef.current?.focus();
    } else {
      setFormError(status);
    }
  };

  return (
    <section className="newsletter" aria-labelledby={headingId}>
      <BrightPathGradientTitle
        as="h2"
        id={headingId}
        className="font-poppins font-bold text-xl md:text-2xl mb-2"
        textColor="text-neutral-800 dark:text-gray-100"
        gradientWords={['BrightPath']}
        emphasis="solid"
      >
        Stay Connected with BrightPath
      </BrightPathGradientTitle>
      <p className="services-body font-lato text-sm md:text-base leading-normal md:leading-relaxed mb-6">
        Get occasional updates on our latest projects, helpful website tips, and what’s happening at
        BrightPath Web Studio.
      </p>

      {success ? (
        <p
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="newsletter__success font-lato text-sm md:text-base"
        >
          Thanks for signing up! If this is a new subscription, you’ll get an email shortly asking you
          to confirm it. Nothing arrived? Check your spam folder, or <Link to="/contact">contact us</Link>.
        </p>
      ) : (
        <form
          className="newsletter__form"
          onSubmit={handleSubmit}
          noValidate
          aria-describedby={privacyId}
          aria-busy={submitting}
        >
          <div className="newsletter__field">
            <label htmlFor={`${ids}-first-name`} className="newsletter__label">
              First name <span className="newsletter__optional">(optional)</span>
            </label>
            <input
              id={`${ids}-first-name`}
              name="firstName"
              type="text"
              autoComplete="given-name"
              maxLength={100}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="newsletter__input"
            />
          </div>

          <div className="newsletter__field">
            <label htmlFor={`${ids}-email`} className="newsletter__label">
              Email address<span aria-hidden="true"> *</span>
            </label>
            <input
              ref={emailRef}
              id={`${ids}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-required="true"
              maxLength={254}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? emailErrorId : undefined}
              className="newsletter__input"
            />
          </div>

          {/* Honeypot — hidden from people and assistive tech; bots fill it.
              Deliberately not named "company"/"website": browser autofill and
              password managers fill those, which would silently drop real
              signups. */}
          <div className="newsletter__trap" aria-hidden="true">
            <label htmlFor={`${ids}-extra`}>Leave this field empty</label>
            <input
              id={`${ids}-extra`}
              name="bp_newsletter_extra"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              data-1p-ignore="true"
              data-lpignore="true"
              data-bwignore="true"
              data-form-type="other"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="studio-cta studio-cta--primary newsletter__submit"
            // Disabled in the prerendered HTML so the form can't be submitted
            // natively (email in the URL) before the app takes over.
            disabled={submitting || IS_PRERENDER}
          >
            {submitting ? 'Subscribing…' : 'Keep Me Updated'}
          </button>

          {emailError && (
            <p id={emailErrorId} className="newsletter__error newsletter__error--field font-lato text-sm" role="alert">
              {emailError}
            </p>
          )}
        </form>
      )}

      {formError && !success && (
        <p className="newsletter__error font-lato text-sm" role="alert">
          {ERROR_MESSAGES[formError] ?? ERROR_MESSAGES.error}
        </p>
      )}

      <p id={privacyId} className="newsletter__privacy font-lato text-xs md:text-sm">
        We’ll only use your details to send BrightPath updates, delivered through our email provider,
        MailerLite. Unsubscribe anytime. See our <Link to="/privacy-policy#newsletter">Privacy Policy</Link>.
      </p>
    </section>
  );
};

export default NewsletterSignup;
