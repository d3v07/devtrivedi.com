import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "@/pages/Contact";

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
}

describe("Contact page", () => {
  it("renders without crashing", () => {
    expect(() => renderContact()).not.toThrow();
  });

  it("shows the hero headline", () => {
    renderContact();
    expect(screen.getByText(/Let's work/)).toBeInTheDocument();
    expect(screen.getByText("together.")).toBeInTheDocument();
  });

  it("shows the file label", () => {
    renderContact();
    expect(screen.getByText(/\/\/ contact\.tsx/)).toBeInTheDocument();
  });

  it("shows email contact card", () => {
    renderContact();
    expect(screen.getByText("trivedidev16@gmail.com")).toBeInTheDocument();
  });

  it("shows LinkedIn contact card", () => {
    renderContact();
    expect(screen.getByText("linkedin.com/in/trivedi-dev")).toBeInTheDocument();
  });

  it("shows GitHub contact card", () => {
    renderContact();
    expect(screen.getByText("github.com/d3v07")).toBeInTheDocument();
  });

  it("has correct href for email link", () => {
    renderContact();
    const emailLinks = screen.getAllByRole("link").filter(
      (l) => l.getAttribute("href") === "mailto:trivedidev16@gmail.com"
    );
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it("has correct href for LinkedIn link", () => {
    renderContact();
    const liLink = screen.getByRole("link", { name: /linkedin/i });
    expect(liLink).toHaveAttribute("href", "https://linkedin.com/in/trivedi-dev");
    expect(liLink).toHaveAttribute("target", "_blank");
  });

  it("has correct href for GitHub link", () => {
    renderContact();
    const ghLink = screen.getByRole("link", { name: /github/i });
    expect(ghLink).toHaveAttribute("href", "https://github.com/d3v07");
    expect(ghLink).toHaveAttribute("target", "_blank");
  });

  it("shows availability status", () => {
    renderContact();
    expect(screen.getByText(/Available for opportunities/)).toBeInTheDocument();
    expect(screen.getByText("Open to work")).toBeInTheDocument();
  });

  it("shows resume download link", () => {
    renderContact();
    const resumeLink = screen.getByRole("link", { name: /Download Resume/i });
    expect(resumeLink).toHaveAttribute("href", "/resume.pdf");
    expect(resumeLink).toHaveAttribute("download");
  });

  it("shows response time information", () => {
    renderContact();
    expect(screen.getByText(/≤ 24 hours/)).toBeInTheDocument();
  });

  it("shows CTA section", () => {
    renderContact();
    expect(screen.getByText(/Ready to build something/)).toBeInTheDocument();
  });

  it("shows no blur-3xl decorative elements", () => {
    const { container } = renderContact();
    const blurElements = container.querySelectorAll('[class*="blur-3xl"]');
    expect(blurElements.length).toBe(0);
  });

  it("shows no cursor-none class", () => {
    const { container } = renderContact();
    const cursorNone = container.querySelector('[class*="cursor-none"]');
    expect(cursorNone).toBeNull();
  });
});
