import clsx from "clsx";

function ToggleRow({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#8b949e] text-sm">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={clsx(
          "relative w-10 h-5 rounded-full transition-colors",
          enabled ? "bg-[#3d8b3d]" : "bg-[#30363d]",
        )}
      >
        <span
          className={clsx(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow",
            enabled ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

export default ToggleRow;