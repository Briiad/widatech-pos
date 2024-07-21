import { useState, useEffect } from 'react';
import { Group, Code } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import {
  IconDashboard,
  IconShoppingCartFilled,
  IconBuildingWarehouse,
  IconReportAnalytics,
  IconAdCircleFilled,
  IconSpeakerphone,
  IconInvoice,
  IconReceipt2,
  IconLogout,
} from '@tabler/icons-react';
import classes from './SideNav.module.css';

interface NavLinkProps {
  label: string;
  active?: boolean;
  to: string;
  icon: typeof IconDashboard;
  onClick?(): void;
}

const data = [
  { link: '/dashboard', label: 'Product', icon: IconShoppingCartFilled },
  { link: '/dashboard/inventory', label: 'Inventory', icon: IconReceipt2 },
  { link: '/dashboard/report', label: 'Report', icon: IconBuildingWarehouse },
  { link: '/dashboard/analysis', label: 'Analysis', icon: IconReportAnalytics },
  { link: '/dashboard/invoice', label: 'Invoices', icon: IconInvoice },
  { link: '/dashboard/marketing', label: 'Marketing', icon: IconAdCircleFilled },
  { link: '/dashboard/promotion', label: 'Promotions', icon: IconSpeakerphone },
];

function NavbarLink({ label, active, to, icon: Icon, onClick }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={classes.link}
      onClick={onClick}
      data-active={active || undefined}
    >
      <Icon className={classes.linkIcon} stroke={1.5} />
      <span>{label}</span>
    </Link>
  );
}

export function SideNav() {
  const location = useLocation(); // Get the current URL path
  const [active, setActive] = useState(() => {
    // Find the index of the current path in the data array
    const activeIndex = data.findIndex((item) => location.pathname === item.link);
    return activeIndex !== -1 ? activeIndex : 0; // Default to the first link if no match is found
  });

  useEffect(() => {
    // Update active state whenever the location changes
    const activeIndex = data.findIndex((item) => location.pathname === item.link);
    if (activeIndex !== -1) {
      setActive(activeIndex);
    }
  }, [location]);

  const links = data.map((item, index) => (
    <NavbarLink
      key={index}
      label={item.label}
      active={index === active}
      to={item.link}
      icon={item.icon}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>PoS Dashboard</Code>
          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
