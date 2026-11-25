import ViewPlaceholder from "@/components/layout/ViewPlaceholder";

const ProjectsOverview = () => {
  return (
    <div className="flex size-full overflow-y-auto scrollbar-gutter-auto scrollbar-thin gap-4 p-4">
      <div className="flex flex-col h-full w-1/2 gap-4">
        <ViewPlaceholder text="Due Date Calendar" />
        <ViewPlaceholder text="Work Item Board" />
      </div>
      <div className="flex w-1/2 h-full">
        <ViewPlaceholder text="Projects Carousel/Breakdown" />
      </div>
    </div>
  );
};

export default ProjectsOverview;
