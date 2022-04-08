import { browser } from "$app/env";
import * as Types from "$lib/graphql/_kitql/graphqlTypes";
import {
  defaultStoreValue,
  RequestStatus,
  ResponseResultType,
  type PatchType,
  type RequestParameters,
  type RequestQueryParameters,
  type RequestResult,
} from "@kitql/client";
import { get, writable } from "svelte/store";
import { kitQLClient } from "../kitQLClient";

/**
 * Init KitQL (to have clientStarted = true!)
 *
 * Waiting for: https://github.com/sveltejs/kit/issues/4447
 */
export function KQL__Init() {}

/* Internal. To skip await on a client side navigation in the load function (from queryLoad)! */
let clientStarted = false; // Will be true on a client side navigation
if (browser) {
  addEventListener("sveltekit:start", () => {
    clientStarted = true;
  });
}

/**
 * ResetAllCaches in One function!
 */
export function KQL__ResetAllCaches() {
  KQL_GetCartBydId.resetCache();
}

/* Operations 👇 */
function KQL_AddToCartStore() {
  const operationName = "KQL_AddToCart";
  const operationType = ResponseResultType.Mutation;

  // prettier-ignore
  const { subscribe, set, update } = writable<RequestResult<Types.AddToCartMutation, Types.AddToCartMutationVariables>>({...defaultStoreValue, operationName, operationType});

  async function mutateLocal(
    params?: RequestParameters<Types.AddToCartMutationVariables>
  ): Promise<
    RequestResult<Types.AddToCartMutation, Types.AddToCartMutationVariables>
  > {
    let { fetch, variables } = params ?? {};

    const storedVariables = get(KQL_AddToCart).variables;
    variables = variables ?? storedVariables;

    update((c) => {
      return { ...c, isFetching: true, status: RequestStatus.LOADING };
    });

    // prettier-ignore
    const res = await kitQLClient.request<Types.AddToCartMutation, Types.AddToCartMutationVariables>({
				skFetch: fetch,
				document: Types.AddToCartDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
    const result = {
      ...res,
      isFetching: false,
      status: RequestStatus.DONE,
      variables,
    };
    set(result);
    return result;
  }

  return {
    subscribe,

    /**
     * Can be used for SSR, but simpler option is `.queryLoad`
     * @returns fill this store & the cache
     */
    mutate: mutateLocal,
  };
}
/**
 * KitQL Svelte Store with the latest `AddToCart` Operation
 */
export const KQL_AddToCart = KQL_AddToCartStore();

function KQL_GetCartBydIdStore() {
  const operationName = "KQL_GetCartBydId";
  const operationType = ResponseResultType.Query;

  // prettier-ignore
  const { subscribe, set, update } = writable<RequestResult<Types.GetCartBydIdQuery, Types.GetCartBydIdQueryVariables>>({...defaultStoreValue, operationName, operationType});

  async function queryLocal(
    params?: RequestQueryParameters<Types.GetCartBydIdQueryVariables>
  ): Promise<
    RequestResult<Types.GetCartBydIdQuery, Types.GetCartBydIdQueryVariables>
  > {
    let { fetch, variables, settings } = params ?? {};
    let { cacheMs, policy } = settings ?? {};

    const storedVariables = get(KQL_GetCartBydId).variables;
    variables = variables ?? storedVariables;
    policy = policy ?? kitQLClient.policy;

    // Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
    if (browser) {
      if (policy !== "network-only") {
        // prettier-ignore
        const cachedData = kitQLClient.requestCache<Types.GetCartBydIdQuery, Types.GetCartBydIdQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
        if (cachedData) {
          const result = {
            ...cachedData,
            isFetching: false,
            status: RequestStatus.DONE,
          };
          if (policy === "cache-first") {
            set(result);
            if (!result.isOutdated) {
              return result;
            }
          } else if (policy === "cache-only") {
            set(result);
            return result;
          } else if (policy === "cache-and-network") {
            set(result);
          }
        }
      }
    }

    update((c) => {
      return { ...c, isFetching: true, status: RequestStatus.LOADING };
    });

    // prettier-ignore
    const res = await kitQLClient.request<Types.GetCartBydIdQuery, Types.GetCartBydIdQueryVariables>({
				skFetch: fetch,
				document: Types.GetCartBydIdDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
    const result = {
      ...res,
      isFetching: false,
      status: RequestStatus.DONE,
      variables,
    };
    set(result);
    return result;
  }

  return {
    subscribe,

    /**
     * Can be used for SSR, but simpler option is `.queryLoad`
     * @returns fill this store & the cache
     */
    query: queryLocal,

    /**
     * Ideal for SSR query. To be used in SvelteKit load function
     * @returns fill this store & the cache
     */
    queryLoad: async (
      params?: RequestQueryParameters<Types.GetCartBydIdQueryVariables>
    ): Promise<void> => {
      if (clientStarted) {
        queryLocal(params); // No await in purpose, we are in a client navigation.
      } else {
        await queryLocal(params);
      }
    },

    /**
     * Reset Cache
     */
    resetCache(
      variables: Types.GetCartBydIdQueryVariables | null = null,
      allOperationKey: boolean = true,
      withResetStore: boolean = true
    ) {
      kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
      if (withResetStore) {
        set({ ...defaultStoreValue, operationName });
      }
    },

    /**
     * Patch the store &&|| cache with some data.
     */
    // prettier-ignore
    patch(data: Types.GetCartBydIdQuery, variables: Types.GetCartBydIdQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.GetCartBydIdQuery, Types.GetCartBydIdQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_GetCartBydId), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_GetCartBydId), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		},
  };
}
/**
 * KitQL Svelte Store with the latest `GetCartBydId` Operation
 */
export const KQL_GetCartBydId = KQL_GetCartBydIdStore();

function KQL_RemoveFromCartStore() {
  const operationName = "KQL_RemoveFromCart";
  const operationType = ResponseResultType.Mutation;

  // prettier-ignore
  const { subscribe, set, update } = writable<RequestResult<Types.RemoveFromCartMutation, Types.RemoveFromCartMutationVariables>>({...defaultStoreValue, operationName, operationType});

  async function mutateLocal(
    params?: RequestParameters<Types.RemoveFromCartMutationVariables>
  ): Promise<
    RequestResult<
      Types.RemoveFromCartMutation,
      Types.RemoveFromCartMutationVariables
    >
  > {
    let { fetch, variables } = params ?? {};

    const storedVariables = get(KQL_RemoveFromCart).variables;
    variables = variables ?? storedVariables;

    update((c) => {
      return { ...c, isFetching: true, status: RequestStatus.LOADING };
    });

    // prettier-ignore
    const res = await kitQLClient.request<Types.RemoveFromCartMutation, Types.RemoveFromCartMutationVariables>({
				skFetch: fetch,
				document: Types.RemoveFromCartDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
    const result = {
      ...res,
      isFetching: false,
      status: RequestStatus.DONE,
      variables,
    };
    set(result);
    return result;
  }

  return {
    subscribe,

    /**
     * Can be used for SSR, but simpler option is `.queryLoad`
     * @returns fill this store & the cache
     */
    mutate: mutateLocal,
  };
}
/**
 * KitQL Svelte Store with the latest `RemoveFromCart` Operation
 */
export const KQL_RemoveFromCart = KQL_RemoveFromCartStore();
