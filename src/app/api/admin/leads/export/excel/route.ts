/**
 * API Route: /api/admin/leads/export/excel
 *
 * Export leads as Excel file with detailed scoring breakdown
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { guardRoute } from "@/lib/auth/guard";
import { escapeXml, escapeCsvCell } from "@/lib/security/escape";

// Neutralize spreadsheet formula injection THEN XML-encode. Excel treats
// ss:Type="String" cells as literal text, so this is defense-in-depth, but it
// keeps parity with the CSV export and protects if a cell is ever re-typed.
const cell = (v: unknown): string => escapeXml(escapeCsvCell(v));

/**
 * Coerce a value destined for an `ss:Type="Number"` cell.
 *
 * SECURITY: several of these values come from JSONB columns fed by the client
 * (`estimate`, `score_breakdown`, `enrichment_data`), so they are not guaranteed
 * to be numbers. `${estimate.min || 0}` interpolated a string verbatim, letting
 * a crafted value close the tag and inject arbitrary SpreadsheetML
 * (`</Data></Cell><Cell>…`). Number() collapses anything non-numeric to 0.
 */
const num = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export async function GET() {
  const denied = await guardRoute("sales");
  if (denied) return denied;
  try {
    // Fetch all leads from database
    const leads = await db.leads.getAll({ limit: 10000 });

    if (leads.length === 0) {
      return new NextResponse("No leads found", { status: 404 });
    }

    // Generate Excel XML (Office Open XML format)
    const excelXML = generateExcelXML(leads);

    // Return Excel file
    return new NextResponse(excelXML, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="leads-detailed-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("❌ Error exporting Excel:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 },
    );
  }
}

function generateExcelXML(leads: any[]): string {
  // Generate rows
  const rows = leads
    .map((lead: any, index: number) => {
      const breakdown = lead.score_breakdown || {};
      const estimate = lead.estimate || {};
      const enrichment = lead.enrichment_data || {};

      return `
    <Row>
      <Cell><Data ss:Type="Number">${index + 1}</Data></Cell>
      <Cell><Data ss:Type="String">${new Date(lead.created_at).toLocaleDateString("fr-FR")}</Data></Cell>
      <Cell><Data ss:Type="String">${new Date(lead.created_at).toLocaleTimeString("fr-FR")}</Data></Cell>
      <Cell ss:StyleID="grade${escapeXml(lead.score_grade)}"><Data ss:Type="String">${escapeXml(lead.score_grade)}</Data></Cell>
      <Cell ss:StyleID="score"><Data ss:Type="Number">${num(lead.score_total)}</Data></Cell>
      <Cell><Data ss:Type="Number">${num(lead.score_confidence)}</Data></Cell>
      <Cell><Data ss:Type="String">${cell(lead.name)}</Data></Cell>
      <Cell><Data ss:Type="String">${cell(lead.email)}</Data></Cell>
      <Cell><Data ss:Type="String">${cell(lead.company || "")}</Data></Cell>
      <Cell><Data ss:Type="String">${cell(lead.phone || "")}</Data></Cell>
      <Cell><Data ss:Type="String">${cell(lead.project_type || "")}</Data></Cell>
      <Cell ss:StyleID="currency"><Data ss:Type="Number">${num(estimate.min)}</Data></Cell>
      <Cell ss:StyleID="currency"><Data ss:Type="Number">${num(estimate.max)}</Data></Cell>
      <Cell ss:StyleID="breakdown"><Data ss:Type="Number">${num(breakdown.project)}</Data></Cell>
      <Cell ss:StyleID="breakdown"><Data ss:Type="Number">${num(breakdown.engagement)}</Data></Cell>
      <Cell ss:StyleID="breakdown"><Data ss:Type="Number">${num(breakdown.completion)}</Data></Cell>
      <Cell ss:StyleID="breakdown"><Data ss:Type="Number">${num(breakdown.enrichment)}</Data></Cell>
      <Cell ss:StyleID="breakdown"><Data ss:Type="Number">${num(breakdown.behavioral)}</Data></Cell>
      <Cell><Data ss:Type="String">${cell(enrichment.company || "")}</Data></Cell>
      <Cell><Data ss:Type="Number">${num(lead.enrichment_score)}</Data></Cell>
      <Cell><Data ss:Type="String">${cell(lead.confidence_level || "")}</Data></Cell>
    </Row>`;
    })
    .join("");

  // Full Excel XML
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>Smidjan Lead Scoring System</Author>
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Font ss:FontName="Calibri" ss:Size="11"/>
  </Style>
  <Style ss:ID="header">
   <Font ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#FF6A00" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
   </Borders>
  </Style>
  <Style ss:ID="gradeHOT">
   <Font ss:Bold="1" ss:Color="#FF4444"/>
   <Interior ss:Color="#FFE0E0" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="gradeWARM">
   <Font ss:Bold="1" ss:Color="#FF8800"/>
   <Interior ss:Color="#FFF3CD" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="gradeCOLD">
   <Font ss:Bold="1" ss:Color="#2196F3"/>
   <Interior ss:Color="#E3F2FD" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="gradeSPAM">
   <Font ss:Color="#999999"/>
   <Interior ss:Color="#F5F5F5" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="score">
   <Font ss:Bold="1" ss:Size="12"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="currency">
   <NumberFormat ss:Format="# ##0 [$EUR]"/>
  </Style>
  <Style ss:ID="breakdown">
   <Interior ss:Color="#F0F0F0" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Leads">
  <Table>
   <Column ss:Width="40"/>
   <Column ss:Width="100"/>
   <Column ss:Width="80"/>
   <Column ss:Width="70"/>
   <Column ss:Width="70"/>
   <Column ss:Width="80"/>
   <Column ss:Width="150"/>
   <Column ss:Width="200"/>
   <Column ss:Width="150"/>
   <Column ss:Width="120"/>
   <Column ss:Width="120"/>
   <Column ss:Width="100"/>
   <Column ss:Width="100"/>
   <Column ss:Width="80"/>
   <Column ss:Width="100"/>
   <Column ss:Width="90"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="150"/>
   <Column ss:Width="120"/>
   <Column ss:Width="100"/>
   <Row ss:Height="30">
    <Cell ss:StyleID="header"><Data ss:Type="String">#</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Date</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Heure</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Grade</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Score</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Confiance %</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Nom</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Email</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Entreprise</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Téléphone</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Type de projet</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Budget Min</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Budget Max</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Score Projet</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Score Engagement</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Score Complétion</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Score Enrichissement</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Score Comportement</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Données Enrichies</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Score Enrichissement</Data></Cell>
    <Cell ss:StyleID="header"><Data ss:Type="String">Niveau de Confiance</Data></Cell>
   </Row>
   ${rows}
  </Table>
 </Worksheet>
</Workbook>`;
}
