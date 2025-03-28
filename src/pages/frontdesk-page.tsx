import { useEffect, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import { FrontdeskOrderItem } from "../models/frontdesk-model";
import {
  CHAT_FRONTDESK_DESCRIPTION,
  FrontdeskOrderDescriptionContext,
  Menu,
} from "../models/frontdesk-context-model";
import FrontDeskView from "../components/frontdesk/frontdesk-view";
import { SelectChangeEvent, TextField } from "@mui/material";
import { SelectComponent } from "../components/common/form/select";
import StyledField from "../components/common/form/styled-field";
import SubmitButton from "../components/common/form/submit-button";
import { Helmet } from "react-helmet-async";
import { ANIMATION_CLEAR_DELAY } from "../consts/animations";

const FrontDeskPage = () => {
  const [orders, setOrders] = useState<FrontdeskOrderItem[]>([]);
  const [item, setItem] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [updatedOrders, setUpdatedOrders] = useState<
    Partial<FrontdeskOrderItem>[]
  >([]);
  const executeFormLogic = async (appData: string) => {
    let responseData = JSON.parse(appData);
    if (responseData.orders) {
      handleUpdateOrders(responseData.orders);
    }
  };

  const handleUpdateOrders = (updatedOrders: Partial<FrontdeskOrderItem>[]) => {
    if (updatedOrders.length > 0) {
      setUpdatedOrders(updatedOrders);
      const newUpdatedOrders = updatedOrders.map((order) => {
        order.item = Menu.find((menuItem) => menuItem.id === order.id);
        return order;
      }) as FrontdeskOrderItem[];
      //add or update items
      setOrders((prevOrders) => {
        const newOrders = [...prevOrders];
        newUpdatedOrders.forEach((updatedOrder) => {
          const index = newOrders.findIndex(
            (order) => order.id === updatedOrder.id
          );
          if (index === -1) {
            newOrders.push(updatedOrder);
          } else {
            newOrders[index] = updatedOrder;
          }
          if (updatedOrder.amount === 0) {
            newOrders.splice(index, 1);
          }
        });
        return newOrders;
      });
    }
  };

  const removeById = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (updatedOrders.length > 0) {
      timeoutId = setTimeout(() => setUpdatedOrders([]), ANIMATION_CLEAR_DELAY);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updatedOrders]);
  const handleItemChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  const onAddItemClicked = () => {
    const menuItem = Menu.find((menu) => menu.name === item);
    if (menuItem) {
      const order = orders.find((order) => order.id === menuItem.id);
      if (order) {
        order.amount += itemQuantity;
        setOrders([...orders]);
      } else {
        setOrders([
          ...orders,
          {
            id: menuItem.id,
            item: menuItem,
            amount: itemQuantity,
          },
        ]);
      }
    }
    setItem("");
    setItemQuantity(0);
  };
  return (
    <>
      <Helmet>
        <title>Revolutionize Coffee Shop Orders with Form2Agent AI</title>
        <meta
          name="description"
          content="Explore how Form2Agent AI transforms your coffee shop operations by engaging with customers to effortlessly create and manage orders, enhancing the overall customer experience with precision and speed."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Coffee Shop Frontdesk"
          subTitle="Explore how Form2Agent AI can listen in or talk to your customer to create orders in a coffee shop."
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription={CHAT_FRONTDESK_DESCRIPTION}
              formValues={stringifyValues({
                orders: orders,
              })}
              formContext={stringifyValues({
                orders: FrontdeskOrderDescriptionContext,
              })}
            />
          }
        >
          <h2 className={`text-text-primary-light font-medium mt-4`}>
            Select Products
          </h2>

          <div className="flex gap-4">
            <SelectComponent
              options={Menu.map((menu) => menu.name)}
              name={"product"}
              placeholder={"Product"}
              value={item}
              onChange={handleItemChange}
              className="w-1/2"
              isBigInput={true}
            />
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
              className="w-1/2 rounded-md border border-border-secondary-light bg-white text-black"
            />
          </div>

          <SubmitButton
            value={"Add Product"}
            onClick={onAddItemClicked}
            className="my-3 p-1"
          />

          <FrontDeskView orders={orders} remove={removeById} />
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};

export default FrontDeskPage;
