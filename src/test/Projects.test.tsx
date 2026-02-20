import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Projects from "@/pages/Projects";

// Mock swiper since it relies on DOM APIs not available in jsdom
vi.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>,
}));
vi.mock("swiper/modules", () => ({ Navigation: {}, Pagination: {} }));
vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/navigation", () => ({}));
vi.mock("swiper/css/pagination", () => ({}));

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );
}

describe("Projects page", () => {
  it("renders without crashing", () => {
    expect(() => renderProjects()).not.toThrow();
  });

  it("shows page header and label", () => {
    renderProjects();
    expect(screen.getByText(/App Library/)).toBeInTheDocument();
  });

  it("shows all filter tabs (All, AI, Infrastructure, Engineering)", () => {
    renderProjects();
    expect(screen.getByRole("button", { name: /All/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /AI/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Infrastructure/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Engineering/ })).toBeInTheDocument();
  });

  it("shows shuffle button", () => {
    renderProjects();
    expect(screen.getByRole("button", { name: /Shuffle/ })).toBeInTheDocument();
  });

  it("shows project cards with filenames", () => {
    renderProjects();
    expect(screen.getByText("Lintellect.cpp")).toBeInTheDocument();
    expect(screen.getByText("FinMind.ipynb")).toBeInTheDocument();
    expect(screen.getByText("PulseOps.go")).toBeInTheDocument();
  });

  it("shows 'Open Slides' buttons", () => {
    renderProjects();
    const openSlidesBtns = screen.getAllByText(/Open Slides/);
    expect(openSlidesBtns.length).toBeGreaterThan(0);
  });

  it("AI filter shows only AI projects", async () => {
    const user = userEvent.setup();
    renderProjects();
    await user.click(screen.getByRole("button", { name: /^AI/ }));
    // After clicking AI, should show Lintellect (AI) but not PulseOps (Infrastructure)
    expect(screen.getByText("Lintellect.cpp")).toBeInTheDocument();
    expect(screen.queryByText("PulseOps.go")).not.toBeInTheDocument();
  });

  it("Infrastructure filter shows only Infrastructure projects", async () => {
    const user = userEvent.setup();
    renderProjects();
    await user.click(screen.getByRole("button", { name: /Infrastructure/ }));
    expect(screen.getByText("PulseOps.go")).toBeInTheDocument();
    expect(screen.queryByText("Lintellect.cpp")).not.toBeInTheDocument();
  });

  it("Engineering filter shows only Engineering projects", async () => {
    const user = userEvent.setup();
    renderProjects();
    await user.click(screen.getByRole("button", { name: /Engineering/ }));
    expect(screen.getByText("ChatterBox.rs")).toBeInTheDocument();
    expect(screen.queryByText("Lintellect.cpp")).not.toBeInTheDocument();
  });

  it("All filter restores all projects", async () => {
    const user = userEvent.setup();
    renderProjects();
    await user.click(screen.getByRole("button", { name: /^AI/ }));
    await user.click(screen.getByRole("button", { name: /^All/ }));
    expect(screen.getByText("Lintellect.cpp")).toBeInTheDocument();
    expect(screen.getByText("PulseOps.go")).toBeInTheDocument();
  });

  it("shuffle button rerenders project cards", async () => {
    const user = userEvent.setup();
    renderProjects();
    // Just verify shuffle doesn't crash and cards are still visible
    const shuffleBtn = screen.getByRole("button", { name: /Shuffle/ });
    await user.click(shuffleBtn);
    const cards = screen.getAllByText(/Open Slides/);
    expect(cards.length).toBeGreaterThan(0);
  });
});
