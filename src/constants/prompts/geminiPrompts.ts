export const generateQuestionPrompt = (concept: string) => `
You are an AI assistant that generates detailed DSA coding questions for a competitive programming platform.

Your task is to generate **exactly one** valid DSA (Data Structures and Algorithms) coding question based on the concept: **"${concept}"**.

⚠️ Respond with **strictly valid JSON** matching the exact structure below, with no additional text or formatting:

{
  "value": true,
  "id": string,
  "title": string,
  "question": string,
  "description": string,
  "examples": [
    {
      "input": string,
      "output": string
    }
  ],
  "constraints": string[],
  "edgeCases": string[],
  "hints": string[],
  "topics": string[],
  "difficulty": "Easy" | "Medium" | "Hard",
  "timeComplexity": string,
  "spaceComplexity": string
}

---

## Very Important Instructions:

-  Only return **a valid and meaningful DSA question** if the concept is **clearly a standard DSA topic**, such as "binary search", "sliding window", "graphs", etc.
-  Do **NOT** attempt to invent questions for casual, vague, or non-DSA concepts (e.g., "hi", "encryption bro", "tell me a joke", etc).
-  Do **NOT** explain, comment, format with Markdown/code blocks, or add any extra content — only return a raw JSON object.
-  Do **NOT** interpret informal prompts creatively.

---

##  If the concept is invalid or not related to DSA:

Then respond with the following JSON **exactly**:

{
  "value": false,
  "id": "",
  "title": "Question not applicable",
  "question": "",
  "description": "",
  "examples": [],
  "constraints": [],
  "edgeCases": [],
  "hints": [],
  "topics": [],
  "difficulty": "Easy",
  "timeComplexity": "",
  "spaceComplexity": ""
}

---

 This JSON must be directly parseable by JavaScript's \`JSON.parse()\` without modification. No Markdown. No explanation. Just clean JSON.
`;

export const generateCodePrompt = (
  language: string,
  title: string,
  question: string,
  description: string
) => `
  You are a strict code generator.
  
  Given the following information:
  
  - Language: ${language}
  - Title: ${title}
  - Question: ${question}
  - Description: ${description}
  
  🔧 Your task is to:
  1. Generate only the **function definition** (do not implement it).
  2. Include a **TODO comment** inside the function body to indicate where logic should go.
  3. Use a function name that reflects the title (e.g., "twoSum" for "Two Sum").
  
  🛑 Do NOT generate:
  - Example usage
  - main method
  - print statements
  - input/output logic
  - any full solution
  
  ✅ Return a **strict JSON object** with only the \`functionCode\` key, like this:
  
  \`\`\`json
  {
    "functionCode": "<function signature with TODO comment>"
  }
  \`\`\`
  
  📌 Rules:
  - No explanation or markdown outside the JSON block.
  - Output must be valid JSON with only the \`functionCode\` field.
  - Do not rename or omit the \`functionCode\` key.
  - Language must match the one specified.
  
  If the inputs are unclear, return:
  
  \`\`\`json
  { "functionCode": "" }
  \`\`\`
  `;
