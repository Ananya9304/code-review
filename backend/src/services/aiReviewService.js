// src/services/aiReviewService.js

exports.analyzeCode = (code, language) => {
  let score = 100;
  const issues = [];
  const suggestions = [];

  // 1. Code length check
  if (code.length < 50) {
    score -= 30;
    issues.push("Code is too short");
    suggestions.push("Write complete implementation with proper logic");
  }

  // 2. Always-true / dummy return detection
  if (code.includes("return true") || code.includes("return false")) {
    score -= 25;
    issues.push("Function returns constant value");
    suggestions.push("Return meaningful computed result");
  }

  // 3. No conditional logic
  if (!code.includes("if") && !code.includes("while") && !code.includes("for")) {
    score -= 15;
    issues.push("No control flow detected");
    suggestions.push("Use conditions or loops where required");
  }

  // 4. Comments check
  if (!code.includes("//") && !code.includes("/*")) {
    score -= 10;
    suggestions.push("Add comments to explain logic");
  }

  // 5. Language-specific check
  if (language === "JavaScript" && !code.includes("function")) {
    score -= 10;
    issues.push("No function definition found");
  }

  // Normalize score
  if (score < 0) score = 0;

  // Complexity (simple heuristic)
  let complexity = "O(1)";
  if (code.includes("for") || code.includes("while")) complexity = "O(n)";
  if (code.includes("for") && code.includes("while")) complexity = "O(n²)";

  // Final feedback
  const aiFeedback =
    score >= 80
      ? "Good quality code with minor improvements needed."
      : score >= 50
      ? "Average code quality. Improve logic and structure."
      : "Poor code quality. Needs major improvements.";

  return {
    score,
    aiFeedback,
    issues,
    suggestions,
    complexity
  };
};
