import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (name: string, data: any) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    console.log('error saving data ', error);
  }
};

export const getData = async (name: string) => {
  try {
    const data: any = await AsyncStorage.getItem(name);
    return JSON.parse(data);
  } catch (e) {
    console.log('error getting data ', e);
  }
};

export const removeData = async (name: string) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    console.log('error remove data ', e);
  }
};
