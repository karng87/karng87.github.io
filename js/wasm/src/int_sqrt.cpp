#include <math.h>
#include <emscripten.h>

extern "C"{

int int_sqrt(int x) {
  emscripten_run_script("alert('hi emscripten')");
  return sqrt(x);
}

}

EM_JS(void, js_alert,(),{
      alert('hello emscripten');
      //throw 'all done';
    });

int main(){
  js_alert();

  EM_ASM(
      {
        console.log('I recieved: ' + $0);
      }
      ,100);
  return 0;
}
