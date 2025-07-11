import json
import re

# Load data
with open("dataset.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Print first 300 characters to understand the format
print("First part of file:", content[:300])

# Split into individual questions (numbered items)
questions_raw = []
current_question = []
lines = [line.strip() for line in content.split('\n') if line.strip()]

# Debug - print total lines
print(f"Total lines: {len(lines)}")

# Try a more robust way to detect question numbers using regex
for i, line in enumerate(lines):
    # Look for pattern: digit(s) followed by period and space
    if re.match(r'^\d+\.\s', line):
        if current_question:  # Save previous question if it exists
            questions_raw.append(current_question)
        current_question = [line]
        print(f"Detected question at line {i+1}: {line[:50]}...")
    else:
        if not current_question:  # Handle case where file doesn't start with a numbered question
            print(f"Line {i+1} doesn't match a question pattern and no current question: {line[:50]}...")
            current_question = ["Unnumbered question"]
        current_question.append(line)

# Add the last question
if current_question:
    questions_raw.append(current_question)

# Print how many questions were found
print(f"Found {len(questions_raw)} questions")

# Process each question into the required format
flashcards = []
for i, q_lines in enumerate(questions_raw):
    try:
        question_text = q_lines[0]
        options = q_lines[1:] if len(q_lines) > 1 else []

        # Find the correct answer (marked with "correct answer")
        correct_answer = ""
        for option in options:
            if "(correct answer)" in option:
                # Remove the "(correct answer)" marker
                correct_answer = option.replace("(correct answer)", "").strip()
                break

        # Create flashcard
        flashcard = {
            "question": question_text,
            "answer": correct_answer
        }
        flashcards.append(flashcard)

        # Debug - print each processed question
        print(f"Processed Q{i+1}: {question_text[:50]}... Answer: {correct_answer[:50]}...")

    except Exception as e:
        print(f"Error processing question {i+1}: {e}")
        print(f"Question lines: {q_lines}")

# Output to TypeScript-like format
with open("flashcards_output.txt", "w", encoding="utf-8") as ts_file:
    ts_file.write("[\n")
    for card in flashcards:
        q = card["question"].replace("'", "\\'")
        a = card["answer"].replace("'", "\\'")
        ts_file.write(f"  {{ question: '{q}', answer: '{a}' }},\n")
    ts_file.write("]\n")

# Save as JSON
with open("flashcards.json", "w", encoding="utf-8") as json_file:
    json.dump(flashcards, json_file, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(flashcards)} flashcards.")
print("📄 flashcards_output.txt (for Angular service)")
print("📄 flashcards.json (optional structured export)")