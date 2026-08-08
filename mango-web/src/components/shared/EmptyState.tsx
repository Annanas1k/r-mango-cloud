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
  return (
    <Empty className="w-full h-full">
      <EmptyHeader>
        <EmptyMedia>{media}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
