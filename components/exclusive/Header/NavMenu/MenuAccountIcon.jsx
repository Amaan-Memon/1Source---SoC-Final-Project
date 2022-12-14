import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MenuIconContainer } from "../../../universal/Containers.styles";

function MenuAccountIcon() {
  return (
    <AccountCircleIcon
      style={(MenuIconContainer, { color: "var(--secondary)" })}
    />
  );
}

export default MenuAccountIcon;
