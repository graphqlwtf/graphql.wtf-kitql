import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

const existingCartId = localStorage.getItem("kitql-cart-id");

export const cartId = writable(existingCartId || uuidv4());

cartId.subscribe((id) => localStorage.setItem("kitql-cart-id", id));
