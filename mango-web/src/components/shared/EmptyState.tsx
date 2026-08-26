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
  illustrationSrc?: string;
}

export const EmptyState = ({
  title,
  description,
  media,
  illustrationSrc,
}: EmptyStateProps) => {
  return (
    <Empty className="h-full w-full">
      <EmptyHeader>
        <EmptyMedia>
          {illustrationSrc ? (
            <img
              src={illustrationSrc}
              alt=""
              className="h-52 w-52 object-contain"
            />
          ) : (
            media
          )}
        </EmptyMedia>
        <EmptyTitle className="text-lg">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
