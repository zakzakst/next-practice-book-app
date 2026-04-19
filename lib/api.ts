export const getApiPath = (path: string) => {
  // TODO: 環境変数でURLの出し分け処理
  return `http://localhost:3000/api${path}`;
};

export const API_MOCK_DEFAULT_DELAY = 1000;

export const apiDelay = (
  delay: number = API_MOCK_DEFAULT_DELAY,
): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const handleFetchResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData?.error?.message || "エラーが発生しました";
    throw new Error(errorMessage);
  }
  return res.json();
};

// Create
export const createFetcher = <CreateRequest, CreateResponse>(
  url: string,
  { arg }: { arg: CreateRequest },
) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  }).then(handleFetchResponse) as Promise<CreateResponse>;
};

// FindAll
export const findAllFetcher = <FindAllResponse, FindAllParams = undefined>({
  url,
  params,
}: {
  url: string;
  params: FindAllParams;
}) => {
  const normalizedParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });
  const stringifiedParams = normalizedParams.toString();
  const formattedUrl =
    stringifiedParams.length > 0 ? `${url}?${stringifiedParams}` : url;
  return fetch(formattedUrl).then(handleFetchResponse) as Promise<FindAllResponse>;
};

// FindOne
export const findOneFetcher = <FindOneResponse>(url: string) => {
  return fetch(url).then(handleFetchResponse) as Promise<FindOneResponse>;
};

// Update
export const updateFetcher = <UpdateRequest, UpdateResponse>(
  url: string,
  { arg }: { arg: UpdateRequest },
) => {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  }).then(handleFetchResponse) as Promise<UpdateResponse>;
};

// Remove
export const removeFetcher = (url: string) => {
  return fetch(url, {
    method: "DELETE",
  }).then(handleFetchResponse);
};
