import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BasicUser {
  id: string;
  name: string;
  username: string;
  email: string;
  job_title: string;
  company: string;
  subscription_status: string;
  created_at: string;
}

async function getUsers(): Promise<BasicUser[]> {
  const response = await fetch("https://mockly.me/users");
  if (!response.ok) {
    throw new Error(`Failed to load users: ${response.status}`);
  }
  return response.json() as Promise<BasicUser[]>;
}

export function UserDashboard() {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const rows = React.useMemo(() => data ?? [], [data]);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePageIndex = Math.min(pageIndex, pageCount - 1);
  const start = safePageIndex * pageSize;
  const pagedRows = rows.slice(start, start + pageSize);

  React.useEffect(() => {
    if (pageIndex !== safePageIndex) {
      setPageIndex(safePageIndex);
    }
  }, [pageIndex, safePageIndex]);

  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <section className="mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            User Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Data source: https://mockly.me/users
          </p>
        </div>

        {isLoading && (
          <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            Loading users…
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            {(error as Error)?.message ?? "Failed to fetch users."}
          </div>
        )}

        {data && (
          <div className="space-y-4 rounded-lg border border-border bg-card p-4">
            <div className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedRows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagedRows.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.job_title}</TableCell>
                        <TableCell>{user.company}</TableCell>
                        <TableCell className="capitalize">
                          {user.subscription_status}
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="text-muted-foreground">
                {rows.length === 0
                  ? "0 users"
                  : `${start + 1}-${Math.min(start + pageSize, rows.length)} of ${rows.length} user${rows.length !== 1 ? "s" : ""}`}
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="rows-per-page"
                  className="text-muted-foreground"
                >
                  Rows:
                </label>
                <select
                  id="rows-per-page"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPageIndex(0);
                  }}
                  className="h-8 rounded-md border border-input bg-background px-2"
                >
                  {[5, 10, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span className="mx-2 text-muted-foreground">
                  Page {safePageIndex + 1} of {pageCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                  disabled={safePageIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPageIndex((p) => Math.min(pageCount - 1, p + 1))
                  }
                  disabled={safePageIndex >= pageCount - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
