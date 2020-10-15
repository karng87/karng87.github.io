#include <stdio.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
  printf("Hello Wasm\n");
}

#ifdef __cplusplus
exter "C" {
#endif

void EMSCRIPTEN_KEEPALIVE myFunc(int argc, char ** argv) {
  printf ("MyFunc Called\n");
}
#ifdef __cplusplus
}
#endif
