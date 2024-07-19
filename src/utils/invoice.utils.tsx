import { InvoiceFormType } from "../models/invoice-model";

/**
 * @param prevForm - previous form data
 * @param responseData - response data to merge with the previous form data
 * @returns returns the merged form data
 * @description Used to merge the response data with the previous form data
 */
export function mergeFormData(
  prevForm: InvoiceFormType,
  responseData: Partial<InvoiceFormType>
): InvoiceFormType {
  return {
    ...prevForm,
    ...responseData,
    from: {
      ...prevForm.from,
      ...responseData.from,
    },
    to: {
      ...prevForm.to,
      ...responseData.to,
    },
    items: Array.isArray(responseData.items)
      ? [...responseData.items]
      : prevForm.items,
  };
}
