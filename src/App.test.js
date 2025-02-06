import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { MaterialUIControllerProvider } from 'context';

// FILE: src/App.test.js

describe('App Component', () => {
  const renderApp = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <HelmetProvider>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
        </HelmetProvider>
      </MemoryRouter>
    );
  };

  test('renders without crashing', () => {
    renderApp(['/']);
    expect(screen.getByText(/Optim/i)).toBeInTheDocument();
  });

  test('renders the correct route', () => {
    renderApp(['/some-route']);
    expect(screen.getByText(/Optim/i)).toBeInTheDocument();
  });

  test('renders Sidenav and Configurator for dashboard layout', () => {
    renderApp(['/dashboard']);
    expect(screen.getByText(/Optim/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });

  test('does not render Sidenav for non-dashboard layout', () => {
    renderApp(['/Home']);
    expect(screen.queryByText(/Optim/i)).not.toBeInTheDocument();
  });

  test('sets the correct title based on the route', () => {
    renderApp(['/Projects']);
    expect(document.title).toBe('Projects'); // Replace with actual title
  });

  test('renders fallback loading component', () => {
    renderApp(['/']);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});