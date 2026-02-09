"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VoltageScreen from "./voltage";


// Create a client
const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <VoltageScreen />
    </QueryClientProvider>
  )
}