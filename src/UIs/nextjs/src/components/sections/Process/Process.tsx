"use client";
import styles from "./Process.module.css";

export function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      content: (
        <div className={styles.panel}>
          <p>We dive deep into your goals, audience, and market landscape to identify what truly differentiates your brand. Through workshops and data analysis, we uncover both risks and untapped opportunities.</p>
          <p>Deliverables: benchmark report, UX strategy outline, technical feasibility notes.</p>
        </div>
      ),
    },
    {
      num: "02",
      title: "Design",
      content: (
        <div className={styles.panel}>
          <p>Design systems, wireframes and interactive prototypes that bring clarity and speed to decision making.</p>
          <p>Deliverables: design system foundations, wireframe kit, prototype tests.</p>
        </div>
      ),
    },
    {
      num: "03",
      title: "Development",
      content: (
        <div className={styles.panel}>
          <p>Clean code, optimized performance, CI/CD, tests and robust security baked in from day one.</p>
          <p>Deliverables: production‑ready code, perf budget, test coverage report.</p>
        </div>
      ),
    },
    {
      num: "04",
      title: "Launch",
      content: (
        <div className={styles.panel}>
          <p>Deployment, monitoring and continuous support with iterative improvements based on real‑world insights.</p>
          <p>Deliverables: deployment checklist, monitoring dashboard, iteration roadmap.</p>
        </div>
      ),
    },
  ];
  return (
    <section id="process" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Notre Processus Créatif</h2>
          <p className={styles.desc}>A proven methodology that balances creativity and technical precision. Each stage — from discovery to launch — aligns strategy, design and technology in one coherent journey.</p>
        </div>
        <section className={styles.processModule} aria-label="Processus créatif">
          {steps.map((s, i) => (
            <details key={i} className={styles.processAcc} {...(i === 0 ? { open: true } : {})}>
              <summary>
                <span className={styles.stepNum}>{s.num}</span> {s.title}
              </summary>
              {s.content}
            </details>
          ))}
        </section>
      </div>
    </section>
  );
}
