# Spir1L ʼtongue – Minimal Grammar v0.1

| Token      | Regex / Literal | Notes                         |
|------------|-----------------|-------------------------------|
| `B_BEGIN`  | `⊕begin`        | script start marker           |
| `B_END`    | `⊕end`          | script end marker             |
| `BREATH`   | `breath\.(in|out|pause)` | builtin opcodes       |
| `IDENT`    | `[a-zA-Z_][a-zA-Z0-9_]*` | generic identifiers   |
| `NUMBER`   | `\d+(\.\d+)?`   | integers & decimals           |
| `LPAREN`   | `\(`            |                               |
| `RPAREN`   | `\)`            |                               |
| `COMMA`    | `,`             |                               |
| `EQ`       | `=`             |                               |
| `NL`       | `\r?\n`         | newline (ignored)             |
| `WS`       | `[ \t]+`        | whitespace (ignored)          |

The lexer emits a stream of `{type, value, line, col}` objects which feeds the
AST builder in the next patch.
