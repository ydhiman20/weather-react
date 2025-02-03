export async function ApiHelper<T>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(
        `ApiHelper error: ${response.status} ${response.statusText}`
      );
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T; // Assert that the response matches the expected type
  } catch (error) {
    console.error("ApiHelper caught error:", error);
    return null; // Return null to handle errors gracefully
  }
}
