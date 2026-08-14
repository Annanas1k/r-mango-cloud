import { PageToolbar } from "@/components/shared/PageToolbar";

export const RecentPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar title={"Recent"} rootPath="/cloud/home" />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6"></div>
    </div>
  );
};
