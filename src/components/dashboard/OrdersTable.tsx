"use client";

import { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import { orders, type CarComfort } from "@/data/dashboardData";
import styles from "./dashboard.module.css";

const PAGE_SIZE = 5;

const COMFORT_LABEL: Record<CarComfort, string> = {
  simple: "Simple",
  otra: "Otra",
  convenient: "Convenient",
};

function formatIncome(value: number): string {
  return `${value.toLocaleString("en-US")} SUM`;
}

export default function OrdersTable() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleOrders = orders.slice(start, start + PAGE_SIZE);
  const allVisibleSelected =
    visibleOrders.length > 0 && visibleOrders.every((order) => selected.has(order.id));

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(visibleOrders.map((order) => order.id)) : new Set());
  }

  function toggleOne(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  function goToPage(next: number) {
    setPage(Math.min(Math.max(next, 1), totalPages));
  }

  return (
    <section className={`${styles.panel} ${styles.ordersPanel}`}>
      <div className={styles.tableScroll}>
        <Table responsive className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={(event) => toggleAll(event.target.checked)}
                  aria-label="Select all orders on this page"
                />
              </th>
              <th>User</th>
              <th>Car Comfort</th>
              <th>Ordered Time</th>
              <th>Start Location</th>
              <th>Finish Location</th>
              <th>Income</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => (
              <tr key={order.id}>
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selected.has(order.id)}
                    onChange={(event) => toggleOne(order.id, event.target.checked)}
                    aria-label={`Select order from ${order.user.name}`}
                  />
                </td>
                <td>
                  <div className={styles.userCell}>
                    <Avatar name={order.user.name} size={36} />
                    <div>
                      <p className={styles.userCellName}>{order.user.name}</p>
                      <p className={styles.userCellPhone}>{order.user.phone}</p>
                    </div>
                  </div>
                </td>
                <td>{COMFORT_LABEL[order.carComfort]}</td>
                <td>{order.orderedTime}</td>
                <td className={styles.locationCell}>{order.startLocation}</td>
                <td className={styles.locationCell}>{order.finishLocation}</td>
                <td>
                  <span className={styles.incomeBadge}>{formatIncome(order.income)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className={styles.paginationRow}>
        <p className={styles.paginationSummary}>
          {start + 1}-{Math.min(start + PAGE_SIZE, orders.length)} of {orders.length} items
        </p>
        <div className={styles.paginationControls}>
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={pageNumber === page ? styles.pageBtnActive : styles.pageBtn}
              onClick={() => goToPage(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
