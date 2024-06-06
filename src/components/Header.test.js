import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import { IncompleteProfile } from "./IncompleteProfile";
import { useNavigate } from "react-router-dom";

// Mocking useSelector
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mocking useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("IncompleteProfile component", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({ theme: { theme: "light" } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders welcome message", () => {
    const { getByText } = render(<IncompleteProfile />);
    expect(getByText("Welcome to Expense Tracker App!")).toBeInTheDocument();
  });

  test("renders profile completion message", () => {
    const { getByText } = render(<IncompleteProfile />);
    expect(getByText(/Your profile is \d+% complete./i)).toBeInTheDocument();
  });

  test("renders complete now button", () => {
    const { getByText } = render(<IncompleteProfile />);
    expect(getByText("Complete Now !")).toBeInTheDocument();
  });

  test("calls useNavigate on button click", () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    const { getByText } = render(<IncompleteProfile />);
    fireEvent.click(getByText("Complete Now !"));
    expect(navigateMock).toHaveBeenCalledWith("/profileForm");
  });

  test("renders light theme container if theme is light", () => {
    useSelector.mockReturnValue({ theme: { theme: "light" } });
    const { container } = render(<IncompleteProfile />);
    expect(container.firstChild).toHaveClass("inProfile_container");
  });

  test("renders dark theme container if theme is dark", () => {
    useSelector.mockReturnValue({ theme: { theme: "dark" } });
    const { container } = render(<IncompleteProfile />);
    expect(container.firstChild).toHaveClass("inProfile_container_dark");
  });

  test("renders light theme button if theme is light", () => {
    useSelector.mockReturnValue({ theme: { theme: "light" } });
    const { getByText } = render(<IncompleteProfile />);
    expect(getByText("Complete Now !")).toHaveClass("header_btn");
  });

  test("renders dark theme button if theme is dark", () => {
    useSelector.mockReturnValue({ theme: { theme: "dark" } });
    const { getByText } = render(<IncompleteProfile />);
    expect(getByText("Complete Now !")).toHaveClass("header_btn_dark");
  });

  test("renders properly when Redux state changes", () => {
    const { rerender } = render(<IncompleteProfile />);
    useSelector.mockReturnValue({ theme: { theme: "dark" } });
    rerender(<IncompleteProfile />);
    expect(useSelector).toHaveBeenCalledTimes(2); // Once for initial render, once for state change
  });

  test("renders properly when theme is undefined", () => {
    useSelector.mockReturnValue({ theme: { theme: undefined } });
    const { container } = render(<IncompleteProfile />);
    expect(container.firstChild).toHaveClass("inProfile_container");
  });
});
