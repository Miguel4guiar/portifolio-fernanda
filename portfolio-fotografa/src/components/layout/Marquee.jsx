const ITEMS = [
  'RAP', 'MC LUANNA', 'KAYBLACK', 'FESTIVALSONSDARUA', 'BK',
  'LPTZLATAN', 'AJULIACOSTASHOP',
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]; // duplicado para loop contínuo sem gap

  return (
    <div className="w-full overflow-hidden border-y border-smoke/20 bg-asphalt py-4">
      <div className="flex w-max animate-marquee gap-10 will-change-transform">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-widest2 text-smoke"
          >
            {item}
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
