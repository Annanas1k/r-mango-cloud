import { PageToolbar } from "@/components/shared/PageToolbar";

export const SpamPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar
        title={"Home"}
        rootPath="/cloud/home"
        showViewToggle={false}
        showInfoButton={false}
      />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6"></div>
    </div>
  );
};
