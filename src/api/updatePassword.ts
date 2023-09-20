import { useClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";

export const updatePasswordApi = async (
  password: string,
  id: string,
  service: string
) => {
  try {
    const data = {
      password,
      service,
    };

    const response = await useClient().put(
      `${Routes.CREATE_PASSWORD}${id}`,
      data
    );

    return response;
  } catch (error) {
    return error;
  }
};
