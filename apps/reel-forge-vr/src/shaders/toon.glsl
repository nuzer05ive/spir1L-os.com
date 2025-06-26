precision mediump float;

varying vec3 vNormal;
varying vec3 vViewPosition;

uniform vec3 lightDirection;
uniform vec3 baseColor;

float toonRamp(float intensity){
  if(intensity > 0.66) return 1.0;
  if(intensity > 0.33) return 0.66;
  return 0.33;
}

void main(){
  vec3 n = normalize(vNormal);
  float ndl = max(dot(n, normalize(lightDirection)), 0.0);
  float lighting = toonRamp(ndl);
  gl_FragColor = vec4(baseColor * lighting, 1.0);
}
