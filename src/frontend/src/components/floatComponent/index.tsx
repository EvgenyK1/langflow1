import { useEffect } from "react";
import { FloatComponentType } from "../../types/components";
import { handleKeyDown } from "../../utils/reactflowUtils";
import { Input } from "../ui/input";

export default function FloatComponent({
  value,
  onChange,
  disabled,
  rangeSpec,
  editNode = false,
}: FloatComponentType): JSX.Element {
  const step = rangeSpec?.step ?? 0.1;
  const min = rangeSpec?.min ?? -2;
  const max = rangeSpec?.max ?? 2;
  // Clear component state
  useEffect(() => {
    if (disabled && value !== "") {
      onChange("", undefined, true);
    }
  }, [disabled]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (inputValue < min) {
      event.target.value = min.toString();
    } else if (inputValue > max) {
      event.target.value = max.toString();
    }
  };

  const handleChange = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="w-full">
      <Input
        id="float-input"
        data-testid="float-input"
        type="number"
        step={step}
        min={min}
        max={max}
        value={value ?? ""}
        disabled={disabled}
        className={editNode ? "input-edit-node" : ""}
        placeholder="Enter a value"
        onInput={handleInput}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, value, "")}
      />
    </div>
  );
}
