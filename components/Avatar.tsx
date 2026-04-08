export default function Avatar() {
  return (
    <div className="avatar-wrapper" style={{ position: 'relative', width: '300px', height: '300px' }}>
      {/* Ripple Rings */}
      <div className="ripple-ring ripple-1" />
      <div className="ripple-ring ripple-2" />
      <div className="ripple-ring ripple-3" />
      <div className="ripple-ring ripple-4" />
      
      {/* Main Avatar */}
      <div 
        className="avatar-main"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 10, // keep image above rings
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #0070f3, #00c6ff, #38bdf8)',
          padding: '5px',
          boxShadow: '0 0 30px var(--accent-glow)'
        }}
      >
        <img src="/avatar.jpg" alt="Nguyen Quang Hung" style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          background: 'var(--bg-color)'
        }} />
      </div>
    </div>
  );
}
