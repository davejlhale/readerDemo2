import React from "react";

interface ScalerControlsProps {
  labelMinus: string;
  labelPlus: string;
  setter: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
  step: number;
  className?: string;
}

export function ScalerControls({
  labelMinus,
  labelPlus,
  setter,
  min,
  max,
  step,
  className,
}: ScalerControlsProps) {
  const decrease = () => setter((value) => Math.max(min, value - step));

  const increase = () => setter((value) => Math.min(max, value + step));

  return (
    <div className={className}>
      <button onClick={decrease}>{labelMinus}</button>
      <button onClick={increase}>{labelPlus}</button>
    </div>
  );
}
