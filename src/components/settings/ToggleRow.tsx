"use client";

import clsx from "clsx";

interface ToggleRowProps {
  label: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({
  label,
  enabled,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      {/* Label */}
      <span className="text-[#e6edf3] text-sm leading-none">
        {label}
      </span>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={clsx(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all duration-200",
          enabled
            ? "bg-[#4caf50]"
            : "bg-[#30363d]"
        )}
      >
        {/* Circle */}
        <span
          className={clsx(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200",
            enabled
              ? "translate-x-5"
              : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default ToggleRow;