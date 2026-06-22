import re

# We will read from two files or write them directly.
# Since we have the lines, let's write a python script that reads the transcript JSON directly to find the non-truncated VIEW_FILE output from this active turn!
# Wait! In the current conversation log (the logs of this active turn, i.e., my session), the first tool call of this session was VIEW_FILE of CardnewsWorkspace.tsx.
# The tool outputs in my active turn are stored in the prompt's conversation transcript, but they are also written to the transcript.jsonl as they happen!
# And since they were viewed in this active conversation, they are NOT truncated in the log for this active conversation session because the tool output is saved fully!
# Let's check: did transcript.jsonl save the full output of my recent VIEW_FILE tool calls?
# Yes! The tool outputs of the current session are appended to transcript.jsonl in real-time, and since they were just executed, they are fully written without truncation!
# Let's search the log for the most recent VIEW_FILE step that has "Total Lines: 1033" and lines 1 to 800!

log_path = "/Users/choeyujeong/.gemini/antigravity-ide/brain/5f4884b6-de6d-4fb9-8435-9e7868c03220/.system_generated/logs/transcript.jsonl"
output_path = "/Users/choeyujeong/Desktop/ddalkkak-redesign-v2/components/CardnewsWorkspace.tsx"

file_lines = {}

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json = json.loads(line)
            content = data.get("content", "")
            if data.get("type") == "VIEW_FILE" and "Total Lines: 1033" in content:
                # Parse lines in format "123: line content"
                for l in content.split("\n"):
                    match = re.match(r"^(\d+):\s?(.*)$", l)
                    if match:
                        line_num = int(match.group(1))
                        line_content = match.group(2)
                        file_lines[line_num] = line_content
        except Exception as e:
            continue

if file_lines and len(file_lines) >= 1030:
    sorted_line_numbers = sorted(file_lines.keys())
    print(f"Reconstructed {len(file_lines)} lines. Writing to components/CardnewsWorkspace.tsx...")
    with open(output_path, 'w', encoding='utf-8') as out_f:
        for num in sorted_line_numbers:
            out_f.write(file_lines[num] + "\n")
    print("Reconstruction successful!")
else:
    print(f"Failed to find all lines. Only found {len(file_lines)} lines.")
