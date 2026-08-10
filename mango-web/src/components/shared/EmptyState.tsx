import { useSettings } from "@/hooks/useSettings";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

interface EmptyStateProps {
  title: string;
  description: string;
  media?: React.ReactNode;
}

export const EmptyState = ({ title, description, media }: EmptyStateProps) => {
  const { handleToggleDetailsView } = useSettings();
  return (
    <Empty className="w-full h-full">
      <EmptyHeader>
        <EmptyMedia>{media}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
        <Button variant="outline" onClick={handleToggleDetailsView}>
          Close this tab
        </Button>
      </EmptyHeader>
    </Empty>
  );
};
