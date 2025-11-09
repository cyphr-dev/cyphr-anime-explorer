import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
        style: {
          background: "#1e293b", // slate-800
          color: "#f8fafc", // slate-50
          border: "1px solid #334155", // slate-700
        },
        classNames: {
          toast: "group toast",
          description: "group-[.toast]:text-slate-300",
          actionButton: "group-[.toast]:bg-white group-[.toast]:text-slate-900",
          cancelButton: "group-[.toast]:bg-slate-700 group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
