import { read, utils } from "xlsx";
import { FileFieldStatus } from "../consts/chat.consts";

export const supportedFileExtensionsList = [
  "txt",
  "csv",
  "xlsx",
  "json",
  "pdf",
  "png",
  "jpg",
  "jpeg",
] as const;

export interface FetchFileContentResult {
  content: string | object;
  contentType: string;
}

/**
 * @param fileName - file name to get the extension
 * @returns the file extension
 * @example
 * ```ts
 * getFileExtension("file.txt") // "txt"
 * getFileExtension("file.csv") // "csv"
 * ```
 *  */
export function getFileExtension(
  fileName: string
): (typeof supportedFileExtensionsList)[number] {
  return fileName
    .split(".")
    .pop()
    ?.toLowerCase() as (typeof supportedFileExtensionsList)[number];
}

/**
 * @param file - file to read
 * @param onProgress - callback to get the progress of the file reading
 * @returns the promise with the file content
 * @description Used to read the file content
 *  */
function readFile(
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const decoder = new TextDecoder("utf-8");
      const text = decoder.decode(arrayBuffer);
      resolve(text);
    };
    reader.onerror = () => reject(reader.error);
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

/**
 * @param file - file to get the content
 * @param onProgress - callback to get the progress of the file reading
 * @returns the promise with the file content
 * @description Used to fetch the file content based on the file type - required by the backend API
 *  */
export async function fetchFileContent(
  file: File,
  onProgress: (progress: number) => void
): Promise<FetchFileContentResult> {
  const fileExtension = getFileExtension(file.name);

  const fileContent = await readFile(file, onProgress);

  switch (fileExtension) {
    case "txt":
      return { content: fileContent as string, contentType: "text/plain" };

    case "json":
      return {
        content: fileContent,
        contentType: "application/json",
      };

    case "csv":
      return { content: fileContent, contentType: "text/csv" };

    case "xlsx":
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = new Uint8Array(e?.target?.result as ArrayBuffer);
          const workbook = read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonXlsx = utils.sheet_to_json(worksheet);
          resolve({
            content: JSON.stringify(jsonXlsx),
            contentType:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          reader.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              onProgress(progress);
            }
          };
        };
        reader.onerror = function () {
          reject(new Error("Failed to read file"));
        };
        reader.readAsArrayBuffer(file);
      });
    case "png":
      return getBase64Promise("image/png", file, onProgress);

    case "jpg":
    case "jpeg":
      return getBase64Promise("image/jpg", file, onProgress);

    case "pdf":
      return getBase64Promise("application/pdf", file, onProgress);

    default:
      throw new Error("Unsupported file type");
  }
}

/**
 * @param contentType - content type of the file
 * @param file - file to get the base64 content
 * @param onProgress - callback to get the progress of the file reading
 * @returns the promise with the base64 file content
 * @description Used to get the base64 content of the file, if something goes wrong it throws an error
 *  */
function getBase64Promise(
  contentType: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<FetchFileContentResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const base64String = e?.target?.result as string;
        resolve({
          content: base64String,
          contentType: contentType,
        });
      } catch (error) {
        reject(new Error(`Failed to read ${contentType} file`));
      }
    };
    reader.onerror = function () {
      reject(new Error("Failed to read file"));
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    };
    reader.readAsDataURL(file);
  });
}

export const convertFileContentToStatus = (file: string | undefined | null) => {
  return !file ? FileFieldStatus.None : FileFieldStatus.Existing;
};
