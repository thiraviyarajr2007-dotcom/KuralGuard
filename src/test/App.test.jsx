import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('KuralGuard Application Integration Tests', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.location.hash = '';
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    window.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    window.URL.revokeObjectURL = vi.fn();
    window.scrollTo = vi.fn();
  });

  it('renders Landing Page with logo, tagline, value cards, and demo metrics', () => {
    render(<App />);

    expect(screen.getAllByText(/Kural/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Turn a local safety concern into the/i)).toBeInTheDocument();

    expect(screen.getByText('1. Understand Risk')).toBeInTheDocument();
    expect(screen.getByText('2. Get Safe Guidance')).toBeInTheDocument();
    expect(screen.getByText('3. Support Community Action')).toBeInTheDocument();

    expect(screen.getByText('Demonstration Impact Metrics')).toBeInTheDocument();
    expect(screen.getByText('Total Hazards')).toBeInTheDocument();
    expect(screen.getByText('High Risk Identified')).toBeInTheDocument();
    expect(screen.getByText('Resolved / Safe')).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: /report an issue/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /try demo/i })[0]).toBeInTheDocument();
  });

  it('clicking "Try Demo" loads complete sample report and displays docket preview', async () => {
    render(<App />);

    const tryDemoBtn = screen.getAllByRole('button', { name: /try demo/i })[0];
    fireEvent.click(tryDemoBtn);

    await waitFor(() => {
      expect(screen.getByText(/Safety Assessment & Hazard Triage/i)).toBeInTheDocument();
    }, { timeout: 2500 });

    expect(screen.getByText('Demo AI-assisted analysis')).toBeInTheDocument();
    expect(screen.getByText('What we detected')).toBeInTheDocument();
    expect(screen.getAllByText(/HIGH RISK/i).length).toBeGreaterThan(0);

    const createBriefBtn = screen.getByRole('button', { name: /create safety brief/i });
    fireEvent.click(createBriefBtn);

    expect(screen.getAllByText(/Community Safety Brief/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Civic Escalation Lifecycle')).toBeInTheDocument();
    expect(screen.getAllByText('Draft').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Submitted').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Verified').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Resolved').length).toBeGreaterThan(0);

    expect(screen.getByTitle(/copy entire formatted docket text/i)).toBeInTheDocument();
    expect(screen.getByTitle(/download text report/i)).toBeInTheDocument();
    expect(screen.getByTitle(/share report docket/i)).toBeInTheDocument();
  });

  it('navigates to Report Issue page and validates required inputs', async () => {
    render(<App />);

    const reportBtn = screen.getAllByRole('button', { name: /report an issue/i })[0];
    fireEvent.click(reportBtn);

    expect(screen.getByText(/Report a Civic Concern/i)).toBeInTheDocument();
    expect(screen.getByText('Describe')).toBeInTheDocument();

    expect(screen.getByText('Road Safety')).toBeInTheDocument();
    expect(screen.getByText('Public Lighting')).toBeInTheDocument();
    expect(screen.getByText('Flooding')).toBeInTheDocument();
    expect(screen.getByText('Women’s Safety')).toBeInTheDocument();
    expect(screen.getByText('Health Concern')).toBeInTheDocument();
    expect(screen.getByText('Waste and Sanitation')).toBeInTheDocument();

    const analyzeBtn = screen.getByRole('button', { name: /submit report/i });
    fireEvent.click(analyzeBtn);

    expect(screen.getByText(/please select an issue category/i)).toBeInTheDocument();
  });

  it('allows pre-filling sample scenario and progressing through Step 1 → 2 → 3', async () => {
    render(<App />);

    const reportBtn = screen.getAllByRole('button', { name: /report an issue/i })[0];
    fireEvent.click(reportBtn);

    const prefillBtn = screen.getByRole('button', { name: /pre-fill sample scenario/i });
    fireEvent.click(prefillBtn);

    const analyzeBtn = screen.getByRole('button', { name: /submit report/i });
    fireEvent.click(analyzeBtn);

    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Analyze').length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText(/Safety Assessment & Hazard Triage/i)).toBeInTheDocument();
    }, { timeout: 2500 });

    expect(screen.getByText(/AI Estimation Disclaimer:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/dial/i).length).toBeGreaterThan(0);

    const docketBtn = screen.getByRole('button', { name: /create safety brief/i });
    fireEvent.click(docketBtn);

    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Community Safety Brief/i).length).toBeGreaterThan(0);
  });

  it('Community Dashboard supports searching, filtering, and demo resolve action', async () => {
    render(<App />);

    const dashboardTab = screen.getAllByRole('button', { name: /community dashboard/i })[0];
    fireEvent.click(dashboardTab);

    expect(screen.getByText('Community Safety Registry')).toBeInTheDocument();
    expect(screen.getByText('Total Reports')).toBeInTheDocument();
    expect(screen.getByText('High-Risk Issues')).toBeInTheDocument();
    expect(screen.getByText('Resolved Reports')).toBeInTheDocument();

    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search reports by title/i);
    fireEvent.change(searchInput, { target: { value: 'streetlight' } });
    expect(screen.getByText(/Broken streetlight near a school/i)).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: '' } });

    const getResolvedCount = () => screen.getByText('Resolved Reports').closest('div.bg-white')?.querySelector('.text-4xl')?.textContent;
    const resolveBtns = screen.getAllByRole('button', { name: /mark resolved/i });
    const initialResolveCount = getResolvedCount();
    fireEvent.click(resolveBtns[0]);

    const updatedResolveCount = getResolvedCount();
    expect(Number(updatedResolveCount)).toBe(Number(initialResolveCount) + 1);
  });

  it('Safety Resources Page displays all categories and mandatory demo disclaimer', () => {
    render(<App />);

    const resourcesTab = screen.getAllByRole('button', { name: /safety resources/i })[0];
    fireEvent.click(resourcesTab);

    expect(screen.getByText('Safety & Emergency Resources')).toBeInTheDocument();
    expect(screen.getByText(/DEMONSTRATION RESOURCE DIRECTORY NOTICE/i)).toBeInTheDocument();
    expect(screen.getByText(/All campus and local ward contacts below marked with the/i)).toBeInTheDocument();

    expect(screen.getByText('Emergency Help')).toBeInTheDocument();
    expect(screen.getByText('Women’s Safety')).toBeInTheDocument();
    expect(screen.getByText('Medical Assistance')).toBeInTheDocument();
    expect(screen.getByText('Trusted adult or community support')).toBeInTheDocument();

    expect(screen.getByText(/Call 112 Toll-Free/i)).toBeInTheDocument();
  });

  it('NotFoundPage handles invalid routes without crashing and allows returning home', () => {
    window.location.hash = '#/invalid-route';
    render(<App />);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    const homeBtn = screen.getAllByRole('button', { name: /home/i })[0];
    fireEvent.click(homeBtn);
    expect(screen.getByText(/Turn a local safety concern into the/i)).toBeInTheDocument();
  });

  it('Dashboard category filter and severity buttons filter records accurately without disappearing all cards', () => {
    render(<App />);

    const dashboardTab = screen.getAllByRole('button', { name: /community dashboard/i })[0];
    fireEvent.click(dashboardTab);

    // Click Road Safety category filter chip
    const roadSafetyChips = screen.getAllByRole('button', { name: /^road safety$/i });
    fireEvent.click(roadSafetyChips[0]);
    expect(screen.getByText(/Dangerous school-road crossing/i)).toBeInTheDocument();
    expect(screen.queryByText(/No reports match your filters/i)).not.toBeInTheDocument();

    // Reset back to All
    const allChip = screen.getByRole('button', { name: /^all$/i });
    fireEvent.click(allChip);
    expect(screen.getByText(/Broken streetlight near a school/i)).toBeInTheDocument();

    // Click High Risk severity filter
    const highRiskBtn = screen.getByRole('button', { name: /high risk/i });
    fireEvent.click(highRiskBtn);
    expect(screen.getByText(/Dangerous school-road crossing/i)).toBeInTheDocument();
    expect(screen.queryByText(/Broken streetlight/i)).not.toBeInTheDocument();
  });

  it('Report Issue features: GPS auto-detect, suggested tags, anonymous toggle, and language selector', () => {
    render(<App />);

    const reportBtn = screen.getAllByRole('button', { name: /report an issue/i })[0];
    fireEvent.click(reportBtn);

    // GPS Auto-detect
    const gpsBtn = screen.getByRole('button', { name: /auto detect location via gps/i });
    fireEvent.click(gpsBtn);
    const locationInput = screen.getByPlaceholderText(/search cross-streets/i);
    expect(locationInput.value).toContain('Gandhi Road');

    // Suggested Tag Append
    const missingSignageBtn = screen.getByRole('button', { name: /\+ Missing Signage/i });
    fireEvent.click(missingSignageBtn);
    const descriptionInput = screen.getByPlaceholderText(/describe what occurred/i);
    expect(descriptionInput.value).toContain('Missing Signage');

    // Anonymous toggle
    const anonToggle = screen.getByRole('switch', { name: /toggle anonymous reporting/i });
    expect(anonToggle).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(anonToggle);
    expect(anonToggle).toHaveAttribute('aria-checked', 'false');

    // Preferred language selector
    const tamilBriefBtn = screen.getByRole('button', { name: /^தமிழ்$/i });
    fireEvent.click(tamilBriefBtn);
    expect(tamilBriefBtn).toHaveClass('bg-primary');
  });

  it('Navbar language button toggles interface language smoothly', () => {
    render(<App />);

    const langBtn = screen.getByRole('button', { name: /switch language/i });
    fireEvent.click(langBtn);

    // In Tamil, nav shows 'முகப்பு' for Home
    expect(screen.getAllByText(/முகப்பு/i).length).toBeGreaterThan(0);

    // Switch back to EN
    fireEvent.click(langBtn);
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
  });

  it('syncs the active screen when browser history changes the route hash', async () => {
    render(<App />);

    await act(async () => {
      window.location.hash = '#/resources';
      window.dispatchEvent(new Event('hashchange'));
    });

    await waitFor(() => {
      expect(screen.getByText('Safety & Emergency Resources')).toBeInTheDocument();
    });
  });
});
