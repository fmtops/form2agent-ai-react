import { useEffect, useState } from "react";
import ChatWindow from "../components/ai-chat/chat-window";
import FormPageLayout from "../layouts/form-page-layout";
import { stringifyValues } from "../utils/chat.utilts";
import { AudioProvider } from "../contexts/AudioContext";
import { AddItemType, defaultAddItemTypeValue } from "../models/add-item-model";
import {
  ADD_ITEM_DESCRIPTION,
  AddItemDescriptionContext,
} from "../models/add-item-context-model";
import AddItemView from "../components/add-item/add-item-view";
import { TextField } from "@mui/material";
import ImageUpload from "../components/common/image-upload";
import SubmitButton from "../components/common/form/submit-button";

const AddProductPage = () => {
  const [items, setItems] = useState<AddItemType[]>([]);
  const [itemToAdd, setItemToAdd] = useState<AddItemType>(
    defaultAddItemTypeValue
  );
  const [updatedItems, setUpdatedItems] = useState<Partial<AddItemType>[]>([]);
  const executeFormLogic = async (appData: string) => {
    let responseData = JSON.parse(appData);
    if (responseData.products) {
      handleUpdateItems(responseData.products);
    }
  };

  const handleUpdateItems = (updatedItems: Partial<AddItemType>[]) => {
    if (updatedItems.length > 0) {
      setUpdatedItems(updatedItems);
      setItems((prevOrders) => {
        let newOrders = prevOrders.filter((order) =>
          updatedItems.some((updatedOrder) => updatedOrder.id === order.id)
        );
        updatedItems.forEach((updatedOrder) => {
          const index = newOrders.findIndex(
            (order) => order.id === updatedOrder.id
          );
          if (index === -1) {
            if (!updatedOrder.id || updatedOrder.id === "")
              newOrders.push({
                ...defaultAddItemTypeValue,
                ...updatedOrder,
                id: createUniqueId(),
              });
            else
              newOrders.push({
                ...defaultAddItemTypeValue,
                ...updatedOrder,
              });
          } else {
            newOrders[index] = {
              ...defaultAddItemTypeValue,
              ...updatedOrder,
              image: newOrders[index].image,
            };
          }
        });
        return newOrders;
      });
    }
  };

  const removeById = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const setImage = (id: string, image: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, image };
        }
        return item;
      })
    );
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (updatedItems.length > 0) {
      timeoutId = setTimeout(() => setUpdatedItems([]), 1500);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updatedItems]);

  const createUniqueId = (): string => {
    const id = Math.floor(Math.random() * 999999) + 1;
    if (items.some((item) => item.id === id.toString())) {
      return createUniqueId();
    }
    return id.toString();
  };
  const onAddProductClicked = () => {
    if (itemToAdd) {
      const newItem: AddItemType = {
        ...itemToAdd,
        id: createUniqueId(),
      };
      setItems((prev) => [...prev, newItem]);
      setUpdatedItems((prev) => [...prev, newItem]);
      setItemToAdd(defaultAddItemTypeValue);
    }
  };
  return (
    <AudioProvider>
      <FormPageLayout
        title="Add Products"
        subTitle="Explore how Form2Agent AI can assist you with creating new products."
        chatElement={
          <ChatWindow
            executeFormLogic={executeFormLogic}
            formDescription={ADD_ITEM_DESCRIPTION}
            formValues={stringifyValues({
              products: items.map((item) => ({
                ...item,
                image: undefined,
              })),
            })}
            formContext={stringifyValues({
              products: AddItemDescriptionContext,
            })}
          />
        }
      >
        <div className="mb-3">
          <div className="flex gap-2 mb-5">
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              value={itemToAdd?.name}
              onChange={(e) =>
                setItemToAdd({ ...itemToAdd, name: e.target.value })
              }
              className="p-2.5 px-3 rounded-md border-bg-active-light border-[1px] bg-white text-black w-1/2"
            />
            <TextField
              type="number"
              label="Amount"
              variant="outlined"
              value={itemToAdd?.amount}
              onChange={(e) =>
                setItemToAdd({ ...itemToAdd, amount: parseInt(e.target.value) })
              }
              className="p-2.5 px-3 rounded-md border-bg-active-light border-[1px] bg-white text-black w-1/2"
            />
          </div>
          <div className="flex gap-2 mb-5">
            <TextField
              type="number"
              label="Price"
              variant="outlined"
              value={itemToAdd?.price}
              onChange={(e) =>
                setItemToAdd({ ...itemToAdd, price: parseInt(e.target.value) })
              }
              className="p-2.5 px-3 rounded-md border-bg-active-light border-[1px] bg-white text-black w-1/2"
            />
            <TextField
              type="text"
              label="Barcode"
              variant="outlined"
              value={itemToAdd?.barcode}
              onChange={(e) =>
                setItemToAdd({ ...itemToAdd, barcode: e.target.value })
              }
              className="p-2.5 px-3 rounded-md border-border-secondary-light border-[1px] bg-white text-black w-1/2"
            />
          </div>
          <ImageUpload
            previewText="Product preview"
            uploadText="Upload image"
            setImage={(image) => setItemToAdd({ ...itemToAdd, image: image })}
            image={itemToAdd?.image}
          />
          <SubmitButton
            value={"Add Product"}
            onClick={onAddProductClicked}
            className="mt-3"
          />
        </div>
        {items === undefined || items?.length === 0 ? (
          <h2>Interact with the chat to add products</h2>
        ) : (
          <AddItemView items={items} remove={removeById} setImage={setImage} />
        )}
      </FormPageLayout>
    </AudioProvider>
  );
};

export default AddProductPage;