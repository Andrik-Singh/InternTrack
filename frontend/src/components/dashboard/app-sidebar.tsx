"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Award,
  BarChart3,
  Briefcase,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  LogOut,
  MessageSquare,
  ScrollText,
  Settings,
  UserCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Role } from "@/lib/types";
import { dashboardLinks } from "@/lib/constants";

type SubItem = { title: string; href: string };
type NavItem = {
  title: string;
  icon: LucideIcon;
  href: string;
  exact?: boolean;
  children?: SubItem[];
};

const S =dashboardLinks.INTERN;
const M = dashboardLinks.MENTOR;
const A = dashboardLinks.ADMIN;

const NAV: Record<Role, NavItem[]> = {
  INTERN: [
    { title: "Dashboard", icon: LayoutDashboard, href: S, exact: true },
    {
      title: "Internship",
      icon: Briefcase,
      href: `${S}/internship`,
      children: [
        { title: "Overview", href: `${S}/internship` },
        { title: "My tasks", href: `${S}/internship/tasks` },
        { title: "Weekly reports", href: `${S}/internship/reports` },
        { title: "Activity", href: `${S}/internship/activity` },
      ],
    },
    {
      title: "Performance",
      icon: Award,
      href: `${S}/performance`,
      children: [
        { title: "Grades", href: `${S}/performance/grades` },
        { title: "Feedback", href: `${S}/performance/feedback` },
      ],
    },
    { title: "Profile", icon: UserCircle, href: `${S}/profile` },
  ],

  MENTOR: [
    { title: "Dashboard", icon: LayoutDashboard, href: M, exact: true },
    { title: "My interns", icon: GraduationCap, href: `${M}/interns` },
    {
      title: "Tasks",
      icon: ClipboardList,
      href: `${M}/tasks`,
      children: [
        { title: "All tasks", href: `${M}/tasks` },
        { title: "Create task", href: `${M}/tasks/new` },
        { title: "Templates", href: `${M}/tasks/templates` },
      ],
    },
    {
      title: "Reviews",
      icon: ClipboardCheck,
      href: `${M}/reviews`,
      children: [
        { title: "Pending", href: `${M}/reviews` },
        { title: "Reviewed", href: `${M}/reviews/history` },
      ],
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: `${M}/reports`,
      children: [
        { title: "Intern reports", href: `${M}/reports/interns` },
        { title: "Weekly reports", href: `${M}/reports/weekly` },
        { title: "Program report", href: `${M}/reports/program` },
      ],
    },
    { title: "Activity", icon: Activity, href: `${M}/activity` },
    { title: "Profile", icon: UserCircle, href: `${M}/profile` },
  ],

  ADMIN: [
    { title: "Dashboard", icon: LayoutDashboard, href: A, exact: true },
    {
      title: "Internships",
      icon: Briefcase,
      href: `${A}/internships`,
      children: [
        { title: "All internships", href: `${A}/internships` },
        { title: "Create internship", href: `${A}/internships/new` },
      ],
    },
    {
      title: "Users",
      icon: Users,
      href: `${A}/users`,
      children: [
        { title: "All users", href: `${A}/users` },
        { title: "Create user", href: `${A}/users/new` },
      ],
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: `${A}/reports`,
      children: [
        { title: "Program reports", href: `${A}/reports/programs` },
        { title: "Student reports", href: `${A}/reports/students` },
        { title: "Mentor reports", href: `${A}/reports/mentors` },
      ],
    },
    { title: "Audit logs", icon: ScrollText, href: `${A}/audit-logs` },
    {
      title: "Settings",
      icon: Settings,
      href: `${A}/settings`,
      children: [
        { title: "Company profile", href: `${A}/settings/company` },
        { title: "Grading policies", href: `${A}/settings/grading` },
        { title: "My account", href: `${A}/settings/account` },
      ],
    },
  ],
};

export function AppSidebar({ role, userName }: { role: Role; userName: string }) {
  const pathname = usePathname();
  const { open ,openMobile } =useSidebar()
  const matches = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
  const activeChild = (children: SubItem[]) =>
    children
      .filter((c) => matches(c.href))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <Sidebar collapsible="icon">
      {(open || openMobile) &&
        <SidebarHeader className="px-4 py-3">
          <SidebarMenu>
                <SidebarMenuItem>
                  <div className="text-lg font-semibold tracking-tight">InternTrack</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {role.toLowerCase()}
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
        </SidebarHeader>
        }

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {NAV[role].map((item) =>
              item.children ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={matches(item.href)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={matches(item.href)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={activeChild(item.children!) === child.href}
                            >
                              <Link href={child.href}>{child.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={matches(item.href, item.exact)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={userName} className="pointer-events-none">
              <MessageSquare className="hidden" />
              <span className="truncate font-medium">{userName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign out">
              <Link href="/logout">
                <LogOut />
                <span>Sign out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
