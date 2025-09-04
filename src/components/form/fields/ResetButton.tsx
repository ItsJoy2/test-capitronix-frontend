import { FC } from "react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onReset: () => void;
  resetLabel?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * ResetButton component
 *
 * @param {Function} onReset - The function to be called on reset
 * @param {string} resetLabel - The label of the reset button
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} className - The class name of the button
 *
 * @returns {ReactElement} - The submit reset button component
 *
 * @example
 *
 * ```tsx
 * <ResetButton onReset={handleReset} resetLabel="Clear" disabled={false} className="btn btn-danger" />
 * ```
 */

export const ResetButton: FC<Props> = ({
  onReset,
  resetLabel = "Reset",
  disabled = false,
  className,
}) => {
  return (
    <Button
      className={cn("text-white", className)}
      type="reset"
      variant={"outline"}
      size={"sm"}
      onClick={onReset}
      disabled={disabled}
    >
      {resetLabel}
    </Button>
  );
};

ResetButton.displayName = "ResetButton";
