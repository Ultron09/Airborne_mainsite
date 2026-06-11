import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Dynamically get the title, or use a fallback
    const title = searchParams.has('title') 
      ? searchParams.get('title')?.slice(0, 100) 
      : 'Airborne HRS | Advanced HR Automation';
      
    const pillar = searchParams.has('pillar')
      ? searchParams.get('pillar')
      : 'Workforce Intelligence';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#010f0c',
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0, 214, 161, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 214, 161, 0.05) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
          }}
        >
          {/* Logo / Brand */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00d6a1',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                marginRight: '20px',
              }}
            >
              A
            </div>
            <span
              style={{
                fontSize: '42px',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-1px',
              }}
            >
              Airborne<span style={{ color: '#00d6a1' }}>HRS</span>
            </span>
          </div>

          {/* Pillar Badge */}
          <div
            style={{
              backgroundColor: 'rgba(0, 214, 161, 0.1)',
              color: '#00d6a1',
              padding: '10px 24px',
              borderRadius: '100px',
              fontSize: '24px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '30px',
              border: '1px solid rgba(0, 214, 161, 0.2)',
            }}
          >
            {pillar}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title && title.length > 60 ? '60px' : '76px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-2px',
              maxWidth: '1000px',
              marginBottom: 'auto',
            }}
          >
            {title}
          </div>

          {/* Footer Text */}
          <div
            style={{
              fontSize: '28px',
              color: '#8892b0',
              marginTop: '40px',
              fontWeight: 500,
            }}
          >
            airbornehrs.in
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
