import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, useApp } from "@/context/AppContext";

// Helper component to expose context values
function ContextConsumer() {
  const { experience, setExperience, toggleExperience, windowState, setWindowState, windowOpen, setWindowOpen } = useApp();
  return (
    <div>
      <span data-testid="experience">{experience}</span>
      <span data-testid="window-state">{windowState}</span>
      <span data-testid="window-open">{String(windowOpen)}</span>
      <button onClick={() => setExperience("os")}>set-os</button>
      <button onClick={() => setExperience("website")}>set-website</button>
      <button onClick={toggleExperience}>toggle</button>
      <button onClick={() => setWindowState("minimized")}>minimize</button>
      <button onClick={() => setWindowState("maximized")}>maximize</button>
      <button onClick={() => setWindowState("normal")}>restore</button>
      <button onClick={() => setWindowOpen(false)}>close-window</button>
      <button onClick={() => setWindowOpen(true)}>open-window</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <AppProvider>
      <ContextConsumer />
    </AppProvider>
  );
}

describe("AppContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to os experience on desktop widths", () => {
    renderWithProvider();
    expect(screen.getByTestId("experience")).toHaveTextContent("os");
  });

  it("setExperience switches to os mode", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("set-os"));
    expect(screen.getByTestId("experience")).toHaveTextContent("os");
  });

  it("setExperience persists to localStorage", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("set-os"));
    expect(localStorage.getItem("portfolio-experience")).toBe("os");
  });

  it("toggleExperience flips website to os", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("set-website"));
    expect(screen.getByTestId("experience")).toHaveTextContent("website");
    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("experience")).toHaveTextContent("os");
  });

  it("toggleExperience flips from os back to website", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("set-os"));
    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("experience")).toHaveTextContent("website");
  });

  it("restores experience from localStorage on mount", () => {
    localStorage.setItem("portfolio-experience", "os");
    renderWithProvider();
    expect(screen.getByTestId("experience")).toHaveTextContent("os");
  });

  it("useApp throws when used outside AppProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ContextConsumer />)).toThrow("useApp must be used within AppProvider");
    consoleSpy.mockRestore();
  });

  // ── windowState / windowOpen ──────────────────────────────────────────────

  it("defaults windowState to normal and windowOpen to true", () => {
    renderWithProvider();
    expect(screen.getByTestId("window-state")).toHaveTextContent("normal");
    expect(screen.getByTestId("window-open")).toHaveTextContent("true");
  });

  it("setWindowState updates window state", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("minimize"));
    expect(screen.getByTestId("window-state")).toHaveTextContent("minimized");
    await user.click(screen.getByText("maximize"));
    expect(screen.getByTestId("window-state")).toHaveTextContent("maximized");
    await user.click(screen.getByText("restore"));
    expect(screen.getByTestId("window-state")).toHaveTextContent("normal");
  });

  it("setWindowOpen toggles window open state", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("close-window"));
    expect(screen.getByTestId("window-open")).toHaveTextContent("false");
    await user.click(screen.getByText("open-window"));
    expect(screen.getByTestId("window-open")).toHaveTextContent("true");
  });

  it("setExperience('os') resets windowState to normal and windowOpen to true", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    // First close and minimize
    await user.click(screen.getByText("close-window"));
    await user.click(screen.getByText("minimize"));
    expect(screen.getByTestId("window-state")).toHaveTextContent("minimized");
    expect(screen.getByTestId("window-open")).toHaveTextContent("false");
    // Entering OS mode resets both
    await user.click(screen.getByText("set-os"));
    expect(screen.getByTestId("window-state")).toHaveTextContent("normal");
    expect(screen.getByTestId("window-open")).toHaveTextContent("true");
  });

  it("setExperience('website') does not reset window state", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("minimize"));
    await user.click(screen.getByText("set-website"));
    // windowState persists — setExperience("website") has no reset logic
    expect(screen.getByTestId("window-state")).toHaveTextContent("minimized");
  });
});
