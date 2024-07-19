import RoutingPath from "../routes/routes";
import {
  MedicalInformationOutlined,
  HomeOutlined,
  HelpOutline,
  ArticleOutlined,
  Home,
  Article,
  MedicalInformation,
  Help,
} from "@mui/icons-material";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
export const NAV_DRAWER_WIDTH = 280;

export const SIDE_NAV_LINKS = [
  {
    path: RoutingPath.DefaultPage,
    icon: HomeOutlined,
    icon_dark: Home,
    text: "Home",
  },
  {
    path: RoutingPath.InvoicePage,
    icon: ArticleOutlined,
    icon_dark: Article,
    text: "Invoices",
  },
  {
    path: RoutingPath.PatientRegistration,
    icon: MedicalInformationOutlined,
    icon_dark: MedicalInformation,
    text: "Patient Registration",
  },
  {
    path: RoutingPath.HelpdeskPage,
    icon: HelpOutline,
    icon_dark: Help,
    text: "Help Desk",
  },
  {
    path: RoutingPath.EcommercePage,
    icon: ListAltOutlinedIcon,
    icon_dar: ListAltOutlinedIcon,
    text: "Orders",
  },
];
