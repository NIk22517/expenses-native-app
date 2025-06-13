import AsyncStorage from "@react-native-async-storage/async-storage";

type KeyType = "auth";

export const setStoreData = async <T>({
  data,
  key,
}: {
  key: KeyType;
  data: T;
}): Promise<T | undefined> => {
  try {
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem(key, serializedData);
    return data;
  } catch (error) {
    console.error("Failed to set store data:", error);
    return undefined;
  }
};

export const getStoreData = async <T>({
  key,
}: {
  key: KeyType;
}): Promise<T | undefined> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : undefined;
  } catch (error) {
    console.error("Failed to get store data:", error);
    return undefined;
  }
};

export const removeStoreData = async ({ key }: { key: KeyType }) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to get store data:", error);
    return undefined;
  }
};
