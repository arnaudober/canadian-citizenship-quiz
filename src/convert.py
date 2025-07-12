import json
import re

def parse_questions(file_path):
  """
  Parse questions from the dataset.txt file and convert them to structured data.

  Args:
      file_path (str): Path to the dataset.txt file

  Returns:
      list: List of questions with options and correct answer index
  """
  # Read the file content
  with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read()

  # Regular expression to match question patterns
  pattern = r'(\d+)\.\s+(.*?)\n(.*?)\n(.*?)\n(.*?)\n(.*?)(?=\n\d+\.|$)'
  matches = re.findall(pattern, content, re.DOTALL)

  questions = []

  for match in matches:
    question_number = match[0]
    question_text = match[1].strip()
    options = [option.strip() for option in match[2:6]]

    # Find the correct option index
    correct_option_index = None
    for i, option in enumerate(options):
      if "(correct answer)" in option:
        correct_option_index = i
        # Remove the "(correct answer)" marker
        options[i] = option.replace("(correct answer)", "").strip()

    # Skip questions with missing correct answer
    if correct_option_index is None:
      continue

    # Create a question object (matching TypeScript interface)
    question_obj = {
      "question": question_text,
      "options": options,
      "correctOptionIndex": correct_option_index
    }

    questions.append(question_obj)

  return questions

def main():
  # Parse questions from the dataset file
  questions = parse_questions('dataset.txt')

  # Save questions to a JSON file
  with open('assets/questions.json', 'w', encoding='utf-8') as file:
    json.dump(questions, file, indent=2)

  # Print summary
  print(f"Successfully parsed {len(questions)} questions.")
  print("Data saved to questions.json")

  # Print a sample question for verification
  if questions:
    print("\nSample Question:")
    sample = questions[0]
    print(f"Question: {sample['question']}")
    for i, option in enumerate(sample['options']):
      correct = " (correct)" if i == sample['correctOptionIndex'] else ""
      print(f"Option {i+1}: {option}{correct}")

if __name__ == "__main__":
  main()
