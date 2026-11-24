# Practice #12 - Code-based vs low-code (Smart Campus Room Availability Checker)

Student: Akezhan Bekov, ID 24B030289 - Software Engineering (CSCI2208), Tuesday 13:00-16:00

## Links
- Code-based live demo (Bolt): https://smart-campus-room-av-2h2i.bolt.host
- Low-code live demo (Appsmith): https://app.appsmith.com/app/my-first-application/page1-6b05554c62b46899de31f42b

## Contents
- `Practice12_Bekov_Akezhan.pdf` - report: baseline, common contract (6 AC), tests T1-T8, effort, comparison matrix, security checklist, reflection
- `screenshot_*.jpg` - T1-T8 on the low-code app (t5a = first T5 run with overlapping data), baseline screenshot of the code-based demo
- `contract.test.ts` - T1-T8 against the code-based domain function `evaluateBooking` (run with `tsx --test`), `test_output.txt` - result 8/8 passed

## Notes
- The test file imports the Practice 11 project's domain files (`src/domain/availability`, `src/data/rooms`, `src/data/bookings`); the project source itself is in the Bolt project.
- All data is fictional. No credentials or keys are stored here.
- Not run: existing vitest suite, npm audit, UI tests on the deployed code-based demo (see report section 10).
