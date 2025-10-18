"use client";
import { useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./CTA.module.css";

export function CTA() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formState.honeypot) return false; // bot
    if (!formState.name.trim()) newErrors.name = "Le nom est requis";
    if (!formState.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = "Email invalide";
    if (!formState.message.trim()) newErrors.message = "Le message est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", message: "", honeypot: "" });
    } catch (err) {
      setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Prêt à transformer votre vision en réalité ?</h2>
          <p className={styles.description}>
            Discutons de votre projet et découvrez comment nous pouvons propulser votre présence digitale
          </p>
          {submitSuccess ? (
            <div className={styles.success} role="alert">
              <h3>Message envoyé avec succès ! 🎉</h3>
              <p>Nous vous répondrons sous 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Nom</label>
                  <input id="name" type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className={`${styles.input} ${errors.name ? styles.error : ""}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                  {errors.name && (<span id="name-error" className={styles.errorText} role="alert">{errors.name}</span>)}
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input id="email" type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className={`${styles.input} ${errors.email ? styles.error : ""}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                  {errors.email && (<span id="email-error" className={styles.errorText} role="alert">{errors.email}</span>)}
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea id="message" rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className={`${styles.textarea} ${errors.message ? styles.error : ""}`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                {errors.message && (<span id="message-error" className={styles.errorText} role="alert">{errors.message}</span>)}
              </div>
              <input type="text" name="website" value={formState.honeypot} onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })} className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button type="submit" disabled={isSubmitting} className={styles.submit} aria-label={isSubmitting ? "Envoi en cours..." : "Envoyer le message"}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                <ArrowRight size={20} aria-hidden="true" />
              </button>
              {errors.submit && (<div className={styles.errorText} role="alert">{errors.submit}</div>)}
            </form>
          )}
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Email</span><a href="mailto:contact@yourbrand.com" className={styles.infoLink}>contact@yourbrand.com</a></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Téléphone</span><a href="tel:+33123456789" className={styles.infoLink}>+33 1 23 45 67 89</a></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Réponse sous 24h — 98% de satisfaction</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

