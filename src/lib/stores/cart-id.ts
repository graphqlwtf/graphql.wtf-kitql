import { browser } from "$app/env";
import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

const existingCartId = browser ? localStorage.getItem("kitql-cart-id") : null;

export const cartId = writable(existingCartId || uuidv4());

cartId.subscribe((id) => {
  if (browser) {
    localStorage.setItem("kitql-cart-id", id);
  }
});
