import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ActionSearchBar } from "./components/ui/action-search-bar"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ActionSearchBar />
    </QueryClientProvider>
  )
}

export default App
