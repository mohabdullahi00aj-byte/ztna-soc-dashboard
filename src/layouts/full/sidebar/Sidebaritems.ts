export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  isPro?: boolean;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "ZTNA",
    children: [
      {
        name: "SOC Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
        isPro: false,
      },
      {
        name: "Access Decisions",
        icon: "solar:shield-check-linear",
        id: uniqueId(),
        url: "/decisions",
        isPro: false,
      },
      {
        name: "Suricata Alerts",
        icon: "solar:danger-triangle-linear",
        id: uniqueId(),
        url: "/alerts",
        isPro: false,
      },
      {
        name: "Policies",
        icon: "solar:settings-line-duotone",
        id: uniqueId(),
        url: "/policies",
        isPro: false,
      },
      {
        name: "Network Zones",
        icon: "solar:server-square-line-duotone",
        id: uniqueId(),
        url: "/zones",
        isPro: false,
      },
      {
        name: "System Health",
        icon: "solar:heart-pulse-line-duotone",
        id: uniqueId(),
        url: "/system-health",
        isPro: false,
      },
    ],
  },

  {
    heading: "AUTH",
    children: [
      {
        name: "Log out",
        icon: "solar:login-2-linear",
        id: uniqueId(),
        url: "/auth/login",
        isPro: false,
      },
      {
        name: "Register",
        icon: "solar:shield-user-outline",
        id: uniqueId(),
        url: "/auth/register",
        isPro: false,
      },
    ],
  },
];

export default SidebarContent;
