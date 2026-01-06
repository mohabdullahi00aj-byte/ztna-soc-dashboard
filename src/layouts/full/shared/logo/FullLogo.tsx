import { Link } from "react-router";

const FullLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-xl bg-[#5d87ff] flex items-center justify-center text-white font-bold">
        Z
      </div>
      <div className="flex flex-col">
        <span className="text-base font-semibold text-slate-900">
          ZTNA Dashboard
        </span>
        <span className="text-xs text-slate-500">
          Zero Trust SOC
        </span>
      </div>
    </Link>
  );
};

export default FullLogo;
