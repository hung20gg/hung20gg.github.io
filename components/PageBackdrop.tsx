import React from 'react';
import VectorField from './VectorField';

// ... (configs omitted for brevity in instruction, will keep them in replacement)
const configs: Record<string, any[]> = {
  about: [
    { type: 'rect', top: '15%', right: '12%', width: '40px', height: '40px', rotate: '15deg' },
    { type: 'dot', top: '65%', left: '10%', width: '18px', height: '18px' },
    { type: 'rect', top: '40%', right: '28%', width: '35px', height: '35px', rotate: '45deg' },
    { type: 'rect', top: '80%', right: '20%', width: '30px', height: '30px', rotate: '-25deg' },
    { type: 'rect', top: '10%', left: '20%', width: '25px', height: '25px', rotate: '-10deg' },
    { type: 'dot', top: '25%', left: '8%', width: '12px', height: '12px' },
    { type: 'rect', top: '50%', left: '5%', width: '20px', height: '20px', rotate: '60deg' }
  ],
  experience: [
    { type: 'rect', top: '35%', right: '8%', width: '40px', height: '40px', rotate: '-45deg' },
    { type: 'rect', top: '10%', left: '10%', width: '35px', height: '35px', rotate: '-15deg' },
    { type: 'rect', top: '80%', right: '8%', width: '45px', height: '45px', rotate: '45deg' },
    { type: 'dot', top: '55%', left: '15%', width: '12px', height: '12px' },
    { type: 'rect', top: '90%', left: '30%', width: '20px', height: '20px', rotate: '25deg' },
    { type: 'dot', top: '20%', right: '15%', width: '20px', height: '20px' },
    { type: 'dot', top: '70%', left: '12%', width: '15px', height: '15px' }
  ],
  projects: [
    { type: 'rect', top: '45%', left: '8%', width: '40px', height: '40px', rotate: '25deg' },
    { type: 'rect', top: '15%', right: '20%', width: '45px', height: '45px', rotate: '15deg' },
    { type: 'dot', top: '25%', right: '12%', width: '16px', height: '16px' },
    { type: 'dot', top: '55%', right: '5%', width: '12px', height: '12px' },
    { type: 'rect', top: '75%', left: '8%', width: '30px', height: '30px', rotate: '-35deg' },
    { type: 'rect', top: '85%', left: '25%', width: '30px', height: '30px', rotate: '-10deg' },
    { type: 'rect', top: '65%', right: '10%', width: '35px', height: '35px', rotate: '35deg' }
  ],
  research: [
    { type: 'rect', top: '40%', left: '8%', width: '40px', height: '40px', rotate: '-20deg' },
    { type: 'rect', top: '25%', left: '15%', width: '50px', height: '50px', rotate: '45deg' },
    { type: 'rect', top: '75%', right: '15%', width: '35px', height: '35px', rotate: '-30deg' },
    { type: 'dot', top: '50%', right: '10%', width: '18px', height: '18px' },
    { type: 'rect', top: '85%', left: '15%', width: '25px', height: '25px', rotate: '60deg' },
    { type: 'dot', top: '15%', right: '20%', width: '15px', height: '15px' },
    { type: 'dot', top: '85%', left: '35%', width: '18px', height: '18px' }
  ],
  publications: [
    { type: 'dot', top: '18%', right: '15%', width: '22px', height: '22px' },
    { type: 'rect', top: '45%', left: '10%', width: '35px', height: '35px', rotate: '15deg' },
    { type: 'rect', top: '60%', left: '12%', width: '40px', height: '40px', rotate: '-15deg' },
    { type: 'rect', top: '10%', left: '25%', width: '20px', height: '20px', rotate: '-45deg' },
    { type: 'dot', top: '80%', right: '25%', width: '14px', height: '14px' },
    { type: 'dot', top: '50%', right: '5%', width: '10px', height: '10px' },
    { type: 'rect', top: '30%', left: '20%', width: '25px', height: '25px', rotate: '35deg' }
  ],
  skills: [], // Reset shapes for skills, handled manually below
  contact: [
    { type: 'rect', top: '15%', left: '15%', width: '35px', height: '35px', rotate: '-45deg' },
    { type: 'rect', top: '40%', right: '10%', width: '45px', height: '45px', rotate: '60deg' },
    { type: 'rect', top: '65%', right: '12%', width: '40px', height: '40px', rotate: '30deg' },
    { type: 'rect', top: '85%', left: '12%', width: '25px', height: '25px', rotate: '-30deg' },
    { type: 'dot', top: '80%', left: '25%', width: '18px', height: '18px' },
    { type: 'dot', top: '55%', left: '5%', width: '12px', height: '12px' },
    { type: 'dot', top: '25%', right: '20%', width: '15px', height: '15px' }
  ],
  home: [
    { type: 'rect', top: '15%', left: '10%', width: '35px', height: '35px', rotate: '15deg' },
    { type: 'rect', top: '65%', right: '15%', width: '45px', height: '45px', rotate: '-30deg' },
    { type: 'dot', top: '40%', left: '15%', width: '18px', height: '18px' },
    { type: 'rect', top: '85%', left: '25%', width: '30px', height: '30px', rotate: '10deg' },
    { type: 'dot', top: '10%', right: '25%', width: '14px', height: '14px' }
  ]
};

export default function PageBackdrop({ seed }: { seed: string }) {
  const shapes = configs[seed] || [];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      // zIndex 0 so children with pointerEvents:auto are actually reachable by the mouse.
      // The wrapper itself is pointer-events:none so it never blocks page content.
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>

      {/* Global Vector Field Background */}
      <VectorField density={35} range={260} />

      {shapes.map((shape, i) => {
        const isDot = shape.type === 'dot';

        return (
          <div key={i} className="geometry-wrapper" style={{
            position: 'absolute',
            top: shape.top,
            left: shape.left,
            right: shape.right,
            width: shape.width,
            height: shape.height,
            transform: `rotate(${shape.rotate || '0deg'})`,
            // Expanded hit area so small shapes are easy to hover
            padding: '12px',
            margin: '-12px',
            pointerEvents: 'auto',
            zIndex: 1,
          }}>
            {/* Ripples with smart corner rounding mapped to shape types */}
            <div className={`ripple-ring ripple-geom ripple-geom-1 ${isDot ? 'ripple-dot' : 'ripple-rect-1'}`} />
            <div className={`ripple-ring ripple-geom ripple-geom-2 ${isDot ? 'ripple-dot' : 'ripple-rect-2'}`} />
            <div className={`ripple-ring ripple-geom ripple-geom-3 ${isDot ? 'ripple-dot' : 'ripple-rect-3'}`} />

            {/* Main Visual Core */}
            <div className={`geometry-main ${isDot ? 'geom-dot' : 'geom-rect'}`} style={{
              width: '100%',
              height: '100%',
              borderRadius: isDot ? '50%' : '6px',
            }} />
          </div>
        );
      })}
    </div>
  );
}
