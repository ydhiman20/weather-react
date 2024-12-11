export async function ApiHelper(
  url: string,
  options: RequestInit = {}
): Promise<unknown> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(
        `ApiHelper error: ${response.status} ${response.statusText}`
      );
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ApiHelper caught error:", error);
    return null; // Return null to handle errors gracefully
  }
}


