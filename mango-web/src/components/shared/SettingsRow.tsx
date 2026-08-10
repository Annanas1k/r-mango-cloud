import React from "react";

interface SettingsRowProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsRow = React.memo(
  ({ title, description, children }: SettingsRowProps) => (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-lg font-medium text-foreground">{title}</span>
        {description && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
      </div>
      {children}
    </div>
  ),
);

SettingsRow.displayName = "SettingsRow";
