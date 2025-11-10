'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  TrendingUp,
  Users,
  Filter,
  Download,
  Mail,
  Phone,
  Building,
  Calendar,
  Star,
  Activity,
  LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { LEAD_COLORS, STATS_COLORS } from '@/lib/constants/colors';
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar';
import cls from './page.module.css';

interface Lead {
  id: string;
  email: string;
  name: string;
  company: string | null;
  phone: string | null;
  score_total: number;
  score_grade: 'HOT' | 'WARM' | 'COLD' | 'SPAM';
  score_confidence: number;
  score_breakdown: {
    project: number;
    engagement: number;
    completion: number;
    enrichment: number;
    behavioral: number;
  };
  project_type: string;
  estimate: {
    min: number;
    max: number;
  };
  created_at: string;
}

interface LeadsStats {
  total: number;
  hot: number;
  warm: number;
  cold: number;
  avgScore: number;
  todayCount: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'HOT' | 'WARM' | 'COLD' | 'SPAM'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch leads from API
  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = filter === 'all'
        ? '/api/leadScoring/leads'
        : `/api/leadScoring/leads?grade=${filter}`;

      const response = await fetch(url);
      const data = await response.json();

      setLeads(data.leads || []);
      calculateStats(data.leads || []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const today = new Date().toISOString().split('T')[0];

    const stats: LeadsStats = {
      total: leadsData.length,
      hot: leadsData.filter(l => l.score_grade === 'HOT').length,
      warm: leadsData.filter(l => l.score_grade === 'WARM').length,
      cold: leadsData.filter(l => l.score_grade === 'COLD').length,
      avgScore: leadsData.length > 0
        ? Math.round(leadsData.reduce((sum, l) => sum + l.score_total, 0) / leadsData.length)
        : 0,
      todayCount: leadsData.filter(l =>
        l.created_at.split('T')[0] === today
      ).length,
    };

    setStats(stats);
  };

  const filteredLeads = leads.filter(lead => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.company?.toLowerCase().includes(query) ||
      lead.phone?.includes(query)
    );
  });

  const exportCSV = async () => {
    try {
      const response = await fetch('/api/admin/leads/export/csv');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export CSV:', error);
    }
  };

  const exportExcel = async () => {
    try {
      const response = await fetch('/api/admin/leads/export/excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-detailed-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export Excel:', error);
    }
  };

  if (loading && !stats) {
    return (
      <div className={cls.container}>
        <div className={cls.loading}>
          <Activity className={cls.spinner} size={48} />
          <p>Chargement des leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cls.container}>
      <Breadcrumb items={[
        { label: 'Admin', href: '/admin' },
        { label: 'Leads', href: '/admin/leads' }
      ]} />

      <div className={cls.header}>
        <div className={cls.headerTop}>
          <h1 className={cls.title}>
            <Users size={32} />
            Dashboard des Leads
          </h1>
          <div className={cls.headerActions}>
            <button onClick={exportCSV} className={cls.btnSecondary}>
              <Download size={18} />
              Export CSV
            </button>
            <button onClick={exportExcel} className={cls.btnPrimary}>
              <Download size={18} />
              Export Excel
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className={cls.btnLogout}
              title="Sign out"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className={cls.statsGrid}>
            <div className={cls.statCard}>
              <div className={cls.statIcon} style={{ background: STATS_COLORS.total }}>
                <Users size={24} />
              </div>
              <div className={cls.statContent}>
                <div className={cls.statValue}>{stats.total}</div>
                <div className={cls.statLabel}>Total Leads</div>
              </div>
            </div>

            <div className={cls.statCard}>
              <div className={cls.statIcon} style={{ background: LEAD_COLORS.HOT }}>
                <TrendingUp size={24} />
              </div>
              <div className={cls.statContent}>
                <div className={cls.statValue}>{stats.hot}</div>
                <div className={cls.statLabel}>Hot Leads</div>
              </div>
            </div>

            <div className={cls.statCard}>
              <div className={cls.statIcon} style={{ background: LEAD_COLORS.WARM }}>
                <Star size={24} />
              </div>
              <div className={cls.statContent}>
                <div className={cls.statValue}>{stats.warm}</div>
                <div className={cls.statLabel}>Warm Leads</div>
              </div>
            </div>

            <div className={cls.statCard}>
              <div className={cls.statIcon} style={{ background: STATS_COLORS.average }}>
                <Activity size={24} />
              </div>
              <div className={cls.statContent}>
                <div className={cls.statValue}>{stats.avgScore}</div>
                <div className={cls.statLabel}>Score Moyen</div>
              </div>
            </div>

            <div className={cls.statCard}>
              <div className={cls.statIcon} style={{ background: STATS_COLORS.today }}>
                <Calendar size={24} />
              </div>
              <div className={cls.statContent}>
                <div className={cls.statValue}>{stats.todayCount}</div>
                <div className={cls.statLabel}>Aujourd'hui</div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className={cls.filters}>
          <div className={cls.filterGroup}>
            <Filter size={18} />
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? cls.filterActive : cls.filterBtn}
            >
              Tous ({stats?.total || 0})
            </button>
            <button
              onClick={() => setFilter('HOT')}
              className={filter === 'HOT' ? cls.filterActive : cls.filterBtn}
              style={{ borderColor: filter === 'HOT' ? LEAD_COLORS.HOT : undefined }}
            >
              🔥 Hot ({stats?.hot || 0})
            </button>
            <button
              onClick={() => setFilter('WARM')}
              className={filter === 'WARM' ? cls.filterActive : cls.filterBtn}
              style={{ borderColor: filter === 'WARM' ? LEAD_COLORS.WARM : undefined }}
            >
              ⚡ Warm ({stats?.warm || 0})
            </button>
            <button
              onClick={() => setFilter('COLD')}
              className={filter === 'COLD' ? cls.filterActive : cls.filterBtn}
              style={{ borderColor: filter === 'COLD' ? LEAD_COLORS.COLD : undefined }}
            >
              ❄️ Cold ({stats?.cold || 0})
            </button>
          </div>

          <input
            type="search"
            placeholder="Rechercher par nom, email, entreprise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cls.searchInput}
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className={cls.tableWrapper}>
        {filteredLeads.length === 0 ? (
          <div className={cls.emptyState}>
            <Users size={64} className={cls.emptyIcon} />
            <h3>Aucun lead trouvé</h3>
            <p>
              {searchQuery
                ? 'Essayez de modifier votre recherche'
                : 'Les leads apparaîtront ici dès qu\'ils seront générés'
              }
            </p>
          </div>
        ) : (
          <table className={cls.table}>
            <thead>
              <tr>
                <th>Grade</th>
                <th>Contact</th>
                <th>Entreprise</th>
                <th>Projet</th>
                <th>Budget</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={cls.tableRow}>
                  <td>
                    <span className={`${cls.badge} ${cls[`badge${lead.score_grade}`]}`}>
                      {lead.score_grade === 'HOT' && '🔥'}
                      {lead.score_grade === 'WARM' && '⚡'}
                      {lead.score_grade === 'COLD' && '❄️'}
                      {lead.score_grade}
                    </span>
                  </td>
                  <td>
                    <div className={cls.contactInfo}>
                      <div className={cls.contactName}>{lead.name}</div>
                      <div className={cls.contactEmail}>
                        <Mail size={14} />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className={cls.contactPhone}>
                          <Phone size={14} />
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {lead.company ? (
                      <div className={cls.company}>
                        <Building size={16} />
                        {lead.company}
                      </div>
                    ) : (
                      <span className={cls.noData}>-</span>
                    )}
                  </td>
                  <td>
                    <span className={cls.projectType}>{lead.project_type}</span>
                  </td>
                  <td>
                    <div className={cls.budget}>
                      {lead.estimate.min.toLocaleString()} - {lead.estimate.max.toLocaleString()} EUR
                    </div>
                  </td>
                  <td>
                    <div className={cls.scoreCell}>
                      <div className={cls.scoreValue}>{lead.score_total}/100</div>
                      <div className={cls.scoreBar}>
                        <ProgressBar
                          value={lead.score_total}
                          max={100}
                          ariaLabel={`Score: ${lead.score_total} sur 100`}
                        />
                      </div>
                      <div className={cls.confidence}>
                        Confiance: {lead.score_confidence}%
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={cls.dateCell}>
                      {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                      <br />
                      <small>{new Date(lead.created_at).toLocaleTimeString('fr-FR')}</small>
                    </div>
                  </td>
                  <td>
                    <div className={cls.actions}>
                      <a href={`mailto:${lead.email}`} className={cls.actionBtn} title="Envoyer un email">
                        <Mail size={16} />
                      </a>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className={cls.actionBtn} title="Appeler">
                          <Phone size={16} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
