"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./ProjectsSwitch.module.css";

export interface ProjectsSwitchTab {
  /** Identifiant stable, utilisé pour les liens aria entre onglet et panneau. */
  id: string;
  label: string;
  /** Nombre de projets du groupe, affiché en pastille. */
  count: number;
  /** Contenu rendu côté serveur : le composant ne fait que le montrer ou le cacher. */
  panel: ReactNode;
}

export interface ProjectsSwitchProps {
  tabs: ProjectsSwitchTab[];
  ariaLabel: string;
}

/**
 * ProjectsSwitch — bascule entre « ce qui est déjà construit » et « ce qui est
 * en cours de construction », sur la même page.
 *
 * Les panneaux sont rendus côté serveur et passés en props : ce composant client
 * ne fabrique aucun contenu, il ne fait que choisir lequel montrer. Les
 * traductions et le rendu des projets restent donc dans le composant serveur.
 *
 * Le panneau inactif est retiré avec l'attribut `hidden` et non masqué en CSS :
 * ses liens sortent ainsi du parcours de tabulation et de l'arbre
 * d'accessibilité, au lieu d'être invisibles mais toujours atteignables.
 */
export function ProjectsSwitch({ tabs, ariaLabel }: ProjectsSwitchProps) {
  const [active, setActive] = useState(0);
  const base = useId();
  const boutons = useRef<Array<HTMLButtonElement | null>>([]);

  const idOnglet = (i: number) => `${base}-tab-${tabs[i].id}`;
  const idPanneau = (i: number) => `${base}-panel-${tabs[i].id}`;

  /**
   * Navigation clavier attendue d'une barre d'onglets : les flèches déplacent
   * la sélection, Origine/Fin vont aux extrémités. Sans cela, le composant
   * serait utilisable à la souris seulement.
   *
   * Le déplacement part de l'onglet qui a le FOCUS (`depuis`), pas de celui qui
   * est sélectionné : les deux coïncident en usage normal, mais les dissocier
   * rendrait le clavier incohérent dès qu'ils divergent.
   */
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, depuis: number) {
    const dernier = tabs.length - 1;
    let cible: number | null = null;
    if (event.key === "ArrowRight") cible = depuis === dernier ? 0 : depuis + 1;
    else if (event.key === "ArrowLeft") cible = depuis === 0 ? dernier : depuis - 1;
    else if (event.key === "Home") cible = 0;
    else if (event.key === "End") cible = dernier;
    if (cible === null) return;

    event.preventDefault();
    setActive(cible);
    boutons.current[cible]?.focus();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, i) => {
          const estActif = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                boutons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={idOnglet(i)}
              aria-selected={estActif}
              aria-controls={idPanneau(i)}
              // Un seul onglet dans l'ordre de tabulation : on entre dans la
              // barre par Tab, on s'y déplace ensuite aux flèches.
              tabIndex={estActif ? 0 : -1}
              className={`${styles.tab} ${estActif ? styles.active : ""}`}
              onClick={() => setActive(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
            >
              {tab.label}
              <span className={styles.count}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={idPanneau(i)}
          aria-labelledby={idOnglet(i)}
          hidden={i !== active}
          tabIndex={0}
          className={styles.panel}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

export default ProjectsSwitch;
