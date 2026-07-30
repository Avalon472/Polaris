import ViewPlaceholder from "@/components/layout/ViewPlaceholder";

const HomePage = () => {
  return (
    <div className="h-full w-full gap-4 flex flex-col justify-center p-4">
      {/* recent notes */}
      <ViewPlaceholder text="Notes Dashboard" />
      {/* projects (skeleton) */}
      <ViewPlaceholder text="Projects Dashboard" />
    </div>
  );
};

export default HomePage;
