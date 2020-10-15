#include <stdio.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
  printf ("Hello Wasm 3 \n");
}

#ifdef __cplusplus
extern "C" { // extern(외주): 변수명들이 맹글링되지 않고 원본 그대로 출력되는 함
#endif
// 함수 이름 앞에 
// EMSCRIPTEN_KEEPALIVE를 쓰면 데드코드로 제거되지 않습니다. 
// EMSCRIPTEN_KEEPALIVE를 사용하려면 
// emscripten.h 라이브러리를 가져와야합니다.
  void EMSCRIPTEN_KEEPALIVE myFunction(int argc, char ** argv){
    printf("MyFunction Called\n");
  }
#ifdef __cplusplus
}
#endif
