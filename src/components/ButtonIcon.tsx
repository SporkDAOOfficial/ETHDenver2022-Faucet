export const ButtonIcon: React.FC = () => {
  return (
    <svg width="18" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 18V7a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v11"
        style={{
          fill: "none",
          stroke: "var(--brand-blackish)",
          strokeWidth: "2",
        }}
      />
      <path d="M3 11a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2M3 15a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2"
        style={{
          fill: "none",
          stroke: "var(--brand-blackish)",
          strokeWidth: "2",
        }}
      />
      <path d="m18.106 17.789-.211.422a3.236 3.236 0 0 1-5.789 0l-.211-.422A3.238 3.238 0 0 0 9 16H2v7a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3v-7h-7a3.236 3.236 0 0 0-2.894 1.789z" />
    </svg>
  );
};
