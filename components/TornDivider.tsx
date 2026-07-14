export default function TornDivider() {
  return (
    <div className="h-[26px] w-full overflow-hidden leading-[0]" aria-hidden="true">
      <svg
        viewBox="0 0 1200 26"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <polygon
          points="0,26 0,10 40,18 80,6 120,16 160,4 200,14 240,8 280,20 320,6 360,16 400,10 440,18 480,4 520,14 560,8 600,20 640,6 680,16 720,10 760,18 800,4 840,14 880,8 920,20 960,6 1000,16 1040,10 1080,18 1120,4 1160,14 1200,10 1200,26"
          fill="#211913"
        />
      </svg>
    </div>
  );
}
