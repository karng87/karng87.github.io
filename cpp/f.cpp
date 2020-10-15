#include <stdio.h>

int main(){
  auto add = [](double A, double B)->int {return A+B;};
  //auto sum = add;
  printf ("%d\n",add(3.1,5.9));
  return 0;
}
