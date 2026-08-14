import { PageToolbar } from "@/components/shared/PageToolbar";

export const ShareWithMePage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar title={"Shared with me"} rootPath="/cloud/home" />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6"></div>
    </div>
  );
};
