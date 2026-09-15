import { useRoles } from "@/hooks/use-roles";
import { useNavigate } from "react-router";

const DashboardPage: React.FC = () => {
  const { isLoading, isOrganizer, isStaff } = useRoles();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Organizer → Events dashboard
  if (isOrganizer) {
    navigate("/dashboard/events", { replace: true });
    return <p>Loading...</p>;
  }

  // Staff → QR validation
  if (isStaff) {
    navigate("/dashboard/validate-qr", { replace: true });
    return <p>Loading...</p>;
  }

  // Attendee → Tickets dashboard
  navigate("/dashboard/tickets", { replace: true });

  return <p>Loading...</p>;
};

export default DashboardPage;