import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getDataWithValidation(endpoint: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("biznode_token")?.value;

    const url = `https://api.arrazishopping.com/api${endpoint}`;

    const res = await fetch(url, {
      next: {
        revalidate: 10,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res.status === 401 || res.status === 403) {
      redirect("/logout");
    }
    if (!res.ok) {
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const errorData = await res.json();
        throw new Error(
          `API error (${res.status}): ${JSON.stringify(errorData)}`
        );
      } else {
        const text = await res.text();
        const preview = text.substring(0, 100);
        throw new Error(
          `API returned non-JSON response (${res.status}): ${preview}...`
        );
      }
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      const preview = text.substring(0, 100);
      throw new Error(
        `Expected JSON but got: ${contentType}, preview: ${preview}...`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
