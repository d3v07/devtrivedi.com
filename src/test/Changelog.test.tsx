import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Changelog from "@/pages/Changelog";

function renderChangelog() {
  return render(
    <MemoryRouter>
      <Changelog />
    </MemoryRouter>
  );
}

describe("Changelog page", () => {
  it("renders without crashing", () => {
    expect(() => renderChangelog()).not.toThrow();
  });

  it("shows the page title", () => {
    renderChangelog();
    expect(screen.getByRole("heading", { name: "Changelog" })).toBeInTheDocument();
  });

  it("shows the file label", () => {
    renderChangelog();
    expect(screen.getByText(/\/\/ changelog\.md/)).toBeInTheDocument();
  });

  it("shows year filter tabs (All, 2026, 2025)", () => {
    renderChangelog();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2026" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2025" })).toBeInTheDocument();
  });

  it("shows all versions by default", () => {
    renderChangelog();
    expect(screen.getByText("v3.0.0")).toBeInTheDocument();
    expect(screen.getByText("v2.0.0")).toBeInTheDocument();
    expect(screen.getByText("v1.0.0")).toBeInTheDocument();
  });

  it("shows 'The OS Update' label", () => {
    renderChangelog();
    expect(screen.getByText("The OS Update")).toBeInTheDocument();
  });

  it("shows change type badges (feat, fix, perf)", () => {
    renderChangelog();
    // Multiple 'feat' badges expected
    expect(screen.getAllByText("feat").length).toBeGreaterThan(0);
    expect(screen.getAllByText("fix").length).toBeGreaterThan(0);
  });

  it("2026 filter shows only 2026 entries", async () => {
    const user = userEvent.setup();
    renderChangelog();
    await user.click(screen.getByRole("button", { name: "2026" }));
    expect(screen.getByText("v3.0.0")).toBeInTheDocument();
    expect(screen.queryByText("v1.0.0")).not.toBeInTheDocument();
  });

  it("2025 filter shows only 2025 entries", async () => {
    const user = userEvent.setup();
    renderChangelog();
    await user.click(screen.getByRole("button", { name: "2025" }));
    expect(screen.getByText("v1.0.0")).toBeInTheDocument();
    expect(screen.queryByText("v3.0.0")).not.toBeInTheDocument();
  });

  it("All filter restores all entries", async () => {
    const user = userEvent.setup();
    renderChangelog();
    await user.click(screen.getByRole("button", { name: "2026" }));
    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("v1.0.0")).toBeInTheDocument();
    expect(screen.getByText("v3.0.0")).toBeInTheDocument();
  });

  it("shows GitHub link in CTA section", () => {
    renderChangelog();
    const ghLink = screen.getByRole("link", { name: /View on GitHub/i });
    expect(ghLink).toHaveAttribute("href", "https://github.com/d3v07");
    expect(ghLink).toHaveAttribute("target", "_blank");
  });

  it("shows no JS shadow handler attributes", () => {
    const { container } = renderChangelog();
    // No elements should have inline style with boxShadow (we use CSS classes now)
    const inlineStyleElements = Array.from(container.querySelectorAll("[style]")).filter(
      (el) => (el as HTMLElement).style.boxShadow !== ""
    );
    expect(inlineStyleElements.length).toBe(0);
  });

  it("uses font-mono-code class (not font-mono)", () => {
    const { container } = renderChangelog();
    const monoElements = container.querySelectorAll('[class*="font-mono-code"]');
    expect(monoElements.length).toBeGreaterThan(0);
  });
});
