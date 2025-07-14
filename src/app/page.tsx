"use client";

import { useCodeStore } from "@/stores/useCodeStore";
import { Question, useQuestionStore } from "@/stores/useQuestionStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { setQuestion, clearQuestion } = useQuestionStore();
  const { setMainCode, setFunctionCode } = useCodeStore();

  const sampleQuestion: Question = {
    id: "gen-xyz",
    title: "Maximum Sum Subarray of Size K",
    question: "Find the maximum sum of a contiguous subarray of size k.",
    description: `You are given an array of integers \`nums\` and a positive integer \`k\`. Your task is to find the **maximum sum** of any contiguous subarray of length exactly \`k\`.
  
  Return the maximum sum obtained from any such subarray.
  
  This problem is a classic example of the **Sliding Window** technique, which helps optimize brute-force O(n*k) solutions to linear time.
  
  ### Input
  - An array \`nums\` of integers where \`1 <= nums.length <= 10^5\`
  - An integer \`k\` such that \`1 <= k <= nums.length\`
  
  ### Output
  - An integer representing the **maximum possible sum** of any contiguous subarray of size \`k\`.
  
  ### Note
  - If all elements are negative, return the largest sum of k contiguous negatives.
  - You must solve it in O(n) time.`,

    examples: [
      { input: "nums = [1, 4, 2, 10, 2, 3, 1, 0, 20], k = 4", output: "24" },
      { input: "nums = [2, 3], k = 1", output: "3" },
    ],

    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length",
    ],

    edgeCases: [
      "All elements are negative: nums = [-3, -2, -5, -1], k = 2",
      "k is 1: should return the max element",
      "nums has all same values",
    ],

    hints: [
      "Use a sliding window of size k.",
      "Keep track of the window sum while traversing the array.",
      "Update the max sum when the window moves forward.",
    ],

    topics: ["Array", "Sliding Window"],

    difficulty: "Easy",

    timeComplexity: "O(n)",

    spaceComplexity: "O(1)",
  };

  const functionCode: string = `
  public static int findMaxSum(int[] nums, int k) {
    // user edits here
}
  `;

  const mainCode: string = `
  public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 4, 2, 10, 2, 3, 1, 0, 20};
        int k = 4;
        System.out.println("Max Sum: " + findMaxSum(nums, k));
    }
}
`;

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-background text-text">
      <button
        onClick={() => router.push("/pages/editor/3")}
        className="cursor-pointer"
      >
        Go to editor
      </button>
      <button
        onClick={() => router.push("/pages/editor/gen-1234")}
        className="cursor-pointer"
      >
        Go to editor
      </button>
      <button onClick={() => setQuestion(sampleQuestion)}>Add question</button>
      <button onClick={() => clearQuestion()}> Clear Question</button>
      <button onClick={() => setMainCode("java", mainCode)}>
        {" "}
        set main code
      </button>
      <button onClick={() => setFunctionCode("java", functionCode)}>
        {" "}
        set function code
      </button>
    </div>
  );
}
