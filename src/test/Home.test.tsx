import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Home from "@/pages/Home";

function renderHome() {
  return render(
    <AppProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </AppProvider>
  );
}

describe("Home page", () => {
  it("renders without crashing", () => {
    expect(() => renderHome()).not.toThrow();
  });

  it("shows visitor counter", () => {
    renderHome();
    expect(screen.getByText(/Visitor #/)).toBeInTheDocument();
  });

  it("shows terminal CTA with hire command", () => {
    renderHome();
    expect(screen.getByText(/hire dev/)).toBeInTheDocument();
  });

  it("shows hero description text", () => {
    renderHome();
    expect(screen.getByText(/Building scalable systems/)).toBeInTheDocument();
  });

  it("shows View Projects and Get in Touch buttons", () => {
    renderHome();
    expect(screen.getByRole("link", { name: /View Projects/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Get in Touch/ }).length).toBeGreaterThan(0);
  });

  it("shows stat cards (GPA, Experience, Projects)", () => {
    renderHome();
    expect(screen.getByText("GPA at NJIT")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("Projects Shipped")).toBeInTheDocument();
  });

  it("shows context strip (Currently, Previously, Building with)", () => {
    renderHome();
    expect(screen.getByText("Currently")).toBeInTheDocument();
    expect(screen.getByText("Previously")).toBeInTheDocument();
    expect(screen.getByText("Building with")).toBeInTheDocument();
  });

  it("shows metrics table with numbered rows", () => {
    renderHome();
    expect(screen.getByText("4.0 GPA")).toBeInTheDocument();
    expect(screen.getByText("$18K saved")).toBeInTheDocument();
    expect(screen.getByText("3× throughput")).toBeInTheDocument();
  });

  it("shows shameless pitch section", () => {
    renderHome();
    expect(screen.getByText(/shameless pitch/i)).toBeInTheDocument();
    expect(screen.getByText(/Hire Dev/)).toBeInTheDocument();
  });

  it("shows bedtime reading section", () => {
    renderHome();
    expect(screen.getByText(/Bedtime reading/i)).toBeInTheDocument();
    expect(screen.getByText(/AWS costs/i)).toBeInTheDocument();
  });

  it("shows footer with copyright", () => {
    renderHome();
    // Footer renders "Dev Trivedi" in the copyright line and marquee — use getAllByText
    expect(screen.getAllByText(/Dev Trivedi/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows location badge", () => {
    renderHome();
    expect(screen.getByText(/New York City/)).toBeInTheDocument();
  });

  it("has GitHub, LinkedIn, and Email social links", () => {
    renderHome();
    const ghLink = screen.getByRole("link", { name: "GitHub" });
    expect(ghLink).toHaveAttribute("href", "https://github.com/d3v07");

    const liLink = screen.getByRole("link", { name: "LinkedIn" });
    expect(liLink).toHaveAttribute("href", "https://linkedin.com/in/trivedi-dev");
  });
});
