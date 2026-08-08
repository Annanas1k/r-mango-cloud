import type React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CustomTolltipProps {
  children: React.ReactElement;
  tooltipMessage: string;
}

export function CustomTooltip({
  children,
  tooltipMessage,
}: CustomTolltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side="bottom">
        <p>{tooltipMessage}</p>
      </TooltipContent>
    </Tooltip>
  );
}
