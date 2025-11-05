import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const history = [
  { id: 1, date: "2025-10-02", desc: "Added funds", amount: "+₹500.00" },
  { id: 2, date: "2025-10-12", desc: "Purchased: Spiderman", amount: "-₹249.00" },
];

export default function BalancePage() {
  const balance = 812.5;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Account Balance</h1>
        <div className="flex items-center gap-2"><span className="text-foreground font-semibold">₹{balance.toFixed(2)}</span><Button>Add Funds</Button></div>
      </div>
      <div className="rounded-lg border border-border bg-secondary p-4">
        <h2 className="text-foreground font-semibold mb-3">Transaction History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map(h => (
              <TableRow key={h.id}>
                <TableCell>{h.date}</TableCell>
                <TableCell>{h.desc}</TableCell>
                <TableCell className="text-right">{h.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}



