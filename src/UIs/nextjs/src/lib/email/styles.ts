/**
 * Email HTML styles centralisés - DRY principle
 * Tous les styles inline pour emails HTML (nécessaire pour compatibilité clients email)
 */

export const EMAIL_STYLES = {
  // Container principal
  body: `
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
  `.trim(),

  // Wrapper pour centrer l'email
  wrapper: `
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  `.trim(),

  // Header avec gradient orange
  header: `
    background: linear-gradient(135deg, #ff6a00, #ffc43a);
    padding: 30px 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  `.trim(),

  // Logo dans le header
  logo: `
    max-width: 120px;
    height: auto;
    margin-bottom: 15px;
  `.trim(),

  // Titre dans header (blanc)
  headerTitle: `
    color: white;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `.trim(),

  // Corps du message (blanc)
  content: `
    background: white;
    padding: 40px 30px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  `.trim(),

  // Titre de section
  sectionTitle: `
    color: #ff6a00;
    font-size: 20px;
    font-weight: 600;
    margin: 30px 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #ff6a00;
  `.trim(),

  // Paragraphe
  paragraph: `
    color: #555;
    font-size: 16px;
    line-height: 1.6;
    margin: 15px 0;
  `.trim(),

  // Liste
  list: `
    margin: 20px 0;
    padding-left: 20px;
  `.trim(),

  listItem: `
    color: #555;
    font-size: 15px;
    line-height: 1.8;
    margin: 8px 0;
  `.trim(),

  // Box d'information (bordure orange gauche)
  infoBox: `
    background: #fff9f5;
    border-left: 3px solid #ff6a00;
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 4px;
  `.trim(),

  // Label (gras orange)
  label: `
    color: #ff6a00;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `.trim(),

  // Valeur
  value: `
    color: #333;
    font-size: 16px;
    margin: 5px 0;
  `.trim(),

  // Bouton principal (CTA)
  button: `
    display: inline-block;
    background: linear-gradient(135deg, #ff6a00, #ffc43a);
    color: white;
    padding: 15px 40px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    margin: 20px 0;
    box-shadow: 0 4px 12px rgba(255, 106, 0, 0.3);
    transition: all 0.3s ease;
  `.trim(),

  // Bouton secondaire
  buttonSecondary: `
    display: inline-block;
    background: white;
    color: #ff6a00;
    border: 2px solid #ff6a00;
    padding: 12px 30px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    margin: 10px 5px;
  `.trim(),

  // Footer
  footer: `
    text-align: center;
    padding: 30px 20px;
    color: #999;
    font-size: 13px;
    line-height: 1.8;
  `.trim(),

  // Lien dans footer
  footerLink: `
    color: #ff6a00;
    text-decoration: none;
    font-weight: 500;
  `.trim(),

  // Divider (ligne de séparation)
  divider: `
    border: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, #ddd, transparent);
    margin: 30px 0;
  `.trim(),

  // Badge de status
  badge: `
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `.trim(),

  badgeSuccess: `
    background: #d4edda;
    color: #155724;
  `.trim(),

  badgeWarning: `
    background: #fff3cd;
    color: #856404;
  `.trim(),

  badgeDanger: `
    background: #f8d7da;
    color: #721c24;
  `.trim(),

  badgeInfo: `
    background: #d1ecf1;
    color: #0c5460;
  `.trim(),

  // Table (pour données structurées)
  table: `
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  `.trim(),

  tableHeader: `
    background: #f8f9fa;
    color: #333;
    font-weight: 600;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #ff6a00;
  `.trim(),

  tableCell: `
    padding: 12px;
    border-bottom: 1px solid #e9ecef;
    color: #555;
  `.trim(),

  tableRow: `
    transition: background 0.2s ease;
  `.trim(),

  tableRowHover: `
    background: #f8f9fa;
  `.trim(),
} as const;

/**
 * Helper pour combiner plusieurs styles
 */
export const combineStyles = (...styles: string[]): string => {
  return styles.map((s) => s.trim()).join("; ") + ";";
};
