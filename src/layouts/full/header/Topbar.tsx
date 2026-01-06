import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";

const Topbar = () => {
  return (
    <div className="py-[15px] px-6 z-40 sticky top-0 bg-[linear-gradient(90deg,_#001138_0%,_#001e66_100%)]">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* LEFT SIDE – ZTNA Dashboard brand + links */}
        <div className="md:flex hidden items-center gap-5">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Icon
                icon="solar:shield-check-line-duotone"
                width={26}
                className="text-[#5d87ff]"
              />
              <span className="text-white text-lg font-semibold">
                ZTNA Dashboard
              </span>
            </div>
          </Link>

          <div className="xl:flex items-center gap-4 pl-5 border-l border-opacity-20 border-white hidden">
            <Link
              to="#"
              className="flex items-center gap-2 text-white bg-transparent hover:text-[#5d87ff]"
            >
              <Icon icon="solar:window-frame-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-white hover:text-[#5d87ff]">
                Documentation
              </h4>
            </Link>

            <Link
              to="#"
              className="flex items-center gap-2 text-white bg-transparent hover:text-[#5d87ff]"
            >
              <Icon icon="solar:question-circle-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-white hover:text-[#5d87ff]">
                Support
              </h4>
            </Link>

            <Link
              to="#"
              className="flex items-center gap-2 text-white bg-transparent hover:text-[#5d87ff]"
            >
              <Icon icon="solar:case-round-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-white hover:text-[#5d87ff]">
                About Project
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
