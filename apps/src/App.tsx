import { DeckProvider } from "@/app/dashboard/contexts/DeckContext";
import { AccountsDashboard } from "@/components/AccountsDashboard";
import { PostsDashboard } from "@/components/PostsDashboard";
import { ProductsDashboard } from "@/components/ProductsDashboard";
import { ScreenShot } from "@/components/ScreenShot";
import { UserDashboard } from "@/components/UserDashboard";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 md:px-6">
          {[
            { to: "/products", label: "Products" },
            { to: "/posts", label: "Posts" },
            { to: "/users", label: "Users" },
            { to: "/accounts", label: "Accounts" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <ScreenShot>
          <Outlet />
        </ScreenShot>
      </main>
    </div>
  );
}

function App() {
  return (
    <DeckProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsDashboard />} />
            <Route path="/posts" element={<PostsDashboard />} />
            <Route path="/users" element={<UserDashboard />} />
            <Route path="/accounts" element={<AccountsDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeckProvider>
  );
}

export default App;
