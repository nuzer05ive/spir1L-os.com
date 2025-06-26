precision mediump float;

varying vec3 vNormal;
varying vec3 vViewPosition;

uniform vec3 baseColor;
uniform vec3 rimColor;
uniform float rimPower;

void main(){
  vec3 n = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  float rim = 1.0 - max(dot(n, viewDir), 0.0);
  rim = pow(rim, rimPower);
  gl_FragColor = vec4(baseColor + rimColor * rim, 1.0);
}
