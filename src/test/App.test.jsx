import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
});
