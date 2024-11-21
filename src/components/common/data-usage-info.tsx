import { ListItem } from "@mui/material";
import StyledUnorderedList from "./mui-styled/styled-unordered-list";

export default function DataUsageInfo() {
  const sensitiveDataItem = (
    <ListItem>
      <span className="font-bold">Sensitive Data:</span> Users should{" "}
      <span className="font-bold">NOT</span> use or input any sensitive data
      (e.g., passwords, personal identification information, or financial
      information) when interacting with this project.
    </ListItem>
  );

  const dataStorageItem = (
    <ListItem>
      <span className="font-bold">Data Storage:</span> Please be aware that the
      messages sent to the Form2Agent assistant using the chat widget or the API
      directly are stored to maintain chat context for the assistant. This data
      is never reused for new chats.
    </ListItem>
  );

  const apiKeysItem = (
    <ListItem>
      <span className="font-bold">API Keys:</span> We do{" "}
      <span className="font-bold">NOT</span> store any API keys within this
      project. Form2Agent requires API keys for external services, users are
      responsible for securely managing their own API keys and ensuring they are
      not exposed or stored within their repositories if forking the project.
    </ListItem>
  );

  return (
    <>
      <h2 className={`text-text-primary-light font-medium`}>
        Important Information Regarding Data Usage:
      </h2>
      <span className="text-text-secondary-light text-sm">
        <StyledUnorderedList
          id="demo-information-regarding-data-usage"
          className="flex flex-col gap-2"
        >
          {sensitiveDataItem}
          {dataStorageItem}
          {apiKeysItem}
        </StyledUnorderedList>
      </span>
    </>
  );
}
