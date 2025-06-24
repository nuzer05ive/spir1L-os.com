export interface Token {
  kind: string
  lexeme: string
  line: number   // added for error reporting
  col:  number
}
