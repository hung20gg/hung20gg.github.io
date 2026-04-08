export default function Footer() {
  return (
    <footer className="footer container">
      <p>© {new Date().getFullYear()} Nguyen Quang Hung. All Rights Reserved.</p>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <a href="#" className="nav-link">GitHub</a>
        <a href="#" className="nav-link">LinkedIn</a>
        <a href="#" className="nav-link">Google Scholar</a>
      </div>
    </footer>
  );
}
