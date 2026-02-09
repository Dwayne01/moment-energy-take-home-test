const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiHandler(method: string, endpoint: string, data?: any) {
  const url = `${apiUrl}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}