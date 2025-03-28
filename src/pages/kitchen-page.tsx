import { useEffect, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import {
  CHAT_KITCHEN_DESCRIPTION,
  KitchenOrderDescriptionContext,
} from "../models/kitchen-context-model";
import KitchenView from "../components/kitchen-view/kitchen-view";
import { KitchenOrders } from "../consts/kitchen.consts";
import { KitchenOrder } from "../types/Kitchen/Kitchen";
import { KitchenOrderStatus } from "../models/kitchen-model";
import { Helmet } from "react-helmet-async";
import { ANIMATION_CLEAR_DELAY } from "../consts/animations";

const KitchenPage = () => {
  const [orders, setOrders] = useState<KitchenOrder[]>(KitchenOrders);
  const [updatedOrders, setUpdatedOrders] = useState<Partial<KitchenOrder>[]>(
    []
  );
  const executeFormLogic = async (appData: string) => {
    let responseData = JSON.parse(appData);
    if (responseData.orders) {
      handleUpdateOrders(responseData.orders);
    }
  };

  const handleUpdateOrders = (updatedOrders: Partial<KitchenOrder>[]) => {
    if (updatedOrders.length > 0) {
      setUpdatedOrders(updatedOrders);

      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          const updatedOrder = updatedOrders.find(
            (updatedOrder) => updatedOrder.orderNumber === order.orderNumber
          );
          return updatedOrder ? { ...order, ...updatedOrder } : order;
        })
      );
    }
  };

  const handleUpdateOrderStatus = (
    orderNumber: number,
    status: KitchenOrderStatus
  ) => {
    setUpdatedOrders((prevOrders) => {
      const updatedOrder = prevOrders.find(
        (updatedOrder) => updatedOrder.orderNumber === orderNumber
      );
      if (updatedOrder) {
        return prevOrders.map((order) =>
          order.orderNumber === orderNumber
            ? { ...order, status: status }
            : order
        );
      }
      return [...prevOrders, { orderNumber, status }];
    });
    setOrders((prevOrders) => {
      const updatedOrder = prevOrders.find(
        (updatedOrder) => updatedOrder.orderNumber === orderNumber
      );
      if (updatedOrder) {
        return prevOrders.map((order) =>
          order.orderNumber === orderNumber
            ? { ...order, status: status }
            : order
        );
      }
      return [...prevOrders];
    });
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

  return (
    <>
      <Helmet>
        <title>Streamline Kitchen Order Updates with Form2Agent AI</title>
        <meta
          name="description"
          content="Enhance your kitchen order updates with Form2Agent AI. Discover how this innovative tool streamlines the process, ensuring accuracy and efficiency in managing your kitchen orders."
        />
      </Helmet>
      <AudioProvider>
        <FormPageLayout
          title="Kitchen Orders View"
          subTitle="Explore how Form2Agent AI can assist in updating kitchen orders."
          chatElement={
            <ChatWindow
              executeFormLogic={executeFormLogic}
              formDescription={CHAT_KITCHEN_DESCRIPTION}
              formValues={stringifyValues({
                orders: orders,
              })}
              formContext={stringifyValues({
                orders: KitchenOrderDescriptionContext,
              })}
            />
          }
        >
          <KitchenView
            orders={orders}
            updatedOrders={updatedOrders}
            handleUpdateOrderStatus={handleUpdateOrderStatus}
          />
        </FormPageLayout>
      </AudioProvider>
    </>
  );
};

export default KitchenPage;
