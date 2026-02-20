import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Navigation from "@/components/Navigation";

function renderNav(initialPath = "/") {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Navigation />
      </MemoryRouter>
    </AppProvider>
  );
}

describe("Navigation", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders the logo DT.", () => {
    renderNav();
    expect(screen.getByText(/^DT/)).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Changelog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("shows 'status: hiring' badge", () => {
    renderNav();
    expect(screen.getByText("status: hiring")).toBeInTheDocument();
  });

  it("shows OS Mode button", () => {
    renderNav();
    expect(screen.getByTitle("Switch to OS mode")).toBeInTheDocument();
  });

  it("shows software engineer tagline", () => {
    renderNav();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("dark mode toggle starts in light mode", () => {
    renderNav();
    const toggleBtn = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("dark mode toggle switches to dark", async () => {
    const user = userEvent.setup();
    renderNav();
    const toggleBtn = screen.getByRole("button", { name: /switch to dark mode/i });
    await user.click(toggleBtn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("restores dark mode from localStorage", () => {
    localStorage.setItem("theme", "dark");
    renderNav();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
  });

  it("opens mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    renderNav();
    const hamburger = screen.getByRole("button", { name: "Toggle menu" });
    await user.click(hamburger);
    // Mobile menu links appear in addition to desktop ones
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks.length).toBeGreaterThan(1);
  });

  it("OS mode button calls setExperience", async () => {
    const user = userEvent.setup();
    // We can verify the click doesn't throw and the context state changes
    renderNav();
    const osBtn = screen.getByTitle("Switch to OS mode");
    await user.click(osBtn);
    // After click, experience should be 'os' (checked via localStorage)
    expect(localStorage.getItem("portfolio-experience")).toBe("os");
  });
});
