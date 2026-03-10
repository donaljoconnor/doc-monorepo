import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useGetPosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PostsDashboard() {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading, isError, error } = useGetPosts({
    limit: pageSize,
    skip: pageIndex * pageSize,
  });

  const total = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  React.useEffect(() => {
    const lastPageIndex = Math.max(0, pageCount - 1);
    if (pageIndex > lastPageIndex) {
      setPageIndex(lastPageIndex);
    }
  }, [pageCount, pageIndex]);

  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <section className="mx-auto max-w-6xl space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Posts Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Data source: https://mockly.me/posts
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Body</TableHead>
                  <TableHead className="w-24">User</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="w-28 text-right">Reactions</TableHead>
                  <TableHead className="w-36">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Loading posts…
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-destructive"
                    >
                      {(error as Error)?.message ?? "Failed to fetch posts."}
                    </TableCell>
                  </TableRow>
                ) : (data?.posts.length ?? 0) === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No posts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.id}</TableCell>
                      <TableCell className="max-w-[260px] truncate">
                        {post.title}
                      </TableCell>
                      <TableCell className="max-w-[380px] truncate text-muted-foreground">
                        {post.body}
                      </TableCell>
                      <TableCell>{post.userId}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {post.reactions}
                      </TableCell>
                      <TableCell>
                        {new Date(post.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 border-t border-border px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
            <div className="text-muted-foreground">
              {total === 0
                ? "0 posts"
                : `${pageIndex * pageSize + 1}-${Math.min((pageIndex + 1) * pageSize, total)} of ${total} posts`}
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="posts-page-size"
                className="text-muted-foreground"
              >
                Rows:
              </label>
              <select
                id="posts-page-size"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageIndex(0);
                }}
                className="h-8 rounded-md border border-input bg-background px-2"
              >
                {[10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <span className="mx-2 text-muted-foreground">
                Page {Math.min(pageIndex + 1, pageCount)} of {pageCount}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPageIndex(0)}
                disabled={pageIndex === 0}
              >
                <span className="sr-only">First page</span>
                <ChevronsLeftIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                disabled={pageIndex === 0}
              >
                <span className="sr-only">Previous page</span>
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() =>
                  setPageIndex((p) => Math.min(pageCount - 1, p + 1))
                }
                disabled={pageIndex >= pageCount - 1}
              >
                <span className="sr-only">Next page</span>
                <ChevronRightIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPageIndex(pageCount - 1)}
                disabled={pageIndex >= pageCount - 1}
              >
                <span className="sr-only">Last page</span>
                <ChevronsRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
