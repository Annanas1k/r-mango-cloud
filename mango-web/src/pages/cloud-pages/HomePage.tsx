import { PageToolbar } from "@/components/shared/PageToolbar";
import { UserProfileCard } from "@/components/shared/UserProfileCard";

export const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <PageToolbar
        title={"Home"}
        rootPath="/cloud/home"
        showViewToggle={false}
      />

      <div className="flex flex-col flex-1 gap-4 px-6 pb-6">
        <UserProfileCard />
      </div>
    </div>
  );
};
