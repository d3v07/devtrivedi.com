import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "@/pages/About";

function renderAbout() {
  return render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );
}

describe("About page", () => {
  it("renders without crashing", () => {
    expect(() => renderAbout()).not.toThrow();
  });

  it("shows the hero headline", () => {
    renderAbout();
    expect(screen.getByText(/I don't just write code/)).toBeInTheDocument();
  });

  it("shows the hero file label", () => {
    renderAbout();
    expect(screen.getByText(/\/\/ about\.md/)).toBeInTheDocument();
  });

  it("shows stats (4.0 GPA, 1.5+ years, 85%, 10K)", () => {
    renderAbout();
    // 4.0 appears in both the stats row and education GPA
    expect(screen.getAllByText("4.0").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("1.5+")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("10K")).toBeInTheDocument();
  });

  it("shows experience section with both companies", () => {
    renderAbout();
    expect(screen.getByText("RR Enterprise")).toBeInTheDocument();
    expect(screen.getByText("Nuance Media")).toBeInTheDocument();
  });

  it("shows skill categories", () => {
    renderAbout();
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Tech Stack")).toBeInTheDocument();
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Databases & Tools")).toBeInTheDocument();
  });

  it("shows specific skills", () => {
    renderAbout();
    // C++ appears in both skills section and experience tech tags
    expect(screen.getAllByText("C++").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Python").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("shows education section with NJIT", () => {
    renderAbout();
    expect(screen.getByText("New Jersey Institute of Technology")).toBeInTheDocument();
    // GPA 4.0 should appear in education section (it also appears in stats, so getAll)
    const gpaValues = screen.getAllByText("4.0");
    expect(gpaValues.length).toBeGreaterThanOrEqual(1);
  });

  it("shows JNTU entry", () => {
    renderAbout();
    expect(screen.getByText("Jawaharlal Nehru Technological University")).toBeInTheDocument();
  });

  it("shows leadership section", () => {
    renderAbout();
    expect(screen.getByText(/Beyond the code/)).toBeInTheDocument();
    expect(screen.getByText("Qualcomm AI Hackathon, NYU")).toBeInTheDocument();
    expect(screen.getByText("NJIT GDG, Newark")).toBeInTheDocument();
  });

  it("shows no blur orbs (no blur-3xl class in rendered output)", () => {
    const { container } = renderAbout();
    // There should be no blurry decorative elements
    const blurElements = container.querySelectorAll('[class*="blur-3xl"]');
    expect(blurElements.length).toBe(0);
  });

  it("shows no cursor-none class", () => {
    const { container } = renderAbout();
    const cursorNone = container.querySelector('[class*="cursor-none"]');
    expect(cursorNone).toBeNull();
  });
});
