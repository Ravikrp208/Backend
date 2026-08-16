import { useCallback } from "react";
import { addItem, getCart } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { setItems } from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();

  const handleAddItem = useCallback(async ({ productId, variantId }) => {
    const data = await addItem({ productId, variantId });

    return data;
  }, []);

  const handleGetCart = useCallback(async () => {
    const data = await getCart();
    dispatch(setItems(data.cart.items));
  }, [dispatch]);

  return { handleAddItem, handleGetCart };
};
