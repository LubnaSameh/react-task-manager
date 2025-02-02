// unit test=> ensure links worked in navbar
import { render, screen } from '@testing-library/react';
import Navbar from './components/Navbar';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import { AuthProvider } from './context/authContext';

test('renders the navbar with correct links', () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
  
  const homeLink = screen.getByText(/Home/i);
  
  // استخدم getAllByText بدلاً من getByText لتحديد جميع العناصر
  const projectsLinks = screen.getAllByText(/Projects/i);
  
  expect(homeLink).toBeInTheDocument();
  expect(projectsLinks.length).toBeGreaterThan(0); // تأكد أن هناك على الأقل رابط واحد يحتوي على "Projects"
});
