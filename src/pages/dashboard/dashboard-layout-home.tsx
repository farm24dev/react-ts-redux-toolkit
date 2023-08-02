import { useAccount } from "../../hooks/use-account";

const DashboardLayoutHome = () => {
  const { account } = useAccount();
  return (
    <div>
      ยินดีต้อนรับ {account?.firstName} {account?.lastName} Role :{" "}
      {account?.role} UserId : {account?.userId}
    </div>
  );
};

export default DashboardLayoutHome;
