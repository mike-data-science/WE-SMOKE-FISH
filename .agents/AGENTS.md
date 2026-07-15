# General Rules

## PowerShell Best Practices
When executing PowerShell commands on Windows, always follow these best practices to prevent deadlocks and ensure proper output parsing:

1. **Wrap the command explicitly:** Instead of letting the agent guess the shell, explicitly call `powershell` and wrap the entire pipeline in quotes to ensure the pipe (`|`) character is processed correctly.
2. **Add Headless Flags:** Force PowerShell to run without loading user profiles and forbid interactive prompts to speed up execution and prevent freezing. Use: `powershell -NoProfile -NonInteractive -Command "..."`
3. **Output as JSON:** AI agents parse JSON much better than raw text tables. Always pipe the final result to `ConvertTo-Json`. To avoid performance issues with massive objects (e.g., from `Get-ChildItem`), always use `Select-Object` to pick only the necessary properties before converting. Example: `Select-Object Name, LastWriteTime, Length | ConvertTo-Json`
4. **Suppress Errors:** Add `-ErrorAction SilentlyContinue` to commands like `Get-ChildItem` so it skips restricted files or folders instead of halting execution.

**Golden Command Format:**
```powershell
powershell -NoProfile -NonInteractive -Command "Get-ChildItem -Path '...' -ErrorAction SilentlyContinue | Select-Object -First 5 | Select-Object Name, LastWriteTime, Length | ConvertTo-Json"
```
