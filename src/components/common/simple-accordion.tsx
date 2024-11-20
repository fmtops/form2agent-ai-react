import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion({
  header,
  isExpanded,
  onChange,
  children,
}: {
  header: string;
  isExpanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Accordion
        className="!shadow-none px-0"
        expanded={isExpanded}
        onChange={onChange}
      >
        <AccordionSummary
          className="!min-h-0 !px-0"
          sx={{
            "& .MuiAccordionSummary-content": {
              margin: "0 !important",
            },
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <h2 className={`text-sm font-medium text-text-primary-light`}>
            {header}
          </h2>
        </AccordionSummary>
        <AccordionDetails className="!p-0 !pt-2">
          <p className={`text-sm text-text-secondary-light`}>{children}</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
