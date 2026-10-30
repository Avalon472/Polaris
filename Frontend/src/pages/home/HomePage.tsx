import ViewPlaceholder from "@/components/layout/ViewPlaceholder";
import QuickIntake from "@/features/notes/components/dashboard/QuickIntake";

const HomePage = () => {
  return (
    <div className="h-full w-full gap-4 flex flex-col justify-center p-4">
      <QuickIntake />
      {/* projects (skeleton) */}
      <ViewPlaceholder text="Projects Dashboard" />
    </div>
  );
};

export default HomePage;
