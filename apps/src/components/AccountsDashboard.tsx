import * as React from "react";
import { useGetAccountsPaged } from "@api/hooks/useAccounts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

const chartConfig = {
  availableBalance: {
    label: "Available Balance",
    color: "var(--chart-1)",
  },
  balance: {
    label: "Balance",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AccountsDashboard() {
  const [metric, setMetric] = React.useState<"availableBalance" | "balance">(
    "availableBalance",
  );

  const { data, isLoading, isError } = useGetAccountsPaged({
    pageNumber: 1,
    pageSize: 8,
    sort: `${metric}:desc`,
  });

  const chartData =
    data?.content.map((account, index) => ({
      account:
        account.accountName.length > 12
          ? `${account.accountName.slice(0, 12)}…`
          : account.accountName || `Account ${index + 1}`,
      availableBalance: Math.max(0, Number(account.availableBalance) || 0),
      balance: Math.max(0, Number(account.balance) || 0),
    })) ?? [];

  const metricLabel =
    metric === "availableBalance" ? "available balance" : "balance";

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Accounts Spider Chart
          </h2>
          <p className="text-sm text-muted-foreground">
            Top accounts by {metricLabel}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={metric === "availableBalance" ? "default" : "outline"}
            size="sm"
            onClick={() => setMetric("availableBalance")}
          >
            Available Balance
          </Button>
          <Button
            variant={metric === "balance" ? "default" : "outline"}
            size="sm"
            onClick={() => setMetric("balance")}
          >
            Balance
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        {isLoading ? (
          <div className="flex h-[420px] items-center justify-center text-muted-foreground">
            Loading chart...
          </div>
        ) : isError ? (
          <div className="flex h-[420px] items-center justify-center text-destructive">
            Failed to load accounts.
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[420px] items-center justify-center text-muted-foreground">
            No account data available.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[420px] w-full max-w-3xl"
          >
            <RadarChart data={chartData} outerRadius="72%">
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarGrid />
              <PolarAngleAxis
                dataKey="account"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <PolarRadiusAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <Radar
                dataKey={metric}
                fill={`var(--color-${metric})`}
                fillOpacity={0.35}
                stroke={`var(--color-${metric})`}
                strokeWidth={2}
              />
            </RadarChart>
          </ChartContainer>
        )}

        <div className="mt-2 text-xs text-muted-foreground">
          {data
            ? `Showing ${chartData.length} of ${data.totalSize} account${data.totalSize !== 1 ? "s" : ""}`
            : null}
        </div>
      </div>
    </div>
  );
}
