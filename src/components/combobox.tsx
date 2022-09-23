import { component$, PropFunction, useStore, useWatch$ } from "@builder.io/qwik";

interface ComboBoxProps {
  entity: string;
  field: string;
  alternative_field: string;
  placeholder: string;
  parent?: object;
  onEmpty$: PropFunction<(result: boolean) => any>;
  onSelected$: PropFunction<(result: any) => any>;
}

export default component$((props: ComboBoxProps) => {
  // Declare local state
  const state = useStore({
    keyword: "",
    options: [],
    preventSearch: true,
  });

  useWatch$(({ track, cleanup }) => {
    track(state, "keyword");

    const debounced = setTimeout(async () => {
      if (!state.preventSearch) {
        const controller = new AbortController();

        cleanup(() => controller.abort());

        state.options = await fetchAPI(
          props.entity,
          props.field,
          props.parent || {},
          state.keyword,
          controller
        );
      }
    }, 300);

    return () => clearTimeout(debounced);
  });

  return (
    <div class="flex flex-col items-center relative">
      <div class="w-full my-2 p-1 bg-white flex border border-gray-200 rounded-lg">
        <input
          value={state.keyword}
          onFocus$={async () => {
            if (state.options.length == 0) {
              state.options = await fetchAPI(
                props.entity,
                '',
                props.parent || {},
                ''
              );

              if (state.options.length == 0) {
                props.onEmpty$(true)
              }
            }
          }}
          onInput$={(e) => {
            state.keyword = (e.target as HTMLInputElement).value;
            state.preventSearch = false;
          }}
          placeholder={props.placeholder}
          class="appearance-none px-4 py-3 text-lg outline-none w-full text-gray-600"
        />
      </div>
      <div
        class={
          state.options?.length > 0
            ? "absolute top-20 left-0 shadow-xl border rounded-lg bg-white w-full z-10 overflow-hidden"
            : ""
        }
      >
        {state.options?.map((result) => {
          if (result[props.field] !== '') {
            return (
              <div
                onClick$={() => {
                  state.keyword = result[props.field] || result[props.alternative_field];
                  state.options = [];
                  state.preventSearch = true;
                  props.onSelected$(result)
                }}
                class="px-6 py-3 hover:bg-gray-50 border-b cursor-pointer text-gray-500"
              >
                {result[props.field] || result[props.alternative_field]}
              </div>
            )
          }
        })}
      </div>
    </div>
  );
});

export async function fetchAPI(
  entity: string,
  field: string,
  parent: any,
  keyword: string,
  controller?: AbortController
): Promise<[]> {
  const hasParent = Object.keys(parent).length > 0
  const resp = await fetch(
    `https://owlengine.com/api/${entity}?limit=6${
      field != ''
        ? `&${field}=${keyword}`
        : ''
    }${
      hasParent
        ? `&${Object.keys(parent).map((prop: string) => {
          return `${prop}=${parent[prop]}`
        }).join('&')}`
        : ''
    }`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: "Bearer 1|CPxkyhgwlYzR62qEY3eOMbGN3t5P0Xr6xpYyhYQ8",
      },
    }
  );

  const json = await resp.json();

  if (json.data) {
    if (json.code > 200) {
      return Promise.reject(json.message);
    }

    return Promise.resolve(json?.data?.data);
  }

  return [];
}
