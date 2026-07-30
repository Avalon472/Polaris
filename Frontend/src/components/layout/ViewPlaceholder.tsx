const ViewPlaceholder = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col gap-4 h-1/2 w-full relative items-center justify-center rounded-xl border border-border bg-bg3/20 overflow-hidden group">
      {/* The things we do for a radial gradient */}
      <span
        className="absolute left-1/2 top-1/2 -z-10 size-full -translate-x-1/2 -translate-y-1/2 rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500
             bg-[radial-gradient(circle,--theme(--color-accent)_0%,--theme(--color-accent/.50)_45%,--theme(--color-accent/.20)_95%,transparent)]"
      />
      <span className="text-3xl font-semibold text-text">
        Coming soon{text ? ":" : ""}
      </span>
      {text && <span className="text-5xl font-bold text-text">{text}</span>}
    </div>
  );
};

export default ViewPlaceholder;
