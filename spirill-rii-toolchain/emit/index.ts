const OPC: Record<string, number> = { bi: 0x01, bo: 0x02, bp: 0x03 };
export function encodeIR(ir:{op:string,arg:number}[]):Uint8Array{
  const bytes=[0x52,0x49,0x49,0x43];              // "RIIC"
  for(const i of ir){
    const code=OPC[i.op]; if(code===undefined) throw new Error(`op ${i.op}`);
    bytes.push(code,i.arg&255);
  }
  bytes.push(0xff);                               // END
  return Uint8Array.from(bytes);
}
