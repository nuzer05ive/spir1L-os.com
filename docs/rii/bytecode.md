# `.riic` byte-code v0.1
Header bytes: `52 49 49 43` (“RIIC”), followed by `[opcode arg]` pairs, then `FF`.

| Mnemonic | Hex | Notes |
|----------|-----|-------|
| `BI`     | 01  | breath.in – arg = breaths |
| `BO`     | 02  | breath.out – arg = breaths |
| `BP`     | 03  | breath.pause – arg = beats |
| `END`    | FF  | terminator |
